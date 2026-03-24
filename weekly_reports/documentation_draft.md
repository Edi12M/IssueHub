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

### b) Purpose and Scope of this Specification - Vasil Nano

**Purpose**

This specification aims to deliver a clear and detailed description of the **IssueHub** system, highlighting its features, functionality, and overall goals. This document acts as a guide for stakeholders, developers, and project managers by outlining how the system is meant to function and the issues it seeks to address. It creates a common comprehension of system needs, user responsibilities, and anticipated actions, guaranteeing consistency during the development and execution phases.

Moreover, this specification directs the design, development, testing, and implementation of IssueHub. Documenting the system's fundamental abilities and limitations lessens uncertainty, facilitates sound decision-making, and guarantees that all participants are aligned with a unified vision of the platform.

**Scope**

This document outlines the design and features of IssueHub as an online internal issue tracking and project management tool. It outlines the definition of user roles—System Administrator, Project Manager, and Employee—and explains how each role engages with the platform. The scope includes essential system functionalities like project creation and oversight, issue tracking, task delegation, workflow management, status updates, commenting, file uploads, and notification features.

The document also covers system behavior concerning user authentication, role-based access control, and the arrangement of data within projects and issues. It describes how users will engage with the system via a web interface and how data will be stored, accessed, and organized.

Nonetheless, this specification excludes external integrations, advanced analytics, or dependencies on third-party systems unless specifically outlined in future project expansions. It centers mainly on providing a dependable and functional internal tool that enhances team collaboration, task clarity, and project management within a company

---

# 2. Product/Service Description

### a) Product Context - Gledis Xhaja

IssueHub is a web-based platform built to give organizations a structured and self-contained way to manage projects, track issues, and coordinate team work. It is designed for internal use within a single organization, meaning all data, workflows, and user access remain fully under the organization's control — without relying on external subscription services or adapting to the constraints of general-purpose tools.

The platform brings together three types of users — System Administrators, Project Managers, and Developers — each with a clearly defined role that shapes how they interact with the system. This separation is intentional. Rather than giving everyone access to everything, IssueHub ensures that each user works within the boundaries of their actual responsibilities, which reduces confusion, protects sensitive project data, and keeps the system organized as teams grow.

In terms of where IssueHub fits within an organization's day-to-day operations, it acts as the central point of reference for all ongoing work. Project Managers plan and structure work by creating sprints, defining milestones, setting deadlines, and monitoring team capacity. Developers receive their assignments through the platform, update task progress, attach relevant files, and communicate directly within the context of each issue. System Administrators operate in the background, managing user accounts, maintaining access control, and ensuring the platform runs consistently across the organization.

The system runs entirely in a web browser with no local installation required, making it accessible from any device with an internet connection. All actions go through the application layer, which means security policies, role permissions, and audit logs are enforced consistently regardless of who is using the system or from where.

IssueHub is currently in the concept and planning phase. The foundation being established prioritizes internal governance, clear role boundaries, and a workflow structure that reflects how real development teams operate — ensuring that when the system is built and deployed, it serves as a reliable and accountable tool for the entire organization.


### b) User Characteristics

IssueHub is designed for internal use within a single organization, serving three distinct user types. Each profile below describes the general characteristics, experience level, and technical expertise relevant to their interaction with the platform.

---

**1. System Administrator**

System Administrators are typically full-time IT or technical operations staff within the organization. They are responsible for maintaining the platform's stability, managing user accounts, enforcing access control policies, and configuring system-wide settings.

- **Role type:** Staff (IT / Operations)
- **Experience:** Experienced professionals with prior exposure to system administration, user management tools, and internal IT governance. Familiar with concepts such as role-based access control, audit logs, and software lifecycle management.
- **Technical expertise:** High. Comfortable working with web-based administrative dashboards, managing credentials and authentication policies (including MFA), interpreting audit logs, and configuring platform-level settings. Expected to understand security principles and compliance requirements.
- **General characteristics:** Detail-oriented, process-driven, and security-conscious. Typically work behind the scenes and interact with the platform less frequently than other user types, but their actions carry the highest level of system impact. Require a reliable, unambiguous interface that surfaces critical information clearly and supports audit accountability.

---

**2. Project Manager**

Project Managers are mid-to-senior level staff responsible for planning, organizing, and overseeing the execution of projects within the organization. They serve as the bridge between high-level organizational goals and the day-to-day work of development teams.

- **Role type:** Staff (Management / Team Lead)
- **Experience:** Experienced in project coordination, sprint planning, and team supervision. Likely have prior experience using project management tools such as Jira, Trello, Asana, or equivalent platforms. Familiar with agile or hybrid development methodologies.
- **Technical expertise:** Moderate. Comfortable navigating web-based tools, creating and structuring project workflows, managing task boards, and generating reports. Not expected to have deep software development knowledge, but must understand task lifecycle, priority systems, and milestone tracking.
- **General characteristics:** Organized, deadline-conscious, and collaborative. Frequently interact with the platform throughout the workday to monitor progress, reassign tasks, update sprint plans, and communicate with developers. Value clear visual overviews of team capacity and project health. May manage multiple concurrent projects and require efficient filtering and search capabilities to stay on top of responsibilities.

---

**3. Developer**

Developers are the primary task executors within the organization — software engineers, testers, or technical contributors who are assigned issues and are responsible for completing them within the defined workflow.

- **Role type:** Staff (Technical / Engineering)
- **Experience:** Varies from junior to senior level. Likely have prior experience working within ticketing or issue-tracking environments, even if informally. Familiar with development workflows including task statuses, code reviews, and sprint cycles.
- **Technical expertise:** Moderate to high. Comfortable using web-based tools, uploading files, writing structured comments, and navigating task boards. Accustomed to working within defined workflows and understand version-controlled or milestone-based delivery processes.
- **General characteristics:** Task-focused and execution-oriented. Interact with the platform regularly to check assignments, update task statuses, log work, and communicate progress through comments. Prefer a clean, low-friction interface that minimizes time spent on administrative overhead and maximizes clarity about what needs to be done and in what order. Access patterns tend to be frequent but narrowly scoped — primarily limited to their own assigned tasks and projects.

---

### c) Assumptions - Arbër Zeneli

Based on the IssueHub context provided, here are the key assumptions underlying this software project idea, categorized by type:

---

## Problem Assumptions

| # | Assumption |
|---|------------|
| 1 | Organizations actually experience significant pain from fragmented tools (spreadsheets, messaging apps, manual tracking) to the extent they would adopt a new platform |
| 2 | Miscommunication, lack of transparency, missed deadlines, and inefficient resource allocation are widespread problems that IssueHub can meaningfully solve |
| 3 | Teams are willing to consolidate their work into a single platform rather than continuing to use familiar but fragmented tools |

---

## User Assumptions

| # | Assumption |
|---|------------|
| 1 | The three defined user roles (System Admin, Project Manager, Developer) accurately reflect the actual roles and responsibilities within target organizations |
| 2 | Developers will actively update their task progress without requiring excessive manual enforcement or reminders |
| 3 | System Administrators exist within target organizations with the capacity to manage users, access control, and platform stability |
| 4 | Users will access the platform from any device with an internet connection rather than defaulting to a single work computer |

---

## Solution Assumptions

| # | Assumption |
|---|------------|
| 1 | The feature set (task creation, assignments, priorities, deadlines, status tracking, comments, attachments, search, notifications) is sufficient to replace existing fragmented workflows |
| 2 | Role-based access control reduces confusion and protects sensitive data rather than creating friction for users needing cross-role visibility |
| 3 | A web-based platform with no local installation is a benefit, not a barrier, for target organizations |
| 4 | Structured workflows (sprints, milestones, capacity planning) match how target teams actually work, rather than forcing a methodology onto them |

---

## Value Assumptions

| # | Assumption |
|---|------------|
| 1 | Teams will perceive enough value in IssueHub to fully adopt it rather than defaulting back to existing tools |
| 2 | Improved visibility into team performance will lead to measurable reductions in operational bottlenecks |
| 3 | The platform enhances collaboration across departments, meaning teams will actually use it for cross-functional work |
| 4 | Organizations want internal governance and control over their data rather than relying on external subscription services |

---

## Market / Organizational Assumptions

| # | Assumption |
|---|------------|
| 1 | There is demand for an internally-hosted, self-contained issue tracking solution rather than general-purpose tools like Jira, Asana, or Trello |
| 2 | Organizations have the infrastructure and willingness to host and maintain an internal platform |
| 3 | The "single organization" constraint (no multi-tenancy) is acceptable to target customers |
| 4 | The separation of roles into three distinct types fits the structure of organizations that would adopt this platform |

---

## Technical Assumptions

| # | Assumption |
|---|------------|
| 1 | A modern web-based architecture can deliver sufficient performance and responsiveness for real-time collaboration features |
| 2 | Security policies, role permissions, and audit logs can be implemented consistently across all user interactions |
| 3 | The platform can scale to accommodate growing teams and projects without significant architectural changes |
| 4 | Browser-based access across any device is technically feasible without compromising functionality or user experience |
| 5 | Real-time notifications can be implemented reliably across different network conditions and devices |

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
