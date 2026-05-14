using System.Security.Claims;
using Backend.Data;
using Backend.DTOs.Notifications;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;
        private readonly AppDbContext _context;

        public NotificationController(INotificationService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        private int CurrentUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("me")]
        public async Task<ActionResult<List<NotificationResponseDto>>> Mine()
            => Ok(await _service.GetNotificationsForUserAsync(CurrentUserId()));

        [HttpPatch("{notificationId:int}/read")]
        public async Task<ActionResult<NotificationResponseDto>> MarkRead(int notificationId)
            => Ok(await _service.MarkAsReadAsync(notificationId, CurrentUserId()));
    }
}
