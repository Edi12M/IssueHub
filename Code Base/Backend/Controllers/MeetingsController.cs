using Backend.Data;
using Backend.DTOs.Meetings;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class MeetingsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public MeetingsController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    // GET: api/projects/5/meetings
    [HttpGet("api/projects/{projectId:int}/meetings")]
    public async Task<ActionResult<List<MeetingResponseDto>>> GetProjectMeetings(int projectId)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var meetings = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .Where(m => m.ProjectId == projectId)
            .OrderByDescending(m => m.RecordedAt)
            .Select(m => ToResponseDto(m))
            .ToListAsync();

        return Ok(meetings);
    }

    // GET: api/meetings/5
    [HttpGet("api/meetings/{id:int}")]
    public async Task<ActionResult<MeetingResponseDto>> GetMeeting(int id)
    {
        var meeting = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return NotFound("Meeting not found.");

        return Ok(ToResponseDto(meeting));
    }

    // POST: api/projects/5/meetings
    [HttpPost("api/projects/{projectId:int}/meetings")]
    public async Task<ActionResult<MeetingResponseDto>> CreateMeeting(
        int projectId,
        CreateMeetingDto dto)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var creatorExists = await _context.Users.AnyAsync(u => u.Id == dto.CreatedById);

        if (!creatorExists)
            return BadRequest("Creator user does not exist.");

        var meeting = new Meeting
        {
            ProjectId = projectId,
            CreatedById = dto.CreatedById,
            Title = dto.Title.Trim(),
            AudioPath = string.Empty,
            Transcript = dto.Transcript.Trim(),
            Summary = dto.Summary.Trim(),
            Status = dto.Status,
            RecordedAt = dto.RecordedAt,
            CreatedAt = DateTime.UtcNow
        };

        _context.Meetings.Add(meeting);
        await _context.SaveChangesAsync();

        var createdMeeting = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .FirstAsync(m => m.Id == meeting.Id);

        return CreatedAtAction(
            nameof(GetMeeting),
            new { id = createdMeeting.Id },
            ToResponseDto(createdMeeting)
        );
    }

    // PUT: api/meetings/5
    [HttpPut("api/meetings/{id:int}")]
    public async Task<ActionResult<MeetingResponseDto>> UpdateMeeting(
        int id,
        UpdateMeetingDto dto)
    {
        var meeting = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return NotFound("Meeting not found.");

        meeting.Title = dto.Title.Trim();
        meeting.Transcript = dto.Transcript.Trim();
        meeting.Summary = dto.Summary.Trim();
        meeting.Status = dto.Status;
        meeting.RecordedAt = dto.RecordedAt;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(meeting));
    }

    // PATCH: api/meetings/5/summary
    [HttpPatch("api/meetings/{id:int}/summary")]
    public async Task<ActionResult<MeetingResponseDto>> UpdateMeetingSummary(
        int id,
        UpdateMeetingSummaryDto dto)
    {
        var meeting = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return NotFound("Meeting not found.");

        meeting.Summary = dto.Summary.Trim();

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(meeting));
    }

    // POST: api/meetings/5/upload-audio
    [HttpPost("api/meetings/{id:int}/upload-audio")]
    public async Task<ActionResult<MeetingResponseDto>> UploadMeetingAudio(
        int id,
        [FromForm] IFormFile file)
    {
        var meeting = await _context.Meetings
            .Include(m => m.Project)
            .Include(m => m.CreatedBy)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (meeting == null)
            return NotFound("Meeting not found.");

        if (file == null || file.Length == 0)
            return BadRequest("No audio file was uploaded.");

        const long maxFileSize = 100 * 1024 * 1024; // 100 MB

        if (file.Length > maxFileSize)
            return BadRequest("Audio file size cannot exceed 100 MB.");

        var allowedExtensions = new[] { ".mp3", ".wav", ".m4a" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Audio file type is not allowed. Use MP3, WAV, or M4A.");

        var uploadsRoot = Path.Combine(
            _environment.ContentRootPath,
            "Uploads",
            "Meetings",
            id.ToString()
        );

        if (!Directory.Exists(uploadsRoot))
            Directory.CreateDirectory(uploadsRoot);

        var safeFileName = $"{Guid.NewGuid()}{extension}";
        var fullPath = Path.Combine(uploadsRoot, safeFileName);

        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        meeting.AudioPath = Path.Combine("Uploads", "Meetings", id.ToString(), safeFileName)
            .Replace("\\", "/");

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(meeting));
    }

    // DELETE: api/meetings/5
    [HttpDelete("api/meetings/{id:int}")]
    public async Task<IActionResult> DeleteMeeting(int id)
    {
        var meeting = await _context.Meetings.FindAsync(id);

        if (meeting == null)
            return NotFound("Meeting not found.");

        if (!string.IsNullOrWhiteSpace(meeting.AudioPath))
        {
            var fullPath = Path.Combine(
                _environment.ContentRootPath,
                meeting.AudioPath.Replace("/", Path.DirectorySeparatorChar.ToString())
            );

            if (System.IO.File.Exists(fullPath))
                System.IO.File.Delete(fullPath);
        }

        _context.Meetings.Remove(meeting);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static MeetingResponseDto ToResponseDto(Meeting meeting)
    {
        return new MeetingResponseDto
        {
            Id = meeting.Id,
            ProjectId = meeting.ProjectId,
            ProjectName = meeting.Project?.Name,
            CreatedById = meeting.CreatedById,
            CreatedByName = meeting.CreatedBy?.FullName,
            Title = meeting.Title,
            AudioPath = meeting.AudioPath,
            Transcript = meeting.Transcript,
            Summary = meeting.Summary,
            Status = meeting.Status,
            RecordedAt = meeting.RecordedAt,
            CreatedAt = meeting.CreatedAt
        };
    }
}