using Backend.Data;
using Backend.DTOs.Attachments;
using Backend.DTOs.Comments;
using Backend.DTOs.Issues;
using Backend.Enum;
using Backend.Exceptions;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class IssueService : IIssueService
    {
        private readonly AppDbContext _context;
        private readonly INotificationService _notifications;

        public IssueService(AppDbContext context, INotificationService notifications)
        {
            _context = context;
            _notifications = notifications;
        }

        public async Task<IssueResponseDto> CreateIssueAsync(CreateIssueDto dto)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == dto.ProjectId);
            if (!projectExists)
                throw new NotFoundException(nameof(Project), dto.ProjectId);

            var reporterExists = await _context.Users.AnyAsync(u => u.Id == dto.ReporterId);
            if (!reporterExists)
                throw new NotFoundException(nameof(User), dto.ReporterId);

            if (!System.Enum.TryParse<IssueType>(dto.Type, true, out var type))
                throw new BadRequestException($"Invalid issue type '{dto.Type}'.");

            if (!System.Enum.TryParse<IssuePriority>(dto.Priority, true, out var priority))
                throw new BadRequestException($"Invalid priority '{dto.Priority}'.");

            var issueCode = string.IsNullOrWhiteSpace(dto.IssueCode)
                ? $"ISS-{Guid.NewGuid().ToString("N")[..8].ToUpper()}"
                : dto.IssueCode;

            if (await _context.Issues.AnyAsync(i => i.IssueCode == issueCode))
                throw new ConflictException($"Issue code '{issueCode}' already exists.");

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

            // dto.DependentIssueIds = ids of issues this NEW issue depends on (i.e. is blocked by).
            if (dto.DependentIssueIds != null && dto.DependentIssueIds.Count > 0)
            {
                var validBlockerIds = await _context.Issues
                    .Where(i => dto.DependentIssueIds.Contains(i.Id))
                    .Select(i => i.Id)
                    .ToListAsync();

                foreach (var blockerId in validBlockerIds)
                {
                    _context.IssueDependencies.Add(new IssueDependency
                    {
                        IssueId = issue.Id,
                        DependOnId = blockerId,
                        Type = IssueDependencyType.IsBlockedBy,
                        CreatedAt = now
                    });
                }

                await _context.SaveChangesAsync();
            }

            return MapToResponseDto(issue);
        }

        public async Task<IssueResponseDto> UpdateIssueAsync(int issueId, UpdateIssueDto dto, int actorId)
        {
            var issue = await _context.Issues
                .Include(i => i.Project)
                .FirstOrDefaultAsync(i => i.Id == issueId)
                ?? throw new NotFoundException(nameof(Issue), issueId);

            var changes = new List<(string Field, string Old, string New)>();
            var oldStatus = issue.Status;
            IssueStatus? requestedStatus = null;

            // ── Parse + collect changes ──
            if (dto.Title != null && dto.Title != issue.Title)
            {
                changes.Add(("Title", issue.Title, dto.Title));
                issue.Title = dto.Title;
            }
            if (dto.Description != null && dto.Description != issue.Description)
            {
                changes.Add(("Description", issue.Description, dto.Description));
                issue.Description = dto.Description;
            }
            if (dto.AcceptanceCriteria != null && dto.AcceptanceCriteria != issue.AcceptanceCriteria)
            {
                changes.Add(("AcceptanceCriteria", issue.AcceptanceCriteria, dto.AcceptanceCriteria));
                issue.AcceptanceCriteria = dto.AcceptanceCriteria;
            }
            if (dto.StartDate.HasValue && dto.StartDate.Value != issue.StartDate)
            {
                changes.Add(("StartDate", issue.StartDate.ToString("o"), dto.StartDate.Value.ToString("o")));
                issue.StartDate = dto.StartDate.Value;
            }
            if (dto.DueDate.HasValue && dto.DueDate.Value != issue.DueDate)
            {
                changes.Add(("DueDate", issue.DueDate.ToString("o"), dto.DueDate.Value.ToString("o")));
                issue.DueDate = dto.DueDate.Value;
            }
            if (dto.Type != null)
            {
                if (!System.Enum.TryParse<IssueType>(dto.Type, true, out var type))
                    throw new BadRequestException($"Invalid type '{dto.Type}'.");
                if (type != issue.Type)
                {
                    changes.Add(("Type", issue.Type.ToString(), type.ToString()));
                    issue.Type = type;
                }
            }
            if (dto.Priority != null)
            {
                if (!System.Enum.TryParse<IssuePriority>(dto.Priority, true, out var priority))
                    throw new BadRequestException($"Invalid priority '{dto.Priority}'.");
                if (priority != issue.Priority)
                {
                    changes.Add(("Priority", issue.Priority.ToString(), priority.ToString()));
                    issue.Priority = priority;
                }
            }
            if (dto.Status != null)
            {
                if (!System.Enum.TryParse<IssueStatus>(dto.Status, true, out var status))
                    throw new BadRequestException($"Invalid status '{dto.Status}'.");
                requestedStatus = status;
            }

            // ── Authorization: status change requires project owner ──
            var isStatusChange = requestedStatus.HasValue && requestedStatus.Value != oldStatus;

            if (isStatusChange)
            {
                if (issue.Project == null || issue.Project.OwnerId != actorId)
                    throw new ForbiddenException("Only the project owner can change the issue status.");

                // ── Dependency-block rule: applies when moving OUT of Open. ──
                if (oldStatus == IssueStatus.Open)
                {
                    var blockers = await GetUnresolvedBlockersAsync(issueId);
                    if (blockers.Count > 0)
                        throw new DependencyBlockedException(
                            "Cannot change status because this issue is blocked by unresolved dependencies.",
                            blockers);
                }

                changes.Add(("Status", oldStatus.ToString(), requestedStatus.Value.ToString()));
                issue.Status = requestedStatus.Value;
            }

            if (changes.Count == 0)
                return MapToResponseDto(issue);

            issue.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            // ── History rows for every changed field ──
            var historyNow = DateTime.UtcNow;
            foreach (var (field, oldVal, newVal) in changes)
            {
                _context.IssueHistories.Add(new IssueHistory
                {
                    IssueId = issue.Id,
                    ActorId = actorId,
                    FieldName = field,
                    OldValue = Truncate(oldVal, 500),
                    NewValue = Truncate(newVal, 500),
                    TransitionNote = string.Empty,
                    CreatedAt = historyNow
                });
            }
            await _context.SaveChangesAsync();

            // ── Notification fan-out (skip the actor) ──
            var notificationType = isStatusChange ? NotificationType.StatusChanged : NotificationType.IssueUpdated;
            await _notifications.NotifyIssueParticipantsAsync(
                issue.Id,
                notificationType,
                NotificationEntityTypes.Issue,
                issue.Id,
                excludeUserId: actorId,
                emailSubject: $"[{issue.IssueCode}] {(isStatusChange ? "Status changed" : "Issue updated")}",
                emailBody: $"Issue {issue.IssueCode} \"{issue.Title}\" was updated.");

            return MapToResponseDto(issue);
        }

        public async Task<IssueDetailDto> GetIssueByIdForUserAsync(int issueId)
        {
            var issue = await _context.Issues
                .AsNoTracking()
                .FirstOrDefaultAsync(i => i.Id == issueId)
                ?? throw new NotFoundException(nameof(Issue), issueId);

            var comments = await _context.Comments
                .AsNoTracking()
                .Include(c => c.Author)
                .Where(c => c.IssueId == issueId && !c.IsDeleted)
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();

            var attachments = await _context.Attachments
                .AsNoTracking()
                .Include(a => a.UploadedBy)
                .Where(a => a.IssueId == issueId)
                .OrderBy(a => a.UploadedAt)
                .ToListAsync();

            return new IssueDetailDto
            {
                Id = issue.Id,
                IssueCode = issue.IssueCode,
                ProjectId = issue.ProjectId,
                ReporterId = issue.ReporterId,
                Title = issue.Title,
                Description = issue.Description,
                AcceptanceCriteria = issue.AcceptanceCriteria,
                Type = issue.Type.ToString(),
                Status = issue.Status.ToString(),
                Priority = issue.Priority.ToString(),
                StartDate = issue.StartDate,
                DueDate = issue.DueDate,
                CreatedAt = issue.CreatedAt,
                UpdatedAt = issue.UpdatedAt,
                Comments = comments.Select(c => new CommentResponseDto
                {
                    Id = c.Id,
                    IssueId = c.IssueId,
                    AuthorId = c.AuthorId,
                    AuthorName = c.Author?.FullName ?? string.Empty,
                    ParentId = c.ParentId,
                    Body = c.Body,
                    IsEdited = c.IsEdited,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList(),
                Attachments = attachments.Select(a => new AttachmentResponseDto
                {
                    Id = a.Id,
                    IssueId = a.IssueId,
                    UploadedById = a.UploadedById,
                    UploadedByName = a.UploadedBy?.FullName ?? string.Empty,
                    FileName = a.FileName,
                    FileType = a.FileType,
                    FileSizeBytes = a.FileSizeBytes,
                    UploadedAt = a.UploadedAt
                }).ToList()
            };
        }

        public async Task<IssueHistoryResponseDto> CreateIssueHistoryAsync(CreateIssueHistoryDto dto)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == dto.IssueId);
            if (!issueExists)
                throw new NotFoundException(nameof(Issue), dto.IssueId);

            var actorExists = await _context.Users.AnyAsync(u => u.Id == dto.ActorId);
            if (!actorExists)
                throw new NotFoundException(nameof(User), dto.ActorId);

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

            return await MapToHistoryDtoAsync(history);
        }

        public Task<int> GetAllIssuesCountAsync() => _context.Issues.CountAsync();

        public async Task<List<IssueByAdminDto>> GetIssuesByAdminAsync(int adminId)
        {
            return await GetIssuesByAdminQuery(adminId, null);
        }

        public async Task<List<IssueByAdminDto>> GetIssuesByAdminFilteredByTypeAsync(int adminId, string type)
        {
            if (!System.Enum.TryParse<IssueType>(type, true, out var parsedType))
                throw new BadRequestException($"Invalid issue type '{type}'.");

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
                    throw new BadRequestException($"Invalid status '{status}'.");
                queryable = queryable.Where(i => i.Status == parsedStatus);
            }

            if (!string.IsNullOrWhiteSpace(priority))
            {
                if (!System.Enum.TryParse<IssuePriority>(priority, true, out var parsedPriority))
                    throw new BadRequestException($"Invalid priority '{priority}'.");
                queryable = queryable.Where(i => i.Priority == parsedPriority);
            }

            var issues = await queryable.ToListAsync();
            return issues.Select(MapToTaskDto).ToList();
        }

        // ── Internals ──────────────────────────────────────────────

        private async Task<List<BlockerInfo>> GetUnresolvedBlockersAsync(int issueId)
        {
            return await _context.IssueDependencies
                .Where(d => d.IssueId == issueId &&
                            d.Type == IssueDependencyType.IsBlockedBy &&
                            d.DependsOn.Status != IssueStatus.Resolved &&
                            d.DependsOn.Status != IssueStatus.Closed)
                .Select(d => new BlockerInfo
                {
                    Id = d.DependsOn.Id,
                    IssueCode = d.DependsOn.IssueCode,
                    Title = d.DependsOn.Title,
                    Status = d.DependsOn.Status.ToString()
                })
                .ToListAsync();
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

        private static string Truncate(string s, int max) =>
            string.IsNullOrEmpty(s) ? s : (s.Length <= max ? s : s.Substring(0, max));

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

        private async Task<IssueHistoryResponseDto> MapToHistoryDtoAsync(IssueHistory h)
        {
            var actorName = await _context.Users
                .Where(u => u.Id == h.ActorId)
                .Select(u => u.FullName)
                .FirstOrDefaultAsync() ?? string.Empty;

            return new IssueHistoryResponseDto
            {
                Id = h.Id,
                IssueId = h.IssueId,
                ActorId = h.ActorId,
                ActorName = actorName,
                FieldName = h.FieldName,
                OldValue = h.OldValue,
                NewValue = h.NewValue,
                TransitionNote = h.TransitionNote,
                CreatedAt = h.CreatedAt
            };
        }

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
