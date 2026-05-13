namespace Backend.DTOs.Projects
{
    public class CreateProjectDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Goals { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int OwnerId { get; set; }
        public int WorkflowId { get; set; }
        public string? ProjectCode { get; set; }
        public string? Type { get; set; }
        public string? Visibility { get; set; }
        public string? Methodology { get; set; }
        public decimal? BudgetHours { get; set; }
    }
}
