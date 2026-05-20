namespace Backend.DTOs.TimeLogs
{
    public class TimeLogResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public string IssueTitle { get; set; } = string.Empty;
        public int UserId { get; set; }
        public string UserFullName { get; set; } = string.Empty;
        public decimal Hours { get; set; }
        public bool IsBillable { get; set; }
        public DateTime LogDate { get; set; }
        public string Note { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
