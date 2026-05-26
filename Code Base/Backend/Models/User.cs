using Backend.Enum;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? Icon { get; set; }
        public UserRole Role { get; set; }
        public UserStatus Status { get; set; }
        public int FailedLoginAttempts { get; set; }
        public DateTime? LockedUntil { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public DateTime CreatedAt { get; set; }

        //Navigation
        public ICollection<ProjectMembers> ProjectMembers { get; set; } = new List<ProjectMembers>();
        public ICollection<Project> OwnedProjects { get; set; } = new List<Project>();
        public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();
        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
        public ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();
        public ICollection<TimeLog> TimeLogs { get; set; } = new List<TimeLog>();
        public ICollection<IssueAssignment> IssueAssignments { get; set; } = new List<IssueAssignment>();
    }
}
