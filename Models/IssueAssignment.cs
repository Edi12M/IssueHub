namespace Backend.Models
{
    public class IssueAssignment
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int UserId { get; set; }
        public DateTime AssignedAt { get; set; }

        public Issue Issue { get; set; }
        public User User { get; set; }
    }
}
