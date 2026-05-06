using Backend.Models;

namespace Backend.Services
{
    public class AssignmentService
    {
        public Task<int> CheckMemberWorkload(int userId)
            => throw new NotImplementedException();

        public Task SaveAssignments(int taskId, List<int> assigneeIds)
            => throw new NotImplementedException();

        public Task<IssueAssignment> AssignIssue(int issueId, int userId)
            => throw new NotImplementedException();

        public Task UpdateAssignment(int issueId, int userId)
            => throw new NotImplementedException();
    }
}
