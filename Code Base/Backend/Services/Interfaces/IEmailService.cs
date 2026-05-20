namespace Backend.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);

        Task SendBulkEmailAsync(IEnumerable<string> recipients, string subject, string body);
    }
}
