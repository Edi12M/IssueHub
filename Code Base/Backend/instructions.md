# Claude Code — Backend Implementation Instructions

## BEFORE YOU START

1. **Read the models folder** — Go through every file in the `Models/` folder to understand how entities are connected (foreign keys, navigation properties, join tables). Pay special attention to:
   - `User.cs`
   - `Project.cs`
   - `ProjectMembers.cs` (join table — has `HourlyRate`)
   - `Issue.cs`
   - `IssueAssignment.cs` (join table — who is assigned to an issue)
   - `IssueDependency.cs`
   - `IssueHistory.cs`
   - `TimeLog.cs` (has `IsBillable`)

2. **Read the existing `AppDbContext`** to understand the DbSet registrations and any configurations.

3. **Read `Program.cs`** to understand the current DI registrations and middleware pipeline.
4. **Read C:\Users\User\Desktop\University\IssueHub\Weekly Reports\[Week 6] Requirements Engineering\Week 6 - Markdown Report.md to get an idea of the project.

---

## ARCHITECTURE PATTERN

Follow this pattern strictly for every service and controller:

### Services
- Each service class implements an interface (e.g., `UserService : IUserService`)
- Services inject `AppDbContext` via constructor
- Services contain all business logic
- Services return **DTOs** (not raw model entities)
- Services own **static mapping functions** (e.g., `private static UserDto MapToUserDto(User user)`) for converting entities to DTOs — these are reusable within the service
- Services throw exceptions on error (`KeyNotFoundException`, `InvalidOperationException`, or the custom exceptions defined later)

### Controllers
- Controllers inject **both** `AppDbContext` **and** the service interface via constructor
- Controllers call service methods for business logic
- Controllers can do **simple, direct queries** on `AppDbContext` when needed (e.g., existence checks, fetching a single entity for a null check)
- Controllers build response DTOs **only** when combining data from multiple sources (e.g., data from a direct query + data from a service call). Otherwise, they return whatever the service gives them.
- Controllers do **not** contain business logic

### DTOs
- Separate request DTOs (Create, Update) from response DTOs
- Update DTOs have **nullable fields** for partial updates
- DTOs live in a `DTOs/` folder, organized by domain (e.g., `DTOs/User/`, `DTOs/Project/`)

---

## PHASE 0 — MODEL CHANGES

Apply these changes to the models before implementing anything else:

1. **User model** — Add `Department` (string, nullable) and `Icon` (string, nullable) fields.
2. **User model** — Rename `CreateAt` to `CreatedAt`. Update all references across the codebase.
3. **UserRole enum** — Use the actual values: `Admin`, `Manager`, `Developer`, `Guest`. All instructions referencing "ProjectManager" mean `Manager`.
4. **Project model** — Add `Goals` (string, nullable) and `Methodology` (string, default "Scrum"). The existing `Type` field serves as tags — do NOT add a separate Tags field.
5. **Project model** — Create a `ProjectStatus` enum with values: `Active`, `Archived`, `Closed`. Replace the current status typing on Project with `ProjectStatus`. Remove the `IsArchived` bool — archiving is handled by setting status to `Archived`. Make sure `User` still uses `UserStatus`.
6. **ProjectMembers model** — Rename `HourRate` to `HourlyRate` and change type from `int` to `decimal`.

After changes, run `dotnet build` to verify everything compiles.

**→ STOP. Ask for review.**

---

## PHASE 1 — SERVICES + DTOs

Implement **only** these 7 services. If any other services exist in the codebase from a previous iteration, **delete them**. The final `Services/` folder should contain exactly these files and their interfaces.

**DTOs are created alongside each service** — when implementing a service, create only the DTOs that service needs in `DTOs/<Domain>/`. Do NOT create DTOs as a separate phase. They get reviewed together with their service.

Implement them **one at a time** in the order below. After finishing each service + its DTOs, **stop and ask for my review** before moving to the next.

### 1. UserService : IUserService

Interface + class in `Services/` with interface in `Services/Interfaces/`.

Methods:
- `SearchUsersAsync(string query)` — search users by name or email using case-insensitive `.Contains()`. Return list of DTOs with: id, icon, full name, email, role, status.
- `CreateUserAsync(CreateUserDto dto)` — create user with full name, email, department, role, password. Hash password with `BCrypt.Net.BCrypt.HashPassword()`. Check for duplicate email first. Set status to "Active", set `CreatedAt` to `DateTime.UtcNow`.
- `UpdateUserAsync(int userId, UpdateUserDto dto)` — partial update for name, email, department, role, status. Only update non-null fields. Check for duplicate email if email is being changed.
- `DeleteUserAsync(int userId)` — delete user. Throw if not found.
- `GetUserCountsByRoleAsync()` — return total user count + specific counts for Admin, Manager, Developer using `GroupBy`. Single method, single DTO.
- `GetLastCreatedUserAsync()` — return name and created date of the most recently created user.

Each method that returns DTOs should use a `private static` mapping function.

**→ STOP. Ask for review.**

### 2. ProjectService : IProjectService

Methods:
- `SearchProjectsAsync(string query)` — search by project name or manager name (case-insensitive contains). Return list with: status, manager name, team size (count from `ProjectMembers`), deadline, open issue count, completed issue count, created date, type (this is the tags field), budget used.
- `CreateProjectAsync(CreateProjectDto dto)` — create with name, description, goals, start date, end date. Defaults: visibility = "Private", methodology = "Scrum".
- `UpdateProjectAsync(int projectId, UpdateProjectDto dto)` — partial update, nullable fields.
- `UpdateProjectStatusAsync(int projectId, string status)` — update only the status field.
- `ArchiveProjectAsync(int projectId)` — set status to "Archived".
- `GetProjectsByStatusAsync(string status)` — filter and return list by status (Active, Archived, Closed).
- `GetProjectsByManagerAsync(int managerId)` — return list with: title, description, status, methodology, member count.
- `GetProjectsByManagerFilteredAsync(int managerId, string? status, string? type)` — same as above but filtered. If no filters given, return all for that manager.
- `GetProjectCountsByStatusAsync()` — return counts for active, archived, closed.
- `GetLastCreatedProjectAsync()` — return title and created date.
- `GetMemberCountAsync(int projectId)` — count from `ProjectMembers` table.
- `GetOpenIssueCountAsync(int projectId)` — count issues with status "Open" for that project.
- `GetClosedIssueCountAsync(int projectId)` — count issues with status "Closed" for that project.
- `GetBudgetUsedAsync(int projectId)` — join `TimeLog` with `ProjectMembers` on user + project. Sum `hours × hourlyRate` where `isBillable == true`.

**→ STOP. Ask for review.**

### 3. IssueService : IIssueService

Methods:
- `CreateIssueAsync(CreateIssueDto dto)` — create issue with title, description, type, acceptance criteria, priority, start date, due date, project FK. Also accept a list of issue IDs that depend on this issue and create `IssueDependency` records.
- `UpdateIssueAsync(int issueId, UpdateIssueDto dto)` — partial update, nullable fields.
- `CreateIssueHistoryAsync(CreateIssueHistoryDto dto)` — create a history record for an issue.
- `GetAllIssuesCountAsync()` — total issue count across all projects.
- `GetIssuesByAdminAsync(int adminId)` — issues created by a specific admin. Return: title, target, type, date assigned.
- `GetIssuesByAdminFilteredByTypeAsync(int adminId, string type)` — same as above, filtered by type.
- `GetLastCreatedSecurityIssueAsync()` — most recent issue with type "Security". Return: title, creator name.
- `GetTasksFilteredAsync(int userId, string? status, string? priority)` — return issues for projects where the user is a member (Developer or Manager role) via `ProjectMembers`. Filter by status and/or priority. If no filters, return all.

**→ STOP. Ask for review.**

### 4. AuthenticationService : IAuthenticationService

Methods:
- `LoginAsync(LoginDto dto)` — validate email + password using `BCrypt.Net.BCrypt.Verify()`. If email not found, throw. If password wrong, call `IncrementFailedLoginAttemptAsync`. If correct, call `UpdateLastLoginAsync` and generate + return a JWT token.
- `IncrementFailedLoginAttemptAsync(string email)` — find user by email, increment the failed login attempt counter, save.
- `UpdateLastLoginAsync(int userId)` — set the last login timestamp to `DateTime.UtcNow`, save.

Add this comment at the top of the service class:
```csharp
// TODO: Implement lockout logic — check and update time until lockout after repeated failed login attempts
```

For JWT generation, read the existing JWT configuration in `Program.cs` or `appsettings.json` to understand the key, issuer, audience setup. Generate a token with claims for user ID, email, and role.

**→ STOP. Ask for review.**

### 5. AssignmentService : IAssignmentService

Methods:
- `AssignIssueToUserAsync(int issueId, int userId)` — create an `IssueAssignment` record. Check that both the issue and user exist. Check for duplicate assignment.
- `AssignUserToProjectAsync(int projectId, int userId)` — create a `ProjectMembers` record. Check that both the project and user exist. Check for duplicate membership.

**→ STOP. Ask for review.**

### 6. TimeLogService : ITimeLogService

Methods:
- `CreateTimeLogAsync(CreateTimeLogDto dto)` — create a time log entry.
- `CalculateBudgetUsedAsync(int projectId)` — join `TimeLog` with `ProjectMembers` (on user ID + project ID) to get `hourlyRate`. Sum `hours × hourlyRate` where `isBillable == true`. Return a decimal.

**→ STOP. Ask for review.**

### 7. HealthService : IHealthService

Methods:
- `GetSystemHealthAsync()` — return system uptime. Calculate from application start time. Return an object with uptime as a `TimeSpan` or formatted string.

**→ STOP. Ask for review.**

---

## PHASE 2 — EXCEPTIONS AND MIDDLEWARE

After all services are reviewed, implement:

### Custom Exceptions (in `Exceptions/` folder)
- `NotFoundException` — takes entity name and ID
- `ConflictException` — takes a message (for duplicates)
- `BadRequestException` — takes a message (for validation)

### Exception Handler Middleware (in `Middleware/` folder)
- `ExceptionHandlerMiddleware` — catches exceptions and maps them:
  - `NotFoundException` → 404
  - `ConflictException` → 409
  - `BadRequestException` → 400
  - `KeyNotFoundException` → 404
  - `InvalidOperationException` → 409
  - `Exception` (catch-all) → 500
- Returns JSON: `{ "error": "message here" }`

Register in `Program.cs`: `app.UseMiddleware<ExceptionHandlerMiddleware>();`

**→ STOP. Ask for review.**

---

## PHASE 3 — CONTROLLERS

Implement controllers **one at a time** in the same order as the services. After each controller, **stop and ask for my review**.

Every controller follows this pattern:
```csharp
[ApiController]
[Route("api/[controller]")]
public class XController : ControllerBase
{
    private readonly IXService _service;
    private readonly AppDbContext _context;

    public XController(IXService service, AppDbContext context)
    {
        _service = service;
        _context = context;
    }
}
```

### 1. UserController
Endpoints for: search (GET), create (POST), update (PUT), delete (DELETE), role counts (GET), last created (GET).

**→ STOP. Ask for review.**

### 2. ProjectController
Endpoints for: search (GET), create (POST), update (PUT), update status (PATCH), archive (PATCH), filter by status (GET), by manager (GET), by manager filtered (GET), stats (GET), last created (GET), member count (GET), open issues (GET), closed issues (GET), budget used (GET).

**→ STOP. Ask for review.**

### 3. IssueController
Endpoints for: create (POST), update (PUT), create history (POST), total count (GET), by admin (GET), by admin filtered by type (GET), last security issue (GET), tasks filtered (GET).

**→ STOP. Ask for review.**

### 4. AuthController
Endpoints for: login (POST).

The `IncrementFailedLoginAttemptAsync` and `UpdateLastLoginAsync` are internal — called by `LoginAsync`, not exposed as endpoints.

**→ STOP. Ask for review.**

### 5. AssignmentController
Endpoints for: assign issue to user (POST), assign user to project (POST).

**→ STOP. Ask for review.**

### 6. TimeLogController
Endpoints for: create time log (POST), budget used (GET).

**→ STOP. Ask for review.**

### 7. HealthController
Endpoints for: system health (GET).

**→ STOP. Ask for review.**

---

## PHASE 4 — PROGRAM.CS REGISTRATION

After all controllers are reviewed, update `Program.cs`:

1. Register all 7 services as scoped:
```csharp
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IIssueService, IssueService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IAssignmentService, AssignmentService>();
builder.Services.AddScoped<ITimeLogService, TimeLogService>();
builder.Services.AddScoped<IHealthService, HealthService>();
```

2. Register the exception handler middleware.

3. Remove any old service registrations that no longer exist.

**→ STOP. Ask for final review.**

---

## CLEANUP

After everything is approved:
- Delete any service files not in the 7 listed above
- Delete any controller files that don't match the 7 listed above
- Delete any orphaned DTOs
- Make sure the project builds with `dotnet build`