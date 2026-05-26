using Backend.Enum;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ProjectCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Goals { get; set; }
        public string Methodology { get; set; } = "Scrum";
        public ProjectType Type { get; set; }
        public Visibility Visibility { get; set; }
        public ProjectStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal BudgetHours { get; set; }
        public int OwnerId { get; set; }
        public DateTime CreatedAt { get; set; }

        //Navigation
        public User Owner { get; set; } = null!;
        public ICollection<ProjectMembers> ProjectMembers { get; set; } = new List<ProjectMembers>();
        public ICollection<Issue> Issues { get; set; } = new List<Issue>();
        public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
        public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    }
}
