using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.ProjectMembers;

public class AddProjectMemberDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public ProjectMemberRole Role { get; set; }
}