using Backend.Data;
using Backend.DTOs.Projects;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;
        private readonly AppDbContext _context;

        public ProjectController(IProjectService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<ProjectSearchResultDto>>> Search([FromQuery] string q = "")
            => Ok(await _service.SearchProjectsAsync(q));

        [HttpPost]
        public async Task<ActionResult<ProjectResponseDto>> Create([FromBody] CreateProjectDto dto)
            => Ok(await _service.CreateProjectAsync(dto));

        [HttpPut("{projectId:int}")]
        public async Task<ActionResult<ProjectResponseDto>> Update(int projectId, [FromBody] UpdateProjectDto dto)
            => Ok(await _service.UpdateProjectAsync(projectId, dto));

        [HttpPatch("{projectId:int}/status")]
        public async Task<ActionResult<ProjectResponseDto>> UpdateStatus(int projectId, [FromQuery] string status)
            => Ok(await _service.UpdateProjectStatusAsync(projectId, status));

        [HttpPatch("{projectId:int}/archive")]
        public async Task<ActionResult<ProjectResponseDto>> Archive(int projectId)
            => Ok(await _service.ArchiveProjectAsync(projectId));

        [HttpGet("by-status")]
        public async Task<ActionResult<List<ProjectResponseDto>>> ByStatus([FromQuery] string status)
            => Ok(await _service.GetProjectsByStatusAsync(status));

        [HttpGet("by-manager/{managerId:int}")]
        public async Task<ActionResult<List<ProjectByManagerDto>>> ByManager(int managerId)
            => Ok(await _service.GetProjectsByManagerAsync(managerId));

        [HttpGet("by-manager/{managerId:int}/filtered")]
        public async Task<ActionResult<List<ProjectByManagerDto>>> ByManagerFiltered(
            int managerId,
            [FromQuery] string? status,
            [FromQuery] string? type)
            => Ok(await _service.GetProjectsByManagerFilteredAsync(managerId, status, type));

        [HttpGet("counts-by-status")]
        public async Task<ActionResult<ProjectStatusCountsDto>> CountsByStatus()
            => Ok(await _service.GetProjectCountsByStatusAsync());

        [HttpGet("last-created")]
        public async Task<ActionResult<LastCreatedProjectDto?>> LastCreated()
            => Ok(await _service.GetLastCreatedProjectAsync());

        [HttpGet("{projectId:int}/member-count")]
        public async Task<ActionResult<int>> MemberCount(int projectId)
            => Ok(await _service.GetMemberCountAsync(projectId));

        [HttpGet("{projectId:int}/open-issues")]
        public async Task<ActionResult<int>> OpenIssues(int projectId)
            => Ok(await _service.GetOpenIssueCountAsync(projectId));

        [HttpGet("{projectId:int}/closed-issues")]
        public async Task<ActionResult<int>> ClosedIssues(int projectId)
            => Ok(await _service.GetClosedIssueCountAsync(projectId));

        [HttpGet("{projectId:int}/budget-used")]
        public async Task<ActionResult<decimal>> BudgetUsed(int projectId)
            => Ok(await _service.GetBudgetUsedAsync(projectId));

        [HttpGet("{projectId:int}/analytics")]
        public async Task<ActionResult<ProjectAnalyticsDto>> Analytics(int projectId)
            => Ok(await _service.GetProjectAnalyticsAsync(projectId));
    }
}
