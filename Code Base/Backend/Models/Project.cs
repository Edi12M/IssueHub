using Backend.Enum;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProjectCode { get; set; }
        public string Description { get; set; }
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
        public User Owner { get; set; }
        public ICollection<ProjectMembers> ProjectMembers { get; set; }
        public ICollection<Issue> Issues { get; set; }
        public ICollection<Announcement> Announcements { get; set; }
        public ICollection<Meeting> Meetings { get; set; }

    }
}
