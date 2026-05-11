using Backend.Data;
using Backend.DTOs.Users;
using Backend.Enum;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<List<UserResponseDto>>> GetUsers()
    {
        var users = await _context.Users
            .OrderByDescending(u => u.CreateAt)
            .Select(u => ToResponseDto(u))
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/users/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserResponseDto>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound("User not found.");

        return Ok(ToResponseDto(user));
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserResponseDto>> CreateUser(CreateUserDto dto)
    {
        var emailExists = await _context.Users
            .AnyAsync(u => u.Email.ToLower() == dto.Email.ToLower());

        if (emailExists)
            return BadRequest("A user with this email already exists.");

        var user = new User
        {
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim(),
            PasswordHash = SimpleHash(dto.Password),
            Role = dto.Role,
            Status = UserStatus.PendingVerification,
            FailedLoginAttempts = 0,
            LockedUntil = DateTime.MinValue,
            LastLoginAt = DateTime.MinValue,
            CreateAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var response = ToResponseDto(user);

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, response);
    }

    // PUT: api/users/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<UserResponseDto>> UpdateUser(int id, UpdateUserDto dto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound("User not found.");

        var emailTaken = await _context.Users
            .AnyAsync(u => u.Id != id && u.Email.ToLower() == dto.Email.ToLower());

        if (emailTaken)
            return BadRequest("Another user already uses this email.");

        user.FullName = dto.FullName.Trim();
        user.Email = dto.Email.Trim();
        user.Role = dto.Role;
        user.Status = dto.Status;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(user));
    }

    // PATCH: api/users/5/role
    [HttpPatch("{id:int}/role")]
    public async Task<ActionResult<UserResponseDto>> ChangeUserRole(int id, ChangeUserRoleDto dto)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound("User not found.");

        user.Role = dto.Role;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(user));
    }

    // PATCH: api/users/5/deactivate
    [HttpPatch("{id:int}/deactivate")]
    public async Task<ActionResult<UserResponseDto>> DeactivateUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound("User not found.");

        user.Status = UserStatus.Inactive;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(user));
    }

    // DELETE: api/users/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound("User not found.");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static UserResponseDto ToResponseDto(User user)
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