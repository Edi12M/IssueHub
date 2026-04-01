# IssueHub System Requirements Specification

---
<p align="center">
  <img src="../Images/epokaLogo.png" alt="EPOKA University" width="200"/><br/>
  <strong>Faculty of Engineering and Architecture</strong><br/>
  <strong>Department of Computer Engineering</strong><br/>
  <strong>CEN 302 - Software Engineering</strong>
</p>

---
---

## IssueHub Requirements Specification

### Version 1.0

### March 26th, 2026

---

**Prepared by:**

- Edvin Mehaj
- Xhoana Thano
- Nea Metohu
- Arber Zeneli
- Gledis Xhaja
- Vasil Nano
- Klevi Vezi

---

## Table of Contents

## 1) Executive Summary  

### a) Project Overview  

1. **Executive Summary**
   - a) Project Overview
   - b) Purpose and Scope of this Specification

2. **Product/Service Description**
   - a) Product Context
   - b) User Characteristics
   - c) Assumptions
   - d) Constraints
   - e) Dependencies

---
# 1. Executive Summary 

### a) Project Overview - Klevi Vezi

**IssueHub** is a modern, web-based internal issue tracking and project management platform designed to help organizations plan, coordinate, and monitor their work more effectively. In many companies, task management and collaboration are still handled through fragmented tools such as spreadsheets, messaging applications, or manual tracking methods. These approaches often lead to miscommunication, lack of transparency, missed deadlines, and inefficient resource allocation.  

IssueHub addresses these challenges by providing a centralized digital workspace where teams can manage projects, track issues, and collaborate in real time. The platform introduces structured workflows and role-based access control, ensuring that each user interacts with the system according to their responsibilities. System Administrators oversee platform stability and user management, Project Managers organize and monitor project execution, and Developers focus on completing assigned tasks and updating progress.  

The system supports essential project management features such as task and issue creation, assignment of responsibilities, priority and deadline management, status tracking, commenting and file attachments, search and filtering capabilities, and real-time notifications. These functionalities enable teams to stay organized, communicate efficiently within the context of their work, and maintain clear visibility of ongoing activities and responsibilities.  

By consolidating project information into a single accessible platform, IssueHub improves visibility into team performance, reduces operational bottlenecks, and enhances collaboration across departments. Its intuitive web interface allows users to access the system from any device with an internet connection, enabling seamless teamwork in both remote and on-site working environments.  

### b) Purpose and Scope of this Specification

---

# 2. Product/Service Description

### a) Product Context - Gledis Xhaja

IssueHub is a web-based platform built to give organizations a structured and self-contained way to manage projects, track issues, and coordinate team work. It is designed for internal use within a single organization, meaning all data, workflows, and user access remain fully under the organization's control — without relying on external subscription services or adapting to the constraints of general-purpose tools.

The platform brings together three types of users — System Administrators, Project Managers, and Developers — each with a clearly defined role that shapes how they interact with the system. This separation is intentional. Rather than giving everyone access to everything, IssueHub ensures that each user works within the boundaries of their actual responsibilities, which reduces confusion, protects sensitive project data, and keeps the system organized as teams grow.

In terms of where IssueHub fits within an organization's day-to-day operations, it acts as the central point of reference for all ongoing work. Project Managers plan and structure work by creating sprints, defining milestones, setting deadlines, and monitoring team capacity. Developers receive their assignments through the platform, update task progress, attach relevant files, and communicate directly within the context of each issue. System Administrators operate in the background, managing user accounts, maintaining access control, and ensuring the platform runs consistently across the organization.

The system runs entirely in a web browser with no local installation required, making it accessible from any device with an internet connection. All actions go through the application layer, which means security policies, role permissions, and audit logs are enforced consistently regardless of who is using the system or from where.

IssueHub is currently in the concept and planning phase. The foundation being established prioritizes internal governance, clear role boundaries, and a workflow structure that reflects how real development teams operate — ensuring that when the system is built and deployed, it serves as a reliable and accountable tool for the entire organization.


### b) User Characteristics

---

### c) Assumptions

---

### d) Constraints - Edvin Mehaj

## 1. Access & Permissions

### Developer
- Can view only projects and tasks they are explicitly assigned to.
- Cannot view projects outside their assigned scope.
- Can create, update, and close tasks only within assigned projects.
- Cannot delete tasks, projects, or user accounts.
- Cannot assign tasks to other users.
- Cannot change a project's status (active, archived, closed).

### Project Manager
- Can view all projects within their managed scope.
- Can create, update, archive, and delete projects assigned to them.
- Can assign and unassign developers to tasks and projects.
- Cannot access projects belonging to other Project Managers unless granted explicit permission.
- Cannot create or delete user accounts.
- Cannot modify system-level configurations.

### System Manager
- Has full read and write access to all projects, tasks, and user accounts.
- Can create, modify, deactivate, and delete any user account.
- Can assign and change roles for any user.
- Can access all audit logs and system reports.
- Can configure global system settings (workflows, custom fields, integrations).

---

## 2. Functional Constraints

### Developer
- Can update task status only within the allowed workflow states (To Do → In Progress → In Review → Done).
- Cannot skip workflow states.
- Can add comments and attachments to tasks.
- Can log work hours on assigned tasks only.
- Cannot modify project settings, sprints, or milestones.

### Project Manager
- Can create and manage sprints, milestones, and backlogs within their projects.
- Can define and modify task workflows for their projects.
- Can set task priorities and deadlines.
- Cannot override system-wide workflows defined by the System Manager.
- Cannot access or modify billing or licensing settings.

### System Manager
- Can define and enforce global workflow templates applicable to all projects.
- Can override project-level workflow settings.
- Can configure system-wide integrations.
- Can enable or disable features for the entire system.
- Can generate system-wide reports across all projects and users.
- Changes to global settings must be logged and are subject to audit.

---

## 3. Security Constraints

### Developer
- Can only authenticate via approved methods (username/password, SSO).
- Session timeout after 30 minutes of inactivity.
- Cannot access the system API directly; all actions must go through the UI or approved SDK.
- Password must meet minimum complexity requirements (min. 8 characters, mixed case, number, special character).
- Failed login attempts exceeding 5 in 10 minutes result in temporary account lockout.

### Project Manager
- Subject to the same authentication and session constraints as Developer.
- Actions on project settings are logged for audit purposes.
- Cannot export sensitive user data.
- Multi-factor authentication is required for PM-level accounts.

### System Manager
- MFA is mandatory and cannot be disabled.
- All configuration changes are recorded in an immutable audit log.
- SM accounts cannot be created or modified by non-SM users.
- Direct database access is prohibited; all actions must go through the application layer.
- SM sessions expire after 15 minutes of inactivity.
- System Manager credentials must be rotated every 90 days.

---

## 4. Business Rules

### Developer
- A task cannot be marked as Done without at least one reviewer (PM or another DEV) having approved it.
- A Developer may only be assigned to a maximum of [N] active tasks simultaneously (configurable by PM).
- A Developer cannot reopen a task that has been closed by a PM or SM.

### Project Manager
- A project must have at least one assigned Developer before it can be moved to Active status.
- A PM cannot archive a project that has open (unresolved) critical-priority tasks.
- Sprint creation requires a defined start date, end date, and at least one task.
- A PM is responsible for their project's data integrity; deletion of a project requires confirmation and a 48-hour grace period before permanent removal.
- A PM cannot approve their own tasks if they are also assigned as a Developer on that task.

### System Manager
- Deactivating a user account must trigger automatic reassignment of their open tasks.
- Deletion of a user account is a soft-delete by default; hard-delete requires a second SM to confirm.
- Any change to a global workflow that affects active sprints must be preceded by a system-wide notification.
- The system must maintain at least one active SM account at all times; the last remaining SM cannot be deactivated.
- System-wide downtime for maintenance requires scheduling approval and notification to all PMs at least 48 hours in advance.

---

## 5. General System Constraints

- The Project Management System requires a stable internet connection to function properly,
  as it is a web-based solution.

- The system's efficiency depends on the staff's proper training and adoption of the
  application across all user levels (Developer, Project Manager, System Manager).

- The performance and reliability of the application are dependent on the organization's
  IT infrastructure, including network stability and device availability.

- The accuracy and completeness of task and project data impact the effectiveness of search
  and filtering functionalities.

- Features like report generation and sprint tracking rely on accurate and timely data entry
  by Developers and Project Managers.

- The ability to generate project reports and track team performance depends on consistent
  work log submissions by Developers and proper sprint configuration by Project Managers.

- The application's user experience and functionality may be constrained by the limitations
  of the web technologies and frameworks used in development.

- Role-based access control effectiveness depends on the System Manager maintaining
  up-to-date user role assignments and promptly deactivating inactive accounts.

- The accuracy of audit logs and security reports is contingent on all user actions being
  performed through the application layer, without direct database access.

### e) Dependencies
