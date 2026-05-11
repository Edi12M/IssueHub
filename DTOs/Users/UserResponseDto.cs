using Backend.Enum;

namespace Backend.DTOs.Users;

public class UserResponseDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public UserStatus Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime LastLoginAt { get; set; }
}