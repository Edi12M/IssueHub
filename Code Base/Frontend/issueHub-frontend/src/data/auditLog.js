// Audit log data - currently using seed data
// In the future, this will connect to the backend API
// API endpoint: GET /api/auditlog

const auditLogStore = [
  {
    id: "log-001",
    timestamp: "2026-05-09T09:42:00Z",
    category: "User Management",
    eventType: "USER_CREATED",
    description: "Created user account maya.patel@issuehub.local",
    performedBy: "Admin",
    target: "Maya Patel",
  },
  {
    id: "log-002",
    timestamp: "2026-05-09T08:15:00Z",
    category: "User Management",
    eventType: "ROLE_CHANGED",
    description:
      "Changed role for john.doe@issuehub.local from Developer to Project Manager",
    performedBy: "Admin",
    target: "John Doe",
  },
  {
    id: "log-003",
    timestamp: "2026-05-08T16:30:00Z",
    category: "Project Management",
    eventType: "PROJECT_CREATED",
    description:
      'Created project "Mobile App MVP" and assigned David Park as manager',
    performedBy: "Admin",
    target: "Mobile App MVP",
  },
  {
    id: "log-004",
    timestamp: "2026-05-08T14:22:00Z",
    category: "Security",
    eventType: "LOGIN",
    description: "Successful admin login from IP 192.168.1.42",
    performedBy: "Admin",
    target: "Admin Session",
  },
  {
    id: "log-005",
    timestamp: "2026-05-08T11:05:00Z",
    category: "User Management",
    eventType: "USER_DEACTIVATED",
    description:
      "Deactivated account robert.kim@issuehub.local — account inactive for 90+ days",
    performedBy: "Admin",
    target: "Robert Kim",
  },
  {
    id: "log-006",
    timestamp: "2026-05-07T17:45:00Z",
    category: "Project Management",
    eventType: "PROJECT_ARCHIVED",
    description: 'Archived project "UI/UX Redesign" — all milestones completed',
    performedBy: "Admin",
    target: "UI/UX Redesign",
  },
  {
    id: "log-007",
    timestamp: "2026-05-07T15:20:00Z",
    category: "System",
    eventType: "SETTINGS_CHANGED",
    description:
      "Updated MFA enforcement policy — MFA now required for all Project Manager accounts",
    performedBy: "Admin",
    target: "Security Policy",
  },
  {
    id: "log-008",
    timestamp: "2026-05-07T09:10:00Z",
    category: "User Management",
    eventType: "USER_CREATED",
    description:
      "Created user account alex.morgan@issuehub.local with role Developer",
    performedBy: "Admin",
    target: "Alex Morgan",
  },
  {
    id: "log-009",
    timestamp: "2026-05-07T08:44:00Z",
    category: "Security",
    eventType: "FAILED_LOGIN",
    description:
      "3 consecutive failed login attempts for alex.morgan@issuehub.local — account temporarily locked",
    performedBy: "System",
    target: "Alex Morgan",
  },
  {
    id: "log-010",
    timestamp: "2026-05-06T14:30:00Z",
    category: "Project Management",
    eventType: "MEMBERS_ADDED",
    description: 'Added 3 members to project "IssueHub Backend API"',
    performedBy: "Admin",
    target: "IssueHub Backend API",
  },
  {
    id: "log-011",
    timestamp: "2026-05-06T11:15:00Z",
    category: "Security",
    eventType: "PASSWORD_RESET",
    description: "Password reset initiated for sarah.chen@issuehub.local",
    performedBy: "Admin",
    target: "Sarah Chen",
  },
  {
    id: "log-012",
    timestamp: "2026-05-05T09:00:00Z",
    category: "User Management",
    eventType: "USER_CREATED",
    description:
      "Created user account david.park@issuehub.local with role Project Manager",
    performedBy: "Admin",
    target: "David Park",
  },
  {
    id: "log-013",
    timestamp: "2026-05-04T16:45:00Z",
    category: "Project Management",
    eventType: "PROJECT_CLOSED",
    description:
      'Closed project "Payment Gateway Integration" — all deliverables accepted',
    performedBy: "Admin",
    target: "Payment Gateway Integration",
  },
  {
    id: "log-014",
    timestamp: "2026-05-04T10:20:00Z",
    category: "User Management",
    eventType: "ROLE_CHANGED",
    description:
      "Changed role for maria.torres@issuehub.local from Developer to Project Manager",
    performedBy: "Admin",
    target: "Maria Torres",
  },
  {
    id: "log-015",
    timestamp: "2026-05-03T14:05:00Z",
    category: "System",
    eventType: "SETTINGS_CHANGED",
    description:
      "Updated session timeout — Admin sessions now expire after 15 minutes of inactivity",
    performedBy: "Admin",
    target: "Session Policy",
  },
  {
    id: "log-016",
    timestamp: "2026-05-02T09:30:00Z",
    category: "User Management",
    eventType: "USER_CREATED",
    description:
      "Created user account lin.wei@issuehub.local with role Project Manager",
    performedBy: "Admin",
    target: "Lin Wei",
  },
  {
    id: "log-017",
    timestamp: "2026-05-01T15:00:00Z",
    category: "Project Management",
    eventType: "PROJECT_CREATED",
    description:
      'Created project "Analytics Dashboard" and assigned David Park as manager',
    performedBy: "Admin",
    target: "Analytics Dashboard",
  },
  {
    id: "log-018",
    timestamp: "2026-04-30T10:00:00Z",
    category: "Security",
    eventType: "MFA_ENABLED",
    description:
      "Multi-factor authentication enabled and enforced for admin account",
    performedBy: "Admin",
    target: "Admin Account",
  },
  {
    id: "log-019",
    timestamp: "2026-04-28T09:00:00Z",
    category: "User Management",
    eventType: "USER_CREATED",
    description:
      "Created user account sarah.chen@issuehub.local with role Project Manager",
    performedBy: "Admin",
    target: "Sarah Chen",
  },
  {
    id: "log-020",
    timestamp: "2026-04-25T11:00:00Z",
    category: "Project Management",
    eventType: "PROJECT_CREATED",
    description:
      'Created project "IssueHub Backend API" and assigned Sarah Chen as manager',
    performedBy: "Admin",
    target: "IssueHub Backend API",
  },
];

/**
 * Get audit log entries
 * Currently using seed data; will integrate with backend API when endpoint is available
 */
export function getAuditLog() {
  return [...auditLogStore].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

/**
 * Add an audit log entry
 * Currently using local storage; will integrate with backend API when endpoint is available
 */
export function addAuditEvent({
  category,
  eventType,
  description,
  performedBy,
  target,
}) {
  auditLogStore.push({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    category,
    eventType,
    description,
    performedBy,
    target,
  });
}
