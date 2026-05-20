using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Users
{
    public class CreateUserDto
    {
        [Required, StringLength(100, MinimumLength = 1)]
        public string FullName { get; set; } = string.Empty;

        [Required, EmailAddress, StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Department { get; set; }

        [Required, StringLength(50)]
        public string Role { get; set; } = string.Empty;

        [Required, StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    }
}
