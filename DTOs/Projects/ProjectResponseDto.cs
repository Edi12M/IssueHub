using Backend.Enum;

namespace Backend.DTOs.Projects;

public class ProjectResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string ProjectCode { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public ProjectType Type { get; set; }

    public Visibility Visibility { get; set; }

    // NOTE: Project model currently uses UserStatus for project status.
    public UserStatus Status { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsArchived { get; set; }

    public decimal BudgetHours { get; set; }

    public int OwnerId { get; set; }

    public string? OwnerName { get; set; }

    public int WorkflowId { get; set; }

    public string? WorkflowName { get; set; }

    public DateTime CreatedAt { get; set; }

    public int MembersCount { get; set; }

    public int IssuesCount { get; set; }
}