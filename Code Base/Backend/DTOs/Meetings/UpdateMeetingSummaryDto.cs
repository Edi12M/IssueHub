using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Meetings;

public class UpdateMeetingSummaryDto
{
    [Required]
    public string Summary { get; set; } = string.Empty;
}