using Backend.Data;
using Backend.DTOs.Health;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly IHealthService _service;
        private readonly AppDbContext _context;

        public HealthController(IHealthService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<SystemHealthDto>> Get()
            => Ok(await _service.GetSystemHealthAsync());
    }
}
