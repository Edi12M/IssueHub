using Backend.Data;
using Backend.DTOs.Projects;
using Backend.Enum;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectSearchResultDto>> SearchProjectsAsync(string query)
        {
            var q = (query ?? string.Empty).ToLower();

            var projects = await _context.Projects
                .Include(p => p.Owner)
                .Where(p => p.Name.ToLower().Contains(q) || p.Owner.FullName.ToLower().Contains(q))
                .ToListAsync();

            var results = new List<ProjectSearchResultDto>();
            foreach (var p in projects)
            {
                results.Add(new ProjectSearchResultDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Status = p.Status.ToString(),
                    ManagerName = p.Owner?.FullName ?? string.Empty,
                    TeamSize = await _context.ProjectMembers.CountAsync(pm => pm.ProjectId == p.Id),
                    Deadline = p.EndDate,
                    OpenIssueCount = await _context.Issues.CountAsync(i => i.ProjectId == p.Id && i.Status == IssueStatus.Open),
                    CompletedIssueCount = await _context.Issues.CountAsync(i => i.ProjectId == p.Id && i.Status == IssueStatus.Closed),
                    CreatedAt = p.CreatedAt,
                    Type = p.Type.ToString(),
                    BudgetUsed = await CalculateBudgetUsedAsync(p.Id)
                });
            }

            return results;
        }

        public async Task<ProjectResponseDto> CreateProjectAsync(CreateProjectDto dto)
        {
            var ownerExists = await _context.Users.AnyAsync(u => u.Id == dto.OwnerId);
            if (!ownerExists)
                throw new KeyNotFoundException($"Owner user {dto.OwnerId} not found.");

            var workflowExists = await _context.Workflows.AnyAsync(w => w.Id == dto.WorkflowId);
            if (!workflowExists)
                throw new KeyNotFoundException($"Workflow {dto.WorkflowId} not found.");

            var visibility = ParseEnumOrDefault(dto.Visibility, Visibility.Private);
            var type = ParseEnumOrDefault(dto.Type, ProjectType.Software);

            var projectCode = string.IsNullOrWhiteSpace(dto.ProjectCode)
                ? $"PRJ-{Guid.NewGuid().ToString("N")[..8].ToUpper()}"
                : dto.ProjectCode;

            if (await _context.Projects.AnyAsync(p => p.ProjectCode == projectCode))
                throw new InvalidOperationException($"Project code '{projectCode}' already exists.");

            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                Goals = dto.Goals,
                ProjectCode = projectCode,
                Methodology = string.IsNullOrWhiteSpace(dto.Methodology) ? "Scrum" : dto.Methodology!,
                Type = type,
                Visibility = visibility,
                Status = ProjectStatus.Active,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                BudgetHours = dto.BudgetHours ?? 0m,
                OwnerId = dto.OwnerId,
                WorkflowId = dto.WorkflowId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return MapToResponseDto(project);
        }

        public async Task<ProjectResponseDto> UpdateProjectAsync(int projectId, UpdateProjectDto dto)
        {
            var project = await _context.Projects.FindAsync(projectId)
                ?? throw new KeyNotFoundException($"Project {projectId} not found.");

            if (dto.Name != null) project.Name = dto.Name;
            if (dto.Description != null) project.Description = dto.Description;
            if (dto.Goals != null) project.Goals = dto.Goals;
            if (dto.Methodology != null) project.Methodology = dto.Methodology;
            if (dto.StartDate.HasValue) project.StartDate = dto.StartDate.Value;
            if (dto.EndDate.HasValue) project.EndDate = dto.EndDate.Value;
            if (dto.BudgetHours.HasValue) project.BudgetHours = dto.BudgetHours.Value;

            if (dto.Type != null)
            {
                if (!System.Enum.TryParse<ProjectType>(dto.Type, true, out var type))
                    throw new InvalidOperationException($"Invalid type '{dto.Type}'.");
                project.Type = type;
            }
            if (dto.Visibility != null)
            {
                if (!System.Enum.TryParse<Visibility>(dto.Visibility, true, out var vis))
                    throw new InvalidOperationException($"Invalid visibility '{dto.Visibility}'.");
                project.Visibility = vis;
            }
            if (dto.Status != null)
            {
                if (!System.Enum.TryParse<ProjectStatus>(dto.Status, true, out var status))
                    throw new InvalidOperationException($"Invalid status '{dto.Status}'.");
                project.Status = status;
            }

            await _context.SaveChangesAsync();
            return MapToResponseDto(project);
        }

        public async Task<ProjectResponseDto> UpdateProjectStatusAsync(int projectId, string status)
        {
            if (!System.Enum.TryParse<ProjectStatus>(status, true, out var parsed))
                throw new InvalidOperationException($"Invalid status '{status}'.");

            var project = await _context.Projects.FindAsync(projectId)
                ?? throw new KeyNotFoundException($"Project {projectId} not found.");

            project.Status = parsed;
            await _context.SaveChangesAsync();
            return MapToResponseDto(project);
        }

        public async Task<ProjectResponseDto> ArchiveProjectAsync(int projectId)
        {
            var project = await _context.Projects.FindAsync(projectId)
                ?? throw new KeyNotFoundException($"Project {projectId} not found.");

            project.Status = ProjectStatus.Archived;
            await _context.SaveChangesAsync();
            return MapToResponseDto(project);
        }

        public async Task<List<ProjectResponseDto>> GetProjectsByStatusAsync(string status)
        {
            if (!System.Enum.TryParse<ProjectStatus>(status, true, out var parsed))
                throw new InvalidOperationException($"Invalid status '{status}'.");

            var projects = await _context.Projects
                .Where(p => p.Status == parsed)
                .ToListAsync();

            return projects.Select(MapToResponseDto).ToList();
        }

        public async Task<List<ProjectByManagerDto>> GetProjectsByManagerAsync(int managerId)
        {
            return await _context.Projects
                .Where(p => p.OwnerId == managerId)
                .Select(p => new ProjectByManagerDto
                {
                    Id = p.Id,
                    Title = p.Name,
                    Description = p.Description,
                    Status = p.Status.ToString(),
                    Methodology = p.Methodology,
                    MemberCount = p.ProjectMembers.Count()
                })
                .ToListAsync();
        }

        public async Task<List<ProjectByManagerDto>> GetProjectsByManagerFilteredAsync(int managerId, string? status, string? type)
        {
            var queryable = _context.Projects.Where(p => p.OwnerId == managerId);

            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!System.Enum.TryParse<ProjectStatus>(status, true, out var parsedStatus))
                    throw new InvalidOperationException($"Invalid status '{status}'.");
                queryable = queryable.Where(p => p.Status == parsedStatus);
            }

            if (!string.IsNullOrWhiteSpace(type))
            {
                if (!System.Enum.TryParse<ProjectType>(type, true, out var parsedType))
                    throw new InvalidOperationException($"Invalid type '{type}'.");
                queryable = queryable.Where(p => p.Type == parsedType);
            }

            return await queryable
                .Select(p => new ProjectByManagerDto
                {
                    Id = p.Id,
                    Title = p.Name,
                    Description = p.Description,
                    Status = p.Status.ToString(),
                    Methodology = p.Methodology,
                    MemberCount = p.ProjectMembers.Count()
                })
                .ToListAsync();
        }

        public async Task<ProjectStatusCountsDto> GetProjectCountsByStatusAsync()
        {
            var groups = await _context.Projects
                .GroupBy(p => p.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            return new ProjectStatusCountsDto
            {
                Active = groups.FirstOrDefault(g => g.Status == ProjectStatus.Active)?.Count ?? 0,
                Archived = groups.FirstOrDefault(g => g.Status == ProjectStatus.Archived)?.Count ?? 0,
                Closed = groups.FirstOrDefault(g => g.Status == ProjectStatus.Closed)?.Count ?? 0
            };
        }

        public async Task<LastCreatedProjectDto?> GetLastCreatedProjectAsync()
        {
            var project = await _context.Projects
                .OrderByDescending(p => p.CreatedAt)
                .FirstOrDefaultAsync();

            if (project == null) return null;

            return new LastCreatedProjectDto
            {
                Title = project.Name,
                CreatedAt = project.CreatedAt
            };
        }

        public Task<int> GetMemberCountAsync(int projectId) =>
            _context.ProjectMembers.CountAsync(pm => pm.ProjectId == projectId);

        public Task<int> GetOpenIssueCountAsync(int projectId) =>
            _context.Issues.CountAsync(i => i.ProjectId == projectId && i.Status == IssueStatus.Open);

        public Task<int> GetClosedIssueCountAsync(int projectId) =>
            _context.Issues.CountAsync(i => i.ProjectId == projectId && i.Status == IssueStatus.Closed);

        public Task<decimal> GetBudgetUsedAsync(int projectId) => CalculateBudgetUsedAsync(projectId);

        private async Task<decimal> CalculateBudgetUsedAsync(int projectId)
        {
            var rows = await (from t in _context.TimeLogs
                              join i in _context.Issues on t.IssueId equals i.Id
                              join pm in _context.ProjectMembers
                                  on new { t.UserId, i.ProjectId } equals new { pm.UserId, pm.ProjectId }
                              where i.ProjectId == projectId && t.IsBillable
                              select new { t.Hours, pm.HourlyRate })
                             .ToListAsync();

            return rows.Sum(r => r.Hours * r.HourlyRate);
        }

        private static TEnum ParseEnumOrDefault<TEnum>(string? value, TEnum defaultValue) where TEnum : struct
        {
            if (string.IsNullOrWhiteSpace(value)) return defaultValue;
            return System.Enum.TryParse<TEnum>(value, true, out var parsed)
                ? parsed
                : throw new InvalidOperationException($"Invalid {typeof(TEnum).Name} value '{value}'.");
        }

        private static ProjectResponseDto MapToResponseDto(Project p) => new()
        {
            Id = p.Id,
            Name = p.Name,
            ProjectCode = p.ProjectCode,
            Description = p.Description,
            Goals = p.Goals,
            Methodology = p.Methodology,
            Type = p.Type.ToString(),
            Visibility = p.Visibility.ToString(),
            Status = p.Status.ToString(),
            StartDate = p.StartDate,
            EndDate = p.EndDate,
            BudgetHours = p.BudgetHours,
            OwnerId = p.OwnerId,
            CreatedAt = p.CreatedAt
        };
    }
}
