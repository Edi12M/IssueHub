// Local seed projects — used as fallback when the backend API is unavailable.
let SEED_PROJECTS = [
  {
    id: "p1",
    backendId: null,
    name: "Website Redesign",
    description: "Redesign the company website UI.",
    goals: "Improve UX and accessibility.",
    status: "Active",
    manager: "Paula Manager",
    membersCount: 3,
    openIssues: 4,
    completedIssues: 2,
    budget: 10000,
    spent: 4200,
    createdAt: "2025-09-01T00:00:00.000Z",
    deadline: "2025-10-15T00:00:00.000Z",
    tags: ["UI", "Frontend"],
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    visibility: "Team",
    methodology: "Scrum",
  },
  {
    id: "p2",
    backendId: null,
    name: "Mobile App",
    description: "Build a cross-platform mobile app.",
    goals: "Launch MVP for beta users.",
    status: "Active",
    manager: "Paula Manager",
    membersCount: 2,
    openIssues: 6,
    completedIssues: 1,
    budget: 20000,
    spent: 3000,
    createdAt: "2025-10-01T00:00:00.000Z",
    deadline: "2025-12-20T00:00:00.000Z",
    tags: ["Mobile", "React Native"],
    startDate: "2025-10-01",
    endDate: "2025-12-20",
    visibility: "Private",
    methodology: "Kanban",
  },
];

export function getProjects() {
  return [...SEED_PROJECTS];
}

export function updateProjectStatus(id, newStatus) {
  SEED_PROJECTS = SEED_PROJECTS.map((p) =>
    p.id === id ? { ...p, status: newStatus } : p
  );
  return true;
}

export function createProject(projectData) {
  const newProject = {
    ...projectData,
    id: "p" + Date.now(),
    backendId: null,
    createdAt: new Date().toISOString(),
    membersCount: 0,
    openIssues: 0,
    completedIssues: 0,
    budget: 0,
    spent: 0,
    tags: [],
  };
  SEED_PROJECTS = [...SEED_PROJECTS, newProject];
  return newProject;
}

export function deleteProject(id) {
  SEED_PROJECTS = SEED_PROJECTS.filter((p) => p.id !== id);
  return true;
}
