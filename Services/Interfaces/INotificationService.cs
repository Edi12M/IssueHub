using Backend.DTOs.Notifications;
using Backend.Enum;

namespace Backend.Services.Interfaces
{
    public interface INotificationService
    {
        // ── Write-side: fan-out helpers (used by other services) ─────────────

        Task NotifyUserAsync(
            int userId,
            NotificationType type,
            string entityType,
            int entityId,
            string? emailSubject = null,
            string? emailBody = null);

        Task NotifyIssueParticipantsAsync(
            int issueId,
            NotificationType type,
            string entityType,
            int entityId,
            int? excludeUserId = null,
            string? emailSubject = null,
            string? emailBody = null);

        Task NotifyProjectMembersAsync(
            int projectId,
            NotificationType type,
            string entityType,
            int entityId,
            int? excludeUserId = null,
            string? emailSubject = null,
            string? emailBody = null);

        // ── Read-side: consumed by NotificationController ────────────────────

        Task<List<NotificationResponseDto>> GetNotificationsForUserAsync(int userId);

        Task<NotificationResponseDto> MarkAsReadAsync(int notificationId, int userId);
    }
}
