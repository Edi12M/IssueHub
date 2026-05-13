namespace Backend.DTOs.Issues
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string IssueCode { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
    }
}
