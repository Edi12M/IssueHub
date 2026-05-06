using Backend.Models;

namespace Backend.Services
{
    public class AccessControlService
    {
        public Task<bool> ValidateProjectAccess(int userId, int projectId)
            => throw new NotImplementedException();

        public Task<List<Project>> GetAllowedProjects(int userId)
            => throw new NotImplementedException();

        public Task<List<Issue>> ValidateAssignedTasks(int userId)
            => throw new NotImplementedException();
    }
}
