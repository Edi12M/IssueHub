using Backend.DTOs.Attachments;
using Backend.DTOs.Comments;

namespace Backend.DTOs.Issues
{
    public class IssueDetailDto
    {
        public int Id { get; set; }
        public string IssueCode { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public int ReporterId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string AcceptanceCriteria { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public List<CommentResponseDto> Comments { get; set; } = new();
        public List<AttachmentResponseDto> Attachments { get; set; } = new();
    }
}
