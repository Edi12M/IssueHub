using Backend.DTOs.Issues;

namespace Backend.Services.Interfaces
{
    public interface IIssueService
    {
        Task<IssueResponseDto> CreateIssueAsync(CreateIssueDto dto);
        Task<IssueResponseDto> UpdateIssueAsync(int issueId, UpdateIssueDto dto, int actorId);
        Task<IssueDetailDto> GetIssueByIdForUserAsync(int issueId);
        Task<IssueHistoryResponseDto> CreateIssueHistoryAsync(CreateIssueHistoryDto dto);
        Task<int> GetAllIssuesCountAsync();
        Task<List<IssueByAdminDto>> GetIssuesByAdminAsync(int adminId);
        Task<List<IssueByAdminDto>> GetIssuesByAdminFilteredByTypeAsync(int adminId, string type);
        Task<LastSecurityIssueDto?> GetLastCreatedSecurityIssueAsync();
        Task<List<TaskDto>> GetTasksFilteredAsync(int userId, string? status, string? priority);
        Task<List<TaskDto>> GetIssuesByProjectAsync(int projectId, string? status, string? priority, string? assigneeId, string? type);
        Task<UserWorkloadDto> GetUserWorkloadAsync(int userId, int projectId);
        Task<List<IssueDependencyDto>> GetIssueDependenciesAsync(int issueId);
        Task<IssueDependencyDto> AddIssueDependencyAsync(int fromIssueId, int toIssueId, string dependencyType);
    }
}
