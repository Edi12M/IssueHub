using Backend.Enum;

namespace Backend.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string IssueCode { get; set; }
        public int ProjectId { get; set; }
        //UserId
        public int ReporterId { get; set; }
        //IssueId
        public int ParentId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AcceptanceCriteria { get; set; }
        public IssueType Type { get; set; }
        public IssueStatus Status { get; set; }
        public IssuePriority Priority { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
