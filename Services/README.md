# Services
Here will be the logic. Used by the controllers

# An idea of the services that ared to be used (these are general ideas that can surely change with time) :

## Table of Contents

1. [Auth Service](#1-auth-service)
2. [User Management Service](#2-user-management-service)
3. [Project Service](#3-project-service)
4. [Task / Issue Service](#4-task--issue-service)
5. [Milestone Service](#5-milestone-service)
6. [Sprint Service](#6-sprint-service)
7. [Comment Service](#7-comment-service)
8. [Attachment Service](#8-attachment-service)
9. [Notification Service](#9-notification-service)
10. [Time Tracking Service](#10-time-tracking-service)
11. [Budget Service](#11-budget-service)
12. [Reporting Service](#12-reporting-service)
13. [Meeting / AI Service](#13-meeting--ai-service)
14. [Integration Service](#14-integration-service)
15. [Admin / System Service](#15-admin--system-service)
16. [Architecture Notes](#16-architecture-notes)

---

## 1. Auth Service

Handles all authentication, session management, and access security.

| Function | Description |
|---|---|
| `login(email, password)` | Validates credentials, checks account status, returns a session token or JWT. Triggers lockout tracking on failure. |
| `logout(sessionToken)` | Invalidates the active session. |
| `lockAccount(userId, durationMinutes)` | Temporarily suspends login ability after repeated failures. Standard users: 15 min, admins: 30 min. |
| `incrementFailedAttempts(userId)` | Tracks consecutive login failures and triggers `lockAccount` when threshold (5 attempts) is reached. |
| `enforceSessionTimeout(sessionToken)` | Checks last activity timestamp and terminates the session if it exceeds the configured timeout. |
| `verifyMFA(userId, otpCode)` | Validates a TOTP or email OTP code. Required for all System Administrator accounts. |
| `generateMFASecret(userId)` | Creates and stores a new MFA secret during onboarding or reset. |
| `validateSession(sessionToken)` | Confirms a token is valid, not expired, and belongs to an active account. Called on every authenticated request. |
| `refreshSession(sessionToken)` | Extends session lifetime on user activity. |
| `initiateSSO(provider)` | Redirects to the configured SSO provider to begin the OAuth flow. |
| `handleSSOCallback(code, state)` | Processes the SSO provider callback, creates or links a user account, and returns a session. |

---

## 2. User Management Service

Handles creation, editing, role management, and removal of user accounts.

| Function | Description |
|---|---|
| `createUser(fullName, email, role)` | Creates a new account, generates a temporary password, and queues a welcome/activation email. |
| `getUserById(userId)` | Returns full user profile. |
| `searchUsers(query)` | Searches users by name or email. Used in both the admin panel and project member search. |
| `updateUser(userId, fields)` | Edits name, email, or department. Validates email uniqueness across the platform. |
| `changeUserRole(userId, newRole)` | Updates system-level role and immediately refreshes permissions. Prevents demoting the last admin. |
| `deactivateUser(userId)` | Suspends access without deleting data. Immediately terminates all active sessions for that user. |
| `deleteUser(userId)` | Permanently removes the account after confirmation. Applies data retention policy to associated records. |
| `getUserNotificationPreferences(userId)` | Returns per-event, per-channel notification settings for the user. |
| `updateNotificationPreferences(userId, preferences)` | Saves the user's toggle settings for each event type and delivery channel. |

---

## 3. Project Service

Handles project creation, configuration, membership, and lifecycle management.

| Function | Description |
|---|---|
| `createProject(pmId, name, description, goals, startDate, endDate, visibility, methodology)` | Creates the project workspace, auto-generates a unique Project ID, and sets the PM as owner. |
| `getProjectById(projectId)` | Returns project details. Enforces visibility rules so only permitted users can access it. |
| `getAllProjects(adminId)` | Admin-only view returning all projects platform-wide with status, PM, member count, and creation date. |
| `updateProjectSettings(projectId, settings)` | Updates visibility, methodology, notification rules, and integration preferences. |
| `archiveProject(projectId)` | Marks the project read-only, retains all data, and notifies all members. |
| `deleteProject(projectId)` | Permanently removes all project data after confirmation. Notifies members and warns if active integrations exist. |
| `transferOwnership(projectId, newPmId)` | Reassigns project ownership to another manager. |
| `addMember(projectId, userId, role)` | Adds a user to the project with the specified role and sends an invitation notification. |
| `removeMember(projectId, userId)` | Revokes project access for the specified member. |
| `changeMemberRole(projectId, userId, newRole)` | Updates a member's role within the project. |
| `getCapacityView(projectId)` | Returns each member's weekly available hours, allocated hours, and remaining hours. Flags members at or above 100% capacity. |

---

## 4. Task / Issue Service

Core service for creating, assigning, updating, and querying tasks and issues.

| Function | Description |
|---|---|
| `createTask(projectId, creatorId, fields)` | Creates a task with title, description, type, acceptance criteria, optional subtasks/checklists/attachments, and sprint/milestone links. Auto-generates a unique Task ID. |
| `getTaskById(taskId)` | Returns full task detail including description, acceptance criteria, dependencies, comments, attachments, and status history. |
| `updateTask(taskId, fields)` | Edits any task field. Logs each change in the activity log. |
| `deleteTask(taskId)` | Removes a task. Handles cleanup of dependencies and subtasks. |
| `assignTask(taskId, userIds)` | Assigns one or more team members. Checks capacity and warns the PM if any assignee would exceed 100%. Sends notifications. |
| `setTaskPriority(taskId, priority)` | Sets the priority level (Critical, High, Medium, Low) and updates colour-coded indicators across all views. |
| `bulkSetPriority(taskIds, priority)` | Applies the same priority to multiple tasks in a single operation. |
| `setTaskDates(taskId, startDate, dueDate)` | Sets start and due dates. Flags tasks within 48 hours of deadline and marks overdue tasks in red. |
| `updateTaskStatus(taskId, userId, newStatus, note)` | Changes issue status, optionally records a transition note, logs the change, and notifies watchers. Blocks transition to "In Progress" for tasks with unresolved blockers unless a manual override is provided. |
| `addDependency(taskId, relatedTaskId, relationshipType)` | Links two tasks with a relationship type (Blocks, Blocked By, Relates To, Duplicates). Detects and rejects circular dependency chains. |
| `removeDependency(taskId, dependencyId)` | Removes a dependency link between two tasks. |
| `getTasksByProject(projectId, filters, sort)` | Returns filtered and sorted tasks for the project board or list views. |
| `getAssignedTasks(userId, filters, sort)` | Returns all tasks assigned to a specific developer, grouped and filtered as needed. |
| `searchTasks(userId, keyword, filters)` | Full-text search across all projects the user is a member of. Returns paginated results (50/page) with highlighted excerpts. |
| `getAtRiskTasks(projectId)` | Returns overdue tasks and tasks with no recent progress updates. |
| `getTaskHistory(taskId)` | Returns the full chronological activity log for a task: status changes, assignments, comments, attachments, and field edits — each with actor and timestamp. |
| `createSubtask(parentTaskId, fields)` | Creates a nested subtask under a parent task. |
| `updateChecklist(taskId, checklistItems)` | Saves checklist item state within a task. |
| `addLabel(taskId, label)` | Tags a task with a label (e.g. "bug", "frontend", "urgent") for filtering. |
| `removeLabel(taskId, label)` | Removes a label from a task. |

---

## 5. Milestone Service

Manages milestone creation and the grouping of related tasks under a shared target date.

| Function | Description |
|---|---|
| `createMilestone(projectId, name, targetDate, linkedTaskIds)` | Creates a milestone and associates the specified tasks. |
| `updateMilestone(milestoneId, fields)` | Edits milestone name, target date, or linked tasks. |
| `deleteMilestone(milestoneId)` | Removes a milestone without deleting linked tasks. |
| `getMilestonesByProject(projectId)` | Returns all milestones for a project with their linked tasks and completion status. |

---

## 6. Sprint Service

Manages sprint lifecycle and velocity tracking for Scrum-based projects.

| Function | Description |
|---|---|
| `createSprint(projectId, startDate, endDate)` | Creates a new sprint with defined start and end dates. |
| `addTaskToSprint(sprintId, taskId)` | Moves a task from the backlog into the sprint. |
| `removeTaskFromSprint(sprintId, taskId)` | Returns a task to the backlog. |
| `startSprint(sprintId)` | Marks the sprint as active. |
| `completeSprint(sprintId)` | Closes the sprint, calculates velocity (story points completed), and stores it in velocity history. |
| `getVelocityHistory(projectId)` | Returns historical velocity data across all completed sprints for estimation purposes. |
| `getBacklog(projectId)` | Returns all tasks not yet assigned to any sprint. |

---

## 7. Comment Service

Handles rich-text commenting, mentions, and decision flagging on tasks and issues.

| Function | Description |
|---|---|
| `addComment(taskId, userId, content, attachments)` | Posts a rich-text comment with optional attachments. Parses @mentions and sends notifications to mentioned users. |
| `editComment(commentId, userId, newContent)` | Updates a comment authored by the requesting user. Preserves edit history internally for audit purposes. |
| `deleteComment(commentId, userId)` | Removes the comment after confirmation. Warns if the comment has replies that will also be removed. |
| `markCommentAsDecision(commentId)` | Flags the comment as a Resolution or Decision for easy retrieval within the task thread. |
| `getCommentsByTask(taskId)` | Returns all comments for a task in threaded, timestamped format. |

---

## 8. Attachment Service

Handles file upload, validation, storage, retrieval, and inline image preview.

| Function | Description |
|---|---|
| `uploadAttachment(taskId, userId, file)` | Validates file type (against allowed list) and size (max 10 MB) server-side, stores the file, and links it to the task. |
| `getAttachmentsByTask(taskId)` | Returns the list of attachments with name, type, and upload date. |
| `downloadAttachment(attachmentId, userId)` | Returns the file for download after verifying the user's project membership. |
| `deleteAttachment(attachmentId, userId)` | Removes a file from storage and unlinks it from the task. |
| `generateImageThumbnail(attachmentId)` | Produces a thumbnail for image attachments (PNG, JPG, GIF) for inline preview rendering. |

**Allowed file types:** `.jpg`, `.png`, `.gif`, `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.zip`, `.txt`
**Maximum file size:** 10 MB per file

---

## 9. Notification Service

Delivers real-time in-app, email, and push notifications for all platform events.

| Function | Description |
|---|---|
| `sendInAppNotification(userId, eventType, referenceId, message)` | Delivers a real-time in-app notification and increments the bell badge count. Must be delivered within 5 seconds of the triggering event. |
| `sendEmailNotification(userId, eventType, referenceId, message)` | Queues and sends an email notification respecting the user's preferences. |
| `sendPushNotification(userId, eventType, referenceId, message)` | Sends a push notification if the user has it enabled. |
| `markNotificationRead(notificationId, userId)` | Marks a single notification as read. |
| `markAllNotificationsRead(userId)` | Clears the badge count and marks all notifications as read. |
| `getNotifications(userId)` | Returns the unread notification list for the bell panel. |
| `sendDailyDigest(pmId, projectId)` | Compiles overdue and at-risk tasks and delivers a daily summary email to the PM. |
| `broadcastAnnouncement(projectId, pmId, message, channels)` | Delivers a project-wide announcement over all selected channels (in-app, email, push) and stores it in the project notice board. |

**Triggering events:** task assigned, @mention in comment, status change, deadline approaching, budget alert, member invited, announcement published.

---

## 10. Time Tracking Service

Manages manual and timer-based hour logging, billable/non-billable tracking, and data export.

| Function | Description |
|---|---|
| `logHours(taskId, userId, duration, billable)` | Saves a time entry manually. Marked as billable or non-billable. |
| `startTimer(taskId, userId)` | Records the start timestamp for a running timer session. |
| `stopTimer(taskId, userId)` | Calculates duration from the start timestamp and creates a log entry. |
| `getHoursByTask(taskId)` | Returns all time entries logged against a specific task. |
| `getHoursByMember(userId, projectId)` | Returns all time entries logged by a user within a project. |
| `getHoursByProject(projectId)` | Aggregates total hours across all tasks and members in a project. |
| `exportHours(projectId, format)` | Exports the aggregated hours data as CSV or PDF. |

---

## 11. Budget Service

Tracks project budget, monitors spend in real time, fires threshold alerts, and enforces limits.

| Function | Description |
|---|---|
| `setProjectBudget(projectId, pmId, budgetType, amount)` | Saves the total hours or cost budget for a project from the Settings panel. |
| `getBudgetStatus(projectId)` | Returns current spend versus budget in real time. |
| `checkBudgetThreshold(projectId)` | Called after any hours are logged. Fires alert notifications at 75% and 90% consumption. |
| `blockTaskAssignment(projectId, taskId)` | Prevents assigning tasks to members when the budget is fully exceeded. |
| `overrideBudgetBlock(projectId, pmId)` | Allows the PM to manually bypass the assignment block. |

---

## 12. Reporting Service

Generates progress reports, health dashboards, workload views, and admin analytics.

| Function | Description |
|---|---|
| `generateProgressReport(projectId, pmId, reportType, dateRange)` | Compiles task completion, team activity, budget usage, and milestone status into a formatted report. Exportable as PDF or shareable via link. Must complete within 5 seconds. |
| `scheduleReport(projectId, pmId, frequency, recipients)` | Saves a recurring report schedule for automatic weekly email delivery. |
| `getProjectHealthDashboard(projectId)` | Aggregates and returns all health metrics: task completion rate, workload, budget usage, overdue items, upcoming deadlines, and an overall health score. Updates in real time. |
| `getWorkloadView(projectId, filters)` | Returns each member's task load as a percentage, colour-coded by threshold (green/yellow/red), filterable by sprint or date range. |
| `getUsageAnalytics()` | Admin-only. Returns platform-wide metrics: active users, storage consumption, API usage, login frequency, and flagged anomalies or policy violations. |

---

## 13. Meeting / AI Service

Handles audio/transcript upload, AI-powered task extraction, and meeting summary generation.

| Function | Description |
|---|---|
| `uploadMeetingAudio(projectId, pmId, audioFile)` | Validates format (MP3, WAV, M4A) and duration (up to 2 hours), stores the file, and queues it for transcription. |
| `transcribeAudio(meetingId)` | Runs speech-to-text on the uploaded audio file. Processing begins within 10 seconds of upload completion. |
| `uploadMeetingTranscript(projectId, pmId, content, format)` | Accepts `.txt`, `.docx`, or pasted plain text and stores it linked to the project. |
| `extractActionItems(meetingId)` | Runs AI analysis on the transcript to detect action items, responsible owners, priorities, and deadlines. Returns a reviewable suggestion list to the PM. |
| `confirmTasksFromMeeting(meetingId, pmId, approvedItems)` | Creates the PM-approved suggestions as real tasks in the project backlog. |
| `generateMeetingSummary(meetingId)` | Produces a structured summary covering Decisions Made, Risks Identified, Tasks Created, and Next Meeting Points. |
| `updateMeetingSummary(meetingId, pmId, edits)` | Allows the PM to edit any section of the generated summary before sharing. |
| `getMeetingsByProject(projectId)` | Returns the archive of all meetings with their audio files, transcripts, and summaries. |

---

## 14. Integration Service

Manages OAuth connections with external tools and processes incoming webhook events.

| Function | Description |
|---|---|
| `initiateOAuthConnection(projectId, pmId, provider)` | Starts the OAuth flow for an external tool (Slack, GitHub, Google Drive, etc.). |
| `handleOAuthCallback(provider, code, state)` | Completes the OAuth handshake and stores the access token securely. |
| `getSyncOptions(projectId, provider)` | Returns the available sync event types for a connected integration. |
| `configureSyncEvents(projectId, provider, events)` | Saves which events to sync (e.g. code commits linked to tasks, Slack messages as comments). |
| `disconnectIntegration(projectId, provider)` | Revokes the stored token and removes the sync configuration. |
| `processIncomingWebhook(provider, payload)` | Handles incoming webhook events from external tools and maps them to the appropriate project task action. |

**Supported integrations:** Slack, GitHub, Google Drive (OAuth-based, extensible via standardised adapter layer)

---

## 15. Admin / System Service

Platform-wide configuration, policy enforcement, audit logging, and custom workflow management.

| Function | Description |
|---|---|
| `configureSystemSettings(adminId, settings)` | Updates platform-wide settings: auth methods (SSO/2FA), session timeouts, default notification rules, and storage limits. Logs the change. Takes effect within 5 seconds. |
| `setOrganisationalPolicies(adminId, policies)` | Defines and enforces password complexity rules, data retention periods, and permitted file types across all users and projects. |
| `getAuditLog(filters)` | Returns the immutable, chronological audit log. Filterable by date, user, or action type. Exportable as CSV. Retained for minimum 12 months. |
| `createCustomWorkflow(adminId, name, statuses, transitions, automationRules)` | Saves a new custom workflow with up to 20 defined statuses and allowed transitions. Optionally includes automation rules. |
| `updateCustomWorkflow(workflowId, adminId, changes)` | Modifies an existing workflow without disrupting issues currently in progress. Active issues remain in their current status. |
| `assignWorkflowToProject(workflowId, projectId)` | Links a custom workflow to one or more projects. Takes effect within 5 seconds. Notifies project managers. |
| `deleteWorkflow(workflowId)` | Removes a workflow. Blocks deletion if it is currently assigned to active projects. |
| `getSystemMonitorDashboard()` | Aggregates all issues platform-wide into a single admin view. Filterable by project, assignee, status, and date range. |
| `flagAnomalyOrViolation(eventType, details)` | Automatically called by the system when usage analytics detects a policy violation or unusual activity pattern. |

---

## 16. Architecture Notes

### Cross-cutting concerns

**Session validation as middleware** — `Auth Service: validateSession()` must run as middleware on every protected endpoint across all services. No service should process a request without a valid, active session.

**Notification Service is internal** — `Notification Service` functions should be called internally by other services, not directly by the client. For example:
- `Task Service: assignTask()` → calls `sendInAppNotification()` and `sendEmailNotification()`
- `Comment Service: addComment()` → calls `sendInAppNotification()` for each @mention
- `Budget Service: checkBudgetThreshold()` → calls `sendInAppNotification()` and `sendEmailNotification()` at 75% and 90%

**Audit logging** — An internal `writeAuditEntry(actorId, actionType, affectedEntity, ip)` function should be called by any function that modifies sensitive data, particularly everything in the Admin Service and User Management Service.

**Role-based access enforcement** — Every service function must validate that the requesting user's role permits the requested action. This should be handled via a centralised RBAC middleware layer, not per-function conditionals.

### Key constraints

| Constraint | Value |
|---|---|
| Max file upload size | 10 MB |
| Max comment length | 5,000 characters |
| Max audio meeting duration | 2 hours |
| Max workflow statuses | 20 per workflow |
| Search results per page | 50 items |
| Completed task visibility | 30 days |
| Audit log retention | Minimum 12 months |
| Session timeout (admin) | 30 minutes inactivity |
| Account lockout (standard) | 15 minutes after 5 failed attempts |
| Account lockout (admin) | 30 minutes after 5 failed attempts |

### Notification delivery SLAs

| Event | In-app | Email / Push |
|---|---|---|
| Task assignment | ≤ 5 seconds | ≤ 30 seconds |
| Member invitation | ≤ 10 seconds | ≤ 30 seconds |
| Announcement | ≤ 10 seconds | ≤ 10 seconds |
| Budget alert | ≤ 5 seconds | ≤ 30 seconds |
| @mention in comment | ≤ 5 seconds | ≤ 30 seconds |
