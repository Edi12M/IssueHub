using Backend.Enum;

namespace Backend.Services
{
    public class ValidationService
    {
        public Task<bool> ValidateUserInput(Dictionary<string, object> userData)
            => throw new NotImplementedException();

        public Task<bool> CheckEmailUniqueness(string email)
            => throw new NotImplementedException();

        public bool ValidateRole(UserRole role)
            => throw new NotImplementedException();

        public Task<bool> ValidateIssueState(int issueId)
            => throw new NotImplementedException();

        public Task<bool> ValidateTransitionRules(int issueId, IssueStatus newStatus)
            => throw new NotImplementedException();

        public bool ValidateCommentContent(string body)
            => throw new NotImplementedException();

        public bool ValidateFileTypeAndSize(IFormFile file)
            => throw new NotImplementedException();

        public bool ValidateConfigurationValues(Dictionary<string, object> settings)
            => throw new NotImplementedException();

        public bool ValidateWorkflowStructure(Dictionary<string, object> workflow)
            => throw new NotImplementedException();

        public Task<bool> ValidateDependencyRules(int issueId, int dependsOnId)
            => throw new NotImplementedException();

        public bool ValidateDatesAndPriority(DateTime startDate, DateTime dueDate, IssuePriority priority)
            => throw new NotImplementedException();

        public Task<bool> ValidateScheduleChange(int taskId, DateTime startDate, DateTime dueDate)
            => throw new NotImplementedException();

        public Task<bool> ValidateAssignmentAvailability(int userId)
            => throw new NotImplementedException();
    }
}
