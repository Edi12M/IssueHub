using Backend.Models;

namespace Backend.Services
{
    public class FilterService
    {
        public Task<List<Issue>> FilterIssues(Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task<List<Project>> FilterProjects(Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task<List<Issue>> QueryFilteredIssues(Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task<List<Project>> QueryFilteredProjects(Dictionary<string, object> filters)
            => throw new NotImplementedException();
    }
}
