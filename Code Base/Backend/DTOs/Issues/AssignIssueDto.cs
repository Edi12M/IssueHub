using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Issues;

public class AssignIssueDto
{
    [Required]
    public List<int> UserIds { get; set; } = new();

    public int ActorId { get; set; }

    public string Note { get; set; } = string.Empty;
}