using Backend.Data;
using Backend.DTOs.Notifications;
using Backend.Enum;
using Backend.Exceptions;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _email;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(
            AppDbContext context,
            IEmailService email,
            ILogger<NotificationService> logger)
        {
            _context = context;
            _email = email;
            _logger = logger;
        }

        public async Task NotifyUserAsync(
            int userId,
            NotificationType type,
            string entityType,
            int entityId,
            string? emailSubject = null,
            string? emailBody = null)
        {
            await FanOutAsync(new[] { userId }, type, entityType, entityId, emailSubject, emailBody);
        }

        public async Task NotifyIssueParticipantsAsync(
            int issueId,
            NotificationType type,
            string entityType,
            int entityId,
            int? excludeUserId = null,
            string? emailSubject = null,
            string? emailBody = null)
        {
            var assigneeIds = await _context.IssueAssignments
                .Where(a => a.IssueId == issueId)
                .Select(a => a.UserId)
                .Distinct()
                .ToListAsync();

            // Include the reporter even if not in IssueAssignments.
            var reporterId = await _context.Issues
                .Where(i => i.Id == issueId)
                .Select(i => (int?)i.ReporterId)
                .FirstOrDefaultAsync();

            var recipients = new HashSet<int>(assigneeIds);
            if (reporterId.HasValue) recipients.Add(reporterId.Value);
            if (excludeUserId.HasValue) recipients.Remove(excludeUserId.Value);

            if (recipients.Count == 0) return;

            await FanOutAsync(recipients, type, entityType, entityId, emailSubject, emailBody);
        }

        public async Task NotifyProjectMembersAsync(
            int projectId,
            NotificationType type,
            string entityType,
            int entityId,
            int? excludeUserId = null,
            string? emailSubject = null,
            string? emailBody = null)
        {
            var memberIds = await _context.ProjectMembers
                .Where(pm => pm.ProjectId == projectId)
                .Select(pm => pm.UserId)
                .Distinct()
                .ToListAsync();

            var recipients = new HashSet<int>(memberIds);
            if (excludeUserId.HasValue) recipients.Remove(excludeUserId.Value);

            if (recipients.Count == 0) return;

            await FanOutAsync(recipients, type, entityType, entityId, emailSubject, emailBody);
        }

        public async Task<List<NotificationResponseDto>> GetNotificationsForUserAsync(int userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            var issueIds = notifications
                .Where(n => n.EntityType == NotificationEntityTypes.Issue)
                .Select(n => n.EntityId)
                .Distinct()
                .ToList();

            var issueCodes = await _context.Issues
                .Where(i => issueIds.Contains(i.Id))
                .ToDictionaryAsync(i => i.Id, i => i.IssueCode);

            return notifications.Select(n => MapToResponseDto(n, issueCodes)).ToList();
        }

        public async Task<NotificationResponseDto> MarkAsReadAsync(int notificationId, int userId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId)
                ?? throw new NotFoundException(nameof(Notification), notificationId);

            if (notification.UserId != userId)
                throw new ForbiddenException("You cannot modify another user's notification.");

            if (!notification.IsRead)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }

            string? entityCode = null;
            if (notification.EntityType == NotificationEntityTypes.Issue)
            {
                entityCode = await _context.Issues
                    .Where(i => i.Id == notification.EntityId)
                    .Select(i => i.IssueCode)
                    .FirstOrDefaultAsync();
            }

            return MapToResponseDto(notification, entityCode);
        }

        // ── Internals ──────────────────────────────────────────────────

        private async Task FanOutAsync(
            IEnumerable<int> userIds,
            NotificationType type,
            string entityType,
            int entityId,
            string? emailSubject,
            string? emailBody)
        {
            var ids = userIds.Distinct().ToList();
            if (ids.Count == 0) return;

            var now = DateTime.UtcNow;
            var notifications = ids.Select(uid => new Notification
            {
                UserId = uid,
                Type = type,
                EntityType = entityType,
                EntityId = entityId,
                IsRead = false,
                CreatedAt = now
            }).ToList();

            _context.Notifications.AddRange(notifications);
            await _context.SaveChangesAsync();

            if (string.IsNullOrWhiteSpace(emailSubject) || string.IsNullOrWhiteSpace(emailBody))
                return;

            try
            {
                var emails = await _context.Users
                    .Where(u => ids.Contains(u.Id))
                    .Select(u => u.Email)
                    .ToListAsync();

                await _email.SendBulkEmailAsync(emails, emailSubject, emailBody);
            }
            catch (Exception ex)
            {
                // Email failures must not break the business operation.
                _logger.LogError(ex, "Failed to send notification emails for {EntityType} {EntityId}", entityType, entityId);
            }
        }

        private static NotificationResponseDto MapToResponseDto(
            Notification n,
            IReadOnlyDictionary<int, string> issueCodes)
        {
            string? entityCode = null;
            if (n.EntityType == NotificationEntityTypes.Issue &&
                issueCodes.TryGetValue(n.EntityId, out var code))
            {
                entityCode = code;
            }

            return new NotificationResponseDto
            {
                Id = n.Id,
                UserId = n.UserId,
                Type = n.Type.ToString(),
                EntityType = n.EntityType,
                EntityId = n.EntityId,
                EntityCode = entityCode,
                IsRead = n.IsRead,
                CreatedAt = n.CreatedAt
            };
        }

        private static NotificationResponseDto MapToResponseDto(Notification n, string? entityCode) => new()
        {
            Id = n.Id,
            UserId = n.UserId,
            Type = n.Type.ToString(),
            EntityType = n.EntityType,
            EntityId = n.EntityId,
            EntityCode = entityCode,
            IsRead = n.IsRead,
            CreatedAt = n.CreatedAt
        };
    }
}
