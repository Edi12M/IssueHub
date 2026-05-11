using Backend.Data;
using Backend.DTOs.Notifications;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotificationsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/notifications
    [HttpGet]
    public async Task<ActionResult<List<NotificationResponseDto>>> GetNotifications(
        [FromQuery] int? userId,
        [FromQuery] bool? unreadOnly)
    {
        var query = _context.Notifications
            .Include(n => n.User)
            .AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(n => n.UserId == userId.Value);
        }

        if (unreadOnly == true)
        {
            query = query.Where(n => !n.IsRead);
        }

        var notifications = await query
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => ToResponseDto(n))
            .ToListAsync();

        return Ok(notifications);
    }

    // GET: api/notifications/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<NotificationResponseDto>> GetNotification(int id)
    {
        var notification = await _context.Notifications
            .Include(n => n.User)
            .FirstOrDefaultAsync(n => n.Id == id);

        if (notification == null)
            return NotFound("Notification not found.");

        return Ok(ToResponseDto(notification));
    }

    // POST: api/notifications
    [HttpPost]
    public async Task<ActionResult<NotificationResponseDto>> CreateNotification(CreateNotificationDto dto)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

        if (!userExists)
            return BadRequest("User does not exist.");

        if (string.IsNullOrWhiteSpace(dto.EntityType))
            return BadRequest("Entity type is required.");

        var notification = new Notification
        {
            UserId = dto.UserId,
            Type = dto.Type,
            EntityType = dto.EntityType.Trim(),
            EntityId = dto.EntityId,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        var createdNotification = await _context.Notifications
            .Include(n => n.User)
            .FirstAsync(n => n.Id == notification.Id);

        return CreatedAtAction(
            nameof(GetNotification),
            new { id = createdNotification.Id },
            ToResponseDto(createdNotification)
        );
    }

    // PATCH: api/notifications/5/read
    [HttpPatch("{id:int}/read")]
    public async Task<ActionResult<NotificationResponseDto>> MarkAsRead(int id)
    {
        var notification = await _context.Notifications
            .Include(n => n.User)
            .FirstOrDefaultAsync(n => n.Id == id);

        if (notification == null)
            return NotFound("Notification not found.");

        notification.IsRead = true;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(notification));
    }

    // PATCH: api/notifications/user/5/read-all
    [HttpPatch("user/{userId:int}/read-all")]
    public async Task<IActionResult> MarkAllAsRead(int userId)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == userId);

        if (!userExists)
            return NotFound("User not found.");

        var notifications = await _context.Notifications
            .Where(n => n.UserId == userId && !n.IsRead)
            .ToListAsync();

        foreach (var notification in notifications)
        {
            notification.IsRead = true;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/notifications/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteNotification(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);

        if (notification == null)
            return NotFound("Notification not found.");

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static NotificationResponseDto ToResponseDto(Notification notification)
    {
        return new NotificationResponseDto
        {
            Id = notification.Id,
            UserId = notification.UserId,
            UserName = notification.User?.FullName,
            Type = notification.Type,
            EntityType = notification.EntityType,
            EntityId = notification.EntityId,
            IsRead = notification.IsRead,
            CreatedAt = notification.CreatedAt
        };
    }
}