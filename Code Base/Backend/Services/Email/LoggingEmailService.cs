using Backend.Services.Interfaces;

namespace Backend.Services.Email
{
    public class LoggingEmailService : IEmailService
    {
        private readonly ILogger<LoggingEmailService> _logger;

        public LoggingEmailService(ILogger<LoggingEmailService> logger)
        {
            _logger = logger;
        }

        public Task SendEmailAsync(string to, string subject, string body)
        {
            _logger.LogInformation(
                "[EMAIL STUB] To: {To} | Subject: {Subject} | Body: {Body}",
                to, subject, body);
            return Task.CompletedTask;
        }

        public Task SendBulkEmailAsync(IEnumerable<string> recipients, string subject, string body)
        {
            foreach (var to in recipients)
            {
                _logger.LogInformation(
                    "[EMAIL STUB] To: {To} | Subject: {Subject} | Body: {Body}",
                    to, subject, body);
            }
            return Task.CompletedTask;
        }
    }
}
