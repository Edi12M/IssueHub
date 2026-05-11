using Backend.Data;
using Backend.DTOs.ProjectMembers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/projects/{projectId:int}/members")]
public class ProjectMembersController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectMembersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/projects/5/members
    [HttpGet]
    public async Task<ActionResult<List<ProjectMemberResponseDto>>> GetProjectMembers(int projectId)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var members = await _context.ProjectMembers
            .Include(pm => pm.Project)
            .Include(pm => pm.User)
            .Where(pm => pm.ProjectId == projectId)
            .OrderBy(pm => pm.User.FullName)
            .Select(pm => ToResponseDto(pm))
            .ToListAsync();

        return Ok(members);
    }

    // POST: api/projects/5/members
    [HttpPost]
    public async Task<ActionResult<ProjectMemberResponseDto>> AddProjectMember(
        int projectId,
        AddProjectMemberDto dto)
    {
        var projectExists = await _context.Projects.AnyAsync(p => p.Id == projectId);

        if (!projectExists)
            return NotFound("Project not found.");

        var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);

        if (!userExists)
            return BadRequest("User does not exist.");

        var alreadyMember = await _context.ProjectMembers
            .AnyAsync(pm => pm.ProjectId == projectId && pm.UserId == dto.UserId);

        if (alreadyMember)
            return BadRequest("User is already a member of this project.");

        var member = new ProjectMembers
        {
            ProjectId = projectId,
            UserId = dto.UserId,
            Role = dto.Role,
            JoinedAt = DateTime.UtcNow
        };

        _context.ProjectMembers.Add(member);
        await _context.SaveChangesAsync();

        var createdMember = await _context.ProjectMembers
            .Include(pm => pm.Project)
            .Include(pm => pm.User)
            .FirstAsync(pm => pm.Id == member.Id);

        return CreatedAtAction(
            nameof(GetProjectMembers),
            new { projectId },
            ToResponseDto(createdMember)
        );
    }

    // PATCH: api/projects/5/members/10/role
    [HttpPatch("{userId:int}/role")]
    public async Task<ActionResult<ProjectMemberResponseDto>> UpdateProjectMemberRole(
        int projectId,
        int userId,
        UpdateProjectMemberRoleDto dto)
    {
        var member = await _context.ProjectMembers
            .Include(pm => pm.Project)
            .Include(pm => pm.User)
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (member == null)
            return NotFound("Project member not found.");

        member.Role = dto.Role;

        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(member));
    }

    // DELETE: api/projects/5/members/10
    [HttpDelete("{userId:int}")]
    public async Task<IActionResult> RemoveProjectMember(int projectId, int userId)
    {
        var member = await _context.ProjectMembers
            .FirstOrDefaultAsync(pm => pm.ProjectId == projectId && pm.UserId == userId);

        if (member == null)
            return NotFound("Project member not found.");

        _context.ProjectMembers.Remove(member);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static ProjectMemberResponseDto ToResponseDto(ProjectMembers member)
    {
        return new ProjectMemberResponseDto
        {
            Id = member.Id,
            ProjectId = member.ProjectId,
            ProjectName = member.Project?.Name ?? string.Empty,
            UserId = member.UserId,
            FullName = member.User?.FullName ?? string.Empty,
            Email = member.User?.Email ?? string.Empty,
            Role = member.Role,
            JoinedAt = member.JoinedAt
        };
    }
}