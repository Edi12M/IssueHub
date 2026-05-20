using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs.Comments
{
    public class UpdateCommentDto
    {
        [Required, StringLength(5000, MinimumLength = 1)]
        public string Body { get; set; } = string.Empty;
    }
}
