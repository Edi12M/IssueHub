namespace Backend.DTOs.Assignments
{
    public class IssueAssignmentResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int UserId { get; set; }
        public DateTime AssignedAt { get; set; }
    }
}
