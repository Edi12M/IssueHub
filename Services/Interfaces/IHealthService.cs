using Backend.DTOs.Health;

namespace Backend.Services.Interfaces
{
    public interface IHealthService
    {
        Task<SystemHealthDto> GetSystemHealthAsync();
    }
}
