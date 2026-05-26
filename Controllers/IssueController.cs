using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.Issues;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueController : ControllerBase
    {
        private readonly IIssueService _service;
        private readonly AppDbContext _context;

        public IssueController(IIssueService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        private int CurrentUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost]
        public async Task<ActionResult<IssueResponseDto>> Create([FromBody] CreateIssueDto dto)
            => Ok(await _service.CreateIssueAsync(dto));

        [HttpPut("{issueId:int}")]
        public async Task<ActionResult<IssueResponseDto>> Update(int issueId, [FromBody] UpdateIssueDto dto)
            => Ok(await _service.UpdateIssueAsync(issueId, dto, CurrentUserId()));

        [HttpGet("{issueId:int}")]
        public async Task<ActionResult<IssueDetailDto>> Get(int issueId)
            => Ok(await _service.GetIssueByIdForUserAsync(issueId));

        [HttpPost("history")]
        public async Task<ActionResult<IssueHistoryResponseDto>> CreateHistory([FromBody] CreateIssueHistoryDto dto)
            => Ok(await _service.CreateIssueHistoryAsync(dto));

        [HttpGet("count")]
        public async Task<ActionResult<int>> Count()
            => Ok(await _service.GetAllIssuesCountAsync());

        [HttpGet("by-admin/{adminId:int}")]
        public async Task<ActionResult<List<IssueByAdminDto>>> ByAdmin(int adminId)
            => Ok(await _service.GetIssuesByAdminAsync(adminId));

        [HttpGet("by-admin/{adminId:int}/by-type")]
        public async Task<ActionResult<List<IssueByAdminDto>>> ByAdminFilteredByType(int adminId, [FromQuery] string type)
            => Ok(await _service.GetIssuesByAdminFilteredByTypeAsync(adminId, type));

        [HttpGet("last-security")]
        public async Task<ActionResult<LastSecurityIssueDto?>> LastSecurity()
            => Ok(await _service.GetLastCreatedSecurityIssueAsync());

        [HttpGet("tasks/filtered")]
        public async Task<ActionResult<List<TaskDto>>> Tasks(
          [FromQuery] int userId,
          [FromQuery] string? status,
          [FromQuery] string? priority)
          => Ok(await _service.GetTasksFilteredAsync(userId, status, priority));
    }
}
