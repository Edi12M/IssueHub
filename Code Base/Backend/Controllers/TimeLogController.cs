using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.TimeLogs;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeLogController : ControllerBase
    {
        private readonly ITimeLogService _service;
        private readonly AppDbContext _context;

        public TimeLogController(ITimeLogService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        private int CurrentUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost]
        public async Task<ActionResult<TimeLogResponseDto>> Create([FromBody] CreateTimeLogDto dto)
        {
            dto.UserId = CurrentUserId();
            return Ok(await _service.CreateTimeLogAsync(dto));
        }

        [HttpGet("project/{projectId:int}/budget-used")]
        public async Task<ActionResult<decimal>> BudgetUsed(int projectId)
            => Ok(await _service.CalculateBudgetUsedAsync(projectId));
    }
}
