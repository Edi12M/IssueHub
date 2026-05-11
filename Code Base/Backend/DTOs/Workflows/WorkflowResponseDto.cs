namespace Backend.DTOs.Workflows;

public class WorkflowResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int CreatedById { get; set; }

    public string? CreatedByName { get; set; }

    public DateTime CreatedAt { get; set; }
}