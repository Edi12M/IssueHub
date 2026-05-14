namespace Backend.DTOs.TimeLogs
{
    public class CreateTimeLogDto
    {
        public int IssueId { get; set; }
        public int UserId { get; set; }
        public decimal Hours { get; set; }
        public bool IsBillable { get; set; }
        public DateTime LogDate { get; set; }
        public string Note { get; set; }
    }
}
