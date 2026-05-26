namespace Backend.DTOs.Users
{
    public class UserSearchResultDto
    {
        public int Id { get; set; }
        public string? Icon { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
