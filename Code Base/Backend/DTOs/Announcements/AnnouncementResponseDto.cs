namespace Backend.DTOs.Announcements;

public class AnnouncementResponseDto
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string? ProjectName { get; set; }

    public int AuthorId { get; set; }

    public string? AuthorName { get; set; }

    public string Body { get; set; } = string.Empty;

    public string Comment { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}