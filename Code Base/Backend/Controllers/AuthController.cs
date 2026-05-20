using Backend.Data;
using Backend.DTOs.Auth;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _service;
        private readonly AppDbContext _context;

        public AuthController(IAuthenticationService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto dto)
        {
            var result = await _service.LoginAsync(dto);
            return Ok(result);
        }
    }
}
