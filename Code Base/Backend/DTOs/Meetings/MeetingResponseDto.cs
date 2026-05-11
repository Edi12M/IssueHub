using Backend.Enum;

namespace Backend.DTOs.Meetings;

public class MeetingResponseDto
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string? ProjectName { get; set; }

    public int CreatedById { get; set; }

    public string? CreatedByName { get; set; }

    public string Title { get; set; } = string.Empty;

    public string AudioPath { get; set; } = string.Empty;

    public string Transcript { get; set; } = string.Empty;

    public string Summary { get; set; } = string.Empty;

    public MeetingStatus Status { get; set; }

    public DateTime RecordedAt { get; set; }

    public DateTime CreatedAt { get; set; }
}