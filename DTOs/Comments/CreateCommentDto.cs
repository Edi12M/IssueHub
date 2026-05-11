using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Comments;

public class CreateCommentDto
{
    [Required]
    public int AuthorId { get; set; }

    public int? ParentId { get; set; }

    [Required]
    public string Body { get; set; } = string.Empty;
}