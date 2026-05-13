using Backend.Data;
using Backend.DTOs.Comments;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class CommentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CommentsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/issues/5/comments
    [HttpGet("api/issues/{issueId:int}/comments")]
    public async Task<ActionResult<List<CommentResponseDto>>> GetIssueComments(int issueId)
    {
        var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);

        if (!issueExists)
            return NotFound("Issue not found.");

        var comments = await _context.Comments
            .Include(c => c.Author)
            .Where(c => c.IssueId == issueId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => ToResponseDto(c))
            .ToListAsync();

        return Ok(comments);
    }

    // POST: api/issues/5/comments
    [HttpPost("api/issues/{issueId:int}/comments")]
    public async Task<ActionResult<CommentResponseDto>> CreateComment(
        int issueId,
        CreateCommentDto dto)
    {
        var issue = await _context.Issues.FindAsync(issueId);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var authorExists = await _context.Users.AnyAsync(u => u.Id == dto.AuthorId);

        if (!authorExists)
            return BadRequest("Author user does not exist.");

        if (dto.ParentId.HasValue)
        {
            var parentCommentExists = await _context.Comments
                .AnyAsync(c => c.Id == dto.ParentId.Value && c.IssueId == issueId);

            if (!parentCommentExists)
                return BadRequest("Parent comment does not exist for this issue.");
        }

        if (string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("Comment body cannot be empty.");

        var comment = new Comment
        {
            IssueId = issueId,
            AuthorId = dto.AuthorId,
            ParentId = dto.ParentId,
            Body = dto.Body.Trim(),
            IsEdited = false,
            IsDeleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issueId,
            ActorId = dto.AuthorId,
            FieldName = "Comment",
            OldValue = string.Empty,
            NewValue = "Comment added",
            TransitionNote = dto.Body.Trim(),
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        var createdComment = await _context.Comments
            .Include(c => c.Author)
            .FirstAsync(c => c.Id == comment.Id);

        return CreatedAtAction(
            nameof(GetIssueComments),
            new { issueId },
            ToResponseDto(createdComment)
        );
    }

    // PUT: api/comments/5
    [HttpPut("api/comments/{id:int}")]
    public async Task<ActionResult<CommentResponseDto>> UpdateComment(
        int id,
        UpdateCommentDto dto)
    {
        var comment = await _context.Comments
            .Include(c => c.Author)
            .Include(c => c.Issue)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comment == null)
            return NotFound("Comment not found.");

        if (comment.Issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        if (comment.IsDeleted)
            return BadRequest("Deleted comments cannot be edited.");

        if (string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("Comment body cannot be empty.");

        comment.Body = dto.Body.Trim();
        comment.IsEdited = true;
        comment.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(comment));
    }

    // DELETE: api/comments/5
    [HttpDelete("api/comments/{id:int}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var comment = await _context.Comments
            .Include(c => c.Issue)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comment == null)
            return NotFound("Comment not found.");

        if (comment.Issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        // Soft delete, because comments may have replies/history.
        comment.IsDeleted = true;
        comment.Body = "[deleted]";
        comment.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static CommentResponseDto ToResponseDto(Comment comment)
    {
        return new CommentResponseDto
        {
            Id = comment.Id,
            IssueId = comment.IssueId,
            AuthorId = comment.AuthorId,
            AuthorName = comment.Author?.FullName,
            ParentId = comment.ParentId,
            Body = comment.Body,
            IsEdited = comment.IsEdited,
            IsDeleted = comment.IsDeleted,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt
        };
    }
}