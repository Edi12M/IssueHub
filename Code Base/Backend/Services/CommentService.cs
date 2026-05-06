using Backend.Models;

namespace Backend.Services
{
    public class CommentService
    {
        public Task<List<Comment>> FetchCommentsForIssue(int issueId)
            => throw new NotImplementedException();

        public Task<Comment> SaveComment(int issueId, int authorId, string body)
            => throw new NotImplementedException();

        public Task<Comment> UpdateComment(int commentId, string body)
            => throw new NotImplementedException();

        public Task DeleteComment(int commentId)
            => throw new NotImplementedException();

        public Task<bool> VerifyCommentOwnership(int commentId, int userId)
            => throw new NotImplementedException();

        public Task<bool> CheckForReplies(int commentId)
            => throw new NotImplementedException();
    }
}
