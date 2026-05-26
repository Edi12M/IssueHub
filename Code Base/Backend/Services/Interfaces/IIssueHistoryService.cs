using Backend.DTOs.Issues;

namespace Backend.Services.Interfaces
{
    public interface IIssueHistoryService
    {
        Task<List<IssueHistoryResponseDto>> GetHistoryForIssueAsync(int issueId);
        Task<List<IssueHistoryResponseDto>> GetHistoryForUserAsync(int userId);
    }
}
