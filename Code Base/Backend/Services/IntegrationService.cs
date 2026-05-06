namespace Backend.Services
{
    public class IntegrationService
    {
        public Task StoreAPIKeys(Dictionary<string, string> keys)
            => throw new NotImplementedException();

        public Task<bool> CheckActiveIntegrations(int projectId)
            => throw new NotImplementedException();

        public Task UpdateAPIIntegrations(Dictionary<string, object> integrations)
            => throw new NotImplementedException();
    }
}
