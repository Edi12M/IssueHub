namespace Backend.Models
{
    public class IssueHistory
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        // UserId
        public int ActorId { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public string OldValue { get; set; } = string.Empty;
        public string NewValue { get; set; } = string.Empty;
        public string TransitionNote { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; } = null!;
    }
}
