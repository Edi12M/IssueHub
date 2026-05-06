using Backend.Models;

namespace Backend.Services
{
    public class ProjectService
    {
        public Task<bool> CheckProjectNameUniqueness(string name)
            => throw new NotImplementedException();

        public Task<string> GenerateProjectId()
            => throw new NotImplementedException();

        public Task<Project> CreateProject(Dictionary<string, object> data, int ownerId)
            => throw new NotImplementedException();

        public Task<List<Project>> GetAllProjects()
            => throw new NotImplementedException();

        public Task<List<Project>> GetProjectList(Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task ArchiveProject(int projectId)
            => throw new NotImplementedException();

        public Task DeleteProject(int projectId)
            => throw new NotImplementedException();
    }
}
