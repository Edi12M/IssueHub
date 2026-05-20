using Backend.DTOs.Health;
using Backend.Services.Interfaces;

namespace Backend.Services
{
    public class HealthService : IHealthService
    {
        private static readonly DateTime StartTime = DateTime.UtcNow;

        public Task<SystemHealthDto> GetSystemHealthAsync()
        {
            var uptime = DateTime.UtcNow - StartTime;

            var dto = new SystemHealthDto
            {
                Uptime = uptime,
                UptimeFormatted = FormatUptime(uptime),
                StartedAt = StartTime
            };

            return Task.FromResult(dto);
        }

        private static string FormatUptime(TimeSpan uptime) =>
            $"{(int)uptime.TotalDays}d {uptime.Hours}h {uptime.Minutes}m {uptime.Seconds}s";
    }
}
