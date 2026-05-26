using Backend.DTOs.Projects;

namespace Backend.Services.Interfaces
{
    public interface IProjectService
    {
        Task<List<ProjectSearchResultDto>> SearchProjectsAsync(string query);
        Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto dto);
        Task<ProjectResponseDto> UpdateProjectAsync(int projectId, UpdateProjectDto dto);
        Task<ProjectResponseDto> UpdateProjectStatusAsync(int projectId, string status);
        Task<ProjectResponseDto> ArchiveProjectAsync(int projectId);
        Task<List<ProjectResponseDto>> GetProjectsByStatusAsync(string status);
        Task<List<ProjectByManagerDto>> GetProjectsByManagerAsync(int managerId);
        Task<List<ProjectByManagerDto>> GetProjectsByManagerFilteredAsync(int managerId, string? status, string? type);
        Task<ProjectStatusCountsDto> GetProjectCountsByStatusAsync();
        Task<LastCreatedProjectDto?> GetLastCreatedProjectAsync();
        Task<int> GetMemberCountAsync(int projectId);
        Task<int> GetOpenIssueCountAsync(int projectId);
        Task<int> GetClosedIssueCountAsync(int projectId);
        Task<decimal> GetBudgetUsedAsync(int projectId);
        Task<ProjectAnalyticsDto> GetProjectAnalyticsAsync(int projectId);
    }
}
