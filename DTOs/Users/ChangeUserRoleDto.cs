using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Users;

public class ChangeUserRoleDto
{
    [Required]
    public UserRole Role { get; set; }
}