namespace Backend.Models
{
    public class TimeLog
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int UserId { get; set; }
        public decimal Hours { get; set; }
        public bool IsBillable { get; set; }
        public DateTime LogDate { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
