using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Comments
{
    public class CreateCommentDto
    {
        [Range(1, int.MaxValue)]
        public int IssueId { get; set; }

        public int? ParentId { get; set; }

        [Required, StringLength(5000, MinimumLength = 1)]
        public string Body { get; set; } = string.Empty;
    }
}
