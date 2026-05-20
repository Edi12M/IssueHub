namespace Backend.DTOs.Projects
{
    public class ProjectByManagerDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Methodology { get; set; } = string.Empty;
        public int MemberCount { get; set; }
    }
}
