namespace Backend.Services
{
    public class SessionService
    {
        public Task<string> CreateSession(int userId)
            => throw new NotImplementedException();

        public Task<string> CreateAdminSession(int userId)
            => throw new NotImplementedException();

        public Task InvalidateSessions(int userId)
            => throw new NotImplementedException();
    }
}
