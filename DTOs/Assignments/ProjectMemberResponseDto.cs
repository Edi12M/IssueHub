namespace Backend.DTOs.Assignments
{
    public class ProjectMemberResponseDto
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string Role { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
        public decimal HourlyRate { get; set; }
    }
}
