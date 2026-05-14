using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.Attachments;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttachmentController : ControllerBase
    {
        private readonly IAttachmentService _service;
        private readonly AppDbContext _context;

        public AttachmentController(IAttachmentService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        private int CurrentUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost("issue/{issueId:int}")]
        public async Task<ActionResult<AttachmentResponseDto>> Upload(int issueId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "File is required." });

            await using var stream = file.OpenReadStream();
            var result = await _service.CreateAttachmentAsync(
                issueId,
                CurrentUserId(),
                file.FileName,
                file.ContentType,
                file.Length,
                stream);

            return Ok(result);
        }

        [HttpGet("{attachmentId:int}")]
        public async Task<ActionResult<AttachmentResponseDto>> Get(int attachmentId)
            => Ok(await _service.GetAttachmentAsync(attachmentId));

        [HttpGet("{attachmentId:int}/download")]
        public async Task<IActionResult> Download(int attachmentId)
        {
            var download = await _service.GetAttachmentDownloadAsync(attachmentId);
            return PhysicalFile(download.FilePath, download.FileType, download.FileName);
        }

        [HttpGet("issue/{issueId:int}")]
        public async Task<ActionResult<List<AttachmentResponseDto>>> ForIssue(int issueId)
            => Ok(await _service.GetAttachmentsForIssueAsync(issueId));

        [HttpDelete("{attachmentId:int}")]
        public async Task<IActionResult> Delete(int attachmentId)
        {
            await _service.DeleteAttachmentAsync(attachmentId, CurrentUserId());
            return NoContent();
        }
    }
}
