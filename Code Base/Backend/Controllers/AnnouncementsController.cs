using Backend.Data;
using Backend.DTOs.Announcements;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class AnnouncementsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnnouncementsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/projects/5/announcements
    [HttpGet("api/projects/{projectId:int}/announcements")]
    public async Task<ActionResult<List<AnnouncementResponseDto>>> GetProjectAnnouncements(int projectId)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var announcements = await _context.Announcements
            .Include(a => a.Project)
            .Include(a => a.Author)
            .Where(a => a.ProjectId == projectId)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => ToResponseDto(a))
            .ToListAsync();

        return Ok(announcements);
    }

    // GET: api/announcements/5
    [HttpGet("api/announcements/{id:int}")]
    public async Task<ActionResult<AnnouncementResponseDto>> GetAnnouncement(int id)
    {
        var announcement = await _context.Announcements
            .Include(a => a.Project)
            .Include(a => a.Author)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (announcement == null)
            return NotFound("Announcement not found.");

        return Ok(ToResponseDto(announcement));
    }

    // POST: api/projects/5/announcements
    [HttpPost("api/projects/{projectId:int}/announcements")]
    public async Task<ActionResult<AnnouncementResponseDto>> CreateAnnouncement(
        int projectId,
        CreateAnnouncementDto dto)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var authorExists = await _context.Users.AnyAsync(u => u.Id == dto.AuthorId);

        if (!authorExists)
            return BadRequest("Author user does not exist.");

        if (string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("Announcement body cannot be empty.");

        var announcement = new Announcement
        {
            ProjectId = projectId,
            AuthorId = dto.AuthorId,
            Body = dto.Body.Trim(),
            Comment = dto.Comment.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.Announcements.Add(announcement);
        await _context.SaveChangesAsync();

        var createdAnnouncement = await _context.Announcements
            .Include(a => a.Project)
            .Include(a => a.Author)
            .FirstAsync(a => a.Id == announcement.Id);

        return CreatedAtAction(
            nameof(GetAnnouncement),
            new { id = createdAnnouncement.Id },
            ToResponseDto(createdAnnouncement)
        );
    }

    // PUT: api/announcements/5
    [HttpPut("api/announcements/{id:int}")]
    public async Task<ActionResult<AnnouncementResponseDto>> UpdateAnnouncement(
        int id,
        UpdateAnnouncementDto dto)
    {
        var announcement = await _context.Announcements
            .Include(a => a.Project)
            .Include(a => a.Author)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (announcement == null)
            return NotFound("Announcement not found.");

        if (string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("Announcement body cannot be empty.");

        announcement.Body = dto.Body.Trim();
        announcement.Comment = dto.Comment.Trim();

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(announcement));
    }

    // DELETE: api/announcements/5
    [HttpDelete("api/announcements/{id:int}")]
    public async Task<IActionResult> DeleteAnnouncement(int id)
    {
        var announcement = await _context.Announcements.FindAsync(id);

        if (announcement == null)
            return NotFound("Announcement not found.");

        _context.Announcements.Remove(announcement);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static AnnouncementResponseDto ToResponseDto(Announcement announcement)
    {
        return new AnnouncementResponseDto
        {
            Id = announcement.Id,
            ProjectId = announcement.ProjectId,
            ProjectName = announcement.Project?.Name,
            AuthorId = announcement.AuthorId,
            AuthorName = announcement.Author?.FullName,
            Body = announcement.Body,
            Comment = announcement.Comment,
            CreatedAt = announcement.CreatedAt
        };
    }
}