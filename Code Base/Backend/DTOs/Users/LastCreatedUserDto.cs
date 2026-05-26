namespace Backend.DTOs.Users
{
    public class LastCreatedUserDto
    {
        public string FullName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
