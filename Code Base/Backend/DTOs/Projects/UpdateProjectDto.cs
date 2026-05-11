using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Projects;

public class UpdateProjectDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public ProjectType Type { get; set; }

    [Required]
    public Visibility Visibility { get; set; }

    // NOTE: Project model currently uses UserStatus for project status.
    [Required]
    public UserStatus Status { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    [Range(0, 100000)]
    public decimal BudgetHours { get; set; }

    [Required]
    public int OwnerId { get; set; }

    [Required]
    public int WorkflowId { get; set; }

    public bool IsArchived { get; set; }
}