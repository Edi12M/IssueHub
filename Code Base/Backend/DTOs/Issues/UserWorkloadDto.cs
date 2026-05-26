namespace Backend.DTOs.Issues
{
    public class UserWorkloadDto
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int AssignedCount { get; set; }
        public int OpenCount { get; set; }
        public int CompletedCount { get; set; }
        public int OverdueCount { get; set; }
    }
}
