using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Notifications;

public class CreateNotificationDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public NotificationType Type { get; set; }

    [Required]
    public string EntityType { get; set; } = string.Empty;

    [Required]
    public int EntityId { get; set; }
}