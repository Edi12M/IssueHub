using Backend.DTOs.TimeLogs;

namespace Backend.Services.Interfaces
{
    public interface ITimeLogService
    {
        Task<TimeLogResponseDto> CreateTimeLogAsync(CreateTimeLogDto dto);
        Task<decimal> CalculateBudgetUsedAsync(int projectId);
    }
}
