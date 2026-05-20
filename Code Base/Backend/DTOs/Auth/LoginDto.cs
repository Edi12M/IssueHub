using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Auth
{
    public class LoginDto
    {
        [Required, EmailAddress, StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(100, MinimumLength = 1)]
        public string Password { get; set; } = string.Empty;
    }
}
