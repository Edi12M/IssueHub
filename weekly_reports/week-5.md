# User Scenario List — Nea Metohu

---

## Project Manager

| Nr | Name | Description |
|----|------|-------------|
| PM_01 | Create project | Project Manager: The PM navigates to "New Project", fills in the project name, description, goals, start and end dates, sets visibility (private/team/organisation), and selects a methodology template (Scrum, Kanban, Waterfall). A unique project ID is auto-generated upon creation. |
| PM_02 | Add team members | Project Manager: The PM opens the project's Members panel, searches for users by name or email, selects them, and assigns a role (Developer, Designer, QA, Viewer, Co-Manager). Members can be removed or have their roles changed at any time. Invited members receive a notification. |
| PM_03 | Manage team availability & capacity | Project Manager: The PM accesses the Capacity view from the dashboard or task assignment panel. Each member's weekly hours, allocated hours, and remaining hours are displayed. The system displays a warning when a member is at or above 100% capacity. |
| PM_04 | Create tasks | Project Manager: The PM clicks "New Task", fills in the title, description, task type (Feature, Bug, Improvement, Research, Meeting Action), and acceptance criteria. They can add subtasks, checklists, and attachments, and link the task to a project, sprint, or milestone. A unique task ID is auto-generated. |
| PM_05 | Assign tasks | Project Manager: The PM opens a task and uses the assignee selector to add one or more team members. Notifications are sent via in-app and email. Tasks can be reassigned at any time, and the system warns the PM if the assignment would exceed a member's capacity. |
| PM_06 | Set task priority | Project Manager: The PM opens a task and selects a priority level (Critical, High, Medium, Low) from a color-coded dropdown. Bulk priority updates can be applied by selecting multiple tasks from the list and using the bulk-edit toolbar. Tasks can then be sorted and filtered by priority. |
| PM_07 | Set deadlines & milestones | Project Manager: The PM sets start and due dates on each task using a date picker. Milestones are created to group related tasks under a shared target date. Tasks within 48 hours of their deadline are highlighted, and overdue tasks are flagged in red on the board and timeline. |
| PM_08 | Link & depend tasks | Project Manager: The PM opens a task and uses the Dependencies panel to link it to another task using a relationship type (Blocks, Blocked By, Relates To, Duplicates). Blocked tasks cannot transition to "In Progress" without a manual override, and dependency chains are visualised in the Gantt view. |
| PM_09 | Generate tasks from meeting audio | Project Manager: The PM uploads an audio file (MP3, WAV, M4A) or records directly in the platform. The system transcribes the audio via speech-to-text and uses AI to extract action items, owners, and priorities. The PM reviews and confirms the suggested tasks before they are created. The audio file and transcript are stored in the project. |
| PM_10 | Generate tasks from meeting transcript | Project Manager: The PM uploads a .txt or .docx transcript, or pastes text directly. AI analyses the content to detect action items, responsible owners, and deadlines. The PM reviews the suggestions, edits if necessary, and approves the tasks. The transcript is stored in the project for future reference. |
| PM_11 | Summarize meeting & log decisions | Project Manager: After a meeting is processed, the system automatically generates a structured summary including Decisions Made, Risks Identified, Tasks Created, and Next Meeting Points. The PM can edit the summary, share it with stakeholders, and view it later in the project's meeting log. |
| PM_12 | Kanban board | Project Manager: The PM opens the Kanban view to see tasks distributed across columns (Backlog, To Do, In Progress, In Review, Done). Tasks can be moved between columns via drag-and-drop. Columns are customisable and each task card displays the assignee, priority, due date, and task ID. |
| PM_13 | Timeline / Gantt view | Project Manager: The PM switches to the Timeline view to see all tasks displayed as horizontal bars across a calendar axis. Task dependencies are shown as connecting lines. The PM drags bar edges to adjust dates, and the critical path is highlighted to show which tasks directly affect the project end date. |
| PM_14 | Identify delayed & at-risk tasks | Project Manager: The PM views the Risk panel or project board where overdue tasks are automatically flagged in red and tasks with no recent progress are labelled "At Risk". A daily digest email is sent to the PM summarising delayed items alongside suggested corrective actions. |
| PM_15 | Monitor team workload | Project Manager: The PM opens the Workload view to see each member's task load visualised as a percentage bar (green = healthy, yellow = approaching limit, red = overloaded). The PM can drag tasks between team members directly in this view and filter by sprint or date range. |
| PM_16 | Log billable hours | Project Manager: The PM or team members log hours on a task either manually by entering a duration or by using a built-in timer. Each entry is marked as billable or non-billable. Hours are aggregated by task, member, or project and can be exported as CSV or PDF. |
| PM_17 | Monitor budget & limits | Project Manager: The PM sets a total hours or cost budget for the project from the Settings panel. The dashboard tracks budget vs. actual spend in real time, and automated alerts are sent at 75% and 90% usage. Task assignment is blocked when the budget is exceeded, with a manual override option available. |
| PM_18 | Comment on tasks | Project Manager: The PM adds rich text comments with attachments to any task, uses @mentions to notify specific team members, and views all comments in threaded, timestamped format. Comments can be marked as a resolution or decision to make key outcomes easy to find later. |
| PM_19 | Announcements | Project Manager: The PM composes a project-wide announcement from the Announcements panel, selects delivery channels (in-app, email, push notification), and publishes it. The announcement is also stored in the project's notice board for members to view at any time. |
| PM_20 | Notification preferences | Project Manager: Each user accesses their notification settings to toggle preferences per event type (task assigned, comment added, deadline approaching, status changed, budget alert). The PM can also set minimum notification rules at the project level that apply to all members. |
| PM_21 | Project health dashboard | Project Manager: The PM opens the project's Health Dashboard to see a consolidated overview of task completion rate, team workload, budget usage, overdue items, and upcoming deadlines — all in one screen — enabling fast decisions without navigating to individual sections. |
| PM_22 | Generate progress reports | Project Manager: The PM clicks "Generate Report" and selects a weekly summary or a custom date range. The system compiles task completion, team activity, budget usage, and milestone status into a formatted report that can be downloaded or shared directly with stakeholders. |
| PM_23 | Sprint planning & velocity tracking | Project Manager: The PM creates a new sprint, sets its start and end dates, and drags tasks from the backlog into the sprint. After each sprint completes, the system calculates team velocity (story points completed) and displays historical velocity trends to improve future sprint estimations. |
| PM_24 | Integrate with external tools | Project Manager: The PM navigates to the Integrations settings panel and connects the platform with external tools (e.g. Slack, GitHub, Google Drive) by authorising the connection via OAuth. Once connected, events such as code commits or messages can be synced automatically with project tasks. |
| PM_25 | Project settings & permissions | Project Manager: The PM accesses the Project Settings panel to configure visibility, methodology, member roles, notification rules, and integration preferences. The PM can restrict or grant access per role, archive the project, or transfer ownership to another manager. |

---

## Developer

| Nr | Name | Description |
|----|------|-------------|
| DEV_01 | View assigned issues | Developer: The developer navigates to their personal dashboard where a list of all issues assigned to them is displayed, showing each issue's title, status, priority, and project. The developer clicks on any issue to open its full detail view. |
| DEV_02 | Open issue details | Developer: The developer clicks on an issue from their list to open a dedicated detail page showing the full description, acceptance criteria, linked tasks, comments, attachments, and status history, so they understand requirements before starting work. |
| DEV_03 | Filter assigned issues | Developer: The developer uses the filter panel on their issues list to select one or more filter options such as status (To Do, In Progress, In Review, Done) or priority level (Critical, High, Medium, Low) to reduce the list to the most relevant items. |
| DEV_04 | Update issue status | Developer: The developer opens an issue and selects a new status from a status dropdown or drags the task card to a new column on the Kanban board. The change is saved instantly and the team is notified of the updated progress. |
| DEV_05 | View status change history | Developer: The developer scrolls to the activity log section within an issue's detail page, where every past status change is listed chronologically with the timestamp, the previous and new status values, and the name of the person who made the change. |
| DEV_06 | Add note on status change | Developer: When the developer changes an issue's status, a text input field appears prompting them to enter a short note explaining the reason for the change. The note is saved alongside the status change entry in the activity log. |
| DEV_07 | Add comments to an issue | Developer: The developer opens an issue and types in the comment box located at the bottom of the detail page. They can include formatted text or attachments before clicking "Submit" to post the comment, which is visible to all project members. |
| DEV_08 | Edit or delete own comments | Developer: The developer hovers over one of their own comments to reveal an edit and a delete icon. Clicking edit opens the comment text in an inline editor. Clicking delete prompts a confirmation dialog before permanently removing the comment. |
| DEV_09 | Mention teammate in comment | Developer: While typing a comment, the developer types the @ symbol followed by the start of a teammate's username. A dropdown of matching users appears and the developer selects the correct person. The mentioned teammate receives an in-app and email notification. |
| DEV_10 | Upload attachments to an issue | Developer: The developer opens an issue and clicks the "Attach File" button or drags files directly into the attachment zone. The uploaded files — such as screenshots, logs, or documents — are stored and listed under the attachments section of the issue. |
| DEV_11 | View and download attachments | Developer: The developer opens an issue and navigates to the attachments section, where all uploaded files are listed with their names, file types, and upload dates. The developer clicks any file to download it to their device. |
| DEV_12 | Preview image attachments inline | Developer: When an issue contains image attachments (PNG, JPG, GIF), a thumbnail preview is automatically rendered inline within the attachments section. The developer can click the thumbnail to expand it to full size without downloading the file. |
| DEV_13 | View tasks by deadline or priority | Developer: The developer opens their personal task view and uses the sort controls to order their tasks by due date (ascending) or by priority level. The sorted list allows them to plan their day and allocate effort to the most urgent items first. |
| DEV_14 | Track overdue and completed tasks | Developer: The developer's task dashboard visually distinguishes task states: overdue tasks are highlighted in red with a warning label, and completed tasks are shown in a separate "Done" section or greyed out with a checkmark, giving a clear view of progress. |
| DEV_15 | Receive in-app notifications | Developer: When a project manager or teammate assigns a new issue to the developer, an in-app notification appears in the notification bell in the top navigation bar. The developer clicks the notification to be taken directly to the newly assigned issue. |
| DEV_16 | Search issues by keyword | Developer: The developer clicks the global search bar and types one or more keywords. The system returns matching issues from all projects the developer is a member of, showing each result with its title, project, status, and a highlighted excerpt containing the matching keyword. |
| DEV_17 | Filter issues by label or date range | Developer: The developer opens the filter panel on the issues list and selects one or more labels (e.g. "bug", "frontend", "urgent") and optionally sets a creation or due date range. The list updates instantly to show only the issues matching all selected criteria. |

---

## System Administrator

| Nr | Name | Description |
|----|------|-------------|
| SA_01 | Create new users | System Administrator: The admin navigates to the User Management panel and clicks "Add User". They fill in the user's full name, email address, and assign an initial system role (Developer, Project Manager, System Administrator, Viewer). An activation email is sent automatically to the new user. |
| SA_02 | Update user information | System Administrator: The admin searches for an existing user by name or email in the User Management table, opens their profile, and edits details such as name, email, or department. Changes are saved immediately and reflected across the platform. |
| SA_03 | Assign and change user roles | System Administrator: The admin selects a user from the User Management list and opens their role settings. They choose a new role from a dropdown of available system roles and confirm the change. The user's access permissions update immediately based on their new role. |
| SA_04 | Deactivate or remove users | System Administrator: The admin locates a user in the User Management panel and clicks "Deactivate" to suspend their access without deleting their data, or "Remove" to permanently delete the account. A confirmation prompt is shown before either action is finalised. |
| SA_05 | View all active and inactive projects | System Administrator: The admin opens the Projects Overview panel to see a full list of all projects on the platform, each showing its name, manager, current status (active/inactive/archived), member count, and creation date, allowing the admin to maintain a platform-wide view. |
| SA_06 | Access projects via granted permissions | System Administrator: When a Project Manager grants access, the admin receives a notification and can enter the project's workspace. Inside, the admin can view task boards, activity logs, member activity, and issues without disrupting the team's normal workflow. |
| SA_07 | Intervene to resolve bug-related issues | System Administrator: The admin identifies a bug or technical issue within a project through the system monitor or a PM report. They enter the project's workspace, review the relevant logs or task data, apply fixes or escalate, and log a resolution note visible to the project team. |
| SA_08 | Configure system-level settings | System Administrator: The admin accesses the System Configuration panel and modifies platform-wide settings such as authentication methods (SSO, 2FA), session timeouts, default notification rules, and storage limits. Changes are applied globally and take effect immediately. |
| SA_09 | Set organisational policies | System Administrator: The admin opens the Policy Settings section and defines rules that govern platform-wide behaviour, such as password complexity requirements, data retention periods, and permitted file types for uploads. Policies are enforced automatically across all users and projects. |
| SA_10 | View all issues across projects | System Administrator: The admin opens the System Monitor dashboard, which aggregates all issues from every project on the platform into a single view. Issues can be filtered by project, assignee, status, or date range, giving the admin a complete picture of platform activity. |
| SA_11 | Monitor user activity and usage | System Administrator: The admin reviews the Activity Logs panel, which records all user actions (logins, task updates, file uploads, role changes) with timestamps and user IDs. The admin can filter logs by user, date, or event type to investigate unusual or unauthorised behaviour. |
| SA_12 | Ensure proper system usage | System Administrator: The admin uses the Usage Analytics dashboard to review metrics such as active users, storage consumption, API usage, and login frequency. Anomalies or policy violations are flagged automatically, and the admin can take corrective action directly from the dashboard. |

markdown

#  Use Cases -Xhoana Thano
### Project Issue Tracking & Management Platform

**Roles Covered:** Developer | Project Manager | System Administrator

---

#  Developer Role
> 10 Use Cases | UC-DEV-01 through UC-DEV-10

---

## UC-DEV-01 | Log In to IssueHub

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-01: Log In to IssueHub |
| **Summary** | The developer authenticates with their email and password to access the system. |
| **Dependency** | None |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer has a registered and active account created by the system administrator. |
| **Main Sequence** | 1. Developer navigates to the IssueHub login page. 2. Developer enters their email and password. 3. System validates the credentials. 4. System redirects the developer to their personal dashboard. |
| **Alternative Sequence** | 3a. Credentials are invalid → system shows an error message; developer may retry. 3b. Account is deactivated → system shows 'Account disabled' and blocks access. 5a. Maximum 5 failed login attempts → account locked for 15 minutes. |
| **Non-Functional Requirements** | Login must complete within 2 seconds. Passwords must be encrypted (bcrypt). All traffic must be over HTTPS. |
| **Postconditions** | Developer is authenticated and can access all features available to their role. |

---

## UC-DEV-02 | View Assigned Issues

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-02: View Assigned Issues |
| **Summary** | The developer views and filters the list of issues assigned to them. |
| **Dependency** | UC-DEV-01 (Log In) |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in and has at least one issue assigned to them. |
| **Main Sequence** | 1. Developer navigates to 'My Issues' from the dashboard. 2. System displays all issues assigned to the developer. 3. Developer optionally applies filters (status, priority, due date). 4. Developer clicks an issue to view its full details. |
| **Alternative Sequence** | 2a. No issues are assigned → system shows an empty-state message. 3a. Filter returns no results → system shows 'No issues match your filters'. |
| **Non-Functional Requirements** | Issue list must load within 1.5 seconds. Filters must apply without a full page reload. |
| **Postconditions** | Developer has a clear view of their workload and can open any issue for details. Developers can only see issues from projects they are members of. |

---

## UC-DEV-03 | Update Issue Status

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-03: Update Issue Status |
| **Summary** | The developer changes the status of an assigned issue to reflect current progress. |
| **Dependency** | UC-DEV-01, UC-DEV-02 |
| **Actors** | Developer (Primary), Project Manager (Secondary – notified) |
| **Preconditions** | Developer is logged in. The issue is assigned to them and is not archived. |
| **Main Sequence** | 1. Developer opens the issue detail page. 2. Clicks the current status badge to open the status dropdown. 3. Selects the new status (e.g. In Progress, Blocked, Done). 4. Optionally types a transition note explaining the change. 5. Clicks 'Confirm'. System saves the change and logs it in the issue history. |
| **Alternative Sequence** | 3a. Developer selects 'Done' but sub-tasks are still open → system warns and requires confirmation. 5a. Network error → system shows an error and the status remains unchanged. |
| **Non-Functional Requirements** | Status change must persist within 1 second. Project manager must be notified within 5 seconds. Archived issues are read-only. |
| **Postconditions** | Issue status is updated; the change appears in the history log; the project manager is notified. |

---

## UC-DEV-04 | Add a Comment to an Issue

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-04: Add a Comment to an Issue |
| **Summary** | The developer adds a comment to an issue to share progress or ask a question. |
| **Dependency** | UC-DEV-01, UC-DEV-02 |
| **Actors** | Developer (Primary), Mentioned Users (Secondary – notified) |
| **Preconditions** | Developer is logged in and has read access to the issue. |
| **Main Sequence** | 1. Developer opens the issue detail page. 2. Scrolls to the Comments section. 3. Types a comment (supports @mentions and basic Markdown). 4. Clicks 'Post Comment'. 5. System saves and displays the comment with a timestamp. |
| **Alternative Sequence** | 3a. Comment body is empty → 'Post' button remains disabled. 3b. @mentioned user does not exist → mention renders as plain text with a warning. |
| **Non-Functional Requirements** | Comments limited to 5,000 characters. System must support Markdown rendering. |
| **Postconditions** | Comment is visible to all project members. @mentioned users receive a notification. |

---

## UC-DEV-05 | Edit or Delete Own Comment

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-05: Edit or Delete Own Comment |
| **Summary** | The developer modifies or removes a comment they previously posted. |
| **Dependency** | UC-DEV-04 |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in. The comment was authored by the developer. |
| **Main Sequence** | 1. Developer locates their comment on the issue detail page. 2. Clicks the 'Edit' or 'Delete' icon. 3. Edit: modifies text and clicks 'Save' → system updates the comment and shows an 'edited' label. 4. Delete: confirms deletion in a dialog → system removes the comment. |
| **Alternative Sequence** | 3a. Developer clicks 'Cancel' → no changes are made. 4a. Comment has replies → system warns that replies will also be removed. |
| **Non-Functional Requirements** | Edit history preserved internally for audit. Developers may not edit or delete other users' comments. |
| **Postconditions** | Comment is updated or removed. All project members see the latest state. |

---

## UC-DEV-06 | Upload Attachment to an Issue

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-06: Upload Attachment to an Issue |
| **Summary** | The developer uploads a file to an issue to provide supporting context. |
| **Dependency** | UC-DEV-01, UC-DEV-02 |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in. The issue exists and is not archived. |
| **Main Sequence** | 1. Developer opens the issue detail page. 2. Clicks 'Add Attachment'. 3. Selects a file from their device. 4. System validates file size and type, then uploads it. 5. File appears in the Attachments section with an image preview or download link. |
| **Alternative Sequence** | 4a. File exceeds 10 MB → system rejects and shows a size error. 4b. File type not allowed (e.g. .exe) → system rejects and shows a type error. 4c. Upload interrupted → system shows a retry option. |
| **Non-Functional Requirements** | Allowed types: .jpg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .zip, .txt. Max 10 MB per file. Upload progress bar must be shown. |
| **Postconditions** | Attachment is stored and linked to the issue. All project members can view or download it. |

---

## UC-DEV-07 | Track Personal Tasks

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-07: Track Personal Tasks |
| **Summary** | The developer reviews their personal task overview to manage deadlines and priorities. |
| **Dependency** | UC-DEV-01 |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in. |
| **Main Sequence** | 1. Developer opens the 'My Tasks' dashboard section. 2. System displays tasks grouped by: Overdue, Due Today, Upcoming, Completed. 3. Developer sorts or filters by priority or project. 4. Developer clicks a task to open its issue detail page. |
| **Alternative Sequence** | 2a. No tasks exist → system shows an empty-state with a prompt to check with the project manager. |
| **Non-Functional Requirements** | Completed tasks visible for 30 days. Only issues assigned to the logged-in developer are shown. Dashboard must refresh in real time. |
| **Postconditions** | Developer has a clear, prioritised view of all their pending and completed work. |

---

## UC-DEV-08 | Search and Filter Issues

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-08: Search and Filter Issues |
| **Summary** | The developer searches for issues by keyword or applies filters to find specific work items. |
| **Dependency** | UC-DEV-01 |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in and is a member of at least one project. |
| **Main Sequence** | 1. Developer clicks the search bar at the top of the page. 2. Types a keyword (title, description, or issue ID). 3. System returns matching issues from projects the developer is part of. 4. Developer optionally applies additional filters (label, date range, status). 5. Developer clicks a result to open the issue. |
| **Alternative Sequence** | 2a. Search query is fewer than 2 characters → system does not trigger a search. 3a. No results found → system shows 'No issues match your search'. |
| **Non-Functional Requirements** | Search must return results within 1 second. Results limited to 50 per page with pagination. Search only covers projects the developer is a member of. |
| **Postconditions** | Developer is taken to the selected issue's detail page. |

---

## UC-DEV-09 | Receive In-App Notifications

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-09: Receive In-App Notifications |
| **Summary** | The developer receives real-time in-app notifications for events relevant to their work. |
| **Dependency** | UC-DEV-01 |
| **Actors** | Developer (Primary), System (Secondary) |
| **Preconditions** | Developer is logged in. |
| **Main Sequence** | 1. A triggering event occurs (new issue assigned, comment @mention, status change, deadline approaching). 2. System generates a notification. 3. Notification bell icon shows a badge count. 4. Developer clicks the bell to view the notification list. 5. Developer clicks a notification to navigate directly to the relevant issue. |
| **Alternative Sequence** | 4a. Developer marks all notifications as read → badge clears. 5a. Issue no longer exists → system shows 'Issue not found'. |
| **Non-Functional Requirements** | Notifications must be delivered within 5 seconds of the triggering event. Developer can configure notification preferences in settings. |
| **Postconditions** | Developer is informed of relevant activity and can navigate directly to the related issue. |

---

## UC-DEV-10 | View Issue History / Audit Log

| Field | Details |
|---|---|
| **UC Name** | UC-DEV-10: View Issue History / Audit Log |
| **Summary** | The developer views the full history of changes made to an issue. |
| **Dependency** | UC-DEV-01, UC-DEV-02 |
| **Actors** | Developer (Primary) |
| **Preconditions** | Developer is logged in and has read access to the issue. |
| **Main Sequence** | 1. Developer opens an issue detail page. 2. Scrolls to the 'History' or 'Activity' section. 3. System displays a chronological log of all changes: status updates, assignment changes, comments, attachments, and field edits. 4. Each entry shows the actor, timestamp, and description of the change. |
| **Alternative Sequence** | 3a. No history entries exist (newly created issue) → system shows 'No activity yet'. |
| **Non-Functional Requirements** | History log must be read-only. Entries sorted newest-first by default. Timestamps must be shown in the user's local timezone. |
| **Postconditions** | Developer has a complete understanding of how the issue has evolved over time. |

---
---

#  Project Manager Role
> 13 Use Cases | UC-PM-01 through UC-PM-13

---

## UC-PM-01 | Create a New Project

| Field | Details |
|---|---|
| **UC Name** | UC-PM-01: Create a New Project |
| **Summary** | The Project Manager creates a new project with all required configuration and structure. |
| **Dependency** | Login use case |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in with Project Manager role. |
| **Main Sequence** | 1. PM navigates to 'Projects' and clicks 'New Project'. 2. Enters name, description, start/end dates, and project type. 3. Selects a template (Scrum, Kanban, Waterfall). 4. Sets project visibility (private / team / organization). 5. Clicks 'Create Project'. 6. System generates a unique project ID and sets up the workspace. |
| **Alternative Sequence** | 5a. Project name already exists → system prompts to use a unique name. 5b. End date is before start date → system shows a validation error. |
| **Non-Functional Requirements** | Project must be created within 2 seconds. Project ID must be unique and auto-generated. |
| **Postconditions** | New project is created and visible in the PM's project list. PM is set as the default project owner. |

---

## UC-PM-02 | Add Team Members to a Project

| Field | Details |
|---|---|
| **UC Name** | UC-PM-02: Add Team Members to a Project |
| **Summary** | The PM adds team members and assigns them roles within a project. |
| **Dependency** | UC-PM-01 |
| **Actors** | Project Manager (Primary), Team Members (Secondary – notified) |
| **Preconditions** | PM is logged in. The project exists. |
| **Main Sequence** | 1. PM opens the project settings page. 2. Navigates to the 'Members' section. 3. Searches for a user by name or email. 4. Selects the user and assigns a role (Developer, Designer, QA, Viewer, Co-Manager). 5. Clicks 'Add Member'. 6. System saves the assignment and sends a notification to the invited user. |
| **Alternative Sequence** | 3a. User not found → system shows 'No user found'. 5a. User already a member → system shows a duplicate warning. |
| **Non-Functional Requirements** | Invited users must receive a notification within 10 seconds. A member can only hold one role per project. |
| **Postconditions** | Team member is added to the project with the assigned role and appropriate access permissions. |

---

## UC-PM-03 | Create and Assign a Task

| Field | Details |
|---|---|
| **UC Name** | UC-PM-03: Create and Assign a Task |
| **Summary** | The PM creates a new task with full details and assigns it to one or more team members. |
| **Dependency** | UC-PM-01, UC-PM-02 |
| **Actors** | Project Manager (Primary), Developer (Secondary – notified) |
| **Preconditions** | PM is logged in. The project has at least one member. |
| **Main Sequence** | 1. PM navigates to the project board and clicks 'New Task'. 2. Fills in title, description, type (Feature/Bug/Improvement/Research), and acceptance criteria. 3. Assigns to one or more members. 4. Sets priority (Critical / High / Medium / Low) and due date. 5. Optionally adds subtasks, checklists, labels, and attachments. 6. Clicks 'Save'. System creates the task with a unique ID and notifies assignees. |
| **Alternative Sequence** | 3a. Assignee is at 100% capacity → system warns the PM. 6a. Required fields are missing → system highlights missing fields and blocks submission. |
| **Non-Functional Requirements** | Task ID must be unique and auto-generated (e.g. PROJ-042). Notifications sent within 5 seconds of assignment. |
| **Postconditions** | Task is created, visible on the project board, and assignees are notified. |

---

## UC-PM-04 | Set Task Priority and Deadlines

| Field | Details |
|---|---|
| **UC Name** | UC-PM-04: Set Task Priority and Deadlines |
| **Summary** | The PM sets or updates priority levels and due dates on one or more tasks. |
| **Dependency** | UC-PM-03 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. At least one task exists in the project. |
| **Main Sequence** | 1. PM opens a task or selects multiple tasks via checkboxes. 2. Selects a priority level (Critical, High, Medium, Low). 3. Sets a start date and due date. 4. Clicks 'Save'. System updates and highlights the task accordingly. |
| **Alternative Sequence** | 2a. Bulk update: PM selects multiple tasks and applies priority in one action. 3a. Due date is in the past → system shows a warning but allows saving. |
| **Non-Functional Requirements** | Tasks within 48 hours of deadline must be highlighted. Overdue tasks flagged in red automatically. Bulk updates must apply within 2 seconds. |
| **Postconditions** | Task priorities and deadlines are updated. Colour-coded indicators reflect the new values across all views. |

---

## UC-PM-05 | Define Task Dependencies

| Field | Details |
|---|---|
| **UC Name** | UC-PM-05: Define Task Dependencies |
| **Summary** | The PM defines dependencies between tasks to enforce correct execution order. |
| **Dependency** | UC-PM-03 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. At least two tasks exist in the project. |
| **Main Sequence** | 1. PM opens a task detail page. 2. Navigates to the 'Dependencies' section. 3. Selects dependency type: Blocks / Blocked By / Relates To / Duplicates. 4. Searches for and selects the related task. 5. Clicks 'Add Dependency'. System saves the relationship. |
| **Alternative Sequence** | 4a. Selected dependency creates a circular chain → system detects and rejects it. 5a. A blocked task is moved to 'In Progress' → system prevents the action and shows a warning. |
| **Non-Functional Requirements** | Dependency chains must be visualised in the Gantt / timeline view. Circular dependency detection must run server-side. |
| **Postconditions** | Dependency is saved. Blocked tasks cannot progress until their blockers are resolved. |

---

## UC-PM-06 | View Kanban Board

| Field | Details |
|---|---|
| **UC Name** | UC-PM-06: View Kanban Board |
| **Summary** | The PM monitors project progress using a Kanban board with drag-and-drop functionality. |
| **Dependency** | UC-PM-01, UC-PM-03 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. The project has at least one task. |
| **Main Sequence** | 1. PM navigates to the 'Board' view of the project. 2. System displays task cards in columns: Backlog, To Do, In Progress, In Review, Done. 3. PM drags a task card to a different column to update its status. 4. Task cards show assignee avatar, priority colour, due date, and task ID. |
| **Alternative Sequence** | 3a. PM attempts to drag a blocked task to 'In Progress' → system prevents the move and shows a dependency warning. |
| **Non-Functional Requirements** | Drag-and-drop must be smooth with no more than 200ms latency. Board must update in real time for all project members. Columns must be customisable. |
| **Postconditions** | Task status is updated. The change is reflected for all project members in real time. |

---

## UC-PM-07 | View Timeline / Gantt Chart

| Field | Details |
|---|---|
| **UC Name** | UC-PM-07: View Timeline / Gantt Chart |
| **Summary** | The PM views tasks plotted over time to monitor schedule and dependencies. |
| **Dependency** | UC-PM-03, UC-PM-05 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. Tasks have start and due dates assigned. |
| **Main Sequence** | 1. PM navigates to the 'Timeline' or 'Gantt' view. 2. System displays tasks as horizontal bars across a calendar axis. 3. Dependency links are shown as arrows between tasks. 4. PM drags the ends of a task bar to adjust its dates. 5. The critical path is automatically highlighted. |
| **Alternative Sequence** | 2a. No tasks have dates set → system shows a prompt to add dates to tasks. 4a. Adjusted date conflicts with a dependency → system warns the PM. |
| **Non-Functional Requirements** | Timeline must render within 2 seconds for up to 200 tasks. Critical path calculation must run automatically. |
| **Postconditions** | PM has a full visual overview of the project schedule with dependency awareness. |

---

## UC-PM-08 | Monitor Team Workload

| Field | Details |
|---|---|
| **UC Name** | UC-PM-08: Monitor Team Workload |
| **Summary** | The PM views each team member's current task load relative to their capacity. |
| **Dependency** | UC-PM-02, UC-PM-03 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. Project has members with assigned tasks. |
| **Main Sequence** | 1. PM navigates to the 'Workload' section of the project. 2. System displays each member's workload as a percentage bar. 3. Colour coding: Green (healthy), Yellow (approaching limit), Red (overloaded). 4. PM can drag tasks between members directly from this view. 5. PM can filter the view by sprint or date range. |
| **Alternative Sequence** | 4a. Reassigning a task would push the recipient above 100% → system warns the PM before confirming. |
| **Non-Functional Requirements** | Workload percentages must recalculate in real time after reassignment. Weekly hour capacity per member must be configurable. |
| **Postconditions** | PM has a clear view of team capacity and can rebalance work as needed. |

---

## UC-PM-09 | Generate Tasks from Meeting Audio

| Field | Details |
|---|---|
| **UC Name** | UC-PM-09: Generate Tasks from Meeting Audio |
| **Summary** | The PM uploads or records meeting audio and the system automatically extracts action items as tasks. |
| **Dependency** | UC-PM-01, UC-PM-03 |
| **Actors** | Project Manager (Primary), AI Engine (Secondary) |
| **Preconditions** | PM is logged in. The project exists. |
| **Main Sequence** | 1. PM navigates to 'Meetings' and selects 'New Meeting Record'. 2. PM uploads an audio file (MP3, WAV, M4A) or records directly in-browser. 3. System transcribes the audio using speech-to-text. 4. AI analyses the transcript and suggests action items with owner, priority, and deadline. 5. PM reviews, edits, approves, or rejects each suggestion. 6. Approved items are created as tasks in the project backlog. 7. System generates a meeting summary (Decisions, Risks, Tasks, Next Steps) and stores audio and transcript. |
| **Alternative Sequence** | 2a. File format not supported → system shows a format error. 3a. Audio quality is too low → system flags a transcription warning and allows manual correction. 5a. PM approves all with one click → all suggestions are created instantly. |
| **Non-Functional Requirements** | Transcription must begin within 10 seconds of upload. Supported audio: up to 2 hours. Summary must be editable and shareable. |
| **Postconditions** | Meeting audio, transcript, and summary stored. Action items created as tasks in the backlog. |

---

## UC-PM-10 | View Project Health Dashboard

| Field | Details |
|---|---|
| **UC Name** | UC-PM-10: View Project Health Dashboard |
| **Summary** | The PM views a single dashboard showing the overall health of the project across key indicators. |
| **Dependency** | UC-PM-01, UC-PM-03 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. The project has active tasks and members. |
| **Main Sequence** | 1. PM navigates to the project dashboard. 2. System displays health indicators: Deadline Risk, Team Workload, Task Completion Rate, Budget Consumption, Overall Health Score. 3. PM clicks any indicator to drill down into detailed data. 4. System shows suggested corrective actions (e.g. 'Reassign tasks to reduce overload'). |
| **Alternative Sequence** | 2a. Insufficient data (new project) → system shows a prompt to add tasks and members first. |
| **Non-Functional Requirements** | Dashboard must update in real time. Health score calculated from: completion rate, overdue tasks, workload, and budget status. |
| **Postconditions** | PM has a real-time, actionable overview of project health and can drill down into any metric. |

---

## UC-PM-11 | Generate Progress Report

| Field | Details |
|---|---|
| **UC Name** | UC-PM-11: Generate Progress Report |
| **Summary** | The PM generates a project progress report to share with stakeholders. |
| **Dependency** | UC-PM-10 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. Project has logged activity. |
| **Main Sequence** | 1. PM navigates to 'Reports' and clicks 'Generate Report'. 2. Selects report type (weekly / on-demand) and date range. 3. System compiles: tasks completed, tasks remaining, hours logged, budget used, identified risks. 4. PM previews the report. 5. PM exports as PDF or copies a shareable link. 6. PM optionally schedules automatic weekly delivery via email. |
| **Alternative Sequence** | 3a. No data in selected range → system shows 'No activity for this period'. 6a. Email scheduling requires a valid email address → system validates before saving. |
| **Non-Functional Requirements** | Report generation must complete within 5 seconds. PDF export must be properly formatted. Scheduled reports must be delivered within 5 minutes of the scheduled time. |
| **Postconditions** | Report is generated and available for export or sharing. Scheduled report is saved for automatic delivery. |

---

## UC-PM-12 | Manage Budget and Billable Hours

| Field | Details |
|---|---|
| **UC Name** | UC-PM-12: Manage Budget and Billable Hours |
| **Summary** | The PM sets a project budget, monitors usage, and receives alerts when thresholds are reached. |
| **Dependency** | UC-PM-01 |
| **Actors** | Project Manager (Primary) |
| **Preconditions** | PM is logged in. Project exists. |
| **Main Sequence** | 1. PM opens project settings and sets a total hours or cost budget. 2. Team members log billable/non-billable hours on tasks (manually or via timer). 3. PM views the dashboard showing budget vs. actual spend. 4. System automatically alerts PM at 75% and 90% budget consumption. 5. PM can export hours data as CSV or PDF. |
| **Alternative Sequence** | 4a. Budget is exceeded → system blocks new task assignments (PM can override). |
| **Non-Functional Requirements** | Budget alerts must fire in real time. Hour logs must aggregate by task, member, and project. Export must support CSV and PDF. |
| **Postconditions** | Budget is tracked in real time. PM is alerted before overrun and can take corrective action. |

---

## UC-PM-13 | Send Project Announcement

| Field | Details |
|---|---|
| **UC Name** | UC-PM-13: Send Project Announcement |
| **Summary** | The PM broadcasts a project-wide announcement to all team members. |
| **Dependency** | UC-PM-02 |
| **Actors** | Project Manager (Primary), Team Members (Secondary – notified) |
| **Preconditions** | PM is logged in. Project has at least one member. |
| **Main Sequence** | 1. PM navigates to 'Announcements' and clicks 'New Announcement'. 2. Composes the announcement text. 3. Clicks 'Post'. 4. System notifies all project members via in-app, email, and push notification. 5. Announcement is stored in the project notice board. |
| **Alternative Sequence** | 3a. Announcement body is empty → system disables the 'Post' button. |
| **Non-Functional Requirements** | Notifications must be delivered within 10 seconds. Announcements must be stored permanently in the notice board. |
| **Postconditions** | All team members are notified. Announcement is visible in the project notice board. |

---
---

# System Administrator Role
> 11 Use Cases | UC-ADM-01 through UC-ADM-11

---

## UC-ADM-01 | Log In as System Administrator

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-01: Log In as System Administrator |
| **Summary** | The system administrator authenticates to access the full admin control panel. |
| **Dependency** | None |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | An admin account exists and is active in the system. |
| **Main Sequence** | 1. Admin navigates to the IssueHub login page. 2. Enters admin email and password. 3. System validates credentials and confirms admin role. 4. System redirects to the Admin Dashboard. |
| **Alternative Sequence** | 3a. Credentials invalid → system shows an error; admin may retry. 3b. Account locked → system shows 'Account disabled'. 3c. 5 failed attempts → account locked for 30 minutes. |
| **Non-Functional Requirements** | Admin session must time out after 30 minutes of inactivity. All admin actions must be logged. MFA should be required for admin accounts. |
| **Postconditions** | Administrator is authenticated and can access all administrative features of the system. |

---

## UC-ADM-02 | Create a New User Account

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-02: Create a New User Account |
| **Summary** | The administrator creates a new user account and assigns an initial role. |
| **Dependency** | UC-ADM-01 |
| **Actors** | System Administrator (Primary), New User (Secondary – notified) |
| **Preconditions** | Admin is logged in. |
| **Main Sequence** | 1. Admin navigates to the 'Users' tab. 2. Clicks 'Create New User'. 3. Fills in full name, email address, and initial role (Developer, Project Manager, Admin, Viewer). 4. Clicks 'Create'. 5. System creates the account, generates a temporary password, and sends a welcome email to the user. |
| **Alternative Sequence** | 4a. Email address already exists → system shows a duplicate email error. 4b. Invalid role selected → system rejects the action. |
| **Non-Functional Requirements** | Emails must be unique across the system. Welcome email must be sent within 30 seconds. Passwords must meet minimum security requirements (8+ chars, mixed case, number). |
| **Postconditions** | New user account is created. User receives a welcome email with login instructions. |

---

## UC-ADM-03 | Edit or Deactivate a User Account

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-03: Edit or Deactivate a User Account |
| **Summary** | The administrator modifies user details or deactivates an account to revoke access. |
| **Dependency** | UC-ADM-02 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. The target user account exists. |
| **Main Sequence** | 1. Admin searches for the user in the Users tab. 2. Clicks the user to open their profile. 3. Edit: modifies name, email, or role and clicks 'Save'. 4. Deactivate: clicks 'Deactivate Account' and confirms in a dialog. 5. System updates the record and, if deactivated, immediately terminates any active sessions for that user. |
| **Alternative Sequence** | 3a. Changed email already used by another account → system shows a duplicate error. 4a. Admin attempts to deactivate their own account → system blocks the action. |
| **Non-Functional Requirements** | Deactivation must take effect within 5 seconds (session termination). All changes are logged in the audit trail. |
| **Postconditions** | User account is updated or deactivated. Deactivated users cannot log in. |

---

## UC-ADM-04 | Assign and Change User Roles

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-04: Assign and Change User Roles |
| **Summary** | The administrator assigns or updates a user's system-level role to control their access permissions. |
| **Dependency** | UC-ADM-02 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. User account exists. |
| **Main Sequence** | 1. Admin navigates to the target user's profile in the Users tab. 2. Clicks 'Edit Role'. 3. Selects a new role from the dropdown (Developer, Project Manager, Admin, Viewer). 4. Clicks 'Confirm'. 5. System updates the user's permissions immediately. |
| **Alternative Sequence** | 3a. Invalid role selected → system rejects the action. 4a. Admin attempts to demote the last remaining admin account → system blocks the action. |
| **Non-Functional Requirements** | Roles must be valid system-defined values. Permission changes must apply within 5 seconds without requiring the user to log out. |
| **Postconditions** | User role is updated. New permissions take effect immediately. Change is recorded in the audit log. |

---

## UC-ADM-05 | View All Projects and Issues

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-05: View All Projects and Issues |
| **Summary** | The administrator has a read-only view of all projects and issues across the entire platform. |
| **Dependency** | UC-ADM-01 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. |
| **Main Sequence** | 1. Admin navigates to the 'Projects' tab. 2. System displays all projects with: project name, PM, status, number of issues, and creation date. 3. Admin clicks a project to see its issue list. 4. Admin can filter projects by status, PM, or date range. 5. Admin navigates to the 'Issues' tab for a system-wide issue view. |
| **Alternative Sequence** | 2a. No projects exist → system shows 'No projects found'. 4a. Filter returns no results → system shows 'No projects match your filters'. |
| **Non-Functional Requirements** | Admin view must show all projects regardless of visibility settings. Admin cannot modify project content unless explicitly invited by a PM. Data must load within 2 seconds. |
| **Postconditions** | Admin has a full, current overview of all projects and issues across the platform. |

---

## UC-ADM-06 | Monitor and Resolve System-Level Issues

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-06: Monitor and Resolve System-Level Issues |
| **Summary** | The administrator identifies, tracks, and resolves system bugs, API errors, and infrastructure failures. |
| **Dependency** | UC-ADM-01 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. A system-level issue has been detected or reported. |
| **Main Sequence** | 1. Admin navigates to the 'Issues' tab and filters by 'System' type. 2. Selects a critical or high-priority system issue. 3. Reviews error details, stack traces, and affected users. 4. Assigns the issue to themselves or another admin. 5. Works to resolve the bug or error. 6. Updates the issue status to 'Resolved' and logs resolution notes. |
| **Alternative Sequence** | 4a. No available admin → issue remains unassigned with a high-priority flag for escalation. |
| **Non-Functional Requirements** | Critical system issues must trigger an immediate alert to all admins. System issues must be tracked with full audit history. |
| **Postconditions** | System issue is resolved and documented. Affected users are notified where applicable. |

---

## UC-ADM-07 | Configure System Settings

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-07: Configure System Settings |
| **Summary** | The administrator configures global platform settings including security, notifications, and integrations. |
| **Dependency** | UC-ADM-01 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. |
| **Main Sequence** | 1. Admin navigates to 'System Settings'. 2. Configures setting categories: security policies (password rules, session timeout, MFA enforcement), email/notification configuration, file upload limits and allowed types, integration API keys (Slack, GitHub, Google Drive, etc.), system-wide default roles and permissions. 3. Clicks 'Save Changes'. 4. System applies changes and logs the update in the audit trail. |
| **Alternative Sequence** | 3a. Invalid configuration value entered → system highlights the field with a validation error. 3b. Admin navigates away without saving → system prompts to confirm unsaved changes. |
| **Non-Functional Requirements** | Settings changes must take effect within 5 seconds. All setting updates logged with timestamp and admin ID. Sensitive fields (API keys) must be masked in the UI. |
| **Postconditions** | System settings are updated and applied platform-wide. Changes are recorded in the audit log. |

---

## UC-ADM-08 | View Audit Log

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-08: View Audit Log |
| **Summary** | The administrator reviews a full chronological log of all significant actions performed across the system. |
| **Dependency** | UC-ADM-01 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. |
| **Main Sequence** | 1. Admin navigates to 'Audit Log' in the admin panel. 2. System displays all logged actions: user creations, role changes, login attempts, setting changes, project deletions. 3. Admin filters by date range, action type, or specific user. 4. Admin can export the log as CSV for external review. |
| **Alternative Sequence** | 3a. Filter returns no results → system shows 'No records match your criteria'. |
| **Non-Functional Requirements** | Audit log must be immutable (read-only, no deletion). Log must retain data for a minimum of 12 months. Each entry must include: timestamp, actor, action type, affected entity, and IP address. |
| **Postconditions** | Admin has a transparent record of all system activity for compliance and security review. |

---

## UC-ADM-09 | Delete or Archive a Project

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-09: Delete or Archive a Project |
| **Summary** | The administrator archives or permanently deletes a project from the system when required. |
| **Dependency** | UC-ADM-01, UC-ADM-05 |
| **Actors** | System Administrator (Primary) |
| **Preconditions** | Admin is logged in. The target project exists. |
| **Main Sequence** | 1. Admin locates the project in the Projects tab. 2. Clicks the project options menu and selects 'Archive' or 'Delete'. 3. Archive: system marks the project as archived — it becomes read-only and hidden from active views but data is retained. 4. Delete: system shows a confirmation dialog warning that all data will be permanently removed. Admin confirms. System permanently deletes all project data. |
| **Alternative Sequence** | 4a. Admin cancels the delete confirmation → no action is taken. 4b. Project has active linked integrations (e.g. GitHub) → system warns admin to disconnect integrations first. |
| **Non-Functional Requirements** | Deletion must be irreversible. Archived projects must remain accessible via a dedicated 'Archived' filter. PM and team members must be notified of archival or deletion. |
| **Postconditions** | Project is archived (read-only, data retained) or permanently deleted. All affected users are notified. |

---

## UC-ADM-10 | Create and Manage Custom Workflows

| Field | Details |
|---|---|
| **UC Name** | UC-ADM-10: Create and Manage Custom Workflows |
| **Summary** | The administrator creates and configures custom issue workflows for different projects, defining statuses, transitions, and automation rules. |
| **Dependency** | UC-ADM-01, UC-ADM-05 |
| **Actors** | System Administrator (Primary), Project Manager (Secondary – applies workflow) |
| **Preconditions** | Admin is logged in. At least one project exists in the system. |
| **Main Sequence** | 1. Admin navigates to 'Workflow Manager' in the admin panel. 2. Clicks 'Create New Workflow'. 3. Enters a workflow name and description (e.g. 'Scrum Sprint Flow', 'Bug Fix Flow'). 4. Adds custom statuses using the visual drag-and-drop editor (e.g. Backlog, In Dev, Code Review, QA, Done). 5. Defines allowed transitions between statuses (e.g. only QA can move issue to Done). 6. Optionally adds automation rules (e.g. auto-assign reviewer when status moves to Code Review). 7. Clicks 'Save Workflow'. 8. Admin assigns the workflow to one or more projects. Project managers are notified of the change. |
| **Alternative Sequence** | 4a. Admin tries to delete a status that has active issues → system blocks deletion and shows a warning. 7a. Workflow has no defined transitions → system shows a validation error before saving. 8a. Admin clones an existing workflow and modifies it for a new project. |
| **Non-Functional Requirements** | Workflow editor must support up to 20 custom statuses. Changes to an active workflow must not disrupt issues currently in progress. Workflow assignments must take effect within 5 seconds. Admin can preview the workflow as a diagram before saving. |
| **Postconditions** | Custom workflow is saved and assigned to the selected projects. Project members immediately see the updated statuses and transitions on their board. |

---








