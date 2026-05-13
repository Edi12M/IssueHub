using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Comments;

public class UpdateCommentDto
{
    [Required]
    public string Body { get; set; } = string.Empty;
}