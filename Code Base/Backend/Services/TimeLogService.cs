using Backend.Data;
using Backend.DTOs.TimeLogs;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class TimeLogService : ITimeLogService
    {
        private readonly AppDbContext _context;

        public TimeLogService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TimeLogResponseDto> CreateTimeLogAsync(CreateTimeLogDto dto)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == dto.IssueId);
            if (!issueExists)
                throw new KeyNotFoundException($"Issue {dto.IssueId} not found.");

            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                throw new KeyNotFoundException($"User {dto.UserId} not found.");

            if (dto.Hours <= 0)
                throw new InvalidOperationException("Hours must be greater than zero.");

            var timeLog = new TimeLog
            {
                IssueId = dto.IssueId,
                UserId = dto.UserId,
                Hours = dto.Hours,
                IsBillable = dto.IsBillable,
                LogDate = dto.LogDate,
                Note = dto.Note,
                CreatedAt = DateTime.UtcNow
            };

            _context.TimeLogs.Add(timeLog);
            await _context.SaveChangesAsync();

            return MapToResponseDto(timeLog);
        }

        public async Task<decimal> CalculateBudgetUsedAsync(int projectId)
        {
            var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);
            if (!projectExists)
                throw new KeyNotFoundException($"Project {projectId} not found.");

            var budgetUsed = await (
                from tl in _context.TimeLogs
                join issue in _context.Issues on tl.IssueId equals issue.Id
                join pm in _context.ProjectMembers
                    on new { UserId = tl.UserId, ProjectId = issue.ProjectId }
                    equals new { UserId = pm.UserId, ProjectId = pm.ProjectId }
                where issue.ProjectId == projectId && tl.IsBillable
                select tl.Hours * pm.HourlyRate
            ).SumAsync();

            return budgetUsed;
        }

        private static TimeLogResponseDto MapToResponseDto(TimeLog t) => new()
        {
            Id = t.Id,
            IssueId = t.IssueId,
            UserId = t.UserId,
            Hours = t.Hours,
            IsBillable = t.IsBillable,
            LogDate = t.LogDate,
            Note = t.Note,
            CreatedAt = t.CreatedAt
        };
    }
}
