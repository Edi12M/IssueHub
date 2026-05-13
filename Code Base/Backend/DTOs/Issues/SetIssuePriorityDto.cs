using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Issues;

public class SetIssuePriorityDto
{
    [Required]
    public IssuePriority Priority { get; set; }

    public int ActorId { get; set; }

    public string Note { get; set; } = string.Empty;
}