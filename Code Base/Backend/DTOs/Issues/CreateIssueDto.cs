using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Issues;

public class CreateIssueDto
{
    [Required]
    public int ProjectId { get; set; }

    [Required]
    public int ReporterId { get; set; }

    public int? ParentId { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public string AcceptanceCriteria { get; set; } = string.Empty;

    [Required]
    public IssueType Type { get; set; }

    [Required]
    public IssuePriority Priority { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime DueDate { get; set; }

    public List<int> AssigneeIds { get; set; } = new();
}