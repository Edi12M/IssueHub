using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Workflows;

public class UpdateWorkflowDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;
}