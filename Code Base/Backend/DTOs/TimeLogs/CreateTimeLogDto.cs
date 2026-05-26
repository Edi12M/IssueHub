using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.TimeLogs
{
    public class CreateTimeLogDto
    {
        [Range(1, int.MaxValue)]
        public int IssueId { get; set; }

        public int UserId { get; set; }

        [Range(typeof(decimal), "0.01", "9999.99")]
        public decimal Hours { get; set; }

        public bool IsBillable { get; set; }

        public DateTime LogDate { get; set; }

        [StringLength(1000)]
        public string Note { get; set; } = string.Empty;
    }
}
