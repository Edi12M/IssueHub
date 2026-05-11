using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Announcements;

public class CreateAnnouncementDto
{
    [Required]
    public int AuthorId { get; set; }

    [Required]
    public string Body { get; set; } = string.Empty;

    public string Comment { get; set; } = string.Empty;
}