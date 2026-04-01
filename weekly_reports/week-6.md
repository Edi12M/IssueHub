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

# Extended User Scenarios - Edvin Mehaj

### PM_01 - Create Project

**Main Flow**

1. PM navigates to the main dashboard and clicks **"New Project"**.
2. PM fills in the project name, description, and goals.
3. PM sets the project start and end dates using the date picker.
4. PM selects the visibility level: **Private**, **Team**, or **Organisation**.
5. PM selects a methodology template: **Scrum**, **Kanban**, or **Waterfall**.
6. PM clicks **"Create Project"**.
7. System auto-generates a unique Project ID and creates the project workspace.
8. PM is redirected to the newly created project dashboard.

---

### PM_02 - Add Team Members

**Main Flow**

1. PM opens the project and navigates to the **Members** panel.
2. PM uses the search field to find users by name or email.
3. PM selects one or more users from the search results.
4. PM assigns a role to each selected user: **Developer**, **Designer**, **QA**, **Viewer**, or **Co-Manager**.
5. PM clicks **"Add Members"**.
6. System sends an in-app and email notification to each invited user.
7. New members appear in the Members panel with their assigned roles.

---

### PM_03 - Manage Team Availability & Capacity

**Main Flow**

1. PM navigates to the **Capacity View** from the dashboard or task assignment panel.
2. System displays each member's: weekly available hours, currently allocated hours, and remaining hours.
3. PM reviews the capacity data for all team members.
4. PM identifies any members approaching or exceeding their capacity.
5. If needed, the PM reassigns tasks to balance the workload.

---

### PM_04 - Create Tasks

**Main Flow**

1. PM clicks **"New Task"** from the project board or task list.
2. PM fills in the task title and description.
3. PM selects a task type: **Feature**, **Bug**, **Improvement**, **Research**, or **Meeting Action**.
4. PM writes the acceptance criteria.
5. PM optionally adds subtasks, checklist items, and file attachments.
6. PM links the task to a project, sprint, or milestone.
7. PM clicks **"Save Task"**.
8. System auto-generates a unique Task ID and adds the task to the backlog.

---

### PM_05 - Assign Tasks

**Main Flow**

1. PM opens the task detail view.
2. PM clicks the **Assignee** selector.
3. PM searches for and selects one or more team members.
4. PM saves the assignment.
5. System sends in-app and email notifications to the assigned members.

---

### PM_06 - Set Task Priority

**Main Flow**

1. PM opens a task.
2. PM clicks the **Priority** dropdown.
3. PM selects a priority level: **Critical**, **High**, **Medium**, or **Low** (displayed with colour coding).
4. System saves the priority and updates the task card immediately.

---

### PM_07 - Set Deadlines & Milestones

**Main Flow**

1. PM opens a task and clicks the **Start Date** and **Due Date** fields.
2. PM selects dates using the date picker.
3. PM saves the task.
4. To create a milestone, PM navigates to the **Milestones** section and clicks **"New Milestone"**.
5. PM fills in the milestone name, target date, and links relevant tasks.
6. System saves the milestone and links the tasks.

---

### PM_08 - Link & Depend Tasks

**Main Flow**

1. PM opens a task and navigates to the **Dependencies** panel.
2. PM clicks **"Add Dependency"** and searches for the related task.
3. PM selects a relationship type: **Blocks**, **Blocked By**, **Relates To**, or **Duplicates**.
4. PM saves the dependency.
5. System updates the Gantt view to show the dependency as a connecting line between tasks.

---

### PM_09 - Generate Tasks from Meeting Audio

**Main Flow**

1. PM navigates to the **Meetings** section and clicks **"Upload Audio"** or **"Record"**.
2. PM uploads an audio file or records directly in the platform.
3. System transcribes the audio using speech-to-text processing.
4. AI analyses the transcript to extract action items, responsible owners, and priorities.
5. System presents the suggested tasks in a review panel.
6. PM reviews each suggestion, edits if necessary, and approves or rejects individual items.
7. PM clicks **"Confirm & Create Tasks"**.
8. System creates the approved tasks in the project and stores the audio file and transcript.

---

### PM_10 - Generate Tasks from Meeting Transcript

**Main Flow**

1. PM navigates to the **Meetings** section and selects **"Upload Transcript"** or **"Paste Text"**.
2. PM provides the transcript content.
3. AI analyses the text to detect action items, responsible owners, and deadlines.
4. System presents the suggested tasks in a review panel.
5. PM reviews, edits if necessary, and approves each task.
6. PM clicks **"Confirm & Create Tasks"**.
7. System creates the approved tasks and stores the transcript in the project.

---

### PM_11 - Summarize Meeting & Log Decisions

**Main Flow**

1. After processing, the system automatically generates a structured summary containing:
   - Decisions Made
   - Risks Identified
   - Tasks Created
   - Next Meeting Points
2. PM reviews the generated summary.
3. PM edits any section if needed.
4. PM clicks **"Save & Share"**.
5. System stores the summary in the project's meeting log.
6. PM optionally shares the summary directly with selected stakeholders.

---

### PM_12 - Kanban Board

**Main Flow**

1. PM opens the **Kanban View** from the project navigation.
2. System displays tasks organised across columns: **Backlog**, **To Do**, **In Progress**, **In Review**, **Done**.
3. Each task card shows: assignee, priority, due date, and task ID.
4. PM drags a task card from one column to another to update its status.
5. System saves the status change and notifies relevant team members.

---

### PM_13 - Timeline / Gantt View

**Main Flow**

1. PM switches to the **Timeline View** from the project navigation.
2. System renders all tasks as horizontal bars across a calendar axis.
3. Dependency lines connect related tasks.
4. PM drags the edges of a task bar to adjust its start or end date.
5. System highlights the **critical path** - the chain of tasks that directly impacts the project end date.

---

### PM_14 - Identify Delayed & At-Risk Tasks

**Main Flow**

1. PM opens the **Risk Panel** or project board.
2. System automatically flags overdue tasks in **red**.
3. Tasks with no recent progress updates are labelled **"At Risk"**.
4. PM reviews the flagged tasks and determines corrective action.
5. A **daily digest email** is sent to the PM summarising delayed items and suggested corrective actions.

---

### PM_15 - Monitor Team Workload

**Main Flow**

1. PM opens the **Workload View** from the project dashboard.
2. System shows each member's task load as a percentage bar:
   - **Green** = healthy load
   - **Yellow** = approaching limit
   - **Red** = overloaded
3. PM identifies overloaded or underutilised members.
4. PM drags tasks between team members to rebalance workload directly in this view.
5. PM filters the workload view by sprint or date range.

---

### PM_16 - Log Billable Hours

**Main Flow**

1. User opens a task and navigates to the **Time Tracking** section.
2. User logs hours by either:
   - Entering a duration manually (hours and minutes), or
   - Starting and stopping the built-in timer.
3. User marks the entry as **Billable** or **Non-Billable**.
4. System saves the entry linked to the task and the user.
5. Hours are aggregated and visible by task, member, or project.

---

### PM_17 - Monitor Budget & Limits

**Main Flow**

1. PM navigates to **Project Settings** and sets the total hours or cost budget.
2. System tracks budget vs. actual spend in real time on the dashboard.
3. When spend reaches **75%** of the budget, the system sends an automated alert to the PM.
4. When spend reaches **90%**, a second alert is sent.
5. When the budget is fully exceeded, task assignment is blocked.
6. PM can apply a **manual override** to allow further assignment beyond the limit.

---

### PM_18 - Comment on Tasks

**Main Flow**

1. PM opens a task and scrolls to the **Comments** section.
2. PM types a rich-text comment, optionally attaching files.
3. PM uses **@mentions** to notify specific team members.
4. PM clicks **"Submit"** to post the comment.
5. Mentioned team members receive in-app and email notifications.
6. PM can mark a comment as a **Resolution** or **Decision** for easy retrieval later.

---

### PM_19 - Announcements

**Main Flow**

1. PM navigates to the **Announcements** panel.
2. PM clicks **"New Announcement"** and composes the message.
3. PM selects delivery channels: **In-App**, **Email**, and/or **Push Notification**.
4. PM clicks **"Publish"**.
5. System delivers the announcement via all selected channels.
6. Announcement is stored on the project's **notice board** for future reference.

---

### PM_20 - Notification Preferences

**Main Flow**

1. User navigates to **Notification Settings** in their profile.
2. User toggles preferences for each event type:
   - Task Assigned
   - Comment Added
   - Deadline Approaching
   - Status Changed
   - Budget Alert
3. User selects delivery channels per event: **In-App**, **Email**, **Push**.
4. User saves preferences.
5. PM can additionally set **minimum notification rules** at the project level that apply to all project members regardless of their personal settings.

---

### PM_21 - Project Health Dashboard

**Main Flow**

1. PM opens the **Health Dashboard** from the project navigation.
2. System displays the following consolidated metrics:
   - **Task Completion Rate** (% completed vs total)
   - **Team Workload** (capacity overview per member)
   - **Budget Usage** (actual vs allocated)
   - **Overdue Items** (count and list)
   - **Upcoming Deadlines** (tasks due in the next 7 days)
3. PM reviews each metric and identifies areas requiring attention.
4. PM clicks through any metric to drill into its detailed view.

---

### PM_22 - Generate Progress Reports

**Main Flow**

1. PM clicks **"Generate Report"** on the project dashboard.
2. PM selects a report type: **Weekly Summary** or **Custom Date Range**.
3. System compiles:
   - Task completion statistics
   - Team activity summary
   - Budget usage
   - Milestone status
4. System produces a formatted report.
5. PM downloads the report or shares it directly with stakeholders.

---

### PM_23 - Sprint Planning & Velocity Tracking

**Main Flow**

1. PM navigates to the **Sprints** section and clicks **"New Sprint"**.
2. PM sets the sprint's start and end dates.
3. PM drags tasks from the backlog into the sprint.
4. PM reviews the total story points committed to the sprint.
5. PM starts the sprint.
6. After the sprint ends, the system automatically calculates **velocity** (story points completed).
7. System displays **historical velocity trends** to inform future sprint estimations.

---

### PM_24 - Integrate with External Tools

**Main Flow**

1. PM navigates to the **Integrations** settings panel.
2. PM selects an external tool to connect (e.g. Slack, GitHub, Google Drive).
3. System initiates an **OAuth** authorisation flow.
4. PM authorises the connection in the external tool's login/permission screen.
5. System confirms the connection and lists available sync options.
6. PM configures which events to sync (e.g. code commits linked to tasks, Slack messages as task comments).
7. Integration is active and events begin syncing automatically.

---

### PM_25 - Project Settings & Permissions

**Main Flow**

1. PM navigates to the **Project Settings** panel.
2. PM configures: visibility, methodology, member roles, notification rules, and integration preferences.
3. PM restricts or grants access per role as needed.
4. PM saves the settings.

---

### DEV_01 - View Assigned Issues

**Main Flow**

1. Developer navigates to their **personal dashboard**.
2. System displays a list of all issues assigned to the developer.
3. Each item shows: title, status, priority, and project name.
4. Developer clicks any issue to open its full detail view.

---

### DEV_02 - Open Issue Details

**Main Flow**

1. Developer clicks on an issue from their assigned list or search results.
2. System opens the **issue detail page** showing:
   - Full description
   - Acceptance criteria
   - Linked tasks and dependencies
   - Comments (threaded)
   - Attachments
   - Status history / activity log
3. Developer reads all relevant information.

---

### DEV_03 - Filter Assigned Issues

**Main Flow**

1. Developer opens their **Issues List**.
2. Developer opens the **Filter Panel**.
3. Developer selects one or more filter options:
   - Status: **To Do**, **In Progress**, **In Review**, **Done**
   - Priority: **Critical**, **High**, **Medium**, **Low**
4. System instantly updates the list to show only matching issues.

---

### DEV_04 - Update Issue Status

**Main Flow**

1. Developer opens an issue.
2. Developer clicks the **Status** dropdown and selects the new status, or drags the task card to a new column on the Kanban board.
3. System saves the change instantly.
4. System notifies all project members watching the issue.

---

### DEV_05 - View Status Change History

**Main Flow**

1. Developer opens the issue detail page.
2. Developer scrolls to the **Activity Log** section.
3. System displays a chronological list of all status changes, each showing:
   - Timestamp
   - Previous status
   - New status
   - Name of the person who made the change

---

### DEV_06 - Add Note on Status Change

**Main Flow**

1. Developer changes the status of an issue (as per DEV_04).
2. System displays a **text input field** prompting for a reason for the change.
3. Developer enters a short note.
4. Developer confirms the status change.
5. System saves the note alongside the status change entry in the activity log.

---

### DEV_07 - Add Comments to an Issue

**Main Flow**

1. Developer opens an issue.
2. Developer clicks the **comment box** at the bottom of the detail page.
3. Developer types a comment, optionally formatting text or attaching files.
4. Developer clicks **"Submit"**.
5. The comment is posted and visible to all project members.

---

### DEV_08 - Edit or Delete Own Comments

**Main Flow**

1. Developer hovers over their comment to reveal **Edit** and **Delete** icons.
2. _To edit:_ Developer clicks **Edit**, modifies the text in the inline editor, and saves.
3. _To delete:_ Developer clicks **Delete**, confirms the action in the dialog, and the comment is permanently removed.

---

### DEV_09 - Mention Teammate in Comment

**Main Flow**

1. Developer types **@** in the comment box.
2. Developer types the start of a teammate's username.
3. System displays a dropdown of matching users.
4. Developer selects the correct person.
5. Developer completes and submits the comment.
6. System sends the mentioned teammate an **in-app and email notification** with a link to the comment.

---

### DEV_10 - Upload Attachments to an Issue

**Main Flow**

1. Developer opens an issue.
2. Developer clicks **"Attach File"** or drags files into the attachment zone.
3. System uploads and stores the files.
4. Files appear in the **Attachments** section of the issue with their names and upload timestamps.

---

### DEV_11 - View and Download Attachments

**Main Flow**

1. Developer opens an issue.
2. Developer navigates to the **Attachments** section.
3. System lists all files with: name, file type, and upload date.
4. Developer clicks a file to download it to their device.

---

### DEV_12 - Preview Image Attachments Inline

**Main Flow**

1. Developer opens an issue with image attachments.
2. System automatically renders **thumbnail previews** for all image files in the Attachments section.
3. Developer clicks a thumbnail.
4. System expands the image to full size in a modal or lightbox view.
5. Developer closes the modal to return to the issue.

---

### DEV_13 - View Tasks by Deadline or Priority

**Main Flow**

1. Developer opens their **personal task view**.
2. Developer uses the **sort controls** to select:
   - **Sort by Due Date (Ascending)** - earliest deadlines first, or
   - **Sort by Priority Level** - Critical -> High -> Medium -> Low.
3. System re-orders the task list accordingly.
4. Developer plans their work based on the sorted list.

---

### DEV_14 - Track Overdue and Completed Tasks

**Main Flow**

1. Developer opens their **task dashboard**.
2. System visually distinguishes task states:
   - **Overdue tasks**: highlighted in red with a warning label.
   - **Completed tasks**: shown in a separate "Done" section or greyed out with a checkmark.
3. Developer reviews overdue tasks and takes appropriate action.

---

### DEV_15 - Receive In-App Notifications

**Main Flow**

1. A project manager or teammate assigns a new issue to the developer.
2. An **in-app notification** appears in the notification bell in the top navigation bar.
3. Developer clicks the notification.
4. System navigates the developer directly to the newly assigned issue.

---

### DEV_16 - Search Issues by Keyword

**Main Flow**

1. Developer clicks the **global search bar**.
2. Developer types one or more keywords.
3. System searches all projects the developer is a member of.
4. System returns matching issues showing: title, project name, status, and a **highlighted excerpt** with the matching keyword in context.
5. Developer clicks a result to open the issue.

---

### DEV_17 - Filter Issues by Label or Date Range

**Main Flow**

1. Developer opens the **Issues List** and clicks **Filter**.
2. Developer selects one or more **labels** (e.g. "bug", "frontend", "urgent").
3. Developer optionally sets a **date range** for creation date or due date.
4. System instantly updates the list to show only issues matching all selected criteria.

---

### SA_01 - Create New Users

**Main Flow**

1. Admin navigates to the **User Management** panel and clicks **"Add User"**.
2. Admin fills in: full name, email address.
3. Admin assigns an initial system role: **Developer**, **Project Manager**, **System Administrator**, or **Viewer**.
4. Admin clicks **"Create User"**.
5. System automatically sends an **activation email** to the new user.
6. The new user appears in the User Management list with a "Pending Activation" status.

---

### SA_02 - Update User Information

**Main Flow**

1. Admin opens the **User Management** panel and searches for the user by name or email.
2. Admin opens the user's profile.
3. Admin edits the required fields: name, email, or department.
4. Admin saves the changes.
5. System applies the changes immediately across the platform.

---

### SA_03 - Assign and Change User Roles

**Main Flow**

1. Admin selects a user from the **User Management** list.
2. Admin opens the user's **Role Settings**.
3. Admin selects a new role from the dropdown of available system roles.
4. Admin confirms the change.
5. System immediately updates the user's access permissions.

---

### SA_04 - Deactivate or Remove Users

**Main Flow**

1. Admin locates the user in the **User Management** panel.
2. Admin selects either:
   - **Deactivate** - suspends access without deleting data.
   - **Remove** - permanently deletes the account and associated data.
3. System shows a **confirmation prompt** before either action.
4. Admin confirms.
5. System applies the action immediately.

---

### SA_05 - View All Active and Inactive Projects

**Main Flow**

1. Admin opens the **Projects Overview** panel.
2. System displays a full list of all platform projects, each showing:
   - Project name
   - Project Manager
   - Current status: **Active**, **Inactive**, or **Archived**
   - Member count
   - Creation date
3. Admin filters or sorts the list as needed.

---

### SA_06 - Access Projects via Granted Permissions

**Main Flow**

1. Admin receives an **in-app notification** that access has been granted.
2. Admin opens the notification and navigates to the project's workspace.
3. Admin can view: task boards, activity logs, member activity, and issues.
4. Admin does not modify tasks or data unless addressing a specific issue.

---

### SA_07 - Intervene to Resolve Bug-Related Issues

**Main Flow**

1. Admin identifies the bug through the **System Monitor** or a PM report.
2. Admin enters the project's workspace.
3. Admin reviews relevant logs and task data to understand the issue.
4. Admin applies a fix or escalates to the development team if a code change is required.
5. Admin logs a **resolution note** visible to the project team.

---

### SA_08 - Configure System-Level Settings

**Main Flow**

1. Admin navigates to the **System Configuration** panel.
2. Admin modifies one or more settings:
   - Authentication methods: **SSO**, **2FA**
   - Session timeouts
   - Default notification rules
   - Storage limits
3. Admin saves the changes.
4. System applies the settings globally and immediately.

---

### SA_09 - Set Organisational Policies

**Main Flow**

1. Admin opens the **Policy Settings** section.
2. Admin defines or updates policies:
   - Password complexity requirements
   - Data retention periods
   - Permitted file types for uploads
3. Admin saves the policies.
4. System enforces policies automatically across all users and projects.

---

### SA_10 - View All Issues Across Projects

**Main Flow**

1. Admin opens the **System Monitor** dashboard.
2. System aggregates all issues from every project into a single view.
3. Admin filters issues by: project, assignee, status, or date range.
4. Admin reviews issues requiring attention or investigation.

---

### SA_11 - Monitor User Activity and Usage

**Main Flow**

1. Admin opens the **Activity Logs** panel.
2. System displays all logged user actions including: logins, task updates, file uploads, and role changes - each with a timestamp and user ID.
3. Admin filters logs by: user, date, or event type.
4. Admin reviews flagged or suspicious entries.

---

### SA_12 - Ensure Proper System Usage

**Main Flow**

1. Admin opens the **Usage Analytics** dashboard.
2. System displays metrics including:
   - Active users count
   - Storage consumption
   - API usage
   - Login frequency
3. System automatically flags anomalies or policy violations.
4. Admin reviews flagged items.
5. Admin takes corrective action directly from the dashboard (e.g. deactivating a user, adjusting storage limits).


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




# Functional Requirements - Arbër Zeneli, Klevi Vezi, Vasil Nano
 
## FR Section 1 — Authentication & Access Control
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-AUTH-01 | User Login | The system shall allow users to authenticate using a registered email and password. On successful validation, users are redirected to their role-specific dashboard. |
| FR-AUTH-02 | Role-Based Access Control | The system shall enforce access permissions based on the user's assigned role (Developer, Project Manager, System Administrator, Viewer). Each role shall have a distinct set of permitted actions. |
| FR-AUTH-03 | Account Lockout | The system shall lock a standard user account for 15 minutes after 5 consecutive failed login attempts, and an admin account for 30 minutes after 5 failed attempts. |
| FR-AUTH-04 | Account Deactivation | The system shall allow an administrator to deactivate a user account, immediately revoking access without deleting associated data. |
| FR-AUTH-05 | Multi-Factor Authentication | The system shall support MFA (e.g. TOTP or email OTP) as a configurable requirement, mandatory for System Administrator accounts. |
| FR-AUTH-06 | Session Timeout | The system shall automatically terminate inactive sessions after a configurable period (default 30 minutes for admin accounts). |
| FR-AUTH-07 | Single Sign-On (SSO) | The system shall support SSO authentication as a configurable option, managed through the System Configuration panel. |
 
---
 
## FR Section 2 — User Management
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-USER-01 | Create User Account | The system shall allow an administrator to create new user accounts by providing full name, email, and an initial role. A temporary password and activation email shall be generated automatically. |
| FR-USER-02 | Update User Information | The system shall allow administrators to edit user profile fields (name, email, department). Changes shall be reflected immediately across the platform. |
| FR-USER-03 | Assign and Change Roles | The system shall allow administrators to change a user's system role at any time. The user's access permissions shall update immediately upon role change. |
| FR-USER-04 | Remove User Account | The system shall allow administrators to permanently delete a user account following a confirmation prompt. All associated data shall be handled per the data retention policy. |
| FR-USER-05 | User Search | The system shall allow administrators and PMs to search for users by name or email address within the User Management panel and the project member search. |
| FR-USER-06 | Notification Preferences | The system shall allow each user to configure notification preferences per event type (task assigned, comment added, deadline approaching, status changed, budget alert) and per delivery channel (in-app, email, push). |
 
---
 
## FR Section 3 — Project Management
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-PROJ-01 | Create Project | The system shall allow a Project Manager to create a project by specifying name, description, goals, start and end dates, visibility level (Private / Team / Organisation), and a methodology template (Scrum, Kanban, Waterfall). A unique Project ID shall be auto-generated on creation. |
| FR-PROJ-02 | Add Team Members | The system shall allow the PM to search for registered users and add them to a project with an assigned role (Developer, Designer, QA, Viewer, Co-Manager). Invited members shall receive an in-app and email notification. |
| FR-PROJ-03 | Manage Member Roles | The system shall allow the PM to change a member's project role or remove them from the project at any time. |
| FR-PROJ-04 | Project Settings & Permissions | The system shall provide a Project Settings panel where the PM can configure visibility, methodology, member roles, notification rules, and integration preferences, and can archive the project or transfer ownership. |
| FR-PROJ-05 | Archive or Delete Project | The system shall allow administrators to archive a project (read-only, data retained) or permanently delete it after a confirmation step. Affected users shall be notified in both cases. |
| FR-PROJ-06 | Platform-Wide Project Overview | The system shall provide an administrator view that lists all projects on the platform, showing name, PM, status (Active / Inactive / Archived), member count, and creation date. |
| FR-PROJ-07 | Project Visibility Control | The system shall enforce project visibility settings so that members outside the project's scope cannot access its workspace, tasks, or data. |
 
---
 
## FR Section 4 — Task & Issue Management
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-TASK-01 | Create Task | The system shall allow the PM to create tasks by specifying title, description, type (Feature, Bug, Improvement, Research, Meeting Action), and acceptance criteria. Optional fields include subtasks, checklists, attachments, and links to a sprint or milestone. A unique Task ID shall be auto-generated. |
| FR-TASK-02 | Assign Task | The system shall allow the PM to assign a task to one or more team members. The system shall warn the PM if the assignment would exceed a member's capacity. Assignees shall receive in-app and email notifications. |
| FR-TASK-03 | Set Task Priority | The system shall allow tasks to be assigned a priority level (Critical, High, Medium, Low) displayed with colour coding. Bulk priority updates shall be supported via a multi-select toolbar. |
| FR-TASK-04 | Set Deadlines & Milestones | The system shall allow the PM to set start and due dates on tasks using a date picker, and to create milestones that group related tasks under a shared target date. |
| FR-TASK-05 | Task Dependencies | The system shall allow tasks to be linked with a relationship type (Blocks, Blocked By, Relates To, Duplicates). Blocked tasks shall not transition to "In Progress" without a manual override. |
| FR-TASK-06 | Update Issue Status | The system shall allow assigned developers to change the status of an issue (e.g. To Do → In Progress → In Review → Done). An optional transition note shall be recorded with each change. |
| FR-TASK-07 | View Issue History | The system shall maintain a read-only, chronological activity log for every issue, recording status changes, assignment changes, comments, attachments, and field edits — each with actor name and timestamp. |
| FR-TASK-08 | Filter and Sort Tasks | The system shall allow tasks to be filtered by status, priority, label, assignee, and date range, and sorted by due date or priority level. Filter results shall update without a full page reload. |
| FR-TASK-09 | Subtasks and Checklists | The system shall support nested subtasks and checklist items within a task, and shall warn the user if a parent task is closed while subtasks remain open. |
| FR-TASK-10 | Task Labels | The system shall allow tasks to be tagged with one or more labels (e.g. "bug", "frontend", "urgent") that can be used for filtering and categorisation. |
 
---
 
## FR Section 5 — Kanban, Timeline & Views
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-VIEW-01 | Kanban Board | The system shall provide a Kanban view with customisable columns (default: Backlog, To Do, In Progress, In Review, Done). Tasks shall be movable between columns via drag-and-drop. Each task card shall display assignee, priority, due date, and task ID. |
| FR-VIEW-02 | Gantt / Timeline View | The system shall provide a Timeline view rendering tasks as horizontal bars on a calendar axis. Dependency links shall be shown as connecting lines. The PM shall be able to adjust task dates by dragging bar edges. The critical path shall be highlighted. |
| FR-VIEW-03 | Personal Task Dashboard | The system shall provide each developer with a personal task view grouping their tasks by Overdue, Due Today, Upcoming, and Completed, with sort and filter controls. |
| FR-VIEW-04 | Workload View | The system shall provide a Workload view showing each team member's task load as a colour-coded percentage bar (green / yellow / red). The PM shall be able to drag tasks between members to rebalance workload in this view. |
| FR-VIEW-05 | Capacity View | The system shall display each member's weekly available hours, allocated hours, and remaining hours. A warning shall appear when a member is at or above 100% capacity. |
| FR-VIEW-06 | Risk Panel | The system shall automatically flag overdue tasks in red and label tasks with no recent progress as "At Risk" on the board and in the Risk Panel. |
| FR-VIEW-07 | Sprint Board | The system shall provide a sprint-scoped board view for Scrum projects, displaying only the tasks committed to the active sprint. |
 
---
 
## FR Section 6 — Comments & Collaboration
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-COLLAB-01 | Add Comments | The system shall allow all project members to add rich-text comments to any task or issue, including file attachments. Comments shall be stored with a timestamp and displayed in threaded format. |
| FR-COLLAB-02 | Edit and Delete Own Comments | The system shall allow users to edit or delete their own comments. Deletion shall require a confirmation dialog. Edit history shall be preserved internally for audit purposes. |
| FR-COLLAB-03 | @Mentions | The system shall allow users to @mention team members in comments. Mentioned users shall receive an in-app and email notification with a direct link to the comment. |
| FR-COLLAB-04 | Mark Comment as Resolution/Decision | The system shall allow comments to be flagged as a Resolution or Decision, making key outcomes easily retrievable within the task's comment thread. |
| FR-COLLAB-05 | Announcements | The system shall allow the PM to compose and publish project-wide announcements via selected delivery channels (in-app, email, push notification). All announcements shall be stored on the project's notice board. |
 
---
 
## FR Section 7 — Attachments & File Management
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-FILE-01 | Upload Attachments | The system shall allow users to upload files to an issue via a button or drag-and-drop. Uploaded files shall be stored and listed in the Attachments section with name and upload timestamp. |
| FR-FILE-02 | Download Attachments | The system shall allow any project member to download attachments from an issue's Attachments section. |
| FR-FILE-03 | Inline Image Preview | The system shall automatically render thumbnail previews for image attachments (PNG, JPG, GIF). Clicking a thumbnail shall expand it to full size in a modal view. |
| FR-FILE-04 | File Type and Size Validation | The system shall reject file uploads that exceed the 10 MB size limit or are of a disallowed type (e.g. .exe). An appropriate error message shall be displayed. |
 
---
 
## FR Section 8 — AI-Powered Meeting Features
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-AI-01 | Generate Tasks from Audio | The system shall allow the PM to upload a meeting audio file (MP3, WAV, M4A) or record directly in-browser. The system shall transcribe the audio via speech-to-text and use AI to extract action items, owners, and priorities, presenting them for PM review and approval before task creation. |
| FR-AI-02 | Generate Tasks from Transcript | The system shall allow the PM to upload a .txt or .docx transcript, or paste text directly. AI shall analyse the content to detect action items, owners, and deadlines, presenting suggestions for PM review and approval. |
| FR-AI-03 | Meeting Summary & Decision Log | The system shall automatically generate a structured meeting summary after audio/transcript processing, covering Decisions Made, Risks Identified, Tasks Created, and Next Meeting Points. The PM shall be able to edit and share the summary. |
| FR-AI-04 | Meeting Archive | The system shall store meeting audio files, transcripts, and generated summaries within the project for future reference, accessible from the Meetings section. |
 
---
 
## FR Section 9 — Notifications
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-NOTIF-01 | In-App Notifications | The system shall deliver real-time in-app notifications for key events (task assigned, @mention, status change, deadline approaching, budget alert). The notification bell shall display a badge count of unread notifications. |
| FR-NOTIF-02 | Email Notifications | The system shall send email notifications for the same triggering events as in-app notifications, respecting each user's notification preferences. |
| FR-NOTIF-03 | Push Notifications | The system shall support push notifications as an optional delivery channel, configurable per user and event type. |
| FR-NOTIF-04 | Daily Digest | The system shall send the PM a daily digest email summarising overdue and at-risk tasks alongside suggested corrective actions. |
| FR-NOTIF-05 | Announcement Notifications | The system shall deliver project-wide announcements via all channels selected by the PM at the time of publishing. |
 
---
 
## FR Section 10 — Time Tracking & Budget
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-TIME-01 | Log Hours | The system shall allow users to log time on a task manually (hours and minutes) or using a built-in timer. Each entry shall be marked as billable or non-billable. |
| FR-TIME-02 | Aggregate Hours | The system shall aggregate logged hours and display totals by task, team member, and project. |
| FR-TIME-03 | Set Project Budget | The system shall allow the PM to set a total hours or cost budget for a project from the Settings panel. |
| FR-TIME-04 | Budget Tracking & Alerts | The system shall track budget vs. actual spend in real time and send automated alerts to the PM at 75% and 90% budget consumption. Task assignment shall be blocked when the budget is fully exceeded, with a manual override option. |
| FR-TIME-05 | Export Hours Data | The system shall allow hours data to be exported in CSV and PDF formats. |
 
---
 
## FR Section 11 — Reporting & Analytics
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-REP-01 | Progress Report Generation | The system shall allow the PM to generate a project progress report (weekly summary or custom date range) covering task completion, team activity, budget usage, and milestone status. Reports shall be exportable as PDF or shareable via a link. |
| FR-REP-02 | Scheduled Reports | The system shall allow the PM to schedule automatic weekly report delivery to specified email addresses. |
| FR-REP-03 | Project Health Dashboard | The system shall provide a consolidated health dashboard showing task completion rate, team workload, budget usage, overdue items, upcoming deadlines, and an overall health score. Each metric shall be drillable. |
| FR-REP-04 | Usage Analytics (Admin) | The system shall provide administrators with a Usage Analytics dashboard showing active users, storage consumption, API usage, and login frequency, with automatic flagging of anomalies or policy violations. |
| FR-REP-05 | Audit Log (Admin) | The system shall maintain an immutable, chronological audit log of all significant system actions (user creations, role changes, login attempts, setting changes, project deletions), each entry including timestamp, actor, action type, affected entity, and IP address. |
 
---
 
## FR Section 12 — Sprint Planning
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-SPRINT-01 | Create Sprint | The system shall allow the PM to create a sprint with defined start and end dates and drag tasks from the backlog into the sprint. |
| FR-SPRINT-02 | Velocity Tracking | The system shall calculate team velocity (story points completed) at the end of each sprint and display historical velocity trends to inform future sprint estimations. |
| FR-SPRINT-03 | Backlog Management | The system shall maintain a project backlog from which tasks can be moved into sprints. Tasks not in a sprint shall remain in the backlog. |
 
---
 
## FR Section 13 — Integrations & System Configuration
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| FR-INT-01 | External Tool Integration | The system shall support OAuth-based integration with external tools (e.g. Slack, GitHub, Google Drive). Connected integrations shall allow automatic syncing of events (e.g. code commits, messages) with project tasks. |
| FR-INT-02 | System Configuration Panel | The system shall provide an administrator-only System Configuration panel for modifying platform-wide settings including authentication methods, session timeouts, default notification rules, and storage limits. |
| FR-INT-03 | Organisational Policies | The system shall allow administrators to define and enforce platform-wide policies including password complexity, data retention periods, and permitted file types. Policies shall apply automatically across all users and projects. |
| FR-INT-04 | Custom Workflows | The system shall provide a visual workflow editor allowing administrators to create custom issue statuses, define allowed transitions between statuses, and optionally add automation rules. Custom workflows shall be assignable to one or more projects. |
 
---
 
---
 
# Non-Functional Requirements
 
## NFR Section 1 — Performance
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-PERF-01 | Login Response Time | User authentication (login) shall complete and redirect the user within 2 seconds under normal load conditions. |
| NFR-PERF-02 | Issue List Load Time | The assigned issues list shall load and render within 1.5 seconds for up to 500 issues. |
| NFR-PERF-03 | Status Update Persistence | A task or issue status change shall be persisted to the database and reflected in the UI within 1 second of confirmation. |
| NFR-PERF-04 | Filter Response Time | Applying any filter or sort on task or issue lists shall update the displayed results without a full page reload and within 500 ms. |
| NFR-PERF-05 | Search Response Time | Keyword search across all projects shall return results within 1 second. Results shall be paginated at 50 items per page. |
| NFR-PERF-06 | Report Generation Time | Progress report generation (for any date range) shall complete within 5 seconds. |
| NFR-PERF-07 | Project Creation Time | A new project shall be created and the PM redirected to its workspace within 2 seconds of submission. |
| NFR-PERF-08 | Dashboard Real-Time Refresh | The Project Health Dashboard and Workload View shall reflect the latest data in real time, with a maximum lag of 5 seconds under normal conditions. |
| NFR-PERF-09 | Audio Transcription Start Time | Speech-to-text transcription shall begin processing within 10 seconds of audio upload completion. |
| NFR-PERF-10 | Workflow Assignment Effect | Changes to an assigned workflow shall take effect for all project members within 5 seconds of the administrator saving the configuration. |
 
---
 
## NFR Section 2 — Security
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-SEC-01 | Password Encryption | All user passwords shall be stored using a strong one-way hashing algorithm (e.g. bcrypt with an appropriate cost factor). Plaintext passwords shall never be stored or logged. |
| NFR-SEC-02 | Transport Security | All communication between client and server shall be encrypted using HTTPS (TLS 1.2 or higher). HTTP connections shall be automatically redirected to HTTPS. |
| NFR-SEC-03 | Role Enforcement | The system shall enforce role-based access control on every API endpoint and UI action. Users shall not be able to access or modify resources outside their permitted scope, regardless of direct URL manipulation. |
| NFR-SEC-04 | Admin MFA | Multi-factor authentication shall be required for all System Administrator accounts. |
| NFR-SEC-05 | Admin Action Logging | All actions performed by System Administrator accounts shall be recorded in the audit log, including timestamp, action type, affected entity, and originating IP address. |
| NFR-SEC-06 | Audit Log Immutability | The audit log shall be read-only. No user, including administrators, shall be able to modify or delete audit log entries. Log data shall be retained for a minimum of 12 months. |
| NFR-SEC-07 | Data Isolation | Users shall only be able to view or interact with data from projects they are members of. Cross-project data leakage shall not be possible through any interface. |
| NFR-SEC-08 | Sensitive Data Masking | Sensitive fields (passwords, API keys, tokens) shall never be exposed in API responses, UI, or system logs. |
| NFR-SEC-09 | File Upload Security | Uploaded files shall be validated for type and size server-side before storage. Executable and scripting file types (e.g. .exe, .sh, .php) shall be rejected. Stored files shall be scanned for malware. |
| NFR-SEC-10 | Session Security | User sessions shall use secure, HTTP-only, SameSite cookies. Sessions shall expire after a configurable inactivity timeout (default 30 minutes for admin, configurable for standard users). |
 
---
 
## NFR Section 3 — Reliability & Availability
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-REL-01 | System Uptime | The platform shall maintain a minimum uptime of 99.5% (excluding scheduled maintenance windows), measured on a monthly basis. |
| NFR-REL-02 | Data Durability | All project, task, and user data shall be persisted durably. Database backups shall be performed at least daily, with a recovery point objective (RPO) of no more than 24 hours. |
| NFR-REL-03 | Graceful Error Handling | In the event of a transient error (e.g. network failure during a status update), the system shall display a meaningful error message and preserve the prior state. The user shall be offered a retry option where applicable. |
| NFR-REL-04 | Budget Exceeded Blocking | When a project budget is fully exceeded, the task assignment function shall be reliably blocked for all users except those with PM-level manual override permission. |
| NFR-REL-05 | Notification Delivery | In-app notifications shall be delivered within 5 seconds of the triggering event. Email and push notifications shall be delivered within 30 seconds under normal load. |
| NFR-REL-06 | Report Scheduling Accuracy | Scheduled progress reports shall be delivered within 5 minutes of the configured delivery time. |
 
---
 
## NFR Section 4 — Usability
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-USE-01 | Responsive Design | The platform shall be usable on modern desktop browsers (Chrome, Firefox, Edge, Safari) at standard screen resolutions. Core task management features shall remain accessible on tablet-sized screens. |
| NFR-USE-02 | Drag-and-Drop Interaction | Drag-and-drop interactions on the Kanban board, Gantt timeline, and Workload view shall be smooth and provide immediate visual feedback without requiring a page reload. |
| NFR-USE-03 | Colour-Coded Status Indicators | All priority levels, capacity states, and risk flags shall use a consistent colour-coding scheme (e.g. red = critical/overdue/overloaded, yellow = warning/approaching limit, green = healthy) applied uniformly across all views. |
| NFR-USE-04 | Empty State Messaging | When a list, board, or dashboard section has no data to display, the system shall present a descriptive empty-state message explaining the condition and, where appropriate, a prompt for the next action. |
| NFR-USE-05 | Confirmation Dialogs | All destructive or irreversible actions (account deletion, project deletion, comment deletion) shall require a confirmation dialog before execution. |
| NFR-USE-06 | Inline Editing | Where supported (e.g. editing comments, adjusting Gantt bar dates), editing shall occur inline without navigating to a separate page. |
| NFR-USE-07 | Upload Progress Feedback | File upload operations shall display a progress bar. Errors (size exceeded, disallowed type) shall be communicated immediately with a clear message. |
| NFR-USE-08 | Accessibility | The platform shall comply with WCAG 2.1 Level AA accessibility guidelines, including keyboard navigability, screen-reader-compatible markup, and sufficient colour contrast ratios. |
 
---
 
## NFR Section 5 — Scalability & Capacity
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-SCAL-01 | Concurrent Users | The system shall support a minimum of 500 concurrent active users without degradation of response times defined in the performance requirements. |
| NFR-SCAL-02 | File Storage Capacity | Per-project file storage shall be configurable by the administrator. The default allowance shall be sufficient to support typical project volumes; storage limits shall be enforceable per organisation. |
| NFR-SCAL-03 | Audio File Size | The AI meeting transcription feature shall support audio files of up to 2 hours in duration and shall handle files of corresponding size without timeout. |
| NFR-SCAL-04 | Workflow Complexity | The custom workflow editor shall support up to 20 custom statuses per workflow without performance degradation in the workflow editor or on the issue board. |
| NFR-SCAL-05 | Search Scalability | The global search function shall return results within 1 second across datasets of up to 100,000 issues per organisation. |
 
---
 
## NFR Section 6 — Maintainability & Extensibility
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-MAIN-01 | Integration Architecture | External tool integrations (Slack, GitHub, Google Drive, etc.) shall be implemented through a standardised OAuth-based adapter layer, enabling new integrations to be added without changes to core platform logic. |
| NFR-MAIN-02 | Workflow Changes Without Disruption | Modifications to a workflow that is actively in use shall not corrupt or invalidate issues currently assigned to statuses within that workflow. Active issues shall remain in their current status; new transitions shall apply going forward. |
| NFR-MAIN-03 | Configuration Auditability | All system configuration changes made by administrators shall be logged in the audit log, enabling rollback analysis and compliance review. |
| NFR-MAIN-04 | Policy Enforcement Consistency | Organisational policies (password rules, file types, retention periods) shall be enforced automatically at every relevant point in the system without requiring manual intervention per user or project. |
 
---
 
## NFR Section 7 — Data Integrity & Compliance
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-DATA-01 | Unique Identifier Generation | All auto-generated IDs (Project ID, Task ID, User ID) shall be globally unique within the platform and shall never be reused after deletion. |
| NFR-DATA-02 | Immutable History | Issue activity logs and audit logs shall be append-only. No user action shall be able to modify or remove historical entries. |
| NFR-DATA-03 | Data Retention | Audit log data shall be retained for a minimum of 12 months. Completed task data shall be retained for at least the duration of the project plus a configurable archival period. |
| NFR-DATA-04 | Deletion Irreversibility | Permanent deletion of projects, user accounts, or issues shall be irreversible. The system shall present clear warnings to this effect prior to confirmation. |
| NFR-DATA-05 | Timestamp Accuracy | All timestamps recorded in activity logs, audit logs, comments, and notifications shall reflect the correct UTC time and shall be displayed to users in their configured local timezone. |
| NFR-DATA-06 | Comment Character Limit Enforcement | The system shall enforce a maximum of 5,000 characters per comment at both the client and server level to ensure data consistency. |
 
---
 
## NFR Section 8 — Notification Timeliness
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-NOTIF-01 | Assignment Notification Latency | Notifications triggered by task assignments shall be delivered to the assignee's in-app notification panel within 5 seconds of the assignment being saved. |
| NFR-NOTIF-02 | Member Invitation Notification | When a user is added to a project, the invitation notification shall be delivered within 10 seconds. |
| NFR-NOTIF-03 | Announcement Delivery | Project-wide announcements shall be delivered to all selected channels within 10 seconds of publication. |
| NFR-NOTIF-04 | Budget Alert Timeliness | Budget threshold alerts (75%, 90%) shall fire in real time at the moment the threshold is crossed, with no more than 5 seconds of lag. |
 
---
 
## NFR Section 9 — Interoperability
 
| ID | Requirement Name | Description |
|----|-----------------|-------------|
| NFR-INTER-01 | Export Format Support | Progress reports and hours data shall be exportable in both PDF and CSV formats, compatible with standard spreadsheet and document viewers. |
| NFR-INTER-02 | Audio Format Support | The meeting transcription feature shall accept MP3, WAV, and M4A audio formats. Unsupported formats shall result in a clear format error message. |
| NFR-INTER-03 | Transcript Document Support | The meeting transcript upload feature shall accept .txt and .docx formats, in addition to plain-text paste input. |
| NFR-INTER-04 | Attachment Format Support | The permitted attachment types for issues and tasks shall include at minimum: .jpg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .zip, and .txt. |
 
---



