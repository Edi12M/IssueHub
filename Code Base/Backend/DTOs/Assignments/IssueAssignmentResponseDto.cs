namespace Backend.DTOs.Assignments
{
    public class IssueAssignmentResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public string IssueTitle { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string UserFullName { get; set; } = string.Empty;
        public DateTime AssignedAt { get; set; }
    }
}