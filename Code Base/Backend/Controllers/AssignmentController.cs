using Backend.Data;
using Backend.DTOs.Assignments;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentService _service;
        private readonly AppDbContext _context;

        public AssignmentController(IAssignmentService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpPost("issue/{issueId:int}/user/{userId:int}")]
        public async Task<ActionResult<IssueAssignmentResponseDto>> AssignIssueToUser(int issueId, int userId)
            => Ok(await _service.AssignIssueToUserAsync(issueId, userId));

        [HttpPost("project/{projectId:int}/user/{userId:int}")]
        public async Task<ActionResult<ProjectMemberResponseDto>> AssignUserToProject(int projectId, int userId)
            => Ok(await _service.AssignUserToProjectAsync(projectId, userId));
    }
}
