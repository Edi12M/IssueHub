const TASKS_KEY = "issuehub_tasks";

// Developer IDs matching the seed users in users.js
const DEV = {
  ALEX:   "seed-dev",   // Alex Rivera
  MAYA:   "seed-dev-2", // Maya Patel
  JORDAN: "seed-dev-3", // Jordan Kim
};

const SEED_TASKS = [
  {
    id: "TASK-001",
    title: "Design system component audit",
    description: "Review all existing UI components for style inconsistencies and accessibility gaps.",
    type: "Research",
    priority: "Medium",
    status: "Backlog",
    projectId: "p1",
    assignees: [DEV.MAYA],
    dueDate: "2026-06-20T17:00:00Z",
    startDate: "2026-05-20T09:00:00Z",
    createdAt: "2026-05-01T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-002",
    title: "Set up mobile push notifications",
    description: "Integrate Firebase Cloud Messaging for iOS and Android.",
    type: "Feature",
    priority: "Low",
    status: "Backlog",
    projectId: "p2",
    assignees: [DEV.JORDAN],
    dueDate: "2026-07-01T17:00:00Z",
    startDate: "2026-06-01T09:00:00Z",
    createdAt: "2026-05-02T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-003",
    title: "Implement dark mode toggle",
    description: "Add persistent dark/light theme switching to the settings panel.",
    type: "Feature",
    priority: "High",
    status: "To Do",
    projectId: "p1",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-28T17:00:00Z",
    startDate: "2026-05-14T09:00:00Z",
    createdAt: "2026-05-03T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-004",
    title: "Fix auth crash on iOS 17",
    description: "App crashes on token refresh for iOS 17+ devices during the sign-in flow.",
    type: "Bug",
    priority: "Critical",
    status: "To Do",
    projectId: "p2",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-22T17:00:00Z",
    startDate: "2026-05-12T09:00:00Z",
    createdAt: "2026-05-04T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-005",
    title: "Redesign landing page hero",
    description: "Update the hero section with new brand visuals and revised CTA copy.",
    type: "Improvement",
    priority: "High",
    status: "In Progress",
    projectId: "p1",
    assignees: [DEV.MAYA],
    dueDate: "2026-05-30T17:00:00Z",
    startDate: "2026-05-08T09:00:00Z",
    createdAt: "2026-05-05T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-006",
    title: "Analytics API integration",
    description: "Connect dashboard charts to live API endpoints and handle loading states.",
    type: "Feature",
    priority: "Medium",
    status: "In Progress",
    projectId: "p1",
    assignees: [DEV.JORDAN],
    dueDate: "2026-06-05T17:00:00Z",
    startDate: "2026-05-10T09:00:00Z",
    createdAt: "2026-05-06T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-007",
    title: "User profile settings page",
    description: "Build the profile settings UI with avatar upload and password change.",
    type: "Feature",
    priority: "Medium",
    status: "In Review",
    projectId: "p1",
    assignees: [DEV.MAYA],
    dueDate: "2026-05-20T17:00:00Z",
    startDate: "2026-05-01T09:00:00Z",
    createdAt: "2026-05-07T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-008",
    title: "Performance audit — bundle size",
    description: "Analyse and reduce JS bundle size, targeting < 200 kB initial load.",
    type: "Research",
    priority: "High",
    status: "In Review",
    projectId: "p2",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-18T17:00:00Z",
    startDate: "2026-04-28T09:00:00Z",
    createdAt: "2026-05-08T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-009",
    title: "Project creation wizard",
    description: "Implement the full project creation flow with team member assignment.",
    type: "Feature",
    priority: "High",
    status: "Done",
    projectId: "p1",
    assignees: [DEV.JORDAN],
    dueDate: "2026-05-10T17:00:00Z",
    startDate: "2026-04-20T09:00:00Z",
    createdAt: "2026-04-20T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
  {
    id: "TASK-010",
    title: "Initial database schema design",
    description: "Define entity relationships and write migration scripts for the v1 schema.",
    type: "Feature",
    priority: "Critical",
    status: "Done",
    projectId: "p1",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-05T17:00:00Z",
    startDate: "2026-04-15T09:00:00Z",
    createdAt: "2026-04-15T08:00:00Z",
    subtasks: [],
    acceptanceCriteria: "",
  },
];

// Migrate assignees from seed definitions into stored tasks that still have
// empty assignees. Runs once the first time tasks are loaded after this update.
function migrateAssignees(stored) {
  const seedMap = Object.fromEntries(SEED_TASKS.map((t) => [t.id, t]));
  let changed = false;
  const migrated = stored.map((task) => {
    const seed = seedMap[task.id];
    if (
      seed &&
      (!Array.isArray(task.assignees) || task.assignees.length === 0) &&
      seed.assignees.length > 0
    ) {
      changed = true;
      return { ...task, assignees: seed.assignees };
    }
    return task;
  });
  if (changed) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(migrated));
  }
  return migrated;
}

export function getTasks() {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return migrateAssignees(parsed);
      }
    }
    localStorage.setItem(TASKS_KEY, JSON.stringify(SEED_TASKS));
    return SEED_TASKS;
  } catch {
    return SEED_TASKS;
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    // ignore storage errors
  }
}

export function updateTaskStatus(taskId, newStatus) {
  const tasks = getTasks();
  const updated = tasks.map((t) =>
    t.id === taskId ? { ...t, status: newStatus } : t,
  );
  saveTasks(updated);
  return updated;
}
