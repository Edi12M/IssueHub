using Backend.DTOs.Auth;

namespace Backend.Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDto> LoginAsync(LoginDto dto);
        Task IncrementFailedLoginAttemptAsync(string email);
        Task UpdateLastLoginAsync(int userId);
    }
}
