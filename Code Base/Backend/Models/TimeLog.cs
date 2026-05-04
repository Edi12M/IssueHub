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
        public string Note { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
