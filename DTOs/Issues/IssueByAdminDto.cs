namespace Backend.DTOs.Issues
{
    public class IssueByAdminDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Target { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public DateTime? DateAssigned { get; set; }
    }
}
