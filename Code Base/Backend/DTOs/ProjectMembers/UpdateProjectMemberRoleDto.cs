using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.ProjectMembers;

public class UpdateProjectMemberRoleDto
{
    [Required]
    public ProjectMemberRole Role { get; set; }
}