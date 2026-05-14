using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Projects
{
    public class CreateProjectDto
    {
        [Required, StringLength(150, MinimumLength = 1)]
        public string Name { get; set; } = string.Empty;

        [Required, StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [StringLength(2000)]
        public string? Goals { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Range(1, int.MaxValue)]
        public int OwnerId { get; set; }

        [StringLength(50)]
        public string? ProjectCode { get; set; }

        [StringLength(50)]
        public string? Type { get; set; }

        [StringLength(50)]
        public string? Visibility { get; set; }

        [StringLength(50)]
        public string? Methodology { get; set; }

        [Range(0, 1_000_000)]
        public decimal? BudgetHours { get; set; }
    }
}
