using Backend.Enum;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public Status Status { get; set; }
        public int FailedLoginAttempts { get; set; }
        public DateTime LockedUntil { get; set; }
        public DateTime LastLoginAt { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
