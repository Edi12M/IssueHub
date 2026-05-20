namespace Backend.DTOs.Comments
{
    public class CommentResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public string Body { get; set; } = string.Empty;
        public bool IsEdited { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
