using Backend.DTOs.Assignments;

namespace Backend.Services.Interfaces
{
    public interface IAssignmentService
    {
        Task<IssueAssignmentResponseDto> AssignIssueToUserAsync(int issueId, int userId);
        Task<ProjectMemberResponseDto> AssignUserToProjectAsync(int projectId, int userId);
    }
}
