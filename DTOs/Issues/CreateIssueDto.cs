namespace Backend.DTOs.Issues
{
    public class CreateIssueDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string AcceptanceCriteria { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public int ProjectId { get; set; }
        public int ReporterId { get; set; }
        public string? IssueCode { get; set; }
        public List<int>? DependentIssueIds { get; set; }
    }
}
