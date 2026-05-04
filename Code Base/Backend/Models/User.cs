using Backend.Enum;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }
        public int FailedLoginAttempts { get; set; }
        public DateTime LockedUntil { get; set; }
        public DateTime LastLoginAt { get; set; }
        public DateTime CreateAt { get; set; }

        //Navigation
        public ICollection<ProjectMembers> ProjectMembers { get; set; }
        public ICollection<Project> OwnedProjects { get; set; }
        public ICollection<Announcement> Announcements { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Meeting> Meetings { get; set; }
        public ICollection<Notification> Notifications { get; set; }
        public ICollection<Attachment> Attachments { get; set; }
        public ICollection<TimeLog> TimeLogs { get; set; }
        public ICollection<IssueAssignment> IssueAssignments { get; set; }
    }
}
