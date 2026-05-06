using Backend.Models;

namespace Backend.Services
{
    public class WorkflowService
    {
        public Task<List<Workflow>> GetAllWorkflows()
            => throw new NotImplementedException();

        public Task<Workflow> SaveWorkflow(string name, string description, List<string> statuses, List<Dictionary<string, object>> transitions)
            => throw new NotImplementedException();

        public Task LinkWorkflowToProject(int workflowId, int projectId)
            => throw new NotImplementedException();

        public Task RegisterAutomationRules(int workflowId, List<Dictionary<string, object>> rules)
            => throw new NotImplementedException();
    }
}
