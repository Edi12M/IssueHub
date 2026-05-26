using Backend.Enum;

namespace Backend.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string IssueCode { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        //UserId
        public int ReporterId { get; set; }
        //IssueId
        public int? ParentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string AcceptanceCriteria { get; set; } = string.Empty;
        public IssueType Type { get; set; }
        public IssueStatus Status { get; set; }
        public IssuePriority Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //Navigation
        public Project Project { get; set; } = null!;
        public User Reporter { get; set; } = null!;
        public Issue? Parent { get; set; }                         // self-referencing
        public ICollection<Issue> SubIssues { get; set; } = new List<Issue>();   // self-referencing
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<IssueAssignment> Assignments { get; set; } = new List<IssueAssignment>();
        public ICollection<IssueDependency> Dependencies { get; set; } = new List<IssueDependency>();
        public ICollection<IssueHistory> History { get; set; } = new List<IssueHistory>();
        public ICollection<TimeLog> TimeLogs { get; set; } = new List<TimeLog>();
        public ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();

    }
}
