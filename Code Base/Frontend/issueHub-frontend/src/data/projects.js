const STORAGE_KEY = "issuehub.projects";

const seedProjects = [
  {
    id: "proj-1",
    name: "IssueHub Backend API",
    description: "RESTful API for the IssueHub platform covering auth, projects, tasks, and notifications.",
    status: "Active",
    manager: "Sarah Chen",
    managerId: "seed-manager-1",
    membersCount: 5,
    openIssues: 23,
    completedIssues: 45,
    budget: 50000,
    spent: 32000,
    createdAt: "2025-11-15T10:00:00Z",
    deadline: "2026-06-30T00:00:00Z",
    tags: ["backend", "api", "core"],
  },
  {
    id: "proj-2",
    name: "Mobile App MVP",
    description: "iOS and Android client application providing field team access to issues and tasks.",
    status: "Active",
    manager: "David Park",
    managerId: "seed-manager-2",
    membersCount: 4,
    openIssues: 12,
    completedIssues: 8,
    budget: 35000,
    spent: 14000,
    createdAt: "2026-01-10T09:00:00Z",
    deadline: "2026-08-15T00:00:00Z",
    tags: ["mobile", "ios", "android"],
  },
  {
    id: "proj-3",
    name: "Authentication & SSO Integration",
    description: "Single sign-on integration with the corporate identity provider using SAML 2.0.",
    status: "Active",
    manager: "Sarah Chen",
    managerId: "seed-manager-1",
    membersCount: 3,
    openIssues: 7,
    completedIssues: 19,
    budget: 20000,
    spent: 17500,
    createdAt: "2025-12-01T08:00:00Z",
    deadline: "2026-05-31T00:00:00Z",
    tags: ["security", "auth", "sso"],
  },
  {
    id: "proj-4",
    name: "Legacy System Migration",
    description: "Migrate all data and workflows from the old on-premise ticketing system to IssueHub.",
    status: "Active",
    manager: "Lin Wei",
    managerId: "seed-manager-3",
    membersCount: 6,
    openIssues: 34,
    completedIssues: 22,
    budget: 80000,
    spent: 41000,
    createdAt: "2025-10-20T11:00:00Z",
    deadline: "2026-07-01T00:00:00Z",
    tags: ["migration", "data", "infrastructure"],
  },
  {
    id: "proj-5",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting suite for project managers and stakeholders.",
    status: "Active",
    manager: "David Park",
    managerId: "seed-manager-2",
    membersCount: 3,
    openIssues: 9,
    completedIssues: 31,
    budget: 25000,
    spent: 18000,
    createdAt: "2026-02-05T14:00:00Z",
    deadline: "2026-09-30T00:00:00Z",
    tags: ["analytics", "reporting", "dashboard"],
  },
  {
    id: "proj-6",
    name: "UI/UX Redesign",
    description: "Complete redesign of the customer portal interface following the new design system.",
    status: "Archived",
    manager: "Maria Torres",
    managerId: "seed-manager-4",
    membersCount: 4,
    openIssues: 0,
    completedIssues: 58,
    budget: 30000,
    spent: 29800,
    createdAt: "2025-08-01T09:00:00Z",
    deadline: "2025-12-31T00:00:00Z",
    tags: ["design", "ui", "ux"],
  },
  {
    id: "proj-7",
    name: "Payment Gateway Integration",
    description: "Integrate Stripe and PayPal payment processing for the billing module.",
    status: "Closed",
    manager: "Lin Wei",
    managerId: "seed-manager-3",
    membersCount: 3,
    openIssues: 0,
    completedIssues: 42,
    budget: 15000,
    spent: 14200,
    createdAt: "2025-06-15T10:00:00Z",
    deadline: "2025-10-31T00:00:00Z",
    tags: ["payments", "stripe", "billing"],
  },
  {
    id: "proj-8",
    name: "Notification Service",
    description: "Email and in-app notification infrastructure with templating and delivery tracking.",
    status: "Active",
    manager: "Sarah Chen",
    managerId: "seed-manager-1",
    membersCount: 2,
    openIssues: 5,
    completedIssues: 14,
    budget: 12000,
    spent: 7800,
    createdAt: "2026-03-01T13:00:00Z",
    deadline: "2026-06-15T00:00:00Z",
    tags: ["notifications", "email", "infrastructure"],
  },
];

function readStoredProjects() {
  if (typeof window === "undefined") return [...seedProjects];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...seedProjects];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedProjects];
  } catch {
    return [...seedProjects];
  }
}

function persistProjects() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsStore));
}

export const projectsStore = readStoredProjects();

export function getProjects() {
  return [...projectsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getProjectById(id) {
  return projectsStore.find((p) => String(p.id) === String(id)) ?? null;
}

export function getProjectsByStatus(status) {
  return projectsStore.filter((p) => p.status === status);
}

export function updateProjectStatus(id, newStatus) {
  const idx = projectsStore.findIndex((p) => String(p.id) === String(id));
  if (idx === -1) return false;
  projectsStore[idx].status = newStatus;
  persistProjects();
  return true;
}
