// Local task state — used as fallback for seed/localStorage users.
// Backend users get their tasks from /api/issue/tasks/{userId} via api/index.js.

let SEED_TASKS = [
  {
    id: "t1",
    title: "Fix login page layout",
    description: "The login form breaks on mobile screens.",
    type: "Bug",
    priority: "High",
    status: "In Progress",
    projectId: "p1",
    assignees: ["seed-dev"],
    dueDate: "2025-10-10",
    startDate: "2025-09-20",
    createdAt: "2025-09-15T00:00:00.000Z",
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 5,
    lastUpdated: "2025-09-28T00:00:00.000Z",
  },
  {
    id: "t2",
    title: "Implement dashboard analytics",
    description: "Add charts to the admin dashboard.",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    projectId: "p1",
    assignees: ["seed-dev-2"],
    dueDate: "2025-10-15",
    startDate: "2025-10-01",
    createdAt: "2025-09-20T00:00:00.000Z",
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: ["t1"],
    storyPoints: 8,
    lastUpdated: "2025-09-20T00:00:00.000Z",
  },
  {
    id: "t3",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing.",
    type: "Task",
    priority: "Low",
    status: "Done",
    projectId: "p2",
    assignees: ["seed-dev-3"],
    dueDate: "2025-11-01",
    startDate: "2025-10-01",
    createdAt: "2025-09-25T00:00:00.000Z",
    subtasks: [],
    acceptanceCriteria: "",
    dependencies: [],
    storyPoints: 13,
    lastUpdated: "2025-10-08T00:00:00.000Z",
  },
];

let taskOverrides = {};

export function getTasks() {
  return SEED_TASKS.map((t) =>
    taskOverrides[t.id] ? { ...t, ...taskOverrides[t.id] } : t,
  );
}

export function saveTasks(tasks) {
  SEED_TASKS = tasks;
  taskOverrides = {};
}

export function updateTaskStatus(taskId, newStatus) {
  updateTask(taskId, { status: newStatus });
  return true;
}

export function updateTask(taskId, updates) {
  taskOverrides[taskId] = { ...(taskOverrides[taskId] || {}), ...updates };
  SEED_TASKS = SEED_TASKS.map((t) =>
    t.id === taskId ? { ...t, ...updates, lastUpdated: new Date().toISOString() } : t,
  );
  return SEED_TASKS.find((t) => t.id === taskId);
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
      t.dueDate &&
      t.status !== "Done" &&
      new Date(t.dueDate) < now,
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
