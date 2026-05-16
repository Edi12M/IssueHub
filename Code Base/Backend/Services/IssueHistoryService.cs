using Backend.Data;
using Backend.DTOs.Issues;
using Backend.Exceptions;
using Backend.Models;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class IssueHistoryService : IIssueHistoryService
    {
        private readonly AppDbContext _context;

        public IssueHistoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<IssueHistoryResponseDto>> GetHistoryForIssueAsync(int issueId)
        {
            var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);
            if (!issueExists)
                throw new NotFoundException(nameof(Issue), issueId);

            var history = await _context.IssueHistories
                .Where(h => h.IssueId == issueId)
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            return await EnrichWithActorNamesAsync(history);
        }

        public async Task<List<IssueHistoryResponseDto>> GetHistoryForUserAsync(int userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
                throw new NotFoundException(nameof(User), userId);

            var assignedIssueIds = _context.IssueAssignments
                .Where(a => a.UserId == userId)
                .Select(a => a.IssueId);

            var history = await _context.IssueHistories
                .Where(h => h.ActorId == userId || assignedIssueIds.Contains(h.IssueId))
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            return await EnrichWithActorNamesAsync(history);
        }

        // -- Internals -------------------------------------------------------

        private async Task<List<IssueHistoryResponseDto>> EnrichWithActorNamesAsync(
            List<IssueHistory> history)
        {
            var actorIds = history.Select(h => h.ActorId).Distinct().ToList();

            var actorNames = await _context.Users
                .Where(u => actorIds.Contains(u.Id))
                .ToDictionaryAsync(u => u.Id, u => u.FullName);

            return history.Select(h => MapToDto(h, actorNames)).ToList();
        }

        private static IssueHistoryResponseDto MapToDto(
            IssueHistory h,
            IReadOnlyDictionary<int, string> actorNames) => new()
            {
                Id = h.Id,
                IssueId = h.IssueId,
                ActorId = h.ActorId,
                ActorName = actorNames.TryGetValue(h.ActorId, out var name) ? name : string.Empty,
                FieldName = h.FieldName,
                OldValue = h.OldValue,
                NewValue = h.NewValue,
                TransitionNote = h.TransitionNote,
                CreatedAt = h.CreatedAt
            };
    }
}