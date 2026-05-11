using Backend.Data;
using Backend.DTOs.IssueDependencies;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
public class IssueDependenciesController : ControllerBase
{
    private readonly AppDbContext _context;

    public IssueDependenciesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/issues/5/dependencies
    [HttpGet("api/issues/{issueId:int}/dependencies")]
    public async Task<ActionResult<List<IssueDependencyResponseDto>>> GetIssueDependencies(int issueId)
    {
        var issueExists = await _context.Issues.AnyAsync(i => i.Id == issueId);

        if (!issueExists)
            return NotFound("Issue not found.");

        var dependencies = await _context.IssueDependencies
            .Include(d => d.Issue)
            .Include(d => d.DependsOn)
            .Where(d => d.IssueId == issueId)
            .OrderByDescending(d => d.CreatedAt)
            .Select(d => ToResponseDto(d))
            .ToListAsync();

        return Ok(dependencies);
    }

    // POST: api/issues/5/dependencies
    [HttpPost("api/issues/{issueId:int}/dependencies")]
    public async Task<ActionResult<IssueDependencyResponseDto>> CreateIssueDependency(
        int issueId,
        CreateIssueDependencyDto dto)
    {
        var issue = await _context.Issues.FindAsync(issueId);

        if (issue == null)
            return NotFound("Issue not found.");

        if (issue.IsArchived)
            return BadRequest("Archived issues are read-only.");

        if (issueId == dto.DependsOnId)
            return BadRequest("An issue cannot depend on itself.");

        var dependsOnIssue = await _context.Issues.FindAsync(dto.DependsOnId);

        if (dependsOnIssue == null)
            return BadRequest("Dependency issue does not exist.");

        if (issue.ProjectId != dependsOnIssue.ProjectId)
            return BadRequest("Dependency must belong to the same project.");

        var alreadyExists = await _context.IssueDependencies.AnyAsync(d =>
            d.IssueId == issueId &&
            d.DependOnId == dto.DependsOnId);

        if (alreadyExists)
            return BadRequest("This dependency already exists.");

        var dependency = new IssueDependency
        {
            IssueId = issueId,
            DependOnId = dto.DependsOnId,
            Type = dto.Type,
            CreatedAt = DateTime.UtcNow
        };

        _context.IssueDependencies.Add(dependency);
        await _context.SaveChangesAsync();

        var createdDependency = await _context.IssueDependencies
            .Include(d => d.Issue)
            .Include(d => d.DependsOn)
            .FirstAsync(d => d.Id == dependency.Id);

        return CreatedAtAction(
            nameof(GetIssueDependencies),
            new { issueId },
            ToResponseDto(createdDependency)
        );
    }

    // DELETE: api/issues/5/dependencies/10
    [HttpDelete("api/issues/{issueId:int}/dependencies/{dependencyId:int}")]
    public async Task<IActionResult> DeleteIssueDependency(int issueId, int dependencyId)
    {
        var dependency = await _context.IssueDependencies
            .FirstOrDefaultAsync(d => d.Id == dependencyId && d.IssueId == issueId);

        if (dependency == null)
            return NotFound("Dependency not found.");

        _context.IssueDependencies.Remove(dependency);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static IssueDependencyResponseDto ToResponseDto(IssueDependency dependency)
    {
        return new IssueDependencyResponseDto
        {
            Id = dependency.Id,
            IssueId = dependency.IssueId,
            IssueTitle = dependency.Issue?.Title,
            DependsOnId = dependency.DependOnId,
            DependsOnTitle = dependency.DependsOn?.Title,
            Type = dependency.Type,
            CreatedAt = dependency.CreatedAt
        };
    }
}