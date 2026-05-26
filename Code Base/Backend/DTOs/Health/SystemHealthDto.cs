namespace Backend.DTOs.Health
{
    public class SystemHealthDto
    {
        public TimeSpan Uptime { get; set; }
        public string UptimeFormatted { get; set; } = string.Empty;
        public DateTime StartedAt { get; set; }
    }
}
