# DTOs

This folder contains the Data Transfer Objects used by the IssueHub backend API.

DTOs are used to separate the API request/response structure from the database models.  
Instead of exposing full entity models directly to the frontend, controllers receive and return DTOs.

Auth DTOs -> Used by the authentication endpoints.

    LoginRequestDto receives login credentials.
    LoginResponseDto returns login result information and safe user data.

Users DTOs -> Used by user management endpoints.

    Create users.
    Update user profile details.
    Change user roles.
    Return safe user data without exposing password hashes.

Projects DTOs -> Used by project management endpoints.

    Create projects.
    Update project details.
    Return project information including owner, workflow, member count, and issue count.

ProjectMembers DTOs -> Used by project membership endpoints.

    Add users to projects.
    Change project-level member roles.
    Return member information.

Issues DTOs -> Used by issue/task management endpoints.

    Create issues.
    Update issue details.
    Change issue status.
    Set priority.
    Set deadlines.
    Assign issues to users.
    Return issue/task data to the frontend.

IssueHistory DTOs -> Used for issue activity/history logs.

    Return status changes, priority changes, deadline changes, assignments, comments, attachments, and time log actions related to an issue.

Comments DTOs -> Used by issue comment endpoints.

    Add comments to issues.
    Edit comments.
    Return threaded comment data.
    Support soft-delete behavior.

Attachments DTOs -> Used by issue attachment endpoints.

    Return uploaded attachment metadata.
    File upload itself is handled using IFormFile in the controller.

TimeLogs DTOs -> Used by time tracking endpoints.

    Log work hours.
    Update time logs.
    Return billable/non-billable time tracking data.

Notifications DTOs -> Used by notification endpoints.

    Create in-app notifications.
    Return notifications to users.
    Mark notifications as read.

Workflows DTOs -> Used by workflow management endpoints.

    Create workflow definitions.
    Update workflow details.
    Return workflow information.

IssueDependencies DTOs -> Used by issue dependency endpoints.

    Link issues together.
    Represent blocking, duplicate, or related issue relationships.
    Prevent invalid dependency relationships such as self-dependencies.

Meetings DTOs -> Used by meeting and meeting-audio endpoints.

    Create meeting records.
    Update meeting details.
    Upload meeting audio.
    Store transcript and summary data.

Announcements DTOs

    Create project announcements.
    Update announcements.
    Return announcement data to project members.