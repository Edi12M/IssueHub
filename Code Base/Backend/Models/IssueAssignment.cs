namespace Backend.Models
{
    public class IssueAssignment
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int UserId { get; set; }
        public DateTime AssignedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; } = null!;
        public User User { get; set; } = null!;

    }
}
