const STORAGE_KEY = "issuehub_time_logs";

const SEED_TIME_LOGS = [
  {
    id: "tl1",
    taskId: "TASK-004",
    projectId: "p1",
    userId: "seed-dev",
    hours: 2.5,
    billable: true,
    note: "Mobile layout fixes",
    date: "2025-09-22",
    createdAt: "2025-09-22T14:00:00.000Z",
  },
  {
    id: "tl2",
    taskId: "TASK-006",
    projectId: "p1",
    userId: "seed-dev-2",
    hours: 4,
    billable: true,
    note: "Chart research",
    date: "2025-09-25",
    createdAt: "2025-09-25T10:30:00.000Z",
  },
  {
    id: "tl3",
    taskId: "TASK-009",
    projectId: "p2",
    userId: "seed-dev-3",
    hours: 6,
    billable: false,
    note: "Pipeline setup",
    date: "2025-10-05",
    createdAt: "2025-10-05T16:00:00.000Z",
  },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SEED_TIME_LOGS;
  } catch {
    return SEED_TIME_LOGS;
  }
}

function persist(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getTimeLogs() {
  return load();
}

export function addTimeLog(entry) {
  const logs = load();
  const next = {
    id: `tl-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  const updated = [next, ...logs];
  persist(updated);
  return next;
}

export function deleteTimeLog(id) {
  const updated = load().filter((l) => l.id !== id);
  persist(updated);
  return updated;
}

export function aggregateHours(logs, { taskId, userId, projectId } = {}) {
  return logs
    .filter((l) => {
      if (taskId && l.taskId !== taskId) return false;
      if (userId && l.userId !== userId) return false;
      if (projectId && l.projectId !== projectId) return false;
      return true;
    })
    .reduce(
      (acc, l) => {
        acc.total += l.hours;
        if (l.billable) acc.billable += l.hours;
        else acc.nonBillable += l.hours;
        return acc;
      },
      { total: 0, billable: 0, nonBillable: 0 },
    );
}

export function exportTimeLogsCsv(logs, tasks, users) {
  const taskMap = Object.fromEntries(tasks.map((t) => [t.id, t.title]));
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.name]));
  const header = "Date,Task,Member,Hours,Billable,Note";
  const rows = logs.map((l) =>
    [
      l.date,
      `"${(taskMap[l.taskId] || l.taskId).replace(/"/g, '""')}"`,
      `"${(userMap[l.userId] || l.userId).replace(/"/g, '""')}"`,
      l.hours,
      l.billable ? "Yes" : "No",
      `"${(l.note || "").replace(/"/g, '""')}"`,
    ].join(","),
  );
  return [header, ...rows].join("\n");
}
