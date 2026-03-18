Week 4
User stories report pt2. Developer role- Gledis 
1.View Assigned Issues
*As a developer, I want to see a list of issues assigned to me, so that I can easily track the tasks I need to work on.
*As a developer, I want to open an issue to view its full details, so that I understand the task requirements before starting to work.
*As a developer, I want to filter my assigned issues by status or priority, so that I can quickly focus on what matters most.
2.Update Issue Status
*As a developer, I want to update the status of an issue, so that the team can track the progress of my work.
*As a developer, I want to see a full history of status changes for an issue, so that  I can understand how the task has evolved over time.
*As a developer, I want to add a short note when changing an issue's status, so that my teammates understand the reason for the change.
3.Add Comments
*As a developer, I want to add comments to an issue, so that I can share updates or ask questions related to the task.
*As a developer, I want to edit or delete my own comments, so that I can correct or update the information I provided.
*As a developer, I want to mention a teammate in a comment using @username, so that they are notified about relevant information.
4.Add Attachments
*As a developer, I want to upload files to an issue, so that I can provide supporting materials such as screenshots or documents.
*As a developer, I want to view and download attachments on an issue, so that I can access all files related to the task.
*As a developer, I want to see preview of image attachments inline, so that I do not have to download them just so check their content.
5.Track Personal Tasks
*As a developer, I want to see my tasks organised by deadline or priority, so that I can plan my work efficiently.
*As a developer, I want to see which tasks are overdue or completed, so that I can track my progress and meet deadlines.
*As a developer, I want to recieve in-app notifications when a new issue is assigned to me, so that I am immediately aware of new responsibilities.
6.Search and Filter Issues
*As a developer, I want to search issues by keyword across all projects I am part of, so that I can quickly find relevant work items.
*As a developer, I want to filter issues by label, or date range, so that I can narrow down the list to what I need.

Use case document-Gledis
1.Log-in to IssueHub
*Use Case ID: UC-01 
*Use Case Name: Log In to IssueHub
*Actor: Developer
*Description: The developer authenticates with their email and password to access the system. *Preconditions: The developer has a registered and active account created by the system administrator.
*Main Flow: 1. Developer navigates to the IssueHub login page. 2. Developer enters their email and password. 3. System validates the credentials. 4. System redirects the developer to their personal dashboard. 
*Alternative Flows: 3a. Credentials are invalid → system shows an error message; developer may retry. 3b. Account is deactivated → system shows 'Account disabled' and blocks access. *Postconditions: Developer is authenticated and can access all features available to their role. 
*Restrictions: Maximum 5 failed login attempts triggers a 15-minute account lockout.
2.View Assigned Issues
*Use Case ID: UC-02 
*Use Case Name: View Assigned Issues
*Actor: Developer 
*Description: The developer views and filters the list of issues assigned to them. 
*Preconditions Developer is logged in and has at least one issue assigned to them. 
*Main Flow 1. Developer navigates to 'My Issues' from the dashboard. 2. System displays all issues assigned to the developer. 3. Developer optionally applies filters (status, priority, due date). 4. Developer clicks an issue to view its full details. 
*Alternative Flows 2a. No issues are assigned → system shows an empty-state message. 3a. Filter returns no results → system shows 'No issues match your filters'.
*Postconditions Developer has a clear view of their workload and can open any issue for details. 
*Restrictions Developers can only see issues from projects they are members of.
3.Update Issue Status
*Use Case ID: UC-03 
*Use Case Name: Update Issue Status
*Actor: Developer 
*Description: The developer changes the status of an assigned issue to reflect current progress. *Preconditions: Developer is logged in. The issue is assigned to them and is not archived.
*Main Flow 1. Developer opens the issue detail page. 2. Clicks the current status badge to open the status dropdown. 3. Selects the new status (e.g. In Progress, Blocked, Done). 4. Optionally types a transition note explaining the change. 5. Clicks 'Confirm'. System saves the change and logs it in the issue history. 
*Alternative Flows 3a. Developer selects 'Done' but sub-tasks are still open → system warns and requires confirmation. 5a. Network error occurs → system shows an error and the status remains unchanged. 
*Postconditions Issue status is updated; the change appears in the history log; the project manager is notified. 
*Restrictions Developers may only update statuses on issues assigned to them. Archived issues are read-only.
4.Add a Comment to an Issue
*Use Case ID: UC-04 
*Use Case Name: Add a Comment to an Issue 
*Actor: Developer 
*Description: The developer adds a comment to an issue to share progress or ask a question. Preconditions Developer is logged in and has read access to the issue. 
*Main Flow 1. Developer opens the issue detail page. 2. Scrolls to the Comments section. 3. Types a comment (supports @mentions and basic Markdown formatting). 4. Clicks 'Post Comment'. 5. System saves and displays the comment with a timestamp.
*Alternative Flows 3a. Comment body is empty → 'Post' button remains disabled. 3b. @mentioned user does not exist → mention renders as plain text with a warning. 
*Postconditions Comment is visible to all project members. @mentioned users receive a notification. 
*Restrictions Comments are limited to 5,000 characters. Developers may only edit or delete their own comments.
5.Upload Attachment to an Issue
*Use Case ID: UC-05 
*Use Case Name: Upload Attachment to an Issue 
*Actor: Developer 
*Description: The developer uploads a file to an issue to provide supporting context. *Preconditions Developer is logged in. The issue exists and is not archived. 
*Main Flow 1. Developer opens the issue detail page. 2. Clicks 'Add Attachment'. 3. Selects a file from their device. 4. System validates the file size and type, then uploads it. 5. File appears in the Attachments section with a preview (images) or download link. 
*Alternative Flows 4a. File exceeds 10 MB → system rejects the upload and shows a size error. 4b. File type is not allowed (e.g. .exe) → system rejects and shows a type error. 4c. Upload interrupted → system shows a retry option. 
*Postconditions Attachment is stored and linked to the issue. All project members can view or download it. 
*Restrictions Allowed types: .jpg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .zip, .txt. Max 10 MB per file.
6.Track Personal Tasks
*Use Case ID: UC-06 
*Use Case Name: Track Personal Tasks Actor Developer 
*Description: The developer reviews their personal task overview to manage deadlines and priorities. 
*Preconditions: Developer is logged in. 
*Main Flow 1. Developer opens the 'My Tasks' dashboard section. 2. System displays tasks grouped by: Overdue, Due Today, Upcoming, Completed. 3. Developer sorts or filters by priority or project. 4. Developer clicks a task to open its issue detail page. 
*Alternative Flows 2a. No tasks exist → system shows an empty-state with a prompt to check with the project manager. 
*Postconditions Developer has a clear, prioritised view of all their pending and completed work. *Restrictions Only issues assigned to the logged-in developer are shown. Completed tasks are visible for 30 days
7.Search and Filter Issues
*Use Case ID: UC-07
*Use Case Name: Search and Filter Issues
*Actor: Developer
*Description:The developer searches for issues by keyword or applies filters to find specific
work items.
*Preconditions:Developer is logged in and is a member of at least one project.
*Main Flow: 1.. Developer clicks the search bar at the top of the page. 2. Types a keyword
(title, description, or issue ID). 3. System returns matching issues from
projects the developer is part of. 4. Developer optionally applies additional
filters (label, date range, status). 5. Developer clicks a result to open the issue.
*Alternative Flows: 3a. No results found → system shows 'No issues match your search'. 2a.
Search query is less than 2 characters → system does not trigger a search.
*Postconditions: Developer is taken to the selected issue's detail page.
*Restrictions:Search only covers projects the developer is a member of. Results are limited
to 50 per page.

![alt text](<Screenshot 2026-03-08 170346.png>)
![alt text](<Screenshot 2026-03-08 170402.png>)
![alt text](<Screenshot 2026-03-08 170423.png>)
![alt text](<Screenshot 2026-03-08 170450.png>)
