using Backend.DTOs.Comments;

namespace Backend.Services.Interfaces
{
    public interface ICommentService
    {
        Task<CommentResponseDto> CreateCommentAsync(CreateCommentDto dto, int authorId);
        Task<CommentResponseDto> GetCommentAsync(int commentId);
        Task<CommentResponseDto> UpdateCommentAsync(int commentId, UpdateCommentDto dto, int actorId);
        Task DeleteCommentAsync(int commentId, int actorId);
        Task<List<CommentResponseDto>> GetCommentsForIssueAsync(int issueId);
    }
}
