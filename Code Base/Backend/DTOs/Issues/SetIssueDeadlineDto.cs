using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Issues;

public class SetIssueDeadlineDto
{
    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime DueDate { get; set; }

    public int ActorId { get; set; }

    public string Note { get; set; } = string.Empty;
}