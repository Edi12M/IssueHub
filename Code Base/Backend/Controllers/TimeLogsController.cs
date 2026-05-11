using Backend.Data;
using Backend.DTOs.TimeLogs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class TimeLogsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TimeLogsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/issues/5/timelogs
    [HttpGet("api/issues/{issueId:int}/timelogs")]
    public async Task<ActionResult<List<TimeLogResponseDto>>> GetIssueTimeLogs(int issueId)
    {
        var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);

        if (!issueExists)
            return NotFound("Issue not found.");

        var timeLogs = await _context.TimeLogs
            .Include(t => t.Issue)
            .Include(t => t.User)
            .Where(t => t.IssueId == issueId)
            .OrderByDescending(t => t.LogDate)
            .Select(t => ToResponseDto(t))
            .ToListAsync();

        return Ok(timeLogs);
    }

    // GET: api/users/5/timelogs
    [HttpGet("api/users/{userId:int}/timelogs")]
    public async Task<ActionResult<List<TimeLogResponseDto>>> GetUserTimeLogs(int userId)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == userId);

        if (!userExists)
            return NotFound("User not found.");

        var timeLogs = await _context.TimeLogs
            .Include(t => t.Issue)
            .Include(t => t.User)
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.LogDate)
            .Select(t => ToResponseDto(t))
            .ToListAsync();

        return Ok(timeLogs);
    }

    // POST: api/issues/5/timelogs
    [HttpPost("api/issues/{issueId:int}/timelogs")]
    public async Task<ActionResult<TimeLogResponseDto>> CreateTimeLog(
        int issueId,
        CreateTimeLogDto dto)
    {
        var issue = await _context.Issues.FindAsync(issueId);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

        if (!userExists)
            return BadRequest("User does not exist.");

        if (dto.Hours <= 0)
            return BadRequest("Hours must be greater than zero.");

        var timeLog = new TimeLog
        {
            IssueId = issueId,
            UserId = dto.UserId,
            Hours = dto.Hours,
            IsBillable = dto.IsBillable,
            LogDate = dto.LogDate,
            Note = dto.Note.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.TimeLogs.Add(timeLog);

        _context.IssueHistories.Add(new IssueHistory
        {
            IssueId = issueId,
            ActorId = dto.UserId,
            FieldName = "TimeLog",
            OldValue = string.Empty,
            NewValue = $"{dto.Hours} hours",
            TransitionNote = dto.Note.Trim(),
            CreatedAt = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();

        var createdTimeLog = await _context.TimeLogs
            .Include(t => t.Issue)
            .Include(t => t.User)
            .FirstAsync(t => t.Id == timeLog.Id);

        return CreatedAtAction(
            nameof(GetIssueTimeLogs),
            new { issueId },
            ToResponseDto(createdTimeLog)
        );
    }

    // PUT: api/timelogs/5
    [HttpPut("api/timelogs/{id:int}")]
    public async Task<ActionResult<TimeLogResponseDto>> UpdateTimeLog(
        int id,
        UpdateTimeLogDto dto)
    {
        var timeLog = await _context.TimeLogs
            .Include(t => t.Issue)
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (timeLog == null)
            return NotFound("Time log not found.");

        if (timeLog.Issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        if (dto.Hours <= 0)
            return BadRequest("Hours must be greater than zero.");

        timeLog.Hours = dto.Hours;
        timeLog.IsBillable = dto.IsBillable;
        timeLog.LogDate = dto.LogDate;
        timeLog.Note = dto.Note.Trim();

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(timeLog));
    }

    // DELETE: api/timelogs/5
    [HttpDelete("api/timelogs/{id:int}")]
    public async Task<IActionResult> DeleteTimeLog(int id)
    {
        var timeLog = await _context.TimeLogs
            .Include(t => t.Issue)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (timeLog == null)
            return NotFound("Time log not found.");

        if (timeLog.Issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        _context.TimeLogs.Remove(timeLog);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static TimeLogResponseDto ToResponseDto(TimeLog timeLog)
    {
        return new TimeLogResponseDto
        {
            Id = timeLog.Id,
            IssueId = timeLog.IssueId,
            IssueTitle = timeLog.Issue?.Title,
            UserId = timeLog.UserId,
            UserName = timeLog.User?.FullName,
            Hours = timeLog.Hours,
            IsBillable = timeLog.IsBillable,
            LogDate = timeLog.LogDate,
            Note = timeLog.Note,
            CreatedAt = timeLog.CreatedAt
        };
    }
}