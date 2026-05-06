using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class IssueService
    {
        public Task<Issue?> GetIssueById(int id)
            => throw new NotImplementedException();

        public Task<List<Issue>> GetIssuesForDeveloper(int userId)
            => throw new NotImplementedException();

        public Task<List<Issue>> GetIssuesForProject(int projectId)
            => throw new NotImplementedException();

        public Task<List<Issue>> GetAllSystemIssues()
            => throw new NotImplementedException();

        public Task<List<Issue>> GetSystemLevelIssues()
            => throw new NotImplementedException();

        public Task UpdateIssueStatus(int issueId, IssueStatus newStatus, string transitionNote)
            => throw new NotImplementedException();

        public Task ResolveIssue(int issueId, string resolutionNotes)
            => throw new NotImplementedException();

        public Task<Issue?> FetchIssueWithComments(int issueId)
            => throw new NotImplementedException();

        public Task<Issue?> FetchIssueWithAttachments(int issueId)
            => throw new NotImplementedException();
    }
}
