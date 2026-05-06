using Backend.Models;

namespace Backend.Services
{
    public class SearchService
    {
        public Task<List<Issue>> SearchIssuesByKeyword(string keyword, List<int> projectIds)
            => throw new NotImplementedException();

        public Task<Issue?> FetchIssueById(int issueId)
            => throw new NotImplementedException();
    }
}
