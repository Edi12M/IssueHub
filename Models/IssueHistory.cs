namespace Backend.Models
{
    public class IssueHistory
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        // UserId
        public int ActorId { get; set; }
        public string FieldName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public string TransitionNote { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
