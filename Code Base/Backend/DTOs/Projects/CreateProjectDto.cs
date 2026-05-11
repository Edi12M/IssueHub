using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Projects;

public class CreateProjectDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string ProjectCode { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public ProjectType Type { get; set; }

    [Required]
    public Visibility Visibility { get; set; }

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
}