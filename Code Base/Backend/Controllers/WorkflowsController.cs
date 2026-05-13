using Backend.Data;
using Backend.DTOs.Workflows;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkflowsController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkflowsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/workflows
    [HttpGet]
    public async Task<ActionResult<List<WorkflowResponseDto>>> GetWorkflows()
    {
        var workflows = await _context.Workflows
            .Include(w => w.CreatedBy)
            .OrderByDescending(w => w.CreatedAt)
            .Select(w => ToResponseDto(w))
            .ToListAsync();

        return Ok(workflows);
    }

    // GET: api/workflows/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<WorkflowResponseDto>> GetWorkflow(int id)
    {
        var workflow = await _context.Workflows
            .Include(w => w.CreatedBy)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workflow == null)
            return NotFound("Workflow not found.");

        return Ok(ToResponseDto(workflow));
    }

    // POST: api/workflows
    [HttpPost]
    public async Task<ActionResult<WorkflowResponseDto>> CreateWorkflow(CreateWorkflowDto dto)
    {
        var creatorExists = await _context.Users.AnyAsync(u => u.Id == dto.CreatedById);

        if (!creatorExists)
            return BadRequest("Creator user does not exist.");

        var workflow = new Workflow
        {
            Name = dto.Name.Trim(),
            Description = dto.Description.Trim(),
            CreatedById = dto.CreatedById,
            CreatedAt = DateTime.UtcNow
        };

        _context.Workflows.Add(workflow);
        await _context.SaveChangesAsync();

        var createdWorkflow = await _context.Workflows
            .Include(w => w.CreatedBy)
            .FirstAsync(w => w.Id == workflow.Id);

        return CreatedAtAction(
            nameof(GetWorkflow),
            new { id = createdWorkflow.Id },
            ToResponseDto(createdWorkflow)
        );
    }

    // PUT: api/workflows/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<WorkflowResponseDto>> UpdateWorkflow(
        int id,
        UpdateWorkflowDto dto)
    {
        var workflow = await _context.Workflows
            .Include(w => w.CreatedBy)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workflow == null)
            return NotFound("Workflow not found.");

        workflow.Name = dto.Name.Trim();
        workflow.Description = dto.Description.Trim();

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(workflow));
    }

    // DELETE: api/workflows/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteWorkflow(int id)
    {
        var workflow = await _context.Workflows.FindAsync(id);

        if (workflow == null)
            return NotFound("Workflow not found.");

        var usedByProject = await _context.Projects.AnyAsync(p => p.WorkflowId == id);

        if (usedByProject)
            return BadRequest("Cannot delete workflow because it is used by one or more projects.");

        _context.Workflows.Remove(workflow);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static WorkflowResponseDto ToResponseDto(Workflow workflow)
    {
        return new WorkflowResponseDto
        {
            Id = workflow.Id,
            Name = workflow.Name,
            Description = workflow.Description,
            CreatedById = workflow.CreatedById,
            CreatedByName = workflow.CreatedBy?.FullName,
            CreatedAt = workflow.CreatedAt
        };
    }
}