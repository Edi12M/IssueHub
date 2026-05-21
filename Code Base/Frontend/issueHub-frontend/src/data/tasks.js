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
    dependencies: [],
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
  },
];

let taskOverrides = {};

export function getTasks() {
  return SEED_TASKS.map((t) =>
    taskOverrides[t.id] ? { ...t, status: taskOverrides[t.id] } : t
  );
}

export function saveTasks(tasks) {
  SEED_TASKS = tasks;
  taskOverrides = {};
}

export function updateTaskStatus(taskId, newStatus) {
  taskOverrides[taskId] = newStatus;
  SEED_TASKS = SEED_TASKS.map((t) =>
    t.id === taskId ? { ...t, status: newStatus } : t
  );
  return true;
}

export function getTaskStatus(taskId) {
  return taskOverrides[taskId] ?? null;
}
