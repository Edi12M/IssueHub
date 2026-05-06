using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class HistoryService
    {
        public Task RecordStatusChange(int issueId, int actorId, IssueStatus oldStatus, IssueStatus newStatus, string note)
            => throw new NotImplementedException();

        public Task<List<IssueHistory>> GetIssueHistory(int issueId)
            => throw new NotImplementedException();

        public Task<List<IssueHistory>> QueryActivityLogs(int issueId)
            => throw new NotImplementedException();

        public List<IssueHistory> FormatHistoryEntries(List<IssueHistory> entries, string userTimezone)
            => throw new NotImplementedException();
    }
}
