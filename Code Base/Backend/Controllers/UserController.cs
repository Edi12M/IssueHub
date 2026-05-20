using Backend.Data;
using Backend.DTOs.Users;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly AppDbContext _context;

        public UserController(IUserService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<UserSearchResultDto>>> Search([FromQuery] string q = "")
            => Ok(await _service.SearchUsersAsync(q));

        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> Create([FromBody] CreateUserDto dto)
            => Ok(await _service.CreateUserAsync(dto));

        [HttpPut("{userId:int}")]
        public async Task<ActionResult<UserResponseDto>> Update(int userId, [FromBody] UpdateUserDto dto)
            => Ok(await _service.UpdateUserAsync(userId, dto));

        [HttpDelete("{userId:int}")]
        public async Task<IActionResult> Delete(int userId)
        {
            await _service.DeleteUserAsync(userId);
            return NoContent();
        }

        [HttpGet("counts-by-role")]
        public async Task<ActionResult<UserCountsByRoleDto>> CountsByRole()
            => Ok(await _service.GetUserCountsByRoleAsync());

        [HttpGet("last-created")]
        public async Task<ActionResult<LastCreatedUserDto?>> LastCreated()
            => Ok(await _service.GetLastCreatedUserAsync());
    }
}
