using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Issues
{
    public class CreateIssueHistoryDto
    {
        [Range(1, int.MaxValue)]
        public int IssueId { get; set; }

        [Range(1, int.MaxValue)]
        public int ActorId { get; set; }

        [Required, StringLength(100)]
        public string FieldName { get; set; } = string.Empty;

        [StringLength(500)]
        public string OldValue { get; set; } = string.Empty;

        [StringLength(500)]
        public string NewValue { get; set; } = string.Empty;

        [StringLength(500)]
        public string TransitionNote { get; set; } = string.Empty;
    }
}
