using Backend.Data;
using Backend.DTOs.IssueHistory;
using Backend.DTOs.Issues;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IssuesController : ControllerBase
{
    private readonly AppDbContext _context;

    public IssuesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/issues
    [HttpGet]
    public async Task<ActionResult<List<IssueResponseDto>>> GetIssues(
        [FromQuery] int? projectId,
        [FromQuery] int? assignedToUserId)
    {
        var query = _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .AsQueryable();

        if (projectId.HasValue)
        {
            query = query.Where(i => i.ProjectId == projectId.Value);
        }

        if (assignedToUserId.HasValue)
        {
            query = query.Where(i => i.Assignments.Any(a => a.UserId == assignedToUserId.Value));
        }

        var issues = await query
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => ToResponseDto(i))
            .ToListAsync();

        return Ok(issues);
    }

    // GET: api/issues/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<IssueResponseDto>> GetIssue(int id)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        return Ok(ToResponseDto(issue));
    }

    // POST: api/issues
    [HttpPost]
    public async Task<ActionResult<IssueResponseDto>> CreateIssue(CreateIssueDto dto)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == dto.ProjectId);
        if (!projectExists)
            return BadRequest("Project does not exist.");

        var reporterExists = await _context.Users.AnyAsync(u => u.Id == dto.ReporterId);
        if (!reporterExists)
            return BadRequest("Reporter user does not exist.");

        if (dto.ParentId.HasValue)
        {
            var parentExists = await _context.Issues.AnyAsync(i => i.Id == dto.ParentId.Value);
            if (!parentExists)
                return BadRequest("Parent issue does not exist.");
        }

        if (dto.DueDate < dto.StartDate)
            return BadRequest("Due date cannot be before start date.");

        if (dto.AssigneeIds.Count > 0)
        {
            var existingUserIds = await _context.Users
                .Where(u => dto.AssigneeIds.Contains(u.Id))
                .Select(u => u.Id)
                .ToListAsync();

            var missingUserIds = dto.AssigneeIds.Except(existingUserIds).ToList();

            if (missingUserIds.Count > 0)
                return BadRequest($"These assignee user IDs do not exist: {string.Join(", ", missingUserIds)}");
        }

        var issue = new Issue
        {
            IssueCode = await GenerateIssueCode(dto.ProjectId),
            ProjectId = dto.ProjectId,
            ReporterId = dto.ReporterId,
            ParentId = dto.ParentId,
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            AcceptanceCriteria = dto.AcceptanceCriteria.Trim(),
            Type = dto.Type,
            Status = Backend.Enum.IssueStatus.Open,
            Priority = dto.Priority,
            StartDate = dto.StartDate,
            DueDate = dto.DueDate,
            IsArchived = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Issues.Add(issue);
        await _context.SaveChangesAsync();

        foreach (var userId in dto.AssigneeIds.Distinct())
        {
            _context.IssueAssignments.Add(new IssueAssignment
            {
                IssueId = issue.Id,
                UserId = userId,
                AssignedAt = DateTime.UtcNow
            });
        }

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issue.Id,
            ActorId = dto.ReporterId,
            FieldName = "Created",
            OldValue = string.Empty,
            NewValue = issue.Title,
            TransitionNote = "Issue created.",
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        var createdIssue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstAsync(i => i.Id == issue.Id);

        return CreatedAtAction(
            nameof(GetIssue),
            new { id = createdIssue.Id },
            ToResponseDto(createdIssue)
        );
    }

    // PUT: api/issues/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<IssueResponseDto>> UpdateIssue(int id, UpdateIssueDto dto)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        if (dto.ParentId.HasValue)
        {
            if (dto.ParentId.Value == id)
                return BadRequest("An issue cannot be its own parent.");

            var parentExists = await _context.Issues.AnyAsync(i => i.Id == dto.ParentId.Value);
            if (!parentExists)
                return BadRequest("Parent issue does not exist.");
        }

        if (dto.DueDate < dto.StartDate)
            return BadRequest("Due date cannot be before start date.");

        issue.ParentId = dto.ParentId;
        issue.Title = dto.Title.Trim();
        issue.Description = dto.Description.Trim();
        issue.AcceptanceCriteria = dto.AcceptanceCriteria.Trim();
        issue.Type = dto.Type;
        issue.Status = dto.Status;
        issue.Priority = dto.Priority;
        issue.StartDate = dto.StartDate;
        issue.DueDate = dto.DueDate;
        issue.IsArchived = dto.IsArchived;
        issue.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(issue));
    }

    // PATCH: api/issues/5/status
    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult<IssueResponseDto>> UpdateIssueStatus(int id, UpdateIssueStatusDto dto)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var oldStatus = issue.Status;

        issue.Status = dto.Status;
        issue.UpdatedAt = DateTime.UtcNow;

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issue.Id,
            ActorId = dto.ActorId,
            FieldName = "Status",
            OldValue = oldStatus.ToString(),
            NewValue = dto.Status.ToString(),
            TransitionNote = dto.TransitionNote ?? string.Empty,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(issue));
    }

    // PATCH: api/issues/5/priority
    [HttpPatch("{id:int}/priority")]
    public async Task<ActionResult<IssueResponseDto>> SetIssuePriority(int id, SetIssuePriorityDto dto)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var oldPriority = issue.Priority;

        issue.Priority = dto.Priority;
        issue.UpdatedAt = DateTime.UtcNow;

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issue.Id,
            ActorId = dto.ActorId,
            FieldName = "Priority",
            OldValue = oldPriority.ToString(),
            NewValue = dto.Priority.ToString(),
            TransitionNote = dto.Note ?? string.Empty,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(issue));
    }

    // PATCH: api/issues/5/deadline
    [HttpPatch("{id:int}/deadline")]
    public async Task<ActionResult<IssueResponseDto>> SetIssueDeadline(int id, SetIssueDeadlineDto dto)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        if (dto.DueDate < dto.StartDate)
            return BadRequest("Due date cannot be before start date.");

        var oldValue = $"{issue.StartDate:u} → {issue.DueDate:u}";
        var newValue = $"{dto.StartDate:u} → {dto.DueDate:u}";

        issue.StartDate = dto.StartDate;
        issue.DueDate = dto.DueDate;
        issue.UpdatedAt = DateTime.UtcNow;

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issue.Id,
            ActorId = dto.ActorId,
            FieldName = "Deadline",
            OldValue = oldValue,
            NewValue = newValue,
            TransitionNote = dto.Note ?? string.Empty,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(issue));
    }

    // PATCH: api/issues/5/archive
    [HttpPatch("{id:int}/archive")]
    public async Task<ActionResult<IssueResponseDto>> ArchiveIssue(int id)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        issue.IsArchived = true;
        issue.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(issue));
    }

    // POST: api/issues/5/assignments
    [HttpPost("{id:int}/assignments")]
    public async Task<ActionResult<IssueResponseDto>> AssignIssue(int id, AssignIssueDto dto)
    {
        var issue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        if (dto.UserIds.Count == 0)
            return BadRequest("At least one user ID is required.");

        var distinctUserIds = dto.UserIds.Distinct().ToList();

        var existingUserIds = await _context.Users
            .Where(u => distinctUserIds.Contains(u.Id))
            .Select(u => u.Id)
            .ToListAsync();

        var missingUserIds = distinctUserIds.Except(existingUserIds).ToList();

        if (missingUserIds.Count > 0)
            return BadRequest($"These user IDs do not exist: {string.Join(", ", missingUserIds)}");

        var oldAssignees = issue.Assignments.Select(a => a.UserId).ToList();

        _context.IssueAssignments.RemoveRange(issue.Assignments);

        foreach (var userId in distinctUserIds)
        {
            _context.IssueAssignments.Add(new IssueAssignment
            {
                IssueId = issue.Id,
                UserId = userId,
                AssignedAt = DateTime.UtcNow
            });
        }

        issue.UpdatedAt = DateTime.UtcNow;

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issue.Id,
            ActorId = dto.ActorId,
            FieldName = "Assignments",
            OldValue = string.Join(", ", oldAssignees),
            NewValue = string.Join(", ", distinctUserIds),
            TransitionNote = dto.Note ?? string.Empty,
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        var updatedIssue = await _context.Issues
            .Include(i => i.Project)
            .Include(i => i.Reporter)
            .Include(i => i.Assignments)
                .ThenInclude(a => a.User)
            .FirstAsync(i => i.Id == id);

        return Ok(ToResponseDto(updatedIssue));
    }

    // GET: api/issues/5/history
    [HttpGet("{id:int}/history")]
    public async Task<ActionResult<List<IssueHistoryResponseDto>>> GetIssueHistory(int id)
    {
        var issueExists = await _context.Issues.AnyAsync(i => i.Id == id);

        if (!issueExists)
            return NotFound("Issue not found.");

        var history = await _context.IssueHistories
            .Where(h => h.IssueId == id)
            .OrderByDescending(h => h.CreatedAt)
            .Select(h => new IssueHistoryResponseDto
            {
                Id = h.Id,
                IssueId = h.IssueId,
                ActorId = h.ActorId,
                FieldName = h.FieldName,
                OldValue = h.OldValue,
                NewValue = h.NewValue,
                TransitionNote = h.TransitionNote,
                CreatedAt = h.CreatedAt
            })
            .ToListAsync();

        return Ok(history);
    }

    // DELETE: api/issues/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteIssue(int id)
    {
        var issue = await _context.Issues.FindAsync(id);

        if (issue == null)
            return NotFound("Issue not found.");

        _context.Issues.Remove(issue);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string> GenerateIssueCode(int projectId)
    {
        var project = await _context.Projects.FindAsync(projectId);

        var prefix = project?.ProjectCode;
        if (string.IsNullOrWhiteSpace(prefix))
            prefix = "ISSUE";

        var count = await _context.Issues.CountAsync(i => i.ProjectId == projectId);

        return $"{prefix}-{count + 1:000}";
    }

    private static IssueResponseDto ToResponseDto(Issue issue)
    {
        return new IssueResponseDto
        {
            Id = issue.Id,
            IssueCode = issue.IssueCode,
            ProjectId = issue.ProjectId,
            ProjectName = issue.Project?.Name,
            ReporterId = issue.ReporterId,
            ReporterName = issue.Reporter?.FullName,
            ParentId = issue.ParentId,
            Title = issue.Title,
            Description = issue.Description,
            AcceptanceCriteria = issue.AcceptanceCriteria,
            Type = issue.Type,
            Status = issue.Status,
            Priority = issue.Priority,
            StartDate = issue.StartDate,
            DueDate = issue.DueDate,
            IsArchived = issue.IsArchived,
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            AssigneeIds = issue.Assignments?.Select(a => a.UserId).ToList() ?? new List<int>(),
            AssigneeNames = issue.Assignments?
                .Where(a => a.User != null)
                .Select(a => a.User.FullName)
                .ToList() ?? new List<string>()
        };
    }
}