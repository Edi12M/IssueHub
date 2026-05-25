const STORAGE_KEY = "issuehub_sprints";

const SEED_SPRINTS = [
  {
    id: "sp1",
    name: "Sprint 12",
    projectId: "p1",
    startDate: "2025-09-15",
    endDate: "2025-09-28",
    status: "completed",
    taskIds: ["t1", "t2"],
    velocity: 13,
  },
  {
    id: "sp2",
    name: "Sprint 13",
    projectId: "p1",
    startDate: "2025-09-29",
    endDate: "2025-10-12",
    status: "active",
    taskIds: ["t1"],
    velocity: null,
  },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SEED_SPRINTS;
  } catch {
    return SEED_SPRINTS;
  }
}

function persist(sprints) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sprints));
}

export function getSprints(projectId) {
  const all = load();
  return projectId ? all.filter((s) => s.projectId === projectId) : all;
}

export function saveSprints(sprints) {
  persist(sprints);
  return sprints;
}

export function createSprint(sprint) {
  const all = load();
  const next = { id: `sp-${Date.now()}`, velocity: null, taskIds: [], ...sprint };
  const updated = [...all, next];
  persist(updated);
  return next;
}

export function updateSprint(sprintId, updates) {
  const updated = load().map((s) =>
    s.id === sprintId ? { ...s, ...updates } : s,
  );
  persist(updated);
  return updated.find((s) => s.id === sprintId);
}

export function completeSprint(sprintId, completedPoints) {
  return updateSprint(sprintId, {
    status: "completed",
    velocity: completedPoints,
  });
}
