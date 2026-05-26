using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Issues
{
    public class CreateIssueDto
    {
        [Required, StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [Required, StringLength(5000)]
        public string Description { get; set; } = string.Empty;

        [StringLength(5000)]
        public string AcceptanceCriteria { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Type { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Priority { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }

        [Range(1, int.MaxValue)]
        public int ProjectId { get; set; }

        [Range(1, int.MaxValue)]
        public int ReporterId { get; set; }

        [StringLength(50)]
        public string? IssueCode { get; set; }

        public List<int>? DependentIssueIds { get; set; }
    }
}
