using Backend.Data;
using Backend.DTOs.Issues;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssueHistoryController : ControllerBase
    {
        private readonly IIssueHistoryService _service;
        private readonly AppDbContext _context;

        public IssueHistoryController(IIssueHistoryService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet("issue/{issueId:int}")]
        public async Task<ActionResult<List<IssueHistoryResponseDto>>> ForIssue(int issueId)
            => Ok(await _service.GetHistoryForIssueAsync(issueId));

        [HttpGet("user/{userId:int}")]
        public async Task<ActionResult<List<IssueHistoryResponseDto>>> ForUser(int userId)
            => Ok(await _service.GetHistoryForUserAsync(userId));
    }
}
