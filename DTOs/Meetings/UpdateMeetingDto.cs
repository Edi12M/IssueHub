using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Meetings;

public class UpdateMeetingDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Transcript { get; set; } = string.Empty;

    public string Summary { get; set; } = string.Empty;

    [Required]
    public MeetingStatus Status { get; set; }

    [Required]
    public DateTime RecordedAt { get; set; }
}