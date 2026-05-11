using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Issues;

public class UpdateIssueStatusDto
{
    [Required]
    public IssueStatus Status { get; set; }

    public int ActorId { get; set; }

    public string TransitionNote { get; set; } = string.Empty;
}