using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.Users;

public class UpdateUserDto
{
    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public UserRole Role { get; set; }

    [Required]
    public UserStatus Status { get; set; }
}