using Backend.Enum;

namespace Backend.DTOs.Notifications;

public class NotificationResponseDto
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? UserName { get; set; }

    public NotificationType Type { get; set; }

    public string EntityType { get; set; } = string.Empty;

    public int EntityId { get; set; }

    public bool IsRead { get; set; }

    public DateTime CreatedAt { get; set; }
}