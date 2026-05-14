using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Issues
{
    public class UpdateIssueDto
    {
        [StringLength(200, MinimumLength = 1)]
        public string? Title { get; set; }

        [StringLength(5000)]
        public string? Description { get; set; }

        [StringLength(5000)]
        public string? AcceptanceCriteria { get; set; }

        [StringLength(50)]
        public string? Type { get; set; }

        [StringLength(50)]
        public string? Status { get; set; }

        [StringLength(50)]
        public string? Priority { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
