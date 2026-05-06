using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class BoardService
    {
        public Task<Dictionary<IssueStatus, List<Issue>>> FetchBoardStructure(int projectId)
            => throw new NotImplementedException();

        public Task<bool> ValidateStatusChange(int taskId, IssueStatus newStatus)
            => throw new NotImplementedException();

        public Task BroadcastUpdate(string channel, object payload)
            => throw new NotImplementedException();
    }
}
