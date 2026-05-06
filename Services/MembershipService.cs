using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class MembershipService
    {
        public Task<bool> VerifyMembership(int userId, int projectId)
            => throw new NotImplementedException();

        public Task<ProjectMembers> AddMemberToProject(int userId, int projectId, ProjectMemberRole role)
            => throw new NotImplementedException();

        public Task AssignRole(int userId, int projectId, ProjectMemberRole role)
            => throw new NotImplementedException();
    }
}
