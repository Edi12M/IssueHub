using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class NotificationService
    {
        public Task StoreNotification(int userId, NotificationType type, string entityType, int entityId)
            => throw new NotImplementedException();

        public Task<List<Notification>> GetUserNotifications(int userId)
            => throw new NotImplementedException();

        public Task MarkAsRead(int notificationId)
            => throw new NotImplementedException();

        public Task MarkAllAsRead(int userId)
            => throw new NotImplementedException();

        public Task SendStatusUpdateNotification(int issueId, int managerId)
            => throw new NotImplementedException();

        public Task NotifyMentionedUsers(List<int> userIds, int commentId)
            => throw new NotImplementedException();

        public Task NotifyUsersOfCommentDeletion(int commentId)
            => throw new NotImplementedException();

        public Task NotifyAdmins(int issueId)
            => throw new NotImplementedException();

        public Task NotifyAffectedUsers(int issueId)
            => throw new NotImplementedException();

        public Task NotifyUsersProjectArchived(int projectId)
            => throw new NotImplementedException();

        public Task NotifyUsersProjectDeleted(int projectId)
            => throw new NotImplementedException();

        public Task NotifyProjectManagers(int workflowId)
            => throw new NotImplementedException();

        public Task NotifyNewMember(int userId, int projectId)
            => throw new NotImplementedException();

        public Task NotifyAssignees(int taskId, List<int> assigneeIds)
            => throw new NotImplementedException();

        public Task ProcessEvent(string eventType, int entityId)
            => throw new NotImplementedException();
    }
}
