using Backend.DTOs.Users;

namespace Backend.DTOs.Auth;

public class LoginResponseDto
{
    public string Message { get; set; } = string.Empty;

    public UserResponseDto User { get; set; } = new();
}