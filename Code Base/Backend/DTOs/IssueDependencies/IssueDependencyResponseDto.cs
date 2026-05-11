using Backend.Enum;

namespace Backend.DTOs.IssueDependencies;

public class IssueDependencyResponseDto
{
    public int Id { get; set; }

    public int IssueId { get; set; }

    public string? IssueTitle { get; set; }

    public int DependsOnId { get; set; }

    public string? DependsOnTitle { get; set; }

    public IssueDependencyType Type { get; set; }

    public DateTime CreatedAt { get; set; }
}