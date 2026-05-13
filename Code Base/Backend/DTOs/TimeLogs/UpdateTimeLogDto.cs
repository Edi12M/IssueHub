using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.TimeLogs;

public class UpdateTimeLogDto
{
    [Range(0.1, 24)]
    public decimal Hours { get; set; }

    public bool IsBillable { get; set; }

    [Required]
    public DateTime LogDate { get; set; }

    public string Note { get; set; } = string.Empty;
}