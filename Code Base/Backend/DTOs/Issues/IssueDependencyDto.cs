namespace Backend.DTOs.Issues
{
    public class IssueDependencyDto
    {
        public int Id { get; set; }
        public int FromIssueId { get; set; }
        public int ToIssueId { get; set; }
        public string DependencyType { get; set; } = string.Empty;
    }

    public class AddIssueDependencyDto
    {
        public int ToIssueId { get; set; }
        public string DependencyType { get; set; } = string.Empty;
    }
}
