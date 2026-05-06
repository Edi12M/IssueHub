using Backend.Enum;
using Backend.Models;

namespace Backend.Services
{
    public class AuthenticationService
    {
        public Task<User?> GetUserByEmail(string email)
            => throw new NotImplementedException();

        public Task<User?> AuthenticateUser(string email, string password)
            => throw new NotImplementedException();

        public Task IncrementFailedAttempts(int userId)
            => throw new NotImplementedException();

        public Task LockAccount(int userId, int durationMinutes)
            => throw new NotImplementedException();

        public Task<UserStatus> CheckAccountStatus(int userId)
            => throw new NotImplementedException();
    }
}
