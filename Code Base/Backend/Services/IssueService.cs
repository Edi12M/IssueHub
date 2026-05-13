using Backend.Data;
using Backend.DTOs.Issues;
using Backend.Enum;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class IssueService : IIssueService
    {
        private readonly AppDbContext _context;

        public IssueService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IssueResponseDto> CreateIssueAsync(CreateIssueDto dto)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == dto.ProjectId);
            if (!projectExists)
                throw new KeyNotFoundException($"Project {dto.ProjectId} not found.");

            var reporterExists = await _context.Users.AnyAsync(u => u.Id == dto.ReporterId);
            if (!reporterExists)
                throw new KeyNotFoundException($"Reporter user {dto.ReporterId} not found.");

            if (!System.Enum.TryParse<IssueType>(dto.Type, true, out var type))
                throw new InvalidOperationException($"Invalid issue type '{dto.Type}'.");

            if (!System.Enum.TryParse<IssuePriority>(dto.Priority, true, out var priority))
                throw new InvalidOperationException($"Invalid priority '{dto.Priority}'.");

            var issueCode = string.IsNullOrWhiteSpace(dto.IssueCode)
                ? $"ISS-{Guid.NewGuid().ToString("N")[..8].ToUpper()}"
                : dto.IssueCode;

            if (await _context.Issues.AnyAsync(i => i.IssueCode == issueCode))
                throw new InvalidOperationException($"Issue code '{issueCode}' already exists.");

            var now = DateTime.UtcNow;
            var issue = new Issue
            {
                IssueCode = issueCode,
                ProjectId = dto.ProjectId,
                ReporterId = dto.ReporterId,
                Title = dto.Title,
                Description = dto.Description,
                AcceptanceCriteria = dto.AcceptanceCriteria,
                Type = type,
                Status = IssueStatus.Open,
                Priority = priority,
                StartDate = dto.StartDate,
                DueDate = dto.DueDate,
                IsArchived = false,
                CreatedAt = now,
                UpdatedAt = now
            };

            _context.Issues.Add(issue);
            await _context.SaveChangesAsync();

            if (dto.DependentIssueIds != null && dto.DependentIssueIds.Count > 0)
            {
                var dependents = await _context.Issues
                    .Where(i => dto.DependentIssueIds.Contains(i.Id))
                    .Select(i => i.Id)
                    .ToListAsync();

                foreach (var dependentId in dependents)
                {
                    _context.IssueDependencies.Add(new IssueDependency
                    {
                        IssueId = dependentId,
                        DependOnId = issue.Id,
                        Type = IssueDependencyType.IsBlockedBy,
                        CreatedAt = now
                    });
                }

                await _context.SaveChangesAsync();
            }

            return MapToResponseDto(issue);
        }

        public async Task<IssueResponseDto> UpdateIssueAsync(int issueId, UpdateIssueDto dto)
        {
            var issue = await _context.Issues.FindAsync(issueId)
                ?? throw new KeyNotFoundException($"Issue {issueId} not found.");

            if (dto.Title != null) issue.Title = dto.Title;
            if (dto.Description != null) issue.Description = dto.Description;
            if (dto.AcceptanceCriteria != null) issue.AcceptanceCriteria = dto.AcceptanceCriteria;
            if (dto.StartDate.HasValue) issue.StartDate = dto.StartDate.Value;
            if (dto.DueDate.HasValue) issue.DueDate = dto.DueDate.Value;

            if (dto.Type != null)
            {
                if (!System.Enum.TryParse<IssueType>(dto.Type, true, out var type))
                    throw new InvalidOperationException($"Invalid type '{dto.Type}'.");
                issue.Type = type;
            }
            if (dto.Status != null)
            {
                if (!System.Enum.TryParse<IssueStatus>(dto.Status, true, out var status))
                    throw new InvalidOperationException($"Invalid status '{dto.Status}'.");
                issue.Status = status;
            }
            if (dto.Priority != null)
            {
                if (!System.Enum.TryParse<IssuePriority>(dto.Priority, true, out var priority))
                    throw new InvalidOperationException($"Invalid priority '{dto.Priority}'.");
                issue.Priority = priority;
            }

            issue.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return MapToResponseDto(issue);
        }

        public async Task<IssueHistoryResponseDto> CreateIssueHistoryAsync(CreateIssueHistoryDto dto)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == dto.IssueId);
            if (!issueExists)
                throw new KeyNotFoundException($"Issue {dto.IssueId} not found.");

            var actorExists = await _context.Users.AnyAsync(u => u.Id == dto.ActorId);
            if (!actorExists)
                throw new KeyNotFoundException($"Actor user {dto.ActorId} not found.");

            var history = new IssueHistory
            {
                IssueId = dto.IssueId,
                ActorId = dto.ActorId,
                FieldName = dto.FieldName,
                OldValue = dto.OldValue,
                NewValue = dto.NewValue,
                TransitionNote = dto.TransitionNote,
                CreatedAt = DateTime.UtcNow
            };

            _context.IssueHistories.Add(history);
            await _context.SaveChangesAsync();

            return MapToHistoryDto(history);
        }

        public Task<int> GetAllIssuesCountAsync() => _context.Issues.CountAsync();

        public async Task<List<IssueByAdminDto>> GetIssuesByAdminAsync(int adminId)
        {
            return await GetIssuesByAdminQuery(adminId, null);
        }

        public async Task<List<IssueByAdminDto>> GetIssuesByAdminFilteredByTypeAsync(int adminId, string type)
        {
            if (!System.Enum.TryParse<IssueType>(type, true, out var parsedType))
                throw new InvalidOperationException($"Invalid issue type '{type}'.");

            return await GetIssuesByAdminQuery(adminId, parsedType);
        }

        public async Task<LastSecurityIssueDto?> GetLastCreatedSecurityIssueAsync()
        {
            var result = await _context.Issues
                .Include(i => i.Reporter)
                .Where(i => i.Type == IssueType.Security)
                .OrderByDescending(i => i.CreatedAt)
                .FirstOrDefaultAsync();

            if (result == null) return null;

            return new LastSecurityIssueDto
            {
                Title = result.Title,
                CreatorName = result.Reporter?.FullName ?? string.Empty
            };
        }

        public async Task<List<TaskDto>> GetTasksFilteredAsync(int userId, string? status, string? priority)
        {
            var projectIds = await _context.ProjectMembers
                .Where(pm => pm.UserId == userId &&
                             (pm.Role == ProjectMemberRole.Developer || pm.Role == ProjectMemberRole.Admin))
                .Select(pm => pm.ProjectId)
                .ToListAsync();

            var queryable = _context.Issues
                .Include(i => i.Project)
                .Where(i => projectIds.Contains(i.ProjectId));

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!System.Enum.TryParse<IssueStatus>(status, true, out var parsedStatus))
                    throw new InvalidOperationException($"Invalid status '{status}'.");
                queryable = queryable.Where(i => i.Status == parsedStatus);
            }

            if (!string.IsNullOrWhiteSpace(priority))
            {
                if (!System.Enum.TryParse<IssuePriority>(priority, true, out var parsedPriority))
                    throw new InvalidOperationException($"Invalid priority '{priority}'.");
                queryable = queryable.Where(i => i.Priority == parsedPriority);
            }

            var issues = await queryable.ToListAsync();
            return issues.Select(MapToTaskDto).ToList();
        }

        private async Task<List<IssueByAdminDto>> GetIssuesByAdminQuery(int adminId, IssueType? type)
        {
            var queryable = _context.Issues
                .Include(i => i.Assignments).ThenInclude(a => a.User)
                .Where(i => i.ReporterId == adminId);

            if (type.HasValue)
                queryable = queryable.Where(i => i.Type == type.Value);

            var issues = await queryable.ToListAsync();

            return issues.Select(i =>
            {
                var latest = i.Assignments?.OrderByDescending(a => a.AssignedAt).FirstOrDefault();
                return new IssueByAdminDto
                {
                    Id = i.Id,
                    Title = i.Title,
                    Target = latest?.User?.FullName ?? string.Empty,
                    Type = i.Type.ToString(),
                    DateAssigned = latest?.AssignedAt
                };
            }).ToList();
        }

        private static IssueResponseDto MapToResponseDto(Issue i) => new()
        {
            Id = i.Id,
            IssueCode = i.IssueCode,
            ProjectId = i.ProjectId,
            ReporterId = i.ReporterId,
            Title = i.Title,
            Description = i.Description,
            AcceptanceCriteria = i.AcceptanceCriteria,
            Type = i.Type.ToString(),
            Status = i.Status.ToString(),
            Priority = i.Priority.ToString(),
            StartDate = i.StartDate,
            DueDate = i.DueDate,
            CreatedAt = i.CreatedAt,
            UpdatedAt = i.UpdatedAt
        };

        private static IssueHistoryResponseDto MapToHistoryDto(IssueHistory h) => new()
        {
            Id = h.Id,
            IssueId = h.IssueId,
            ActorId = h.ActorId,
            FieldName = h.FieldName,
            OldValue = h.OldValue,
            NewValue = h.NewValue,
            TransitionNote = h.TransitionNote,
            CreatedAt = h.CreatedAt
        };

        private static TaskDto MapToTaskDto(Issue i) => new()
        {
            Id = i.Id,
            IssueCode = i.IssueCode,
            Title = i.Title,
            Type = i.Type.ToString(),
            Status = i.Status.ToString(),
            Priority = i.Priority.ToString(),
            ProjectId = i.ProjectId,
            ProjectName = i.Project?.Name ?? string.Empty,
            DueDate = i.DueDate
        };
    }
}
