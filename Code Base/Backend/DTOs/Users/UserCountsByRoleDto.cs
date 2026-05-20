namespace Backend.DTOs.Users
{
    public class UserCountsByRoleDto
    {
        public int Total { get; set; }
        public int Admin { get; set; }
        public int Manager { get; set; }
        public int Developer { get; set; }
    }
}
