# Controllers

Controllers receive DTOs, validate requests, interact with the database through AppDbContext, and return DTO responses.

AuthController -> Handles user login.  
    Main Endpoint: POST /api/auth/login

UsersController -> Handles system user management.  
    Main Endpoints:  
    GET /api/users  
    GET /api/users/{id}  
    POST /api/users  
    PUT /api/users/{id}  
    PATCH /api/users/{id}/role  
    PATCH /api/users/{id}/deactivate  
    DELETE /api/users/{id}

ProjectsController -> Handles project management.  
    Main Endpoints:  
    GET /api/projects  
    GET /api/projects/{id}  
    POST /api/projects  
    PUT /api/projects/{id}  
    PATCH /api/projects/{id}/archive  
    DELETE /api/projects/{id}

ProjectMembersController -> Handles project team membership.  
    Main Endpoints:  
    GET /api/projects/{projectId}/members  
    POST /api/projects/{projectId}/members  
    PATCH /api/projects/{projectId}/members/{userId}/role  
    DELETE /api/projects/{projectId}/members/{userId}

IssuesController -> Handles issue/task management.  
    Main Endpoints:  
    GET /api/issues  
    GET /api/issues/{id}  
    POST /api/issues  
    PUT /api/issues/{id}  
    PATCH /api/issues/{id}/status  
    PATCH /api/issues/{id}/priority  
    PATCH /api/issues/{id}/deadline  
    PATCH /api/issues/{id}/archive  
    POST /api/issues/{id}/assignments  
    GET /api/issues/{id}/history  
    DELETE /api/issues/{id}

IssueDependenciesController -> Handles relationships between issues.  
    Main Endpoints:  
    GET /api/issues/{issueId}/dependencies  
    POST /api/issues/{issueId}/dependencies  
    DELETE /api/issues/{issueId}/dependencies/{dependencyId}

CommentsController -> Handles comments on issues.  
    Main Endpoints:  
    GET /api/issues/{issueId}/comments  
    POST /api/issues/{issueId}/comments  
    PUT /api/comments/{id}  
    DELETE /api/comments/{id}

AttachmentsController -> Handles file uploads for issues.  
    Main Endpoints:  
    GET /api/issues/{issueId}/attachments  
    POST /api/issues/{issueId}/attachments  
    DELETE /api/attachments/{id}

TimeLogsController -> Handles time tracking.  
    Main Endpoints:  
    GET /api/issues/{issueId}/timelogs  
    GET /api/users/{userId}/timelogs  
    POST /api/issues/{issueId}/timelogs  
    PUT /api/timelogs/{id}  
    DELETE /api/timelogs/{id}

NotificationsController -> Handles user notifications.  
    Main Endpoints:  
    GET /api/notifications  
    GET /api/notifications/{id}  
    POST /api/notifications  
    PATCH /api/notifications/{id}/read  
    PATCH /api/notifications/user/{userId}/read-all  
    DELETE /api/notifications/{id}

WorkflowsController -> Handles workflow definitions.  
    Main Endpoints:  
    GET /api/workflows  
    GET /api/workflows/{id}  
    POST /api/workflows  
    PUT /api/workflows/{id}  
    DELETE /api/workflows/{id}

MeetingsController -> Handles project meetings and meeting audio.  
    Main Endpoints:  
    GET /api/projects/{projectId}/meetings  
    GET /api/meetings/{id}  
    POST /api/projects/{projectId}/meetings  
    PUT /api/meetings/{id}  
    PATCH /api/meetings/{id}/summary  
    POST /api/meetings/{id}/upload-audio  
    DELETE /api/meetings/{id}

AnnouncementsController -> Handles project announcements.  
    Main Endpoints:  
    GET /api/projects/{projectId}/announcements  
    GET /api/announcements/{id}  
    POST /api/projects/{projectId}/announcements  
    PUT /api/announcements/{id}  
    DELETE /api/announcements/{id}