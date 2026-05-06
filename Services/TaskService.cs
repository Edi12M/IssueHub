using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class TaskService
    {
        public Task<Issue> CreateTask(Dictionary<string, object> data, List<int> assigneeIds)
            => throw new NotImplementedException();

        public Task<Issue?> FetchTask(int taskId)
            => throw new NotImplementedException();

        public Task<List<Issue>> GetTasksForUser(int userId)
            => throw new NotImplementedException();

        public Task<Dictionary<IssueStatus, List<Issue>>> GetTasksGroupedByStatus(int projectId)
            => throw new NotImplementedException();

        public Task<List<Issue>> FetchTasksWithDates(int projectId)
            => throw new NotImplementedException();

        public Task<List<Issue>> FilterTasks(int userId, Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task UpdateTaskStatus(int taskId, IssueStatus newStatus)
            => throw new NotImplementedException();

        public Task UpdateTaskPriority(int taskId, IssuePriority priority)
            => throw new NotImplementedException();

        public Task UpdateTaskDates(int taskId, DateTime startDate, DateTime dueDate)
            => throw new NotImplementedException();

        public Task BulkUpdateTasks(List<int> taskIds, Dictionary<string, object> changes)
            => throw new NotImplementedException();

        public Task FlagDeadlineStatus(int taskId)
            => throw new NotImplementedException();
    }
}
