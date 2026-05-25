import { getTasks } from "./tasks.js";

// Fallback project names when localStorage hasn't been seeded yet
const SEED_PROJECT_NAMES = {
  p1: "Website Redesign",
  p2: "Mobile App",
};

function resolveProjectName(projectId) {
  try {
    const raw = localStorage.getItem("issuehub_projects");
    if (raw) {
      const arr = JSON.parse(raw);
      const found = Array.isArray(arr) && arr.find((p) => p.id === projectId);
      if (found) return found.name;
    }
  } catch {
    // Ignore parsing errors
  }
  return SEED_PROJECT_NAMES[projectId] || projectId || "Unknown Project";
}

// Statuses matching tasks.js
export const STATUSES = [
  "Backlog",
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];

export const PRIORITY_META = {
  Critical: { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
  High: { color: "#ff4d4d", bg: "#fff0f0", dot: "#ff4d4d" },
  Medium: { color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  Low: { color: "#22c55e", bg: "#f0fdf4", dot: "#22c55e" },
};

export const STATUS_META = {
  Backlog: { color: "#94a3b8", bg: "#1e2535" },
  "To Do": { color: "#6366f1", bg: "#eef2ff" },
  "In Progress": { color: "#f59e0b", bg: "#fffbeb" },
  "In Review": { color: "#8b5cf6", bg: "#f5f3ff" },
  Done: { color: "#22c55e", bg: "#f0fdf4" },
};

// URL slug → display label
export const STATUS_SLUG = {
  backlog: "Backlog",
  "to-do": "To Do",
  "in-progress": "In Progress",
  "in-review": "In Review",
  done: "Done",
};

// Display label → URL slug
export const STATUS_TO_SLUG = Object.fromEntries(
  Object.entries(STATUS_SLUG).map(([k, v]) => [v, k]),
);

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function isOverdue(issue) {
  if (!issue.deadline) return false;
  return issue.deadline < today() && issue.status !== "Done";
}

function taskToIssue(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    status: task.status,
    deadline: task.dueDate ? task.dueDate.slice(0, 10) : "",
    project: resolveProjectName(task.projectId),
    assignee:
      Array.isArray(task.assignees) && task.assignees.length > 0
        ? task.assignees[0]
        : "Unassigned",
    createdAt: task.createdAt ? task.createdAt.slice(0, 10) : "",
    labels: task.labels || [],
    statusHistory: [],
    comments: [],
    attachments: [],
  };
}

export function getDevIssues(userId) {
  if (!userId) return [];
  const tasks = getTasks();
  return tasks
    .filter((t) => Array.isArray(t.assignees) && t.assignees.includes(userId))
    .map(taskToIssue);
}

export function getDevIssueById(issueId) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === issueId);
  return task ? taskToIssue(task) : null;
}
