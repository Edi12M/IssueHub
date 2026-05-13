namespace Backend.DTOs.Issues
{
    public class IssueHistoryResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int ActorId { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public string OldValue { get; set; } = string.Empty;
        public string NewValue { get; set; } = string.Empty;
        public string TransitionNote { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
