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

            return history.Select(MapToDto).ToList();
        }

        public async Task<List<IssueHistoryResponseDto>> GetHistoryForUserAsync(int userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
                throw new NotFoundException(nameof(User), userId);

            // Issues the user is currently assigned to.
            var assignedIssueIds = _context.IssueAssignments
                .Where(a => a.UserId == userId)
                .Select(a => a.IssueId);

            var history = await _context.IssueHistories
                .Where(h => h.ActorId == userId || assignedIssueIds.Contains(h.IssueId))
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            return history.Select(MapToDto).ToList();
        }

        private static IssueHistoryResponseDto MapToDto(IssueHistory h) => new()
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
    }
}
