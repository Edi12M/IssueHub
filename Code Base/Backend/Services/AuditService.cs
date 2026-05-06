namespace Backend.Services
{
    public class AuditService
    {
        public Task StoreAuditEntry(int actorId, string action, string entityType, int entityId, string ipAddress)
            => throw new NotImplementedException();

        public Task LogUserUpdate(int actorId, int targetUserId, Dictionary<string, object> changes)
            => throw new NotImplementedException();

        public Task LogDeactivation(int actorId, int targetUserId)
            => throw new NotImplementedException();

        public Task LogRoleChange(int actorId, int targetUserId, string oldRole, string newRole)
            => throw new NotImplementedException();

        public Task LogResolutionAction(int actorId, int issueId)
            => throw new NotImplementedException();

        public Task LogArchiveAction(int actorId, int projectId)
            => throw new NotImplementedException();

        public Task LogDeletionAction(int actorId, int projectId)
            => throw new NotImplementedException();

        public Task LogWorkflowChange(int actorId, int workflowId)
            => throw new NotImplementedException();

        public Task LogConfigurationUpdate(int actorId, Dictionary<string, object> changes)
            => throw new NotImplementedException();

        public Task<List<Dictionary<string, object>>> FetchAuditLogs()
            => throw new NotImplementedException();

        public Task<List<Dictionary<string, object>>> FilterAuditLogs(Dictionary<string, object> filters)
            => throw new NotImplementedException();

        public Task<byte[]> GenerateCsvExport(Dictionary<string, object> filters)
            => throw new NotImplementedException();
    }
}
