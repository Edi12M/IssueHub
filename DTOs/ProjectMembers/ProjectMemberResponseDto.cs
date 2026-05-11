using Backend.Enum;

namespace Backend.DTOs.ProjectMembers;

public class ProjectMemberResponseDto
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = string.Empty;

    public int UserId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public ProjectMemberRole Role { get; set; }

    public DateTime JoinedAt { get; set; }
}