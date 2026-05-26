using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.Comments;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;
        private readonly AppDbContext _context;

        public CommentController(ICommentService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        private int CurrentUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost]
        public async Task<ActionResult<CommentResponseDto>> Create([FromBody] CreateCommentDto dto)
            => Ok(await _service.CreateCommentAsync(dto, CurrentUserId()));

        [HttpGet("{commentId:int}")]
        public async Task<ActionResult<CommentResponseDto>> Get(int commentId)
            => Ok(await _service.GetCommentAsync(commentId));

        [HttpPut("{commentId:int}")]
        public async Task<ActionResult<CommentResponseDto>> Update(int commentId, [FromBody] UpdateCommentDto dto)
            => Ok(await _service.UpdateCommentAsync(commentId, dto, CurrentUserId()));

        [HttpDelete("{commentId:int}")]
        public async Task<IActionResult> Delete(int commentId)
        {
            await _service.DeleteCommentAsync(commentId, CurrentUserId());
            return NoContent();
        }

        [HttpGet("issue/{issueId:int}")]
        public async Task<ActionResult<List<CommentResponseDto>>> ForIssue(int issueId)
            => Ok(await _service.GetCommentsForIssueAsync(issueId));
    }
}
