using Backend.Data;
using Backend.DTOs.Auth;
using Backend.DTOs.Users;
using Backend.Enum;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower());

        if (user == null)
            return Unauthorized("Invalid email or password.");

        if (user.Status == UserStatus.Inactive || user.Status == UserStatus.Suspended)
            return Unauthorized("This account is not active.");

        if (user.LockedUntil > DateTime.UtcNow)
            return Unauthorized($"Account is locked until {user.LockedUntil:u}.");

        var hashedInput = SimpleHash(dto.Password);

        if (user.PasswordHash != hashedInput)
        {
            user.FailedLoginAttempts++;

            if (user.FailedLoginAttempts >= 5)
            {
                user.LockedUntil = DateTime.UtcNow.AddMinutes(15);
            }

            await _context.SaveChangesAsync();

            return Unauthorized("Invalid email or password.");
        }

        user.FailedLoginAttempts = 0;
        user.LockedUntil = DateTime.MinValue;
        user.LastLoginAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var response = new LoginResponseDto
        {
            Message = "Login successful.",
            User = ToUserResponseDto(user)
        };

        return Ok(response);
    }

    private static UserResponseDto ToUserResponseDto(User user)
    {
        return new UserResponseDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreateAt,
            LastLoginAt = user.LastLoginAt
        };
    }

    // Simplified password hashing for university project/demo.
    // In a real product, replace this with BCrypt/ASP.NET Identity.
    private static string SimpleHash(string password)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
    }
}