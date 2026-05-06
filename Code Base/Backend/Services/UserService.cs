using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class UserService
    {
        public Task<List<User>> GetAllUsers()
            => throw new NotImplementedException();

        public Task<User?> FetchUserProfile(int userId)
            => throw new NotImplementedException();

        public Task<User> CreateUser(string name, string email, UserRole role, string passwordHash)
            => throw new NotImplementedException();

        public Task<User> UpdateUserDetails(int userId, Dictionary<string, object> changes)
            => throw new NotImplementedException();

        public Task DeactivateAccount(int userId)
            => throw new NotImplementedException();

        public Task UpdateUserRole(int userId, UserRole role)
            => throw new NotImplementedException();

        public Task<List<User>> SearchUsers(string query)
            => throw new NotImplementedException();

        public Task<List<User>> ValidateMentionedUsers(List<string> usernames)
            => throw new NotImplementedException();
    }
}
