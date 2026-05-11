using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Issues;

public class UpdateIssueDto
{
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
    public IssueStatus Status { get; set; }

    [Required]
    public IssuePriority Priority { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime DueDate { get; set; }

    public bool IsArchived { get; set; }
}