namespace Backend.DTOs.Projects
{
    public class ProjectSearchResultDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string ManagerName { get; set; } = string.Empty;
        public int TeamSize { get; set; }
        public DateTime Deadline { get; set; }
        public int OpenIssueCount { get; set; }
        public int CompletedIssueCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Type { get; set; } = string.Empty;
        public decimal BudgetUsed { get; set; }
    }
}
