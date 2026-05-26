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

        [HttpGet("tasks/{userId:int}")]
        public async Task<ActionResult<List<TaskDto>>> Tasks(
            int userId,
            [FromQuery] string? status,
            [FromQuery] string? priority)
            => Ok(await _service.GetTasksFilteredAsync(userId, status, priority));

        [HttpGet("project/{projectId:int}")]
        public async Task<ActionResult<List<TaskDto>>> ByProject(
            int projectId,
            [FromQuery] string? status,
            [FromQuery] string? priority,
            [FromQuery] string? assigneeId,
            [FromQuery] string? type)
            => Ok(await _service.GetIssuesByProjectAsync(projectId, status, priority, assigneeId, type));

        [HttpGet("user/{userId:int}/workload")]
        public async Task<ActionResult<UserWorkloadDto>> Workload(
            int userId,
            [FromQuery] int projectId)
            => Ok(await _service.GetUserWorkloadAsync(userId, projectId));

        [HttpGet("{issueId:int}/dependencies")]
        public async Task<ActionResult<List<IssueDependencyDto>>> GetDependencies(int issueId)
            => Ok(await _service.GetIssueDependenciesAsync(issueId));

        [HttpPost("{issueId:int}/dependencies")]
        public async Task<ActionResult<IssueDependencyDto>> AddDependency(
            int issueId,
            [FromBody] AddIssueDependencyDto dto)
            => Ok(await _service.AddIssueDependencyAsync(issueId, dto.ToIssueId, dto.DependencyType));
    }
}
