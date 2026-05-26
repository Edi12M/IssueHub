using Backend.Data;
using Backend.DTOs.Comments;
using Backend.Enum;
using Backend.Exceptions;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notifications;

        public CommentService(AppDbContext context, INotificationService notifications)
        {
            _context = context;
            _notifications = notifications;
        }

        public async Task<CommentResponseDto> CreateCommentAsync(CreateCommentDto dto, int authorId)
        {
            var issue = await _context.Issues
                .Where(i => i.Id == dto.IssueId)
                .Select(i => new { i.Id, i.IssueCode, i.Title })
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException(nameof(Issue), dto.IssueId);

            var authorExists = await _context.Users.AnyAsync(u => u.Id == authorId);
            if (!authorExists)
                throw new NotFoundException(nameof(User), authorId);

            if (dto.ParentId.HasValue)
            {
                var parentOk = await _context.Comments.AnyAsync(c =>
                    c.Id == dto.ParentId.Value && c.IssueId == dto.IssueId && !c.IsDeleted);
                if (!parentOk)
                    throw new BadRequestException("Parent comment not found or has been deleted.");
            }

            var now = DateTime.UtcNow;
            var comment = new Comment
            {
                IssueId = dto.IssueId,
                AuthorId = authorId,
                ParentId = dto.ParentId,
                Body = dto.Body,
                IsEdited = false,
                IsDeleted = false,
                CreatedAt = now,
                UpdatedAt = now
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            await _notifications.NotifyIssueParticipantsAsync(
                  issue.Id,
                  NotificationType.CommentAdded,
                  NotificationEntityTypes.Comment,
                  comment.Id,
                  excludeUserId: authorId,
                  emailSubject: $"[{issue.IssueCode}] New comment",
                  emailBody: $"A new comment was added to issue {issue.IssueCode} \"{issue.Title}\".");

            var saved = await _context.Comments
                .Include(c => c.Author)
                .FirstAsync(c => c.Id == comment.Id);

            return MapToResponseDto(saved);
        }

        public async Task<CommentResponseDto> GetCommentAsync(int commentId)
        {
            var comment = await _context.Comments
                .Include(c => c.Author)
                .FirstOrDefaultAsync(c => c.Id == commentId)
                ?? throw new NotFoundException(nameof(Comment), commentId);

            if (comment.IsDeleted)
                throw new NotFoundException("Comment (deleted)", commentId);

            return MapToResponseDto(comment);
        }

        public async Task<CommentResponseDto> UpdateCommentAsync(int commentId, UpdateCommentDto dto, int actorId)
        {
            var comment = await _context.Comments
                .Include(c => c.Author)
                .FirstOrDefaultAsync(c => c.Id == commentId)
                ?? throw new NotFoundException(nameof(Comment), commentId);

            if (comment.IsDeleted)
                throw new NotFoundException("Comment (deleted)", commentId);

            if (comment.AuthorId != actorId)
                throw new ForbiddenException("Only the comment author can edit this comment.");

            comment.Body = dto.Body;
            comment.IsEdited = true;
            comment.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return MapToResponseDto(comment);
        }

        public async Task DeleteCommentAsync(int commentId, int actorId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId)
                ?? throw new NotFoundException(nameof(Comment), commentId);

            if (comment.IsDeleted)
                return; // idempotent

            if (comment.AuthorId != actorId)
                throw new ForbiddenException("Only the comment author can delete this comment.");

            // Soft-delete the comment + all descendants recursively.
            var allCommentsInIssue = await _context.Comments
                .Where(c => c.IssueId == comment.IssueId && !c.IsDeleted)
                .ToListAsync();

            var toDelete = CollectDescendants(allCommentsInIssue, comment.Id);
            toDelete.Add(comment);

            var now = DateTime.UtcNow;
            foreach (var c in toDelete)
            {
                c.IsDeleted = true;
                c.UpdatedAt = now;
            }
            await _context.SaveChangesAsync();

            var issue = await _context.Issues
                .Where(i => i.Id == comment.IssueId)
                .Select(i => new { i.Id, i.IssueCode, i.Title })
                .FirstOrDefaultAsync();

            if (issue != null)
            {
                await _notifications.NotifyIssueParticipantsAsync(
                    issue.Id,
                    NotificationType.CommentAdded,
                    NotificationEntityTypes.Comment,
                    comment.Id,
                    excludeUserId: actorId,
                    emailSubject: $"[{issue.IssueCode}] Comment deleted",
                    emailBody: $"A comment thread on issue {issue.IssueCode} \"{issue.Title}\" was deleted.");
            }
        }

        public async Task<List<CommentResponseDto>> GetCommentsForIssueAsync(int issueId)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);
            if (!issueExists)
                throw new NotFoundException(nameof(Issue), issueId);

            var comments = await _context.Comments
                .Include(c => c.Author)
                .Where(c => c.IssueId == issueId && !c.IsDeleted)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            return comments.Select(MapToResponseDto).ToList();
        }

        // ── Internals ─────────────────────────────────────────────

        private static List<Comment> CollectDescendants(List<Comment> all, int rootId)
        {
            var result = new List<Comment>();
            var queue = new Queue<int>();
            queue.Enqueue(rootId);
            while (queue.Count > 0)
            {
                var current = queue.Dequeue();
                foreach (var child in all.Where(c => c.ParentId == current))
                {
                    result.Add(child);
                    queue.Enqueue(child.Id);
                }
            }
            return result;
        }

        private static CommentResponseDto MapToResponseDto(Comment c) => new()
        {
            Id = c.Id,
            IssueId = c.IssueId,
            AuthorId = c.AuthorId,
            AuthorName = c.Author?.FullName ?? string.Empty,
            ParentId = c.ParentId,
            Body = c.Body,
            IsEdited = c.IsEdited,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt
        };
    }
}
