using Backend.Data;
using Backend.DTOs.Attachments;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class AttachmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public AttachmentsController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // GET: api/issues/5/attachments
    [HttpGet("api/issues/{issueId:int}/attachments")]
    public async Task<ActionResult<List<AttachmentResponseDto>>> GetIssueAttachments(int issueId)
    {
        var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);

        if (!issueExists)
            return NotFound("Issue not found.");

        var attachments = await _context.Attachments
            .Include(a => a.UploadedBy)
            .Where(a => a.IssueId == issueId)
            .OrderByDescending(a => a.UploadedAt)
            .Select(a => ToResponseDto(a))
            .ToListAsync();

        return Ok(attachments);
    }

    // POST: api/issues/5/attachments
    [HttpPost("api/issues/{issueId:int}/attachments")]
    public async Task<ActionResult<AttachmentResponseDto>> UploadAttachment(
        int issueId,
        [FromForm] IFormFile file,
        [FromForm] int uploadedById)
    {
        var issue = await _context.Issues.FindAsync(issueId);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var uploaderExists = await _context.Users.AnyAsync(u => u.Id == uploadedById);

        if (!uploaderExists)
            return BadRequest("Uploader user does not exist.");

        if (file == null || file.Length == 0)
            return BadRequest("No file was uploaded.");

        const long maxFileSize = 10 * 1024 * 1024; // 10 MB

        if (file.Length > maxFileSize)
            return BadRequest("File size cannot exceed 10 MB.");

        var allowedExtensions = new[]
        {
            ".jpg", ".jpeg", ".png", ".gif",
            ".pdf", ".doc", ".docx",
            ".xls", ".xlsx", ".zip", ".txt"
        };

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("File type is not allowed.");

        var uploadsRoot = Path.Combine(_environment.ContentRootPath, "Uploads", "Issues", issueId.ToString());

        if (!Directory.Exists(uploadsRoot))
            Directory.CreateDirectory(uploadsRoot);

        var safeFileName = $"{Guid.NewGuid()}{extension}";
        var fullPath = Path.Combine(uploadsRoot, safeFileName);

        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var relativePath = Path.Combine("Uploads", "Issues", issueId.ToString(), safeFileName)
            .Replace("\\", "/");

        var attachment = new Attachment
        {
            IssueId = issueId,
            UploadedById = uploadedById,
            FileName = file.FileName,
            FileType = file.ContentType,
            FileSizeBytes = (int)file.Length,
            StoragePath = relativePath,
            UploadedAt = DateTime.UtcNow
        };

        _context.Attachments.Add(attachment);

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issueId,
            ActorId = uploadedById,
            FieldName = "Attachment",
            OldValue = string.Empty,
            NewValue = file.FileName,
            TransitionNote = "Attachment uploaded.",
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        var createdAttachment = await _context.Attachments
            .Include(a => a.UploadedBy)
            .FirstAsync(a => a.Id == attachment.Id);

        return CreatedAtAction(
            nameof(GetIssueAttachments),
            new { issueId },
            ToResponseDto(createdAttachment)
        );
    }

    // DELETE: api/attachments/5
    [HttpDelete("api/attachments/{id:int}")]
    public async Task<IActionResult> DeleteAttachment(int id)
    {
        var attachment = await _context.Attachments
            .Include(a => a.Issue)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (attachment == null)
            return NotFound("Attachment not found.");

        if (attachment.Issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var fullPath = Path.Combine(
            _environment.ContentRootPath,
            attachment.StoragePath.Replace("/", Path.DirectorySeparatorChar.ToString())
        );

        if (System.IO.File.Exists(fullPath))
        {
            System.IO.File.Delete(fullPath);
        }

        _context.Attachments.Remove(attachment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static AttachmentResponseDto ToResponseDto(Attachment attachment)
    {
        return new AttachmentResponseDto
        {
            Id = attachment.Id,
            IssueId = attachment.IssueId,
            UploadedById = attachment.UploadedById,
            UploadedByName = attachment.UploadedBy?.FullName,
            FileName = attachment.FileName,
            FileType = attachment.FileType,
            FileSizeBytes = attachment.FileSizeBytes,
            StoragePath = attachment.StoragePath,
            UploadedAt = attachment.UploadedAt
        };
    }
}