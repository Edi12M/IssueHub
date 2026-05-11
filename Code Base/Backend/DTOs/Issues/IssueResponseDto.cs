using Backend.Enum;

namespace Backend.DTOs.Issues;

public class IssueResponseDto
{
    public int Id { get; set; }

    public string IssueCode { get; set; } = string.Empty;

    public int ProjectId { get; set; }

    public string? ProjectName { get; set; }

    public int ReporterId { get; set; }

    public string? ReporterName { get; set; }

    public int? ParentId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string AcceptanceCriteria { get; set; } = string.Empty;

    public IssueType Type { get; set; }

    public IssueStatus Status { get; set; }

    public IssuePriority Priority { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime DueDate { get; set; }

    public bool IsArchived { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public List<int> AssigneeIds { get; set; } = new();

    public List<string> AssigneeNames { get; set; } = new();
}