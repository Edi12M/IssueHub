Week 4

## System Administrator

### Projects Tab

This screen represents the Projects tab for the System Administrator, providing a high-level overview of all projects, including project managers, status, and number of issues.

### UI Screenshot
![Projects Screen](sysadmin_figma_projects.png)
---

## Use Case: System Administrator

This use case describes how the System Administrator interacts with IssueHub to manage users, roles, system settings, and monitor the platform.

### Actor
System Administrator

### Goal
To control access, configure the system, and monitor all projects and issues.

### Preconditions
- Admin account exists  
- Admin is logged into the system  

### Main Flow
1. Admin logs into IssueHub  
2. Admin accesses the dashboard  
3. Admin performs actions such as:
   - create/edit/delete users  
   - assign roles  
   - view all projects and issues  
   - configure system settings  
4. System saves changes and confirms actions  

### Alternative Flows
- Invalid login → access denied  
- Duplicate user → error message  
- Invalid role → system rejects action  

### Postconditions
- Users and roles are updated  
- System settings are saved  
- System data remains consistent  

### Restrictions / Constraints
- Only admins can access these features  
- User emails must be unique  
- Roles must be valid  
- Admin actions must follow system rules  

### Outcome
The System Administrator successfully manages and monitors the entire IssueHub system.