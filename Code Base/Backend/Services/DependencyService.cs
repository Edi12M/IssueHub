using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class DependencyService
    {
        public Task<IssueDependency> SaveDependency(int issueId, int dependsOnId, IssueDependencyType type)
            => throw new NotImplementedException();

        public Task<bool> CheckCircularDependency(int issueId, int dependsOnId)
            => throw new NotImplementedException();

        public Task UpdateTaskBlockingStatus(int issueId)
            => throw new NotImplementedException();

        public Task<List<IssueDependency>> GetDependencyNetwork(int projectId)
            => throw new NotImplementedException();

        public Task<List<IssueDependency>> GetTaskDependencies(int taskId)
            => throw new NotImplementedException();

        public Task<bool> CheckDependencyConflicts(int taskId, DateTime startDate, DateTime dueDate)
            => throw new NotImplementedException();
    }
}
