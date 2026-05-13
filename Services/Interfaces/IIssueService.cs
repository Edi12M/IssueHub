using Backend.DTOs.Issues;

namespace Backend.Services.Interfaces
{
    public interface IIssueService
    {
        Task<IssueResponseDto> CreateIssueAsync(CreateIssueDto dto);
        Task<IssueResponseDto> UpdateIssueAsync(int issueId, UpdateIssueDto dto);
        Task<IssueHistoryResponseDto> CreateIssueHistoryAsync(CreateIssueHistoryDto dto);
        Task<int> GetAllIssuesCountAsync();
        Task<List<IssueByAdminDto>> GetIssuesByAdminAsync(int adminId);
        Task<List<IssueByAdminDto>> GetIssuesByAdminFilteredByTypeAsync(int adminId, string type);
        Task<LastSecurityIssueDto?> GetLastCreatedSecurityIssueAsync();
        Task<List<TaskDto>> GetTasksFilteredAsync(int userId, string? status, string? priority);
    }
}
