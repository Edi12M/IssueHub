using Backend.Enum;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProjectCode { get; set; }
        public string Description { get; set; }
        public ProjectType Type { get; set; }
        public Visibility Visibility { get; set; }
        public UserStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsArchived { get; set; }
        public decimal BudgetHours { get; set; }
        public int OwnerId { get; set; }
        public int WorkflowId { get; set; }
        public DateTime CreateAt { get; set; }

    }
}
