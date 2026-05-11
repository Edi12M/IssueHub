using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Announcements;

public class UpdateAnnouncementDto
{
    [Required]
    public string Body { get; set; } = string.Empty;

    public string Comment { get; set; } = string.Empty;
}