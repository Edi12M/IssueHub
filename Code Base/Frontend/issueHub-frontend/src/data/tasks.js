// Local task state — used as fallback for seed/localStorage users.
// Backend users get their tasks from /api/issue/tasks/{userId} via api/index.js.

const TASKS_KEY = "issuehub_tasks";

const DEV = {
  ALEX: "seed-dev",
  MAYA: "seed-dev-2",
  JORDAN: "seed-dev-3",
};

let SEED_TASKS = [
  {
    id: "TASK-001",
    title: "Design system component audit",
    description:
      "Review all existing UI components for style inconsistencies and accessibility gaps.",
    type: "Research",
    priority: "Medium",
    status: "Backlog",
    projectId: "p1",
    assignees: [DEV.MAYA],
    dueDate: "2026-06-20",
    startDate: "2026-05-20",
    createdAt: "2026-05-01T08:00:00.000Z",
    labels: ["frontend", "docs"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 3,
    lastUpdated: "2026-05-01T08:00:00.000Z",
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
    dueDate: "2026-07-01",
    startDate: "2026-06-01",
    createdAt: "2026-05-02T08:00:00.000Z",
    labels: ["feature", "backend"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 5,
    lastUpdated: "2026-05-02T08:00:00.000Z",
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
    dueDate: "2026-05-28",
    startDate: "2026-05-14",
    createdAt: "2026-05-03T08:00:00.000Z",
    labels: ["feature", "frontend"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 5,
    lastUpdated: "2026-05-03T08:00:00.000Z",
  },
  {
    id: "TASK-004",
    title: "Fix auth crash on iOS 17",
    description:
      "App crashes on token refresh for iOS 17+ devices during the sign-in flow.",
    type: "Bug",
    priority: "High",
    status: "In Progress",
    projectId: "p1",
    assignees: [DEV.ALEX],
    dueDate: "2025-10-10",
    startDate: "2025-09-20",
    createdAt: "2025-09-15T00:00:00.000Z",
    labels: ["bug", "urgent"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 5,
    lastUpdated: "2025-09-28T00:00:00.000Z",
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
    dueDate: "2026-05-30",
    startDate: "2026-05-08",
    createdAt: "2026-05-05T08:00:00.000Z",
    labels: ["frontend", "urgent"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: ["TASK-004"],
    storyPoints: 8,
    lastUpdated: "2026-05-10T08:00:00.000Z",
  },
  {
    id: "TASK-006",
    title: "Analytics API integration",
    description:
      "Connect dashboard charts to live API endpoints and handle loading states.",
    type: "Feature",
    priority: "Medium",
    status: "In Progress",
    projectId: "p1",
    assignees: [DEV.JORDAN],
    dueDate: "2026-06-05",
    startDate: "2026-05-10",
    createdAt: "2026-05-06T08:00:00.000Z",
    labels: ["feature", "backend", "performance"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 8,
    lastUpdated: "2026-05-12T08:00:00.000Z",
  },
  {
    id: "TASK-007",
    title: "User profile settings page",
    description:
      "Build the profile settings UI with avatar upload and password change.",
    type: "Feature",
    priority: "Medium",
    status: "In Review",
    projectId: "p1",
    assignees: [DEV.MAYA],
    dueDate: "2026-05-20",
    startDate: "2026-05-01",
    createdAt: "2026-05-07T08:00:00.000Z",
    labels: ["feature", "frontend", "testing"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 5,
    lastUpdated: "2026-05-15T08:00:00.000Z",
  },
  {
    id: "TASK-008",
    title: "Performance audit — bundle size",
    description:
      "Analyse and reduce JS bundle size, targeting < 200 kB initial load.",
    type: "Research",
    priority: "High",
    status: "In Review",
    projectId: "p2",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-18",
    startDate: "2026-04-28",
    createdAt: "2026-05-08T08:00:00.000Z",
    labels: ["performance", "docs"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 3,
    lastUpdated: "2026-05-14T08:00:00.000Z",
  },
  {
    id: "TASK-009",
    title: "Project creation wizard",
    description:
      "Implement the full project creation flow with team member assignment.",
    type: "Feature",
    priority: "High",
    status: "Done",
    projectId: "p1",
    assignees: [DEV.JORDAN],
    dueDate: "2026-05-10",
    startDate: "2026-04-20",
    createdAt: "2026-04-20T08:00:00.000Z",
    labels: ["feature", "frontend"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 8,
    lastUpdated: "2026-05-10T08:00:00.000Z",
  },
  {
    id: "TASK-010",
    title: "Initial database schema design",
    description:
      "Define entity relationships and write migration scripts for the v1 schema.",
    type: "Feature",
    priority: "Critical",
    status: "Done",
    projectId: "p1",
    assignees: [DEV.ALEX],
    dueDate: "2026-05-05",
    startDate: "2026-04-15",
    createdAt: "2026-04-15T08:00:00.000Z",
    labels: ["feature", "backend", "docs"],
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 13,
    lastUpdated: "2026-05-05T08:00:00.000Z",
  },
];

let taskOverrides = {};

function migrateAssignees(stored) {
  const seedMap = Object.fromEntries(SEED_TASKS.map((t) => [t.id, t]));
  let changed = false;
  const migrated = stored.map((task) => {
    const seed = seedMap[task.id];
    let updatedTask = { ...task };

    if (
      seed &&
      (!Array.isArray(task.assignees) || task.assignees.length === 0) &&
      seed.assignees?.length > 0
    ) {
      changed = true;
      updatedTask.assignees = seed.assignees;
    }

    if (seed && (!task.labels || task.labels.length === 0) && seed.labels) {
      changed = true;
      updatedTask.labels = seed.labels;
    }

    return updatedTask;
  });
  if (changed) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(migrated));
  }
  return migrated;
}

function applyOverrides(tasks) {
  return tasks.map((t) =>
    taskOverrides[t.id] ? { ...t, ...taskOverrides[t.id] } : t,
  );
}

export function getTasks() {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const allHaveLabels = parsed.every((task) => Array.isArray(task.labels));
        if (!allHaveLabels) {
          localStorage.setItem(TASKS_KEY, JSON.stringify(SEED_TASKS));
          return applyOverrides(SEED_TASKS);
        }
        return applyOverrides(migrateAssignees(parsed));
      }
    }
    localStorage.setItem(TASKS_KEY, JSON.stringify(SEED_TASKS));
    return applyOverrides(SEED_TASKS);
  } catch {
    return applyOverrides(SEED_TASKS);
  }
}

export function saveTasks(tasks) {
  SEED_TASKS = tasks;
  taskOverrides = {};
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function updateTaskStatus(taskId, newStatus) {
  updateTask(taskId, { status: newStatus });
  return true;
}

export function updateTask(taskId, updates) {
  taskOverrides[taskId] = { ...(taskOverrides[taskId] || {}), ...updates };
  const current = getTasks();
  const updated = current.map((t) =>
    t.id === taskId
      ? { ...t, ...updates, lastUpdated: new Date().toISOString() }
      : t,
  );
  saveTasks(updated);
  return updated.find((t) => t.id === taskId);
}

export function updateTaskAssignees(taskId, assignees) {
  return updateTask(taskId, { assignees });
}

export function updateTaskDates(taskId, startDate, dueDate) {
  return updateTask(taskId, { startDate, dueDate });
}

export function getTaskStatus(taskId) {
  const o = taskOverrides[taskId];
  return o?.status ?? null;
}

export function getOverdueTasks(tasks = getTasks()) {
  const now = new Date();
  return tasks.filter(
    (t) =>
      t.dueDate && t.status !== "Done" && new Date(t.dueDate) < now,
  );
}

export function getAtRiskTasks(tasks = getTasks()) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return tasks.filter((t) => {
    if (t.status === "Done") return false;
    const updated = t.lastUpdated ? new Date(t.lastUpdated).getTime() : 0;
    return updated < weekAgo && t.status === "In Progress";
  });
}
