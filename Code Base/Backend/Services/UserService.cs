using Backend.Data;
using Backend.DTOs.Users;
using Backend.Enum;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserSearchResultDto>> SearchUsersAsync(string query)
        {
            var q = (query ?? string.Empty).ToLower();

            var users = await _context.Users
                .Where(u => u.FullName.ToLower().Contains(q) || u.Email.ToLower().Contains(q))
                .ToListAsync();

            return users.Select(MapToSearchResultDto).ToList();
        }

        public async Task<UserResponseDto> CreateUserAsync(CreateUserDto dto)
        {
            var emailExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (emailExists)
                throw new InvalidOperationException($"A user with email '{dto.Email}' already exists.");

            if (!System.Enum.TryParse<UserRole>(dto.Role, true, out var role))
                throw new InvalidOperationException($"Invalid role '{dto.Role}'.");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                Department = dto.Department,
                Role = role,
                Status = UserStatus.Active,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return MapToResponseDto(user);
        }

        public async Task<UserResponseDto> UpdateUserAsync(int userId, UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(userId)
                ?? throw new KeyNotFoundException($"User {userId} not found.");

            if (dto.FullName != null)
                user.FullName = dto.FullName;

            if (dto.Email != null && dto.Email != user.Email)
            {
                var emailTaken = await _context.Users.AnyAsync(u => u.Email == dto.Email && u.Id != userId);
                if (emailTaken)
                    throw new InvalidOperationException($"A user with email '{dto.Email}' already exists.");
                user.Email = dto.Email;
            }

            if (dto.Department != null)
                user.Department = dto.Department;

            if (dto.Role != null)
            {
                if (!System.Enum.TryParse<UserRole>(dto.Role, true, out var role))
                    throw new InvalidOperationException($"Invalid role '{dto.Role}'.");
                user.Role = role;
            }

            if (dto.Status != null)
            {
                if (!System.Enum.TryParse<UserStatus>(dto.Status, true, out var status))
                    throw new InvalidOperationException($"Invalid status '{dto.Status}'.");
                user.Status = status;
            }

            await _context.SaveChangesAsync();
            return MapToResponseDto(user);
        }

        public async Task DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId)
                ?? throw new KeyNotFoundException($"User {userId} not found.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<UserCountsByRoleDto> GetUserCountsByRoleAsync()
        {
            var counts = await _context.Users
                .GroupBy(u => u.Role)
                .Select(g => new { Role = g.Key, Count = g.Count() })
                .ToListAsync();

            return new UserCountsByRoleDto
            {
                Total = counts.Sum(c => c.Count),
                Admin = counts.FirstOrDefault(c => c.Role == UserRole.Admin)?.Count ?? 0,
                Manager = counts.FirstOrDefault(c => c.Role == UserRole.Manager)?.Count ?? 0,
                Developer = counts.FirstOrDefault(c => c.Role == UserRole.Developer)?.Count ?? 0
            };
        }

        public async Task<LastCreatedUserDto?> GetLastCreatedUserAsync()
        {
            var user = await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .FirstOrDefaultAsync();

            if (user == null) return null;

            return new LastCreatedUserDto
            {
                FullName = user.FullName,
                CreatedAt = user.CreatedAt
            };
        }

        private static UserSearchResultDto MapToSearchResultDto(User user) => new()
        {
            Id = user.Id,
            Icon = user.Icon,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role.ToString(),
            Status = user.Status.ToString()
        };

        private static UserResponseDto MapToResponseDto(User user) => new()
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Department = user.Department,
            Icon = user.Icon,
            Role = user.Role.ToString(),
            Status = user.Status.ToString(),
            CreatedAt = user.CreatedAt
        };
    }
}
