using Backend.Models;

namespace Backend.Services
{
    public class TimelineService
    {
        public Task<object> BuildTimelineStructure(List<Issue> tasks, List<IssueDependency> dependencies)
            => throw new NotImplementedException();

        public Task UpdateTimelineStructure(int projectId)
            => throw new NotImplementedException();
    }
}
