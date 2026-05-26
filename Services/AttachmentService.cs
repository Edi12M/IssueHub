using Backend.Data;
using Backend.DTOs.Attachments;
using Backend.Enum;
using Backend.Exceptions;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class AttachmentService : IAttachmentService
    {
        private const long MaxBytes = 10L * 1024 * 1024;

        private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
        {
            "image/jpeg", "image/png", "image/gif", "image/webp",
            "application/pdf",
            "text/plain"
        };

        private readonly AppDbContext _context;
        private readonly INotificationService _notifications;
        private readonly string _storageRoot;

        public AttachmentService(
            AppDbContext context,
            INotificationService notifications,
            IConfiguration configuration,
            IHostEnvironment env)
        {
            _context = context;
            _notifications = notifications;

            var configured = configuration["Attachments:StorageRoot"];
            _storageRoot = string.IsNullOrWhiteSpace(configured)
                ? Path.Combine(env.ContentRootPath, "attachments_storage")
                : configured;

            Directory.CreateDirectory(_storageRoot);
        }

        public async Task<AttachmentResponseDto> CreateAttachmentAsync(
            int issueId,
            int uploaderId,
            string fileName,
            string contentType,
            long size,
            Stream content)
        {
            if (size <= 0)
                throw new BadRequestException("File is empty.");
            if (size > MaxBytes)
                throw new BadRequestException($"File exceeds the {MaxBytes / (1024 * 1024)} MB limit.");
            if (!AllowedContentTypes.Contains(contentType))
                throw new BadRequestException($"File type '{contentType}' is not allowed.");

            var issue = await _context.Issues
                .Where(i => i.Id == issueId)
                .Select(i => new { i.Id, i.IssueCode, i.Title })
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(nameof(Issue), issueId);

            var uploaderExists = await _context.Users.AnyAsync(u => u.Id == uploaderId);
            if (!uploaderExists)
                throw new NotFoundException(nameof(User), uploaderId);

            var safeName = SanitizeFileName(fileName);
            var storedName = $"{Guid.NewGuid():N}_{safeName}";
            var fullPath = Path.Combine(_storageRoot, storedName);

            await using (var fs = new FileStream(fullPath, FileMode.CreateNew, FileAccess.Write, FileShare.None))
            {
                await content.CopyToAsync(fs);
            }

            var attachment = new Attachment
            {
                IssueId = issueId,
                UploadedById = uploaderId,
                FileName = safeName,
                FileType = contentType,
                FileSizeBytes = (int)Math.Min(size, int.MaxValue),
                StoragePath = fullPath,
                UploadedAt = DateTime.UtcNow
            };

            _context.Attachments.Add(attachment);
            await _context.SaveChangesAsync();

            await _notifications.NotifyIssueParticipantsAsync(
                issue.Id,
                NotificationType.IssueUpdated,
                NotificationEntityTypes.Attachment,
                attachment.Id,
                excludeUserId: uploaderId,
                emailSubject: $"[{issue.IssueCode}] New attachment",
                emailBody: $"\"{safeName}\" was attached to issue {issue.IssueCode}.");

            var saved = await _context.Attachments
               .Include(a => a.UploadedBy)
               .FirstAsync(a => a.Id == attachment.Id);

            return MapToResponseDto(saved);
        }

        public async Task<AttachmentResponseDto> GetAttachmentAsync(int attachmentId)
        {
            var attachment = await _context.Attachments
                .Include(a => a.UploadedBy)
                .FirstOrDefaultAsync(a => a.Id == attachmentId)
                ?? throw new NotFoundException(nameof(Attachment), attachmentId);

            return MapToResponseDto(attachment);
        }

        public async Task<AttachmentDownload> GetAttachmentDownloadAsync(int attachmentId)
        {
            var attachment = await _context.Attachments.FindAsync(attachmentId)
                ?? throw new NotFoundException(nameof(Attachment), attachmentId);

            if (!File.Exists(attachment.StoragePath))
                throw new NotFoundException("Attachment file", attachmentId);

            return new AttachmentDownload
            {
                FilePath = attachment.StoragePath,
                FileName = attachment.FileName,
                FileType = attachment.FileType
            };
        }

        public async Task<List<AttachmentResponseDto>> GetAttachmentsForIssueAsync(int issueId)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);
            if (!issueExists)
                throw new NotFoundException(nameof(Issue), issueId);

            var attachments = await _context.Attachments
                .Include(a => a.UploadedBy)
                .Where(a => a.IssueId == issueId)
                .OrderBy(a => a.UploadedAt)
                .ToListAsync();

            return attachments.Select(MapToResponseDto).ToList();
        }

        public async Task DeleteAttachmentAsync(int attachmentId, int actorId)
        {
            var attachment = await _context.Attachments.FindAsync(attachmentId)
                ?? throw new NotFoundException(nameof(Attachment), attachmentId);

            if (attachment.UploadedById != actorId)
                throw new ForbiddenException("Only the uploader can delete this attachment.");

            var issue = await _context.Issues
                .Where(i => i.Id == attachment.IssueId)
                .Select(i => new { i.Id, i.IssueCode, i.Title })
                .FirstOrDefaultAsync();

            _context.Attachments.Remove(attachment);
            await _context.SaveChangesAsync();

            try
            {
                if (File.Exists(attachment.StoragePath))
                    File.Delete(attachment.StoragePath);
            }
            catch
            {
                // File-system cleanup is best-effort; DB row is already gone.
            }

            if (issue != null)
            {
                await _notifications.NotifyIssueParticipantsAsync(
                    issue.Id,
                    NotificationType.IssueUpdated,
                    NotificationEntityTypes.Attachment,
                    attachment.Id,
                    excludeUserId: actorId,
                    emailSubject: $"[{issue.IssueCode}] Attachment removed",
                    emailBody: $"Attachment \"{attachment.FileName}\" was removed from issue {issue.IssueCode}.");
            }
        }

        // ── Internals ────────────────────────────────────────────

        private static AttachmentResponseDto MapToResponseDto(Attachment a) => new()
        {
            Id = a.Id,
            IssueId = a.IssueId,
            UploadedById = a.UploadedById,
            UploadedByName = a.UploadedBy?.FullName ?? string.Empty,
            FileName = a.FileName,
            FileType = a.FileType,
            FileSizeBytes = a.FileSizeBytes,
            UploadedAt = a.UploadedAt
        };

        private static string SanitizeFileName(string fileName)
        {
            var raw = Path.GetFileName(fileName);
            var invalid = Path.GetInvalidFileNameChars();
            var cleaned = string.Concat(raw.Select(c => invalid.Contains(c) ? '_' : c));
            return string.IsNullOrWhiteSpace(cleaned) ? "file" : cleaned;
        }
    }
}
