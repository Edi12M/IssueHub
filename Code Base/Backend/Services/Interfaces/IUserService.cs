using Backend.DTOs.Users;

namespace Backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<UserSearchResultDto>> SearchUsersAsync(string query);
        Task<UserResponseDto> CreateUserAsync(CreateUserDto dto);
        Task<UserResponseDto> UpdateUserAsync(int userId, UpdateUserDto dto);
        Task DeleteUserAsync(int userId);
        Task<UserCountsByRoleDto> GetUserCountsByRoleAsync();
        Task<LastCreatedUserDto?> GetLastCreatedUserAsync();
    }
}
