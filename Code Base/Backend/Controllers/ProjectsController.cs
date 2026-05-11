using Backend.Data;
using Backend.DTOs.Projects;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/projects
    [HttpGet]
    public async Task<ActionResult<List<ProjectResponseDto>>> GetProjects()
    {
        var projects = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .OrderByDescending(p => p.CreateAt)
            .Select(p => ToResponseDto(p))
            .ToListAsync();

        return Ok(projects);
    }

    // GET: api/projects/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProjectResponseDto>> GetProject(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound("Project not found.");

        return Ok(ToResponseDto(project));
    }

    // POST: api/projects
    [HttpPost]
    public async Task<ActionResult<ProjectResponseDto>> CreateProject(CreateProjectDto dto)
    {
        var projectCodeExists = await _context.Projects
            .AnyAsync(p => p.ProjectCode.ToLower() == dto.ProjectCode.ToLower());

        if (projectCodeExists)
            return BadRequest("A project with this project code already exists.");

        var ownerExists = await _context.Users.AnyAsync(u => u.Id == dto.OwnerId);

        if (!ownerExists)
            return BadRequest("Owner user does not exist.");

        var workflowExists = await _context.Workflows.AnyAsync(w => w.Id == dto.WorkflowId);

        if (!workflowExists)
            return BadRequest("Workflow does not exist.");

        if (dto.EndDate < dto.StartDate)
            return BadRequest("End date cannot be before start date.");

        var project = new Project
        {
            Name = dto.Name.Trim(),
            ProjectCode = dto.ProjectCode.Trim(),
            Description = dto.Description.Trim(),
            Type = dto.Type,
            Visibility = dto.Visibility,
            Status = dto.Status,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            IsArchived = false,
            BudgetHours = dto.BudgetHours,
            OwnerId = dto.OwnerId,
            WorkflowId = dto.WorkflowId,
            CreateAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var createdProject = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .FirstAsync(p => p.Id == project.Id);

        return CreatedAtAction(
            nameof(GetProject),
            new { id = createdProject.Id },
            ToResponseDto(createdProject)
        );
    }

    // PUT: api/projects/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProjectResponseDto>> UpdateProject(int id, UpdateProjectDto dto)
    {
        var project = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound("Project not found.");

        var ownerExists = await _context.Users.AnyAsync(u => u.Id == dto.OwnerId);

        if (!ownerExists)
            return BadRequest("Owner user does not exist.");

        var workflowExists = await _context.Workflows.AnyAsync(w => w.Id == dto.WorkflowId);

        if (!workflowExists)
            return BadRequest("Workflow does not exist.");

        if (dto.EndDate < dto.StartDate)
            return BadRequest("End date cannot be before start date.");

        project.Name = dto.Name.Trim();
        project.Description = dto.Description.Trim();
        project.Type = dto.Type;
        project.Visibility = dto.Visibility;
        project.Status = dto.Status;
        project.StartDate = dto.StartDate;
        project.EndDate = dto.EndDate;
        project.BudgetHours = dto.BudgetHours;
        project.OwnerId = dto.OwnerId;
        project.WorkflowId = dto.WorkflowId;
        project.IsArchived = dto.IsArchived;

        await _context.SaveChangesAsync();

        var updatedProject = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .FirstAsync(p => p.Id == id);

        return Ok(ToResponseDto(updatedProject));
    }

    // PATCH: api/projects/5/archive
    [HttpPatch("{id:int}/archive")]
    public async Task<ActionResult<ProjectResponseDto>> ArchiveProject(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Owner)
            .Include(p => p.Workflow)
            .Include(p => p.ProjectMembers)
            .Include(p => p.Issues)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
            return NotFound("Project not found.");

        project.IsArchived = true;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(project));
    }

    // DELETE: api/projects/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
            return NotFound("Project not found.");

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static ProjectResponseDto ToResponseDto(Project project)
    {
        return new ProjectResponseDto
        {
            Id = project.Id,
            Name = project.Name,
            ProjectCode = project.ProjectCode,
            Description = project.Description,
            Type = project.Type,
            Visibility = project.Visibility,
            Status = project.Status,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            IsArchived = project.IsArchived,
            BudgetHours = project.BudgetHours,
            OwnerId = project.OwnerId,
            OwnerName = project.Owner?.FullName,
            WorkflowId = project.WorkflowId,
            WorkflowName = project.Workflow?.Name,
            CreatedAt = project.CreateAt,
            MembersCount = project.ProjectMembers?.Count ?? 0,
            IssuesCount = project.Issues?.Count ?? 0
        };
    }
}