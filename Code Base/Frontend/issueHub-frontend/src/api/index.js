const BASE = "http://localhost:5164";

// ── Role / status mappers ────────────────────────────────────────
const ROLE_FROM_BE = {
  Admin: "System Administrator",
  Manager: "Project Manager",
  Developer: "Developer",
  Guest: "Viewer",
};
const ROLE_TO_BE = {
  "System Administrator": "Admin",
  "Project Manager": "Manager",
  Developer: "Developer",
  Viewer: "Guest",
};

const ISSUE_STATUS_FROM_BE = {
  Open: "To Do",
  InProgress: "In Progress",
  InReview: "In Review",
  Resolved: "Done",
  Closed: "Done",
};
const ISSUE_STATUS_TO_BE = {
  Backlog: "Open",
  "To Do": "Open",
  "In Progress": "InProgress",
  "In Review": "InReview",
  Done: "Resolved",
};

// ── HTTP core ────────────────────────────────────────────────────
function getToken() {
  try {
    const raw = localStorage.getItem("issuehub_session");
    return raw ? JSON.parse(raw)?.token ?? null : null;
  } catch {
    return null;
  }
}

function makeHeaders(hasBody = false) {
  const h = {};
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  if (hasBody) h["Content-Type"] = "application/json";
  return h;
}

async function req(method, path, body) {
  const opts = { method, headers: makeHeaders(body !== undefined) };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const j = await res.json();
      msg = j?.message || j?.title || msg;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Data mappers ─────────────────────────────────────────────────
function mapUserStatus(s) {
  if (s === "Active") return "Active";
  if (s === "PendingVerification") return "Pending Activation";
  return "Deactivated";
}

function mapUser(u) {
  return {
    id: String(u.id),
    backendId: u.id,
    name: u.fullName,
    email: u.email,
    department: u.department ?? "",
    role: ROLE_FROM_BE[u.role] ?? u.role,
    status: mapUserStatus(u.status),
    createdAt: u.createdAt ?? new Date().toISOString(),
  };
}

function mapProject(p) {
  return {
    id: String(p.id),
    backendId: p.id,
    name: p.name,
    description: p.description ?? "",
    goals: p.goals ?? "",
    status: p.status ?? "Active",
    manager: p.managerName ?? "—",
    membersCount: p.teamSize ?? 0,
    openIssues: p.openIssueCount ?? 0,
    completedIssues: p.completedIssueCount ?? 0,
    budget: Number(p.budgetUsed ?? 0),
    spent: Number(p.budgetUsed ?? 0),
    createdAt: p.createdAt ?? new Date().toISOString(),
    deadline: p.deadline ? new Date(p.deadline).toISOString() : (p.endDate ?? ""),
    tags: [],
    startDate: p.startDate ?? "",
    endDate: p.endDate ?? p.deadline ?? "",
    visibility: p.visibility ?? "Team",
    methodology: p.methodology ?? "Scrum",
    type: p.type ?? "Internal",
    members: [],
  };
}

function initials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function mapTaskDto(t) {
  return {
    id: `BE-${t.id}`,
    backendId: t.id,
    issueCode: t.issueCode ?? `ISS-${t.id}`,
    title: t.title,
    description: "",
    type: t.type ?? "Feature",
    priority: t.priority ?? "Medium",
    status: ISSUE_STATUS_FROM_BE[t.status] ?? "To Do",
    projectId: String(t.projectId),
    assignees: [],
    dueDate: t.dueDate ?? "",
    project: t.projectName ?? String(t.projectId),
    createdAt: "",
    deadline: t.dueDate ? String(t.dueDate).slice(0, 10) : "",
    statusHistory: [],
    comments: [],
    attachments: [],
    dependencies: [],
  };
}

function mapIssueDetail(issue) {
  const comments = (issue.comments ?? []).map((c) => ({
    id: String(c.id),
    author: c.authorName,
    avatar: initials(c.authorName),
    text: c.body,
    date: c.createdAt
      ? new Date(c.createdAt).toLocaleDateString("en-GB")
      : "",
    mine: false,
    authorId: c.authorId,
  }));
  const attachments = (issue.attachments ?? []).map((a) => ({
    id: String(a.id),
    name: a.fileName ?? "attachment",
    size: a.fileSize ? `${Math.round(a.fileSize / 1024)} KB` : "—",
    type: (a.mimeType ?? "").includes("image") ? "img" : "fig",
    date: a.createdAt
      ? new Date(a.createdAt).toLocaleDateString("en-GB")
      : "",
  }));
  return {
    id: `BE-${issue.id}`,
    backendId: issue.id,
    issueCode: issue.issueCode ?? `ISS-${issue.id}`,
    title: issue.title,
    description: issue.description ?? "",
    type: issue.type ?? "Feature",
    priority: issue.priority ?? "Medium",
    status: ISSUE_STATUS_FROM_BE[issue.status] ?? "To Do",
    projectId: String(issue.projectId),
    project: String(issue.projectId),
    deadline: issue.dueDate ? String(issue.dueDate).slice(0, 10) : "",
    createdAt: issue.createdAt ? String(issue.createdAt).slice(0, 10) : "",
    statusHistory: [],
    comments,
    attachments,
    dependencies: [],
  };
}

// ── Auth ─────────────────────────────────────────────────────────
export async function loginApi(email, password) {
  const data = await req("POST", "/api/auth/login", { email, password });
  return {
    id: String(data.userId),
    backendId: data.userId,
    name: data.fullName,
    email: data.email,
    role: ROLE_FROM_BE[data.role] ?? data.role,
    token: data.token,
    expiresAt: data.expiresAt,
    status: "Active",
    createdAt: new Date().toISOString(),
  };
}

// ── Users ────────────────────────────────────────────────────────
export async function getUsersApi() {
  const data = await req("GET", "/api/user/search?q=");
  return data.map((u) =>
    mapUser({ ...u, department: u.department ?? null, createdAt: u.createdAt ?? new Date().toISOString() })
  );
}

export async function createUserApi(payload) {
  const data = await req("POST", "/api/user", {
    fullName: payload.name,
    email: payload.email,
    department: payload.department ?? "",
    role: ROLE_TO_BE[payload.role] ?? payload.role,
    password: payload.password,
  });
  return mapUser(data);
}

export async function updateUserApi(id, payload) {
  const beStatus =
    payload.status === "Active"
      ? "Active"
      : payload.status === "Pending Activation"
        ? "PendingVerification"
        : "Inactive";
  const data = await req("PUT", `/api/user/${id}`, {
    fullName: payload.name,
    email: payload.email,
    department: payload.department ?? "",
    role: ROLE_TO_BE[payload.role] ?? payload.role,
    status: beStatus,
  });
  return mapUser(data);
}

export async function deleteUserApi(id) {
  return req("DELETE", `/api/user/${id}`);
}

export async function getUserCountsByRoleApi() {
  return req("GET", "/api/user/counts-by-role");
}

export async function getLastCreatedUserApi() {
  return req("GET", "/api/user/last-created");
}

// ── Projects ─────────────────────────────────────────────────────
export async function getProjectsApi() {
  const data = await req("GET", "/api/project/search?q=");
  return data.map(mapProject);
}

export async function createProjectApi(payload, ownerId) {
  const start = payload.startDate
    ? new Date(payload.startDate).toISOString()
    : new Date().toISOString();
  const end = payload.endDate
    ? new Date(payload.endDate).toISOString()
    : new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString();
  const data = await req("POST", "/api/project", {
    name: payload.name,
    description: payload.description || " ",
    goals: payload.goals ?? "",
    startDate: start,
    endDate: end,
    ownerId,
    methodology: payload.methodology ?? "Scrum",
    visibility: payload.visibility ?? "Team",
    type: payload.type ?? "Internal",
    budgetHours: 0,
  });
  return mapProject(data);
}

export async function archiveProjectApi(id) {
  return req("PATCH", `/api/project/${id}/archive`);
}

export async function updateProjectStatusApi(id, status) {
  return req(
    "PATCH",
    `/api/project/${id}/status?status=${encodeURIComponent(status)}`
  );
}

export async function getProjectCountsApi() {
  return req("GET", "/api/project/counts-by-status");
}

export async function getLastCreatedProjectApi() {
  return req("GET", "/api/project/last-created");
}

// ── Issues / Tasks ───────────────────────────────────────────────
export async function getDevTasksApi(userId) {
  const data = await req("GET", `/api/issue/tasks/${userId}`);
  return data.map(mapTaskDto);
}

export async function getIssueDetailApi(issueId) {
  const data = await req("GET", `/api/issue/${issueId}`);
  return mapIssueDetail(data);
}

export async function updateIssueStatusApi(issueId, newStatus) {
  return req("PUT", `/api/issue/${issueId}`, {
    status: ISSUE_STATUS_TO_BE[newStatus] ?? "Open",
  });
}

// ── Utility ──────────────────────────────────────────────────────
export function isBackendUser(session) {
  return session != null && typeof session.backendId === "number";
}
