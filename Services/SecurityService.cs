namespace Backend.Services
{
    public class SecurityService
    {
        public bool VerifyPassword(string plainText, string hash)
            => throw new NotImplementedException();

        public string HashPassword(string plainText)
            => throw new NotImplementedException();

        public string GenerateTemporaryPassword()
            => throw new NotImplementedException();

        public Task UpdateAuthPolicies(Dictionary<string, object> settings)
            => throw new NotImplementedException();
    }
}
