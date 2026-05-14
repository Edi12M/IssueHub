export const STATUSES = ["Open", "In Progress", "Review", "Completed", "Blocked"];

export const PRIORITY_META = {
  High:   { color: "#ff4d4d", bg: "#fff0f0", dot: "#ff4d4d" },
  Medium: { color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  Low:    { color: "#22c55e", bg: "#f0fdf4", dot: "#22c55e" },
};

export const STATUS_META = {
  "Open":        { color: "#6366f1", bg: "#eef2ff" },
  "In Progress": { color: "#f59e0b", bg: "#fffbeb" },
  "Review":      { color: "#8b5cf6", bg: "#f5f3ff" },
  "Completed":   { color: "#22c55e", bg: "#f0fdf4" },
  "Blocked":     { color: "#ef4444", bg: "#fef2f2" },
};

// URL slug  →  display label
export const STATUS_SLUG = {
  "open":        "Open",
  "in-progress": "In Progress",
  "review":      "Review",
  "completed":   "Completed",
  "blocked":     "Blocked",
};

// Display label  →  URL slug
export const STATUS_TO_SLUG = Object.fromEntries(
  Object.entries(STATUS_SLUG).map(([k, v]) => [v, k])
);

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function isOverdue(issue) {
  return issue.deadline < today() && issue.status !== "Completed";
}

export const MOCK_ISSUES = [
  {
    id: "ISS-001",
    title: "Fix login timeout bug",
    description:
      "Users are being logged out unexpectedly after 2 minutes of inactivity even though session timeout is set to 30 minutes. Investigate the JWT refresh logic and ensure tokens are being renewed correctly.",
    priority: "High",
    status: "In Progress",
    deadline: "2026-05-08",
    project: "AuthService",
    assignee: "Alex Rivera",
    createdAt: "2026-04-28",
    statusHistory: [
      { status: "Open",        date: "2026-04-28", by: "Maria Chen (PM)" },
      { status: "In Progress", date: "2026-05-01", by: "Alex Rivera" },
    ],
    comments: [
      { id: "c1", author: "Alex Rivera", avatar: "AR", text: "Looking into the JWT refresh middleware now. Might be a race condition.", date: "2026-05-01 09:14", mine: true },
      { id: "c2", author: "Maria Chen",  avatar: "MC", text: "Thanks Alex! Let me know if you need anything from the backend team.", date: "2026-05-01 10:02", mine: false },
    ],
    attachments: [
      { id: "a1", name: "session-logs.txt",     size: "12 KB", type: "txt", date: "2026-04-29" },
      { id: "a2", name: "error-screenshot.png", size: "84 KB", type: "img", date: "2026-04-30" },
    ],
  },
  {
    id: "ISS-002",
    title: "Design new dashboard layout",
    description:
      "The current dashboard feels cluttered. Redesign it using the new design system tokens. Focus on clarity, hierarchy, and ensuring mobile responsiveness.",
    priority: "Medium",
    status: "Open",
    deadline: "2026-05-15",
    project: "Frontend",
    assignee: "Alex Rivera",
    createdAt: "2026-05-01",
    statusHistory: [
      { status: "Open", date: "2026-05-01", by: "Maria Chen (PM)" },
    ],
    comments: [],
    attachments: [
      { id: "a3", name: "figma-mockup.fig", size: "2.1 MB", type: "fig", date: "2026-05-01" },
    ],
  },
  {
    id: "ISS-003",
    title: "Write unit tests for payment module",
    description:
      "Coverage for the payment module is at 34%. We need at least 80% coverage before the next release. Focus on edge cases: failed transactions, refunds, and currency conversion.",
    priority: "High",
    status: "Completed",
    deadline: "2026-05-03",
    project: "Payments",
    assignee: "Alex Rivera",
    createdAt: "2026-04-25",
    statusHistory: [
      { status: "Open",        date: "2026-04-25", by: "Sam Torres (PM)" },
      { status: "In Progress", date: "2026-04-27", by: "Alex Rivera" },
      { status: "Completed",   date: "2026-05-03", by: "Alex Rivera" },
    ],
    comments: [
      { id: "c3", author: "Alex Rivera", avatar: "AR", text: "Tests done! Coverage is now at 87%. PR submitted.", date: "2026-05-03 16:45", mine: true },
    ],
    attachments: [],
  },
  {
    id: "ISS-004",
    title: "Integrate Stripe webhook",
    description:
      "Set up Stripe webhook listeners for payment_intent.succeeded and payment_intent.payment_failed events. Store events in DB and trigger appropriate notifications.",
    priority: "Low",
    status: "Open",
    deadline: "2026-04-30",
    project: "Payments",
    assignee: "Alex Rivera",
    createdAt: "2026-04-20",
    statusHistory: [
      { status: "Open", date: "2026-04-20", by: "Sam Torres (PM)" },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: "ISS-005",
    title: "Optimize image loading pipeline",
    description:
      "Profile the image loading pipeline and implement lazy loading + WebP conversion. Target: reduce initial page load by 40%.",
    priority: "Medium",
    status: "In Progress",
    deadline: "2026-05-20",
    project: "Frontend",
    assignee: "Alex Rivera",
    createdAt: "2026-05-02",
    statusHistory: [
      { status: "Open",        date: "2026-05-02", by: "Maria Chen (PM)" },
      { status: "In Progress", date: "2026-05-04", by: "Alex Rivera" },
    ],
    comments: [],
    attachments: [],
  },
];