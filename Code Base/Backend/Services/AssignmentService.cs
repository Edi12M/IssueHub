using Backend.Data;
using Backend.DTOs.Assignments;
using Backend.Enum;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly AppDbContext _context;

        public AssignmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IssueAssignmentResponseDto> AssignIssueToUserAsync(int issueId, int userId)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);
            if (!issueExists)
                throw new KeyNotFoundException($"Issue {issueId} not found.");

            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
                throw new KeyNotFoundException($"User {userId} not found.");

            var duplicate = await _context.IssueAssignments
                .AnyAsync(a => a.IssueId == issueId && a.UserId == userId);
            if (duplicate)
                throw new InvalidOperationException($"User {userId} is already assigned to issue {issueId}.");

            var assignment = new IssueAssignment
            {
                IssueId = issueId,
                UserId = userId,
                AssignedAt = DateTime.UtcNow
            };

            _context.IssueAssignments.Add(assignment);
            await _context.SaveChangesAsync();

            return MapToIssueAssignmentDto(assignment);
        }

        public async Task<ProjectMemberResponseDto> AssignUserToProjectAsync(int projectId, int userId)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);
            if (!projectExists)
                throw new KeyNotFoundException($"Project {projectId} not found.");

            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
                throw new KeyNotFoundException($"User {userId} not found.");

            var duplicate = await _context.ProjectMembers
                .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);
            if (duplicate)
                throw new InvalidOperationException($"User {userId} is already a member of project {projectId}.");

            var member = new ProjectMembers
            {
                ProjectId = projectId,
                UserId = userId,
                Role = ProjectMemberRole.Developer,
                JoinedAt = DateTime.UtcNow,
                HourlyRate = 0m
            };

            _context.ProjectMembers.Add(member);
            await _context.SaveChangesAsync();

            return MapToProjectMemberDto(member);
        }

        private static IssueAssignmentResponseDto MapToIssueAssignmentDto(IssueAssignment a) => new()
        {
            Id = a.Id,
            IssueId = a.IssueId,
            UserId = a.UserId,
            AssignedAt = a.AssignedAt
        };

        private static ProjectMemberResponseDto MapToProjectMemberDto(ProjectMembers pm) => new()
        {
            Id = pm.Id,
            ProjectId = pm.ProjectId,
            UserId = pm.UserId,
            Role = pm.Role.ToString(),
            JoinedAt = pm.JoinedAt,
            HourlyRate = pm.HourlyRate
        };
    }
}
