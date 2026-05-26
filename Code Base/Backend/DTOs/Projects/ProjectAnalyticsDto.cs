namespace Backend.DTOs.Projects
{
    public class ProjectAnalyticsDto
    {
        public int ProjectId { get; set; }
        public int TotalIssues { get; set; }
        public int CompletedIssues { get; set; }
        public int OpenIssues { get; set; }
        public int InProgressIssues { get; set; }
        public int OverdueIssues { get; set; }
        public int AtRiskIssues { get; set; }
        public double TotalHoursLogged { get; set; }
        public decimal BudgetUsed { get; set; }
        public int TeamMembers { get; set; }
        public int CompletionPercentage { get; set; }
    }
}
