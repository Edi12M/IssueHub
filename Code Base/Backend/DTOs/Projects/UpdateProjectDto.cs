namespace Backend.DTOs.Projects
{
    public class UpdateProjectDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Goals { get; set; }
        public string? Methodology { get; set; }
        public string? Type { get; set; }
        public string? Visibility { get; set; }
        public string? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? BudgetHours { get; set; }
    }
}
