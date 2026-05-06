namespace Backend.Services
{
    public class SettingsService
    {
        public Task<Dictionary<string, object>> LoadSystemSettings()
            => throw new NotImplementedException();

        public Task SaveSettings(Dictionary<string, object> settings)
            => throw new NotImplementedException();

        public Task ApplySecurityPolicies(Dictionary<string, object> settings)
            => throw new NotImplementedException();
    }
}
