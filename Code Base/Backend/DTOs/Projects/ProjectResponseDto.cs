namespace Backend.DTOs.Projects
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ProjectCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Goals { get; set; }
        public string Methodology { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Visibility { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal BudgetHours { get; set; }
        public int OwnerId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
