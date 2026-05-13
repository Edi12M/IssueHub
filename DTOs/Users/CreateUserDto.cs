namespace Backend.DTOs.Users
{
    public class CreateUserDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string Role { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
