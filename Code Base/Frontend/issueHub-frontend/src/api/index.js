import { API_BASE_URL } from "../config.js";

// Get dynamic BASE URL from config
const getBase = () => API_BASE_URL;

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
    return raw ? (JSON.parse(raw)?.token ?? null) : null;
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
  const res = await fetch(`${getBase()}${path}`, opts);
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

// FormData request helper (for file uploads)
async function reqFormData(method, path) {
  const opts = { method, headers: {} };
  const token = getToken();
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;
  // Don't set Content-Type for FormData - browser will set it
  const res = await fetch(`${getBase()}${path}`, opts);
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
    deadline: p.deadline
      ? new Date(p.deadline).toISOString()
      : (p.endDate ?? ""),
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
    date: c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-GB") : "",
    mine: false,
    authorId: c.authorId,
  }));
  const attachments = (issue.attachments ?? []).map((a) => ({
    id: String(a.id),
    name: a.fileName ?? "attachment",
    size: a.fileSize ? `${Math.round(a.fileSize / 1024)} KB` : "—",
    type: (a.mimeType ?? "").includes("image") ? "img" : "fig",
    date: a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-GB") : "",
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
    mapUser({
      ...u,
      department: u.department ?? null,
      createdAt: u.createdAt ?? new Date().toISOString(),
    }),
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
    `/api/project/${id}/status?status=${encodeURIComponent(status)}`,
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

// ── Comments ─────────────────────────────────────────────────────
export async function createCommentApi(issueId, commentBody) {
  const data = await req("POST", "/api/comment", {
    issueId: parseInt(issueId, 10),
    body: commentBody,
  });
  return {
    id: String(data.id),
    issueId: String(data.issueId),
    authorId: data.authorId,
    authorName: data.authorName,
    body: data.body,
    createdAt: data.createdAt,
  };
}

export async function getIssueCommentsApi(issueId) {
  const data = await req("GET", `/api/comment/${issueId}`);
  return Array.isArray(data)
    ? data.map((c) => ({
        id: String(c.id),
        issueId: String(c.issueId),
        authorId: c.authorId,
        author: c.authorName,
        avatar: initials(c.authorName),
        text: c.body,
        date: c.createdAt
          ? new Date(c.createdAt).toLocaleDateString("en-GB")
          : "",
        mine: false,
        authorName: c.authorName,
        createdAt: c.createdAt,
      }))
    : [];
}

export async function updateCommentApi(commentId, commentBody) {
  const data = await req("PUT", `/api/comment/${commentId}`, {
    body: commentBody,
  });
  return {
    id: String(data.id),
    issueId: String(data.issueId),
    authorId: data.authorId,
    authorName: data.authorName,
    body: data.body,
    createdAt: data.createdAt,
  };
}

export async function deleteCommentApi(commentId) {
  return req("DELETE", `/api/comment/${commentId}`);
}

// ── Attachments ──────────────────────────────────────────────────
export async function uploadAttachmentApi(issueId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const opts = { method: "POST", headers: {} };
  const token = getToken();
  if (token) opts.headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${getBase()}/api/attachment/issue/${issueId}`, {
    ...opts,
    body: formData,
  });

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

export async function getIssueAttachmentsApi(issueId) {
  const data = await req("GET", `/api/attachment/issue/${issueId}`);
  return Array.isArray(data)
    ? data.map((a) => ({
        id: String(a.id),
        name: a.fileName ?? "attachment",
        size: a.fileSize ? `${Math.round(a.fileSize / 1024)} KB` : "—",
        type: (a.mimeType ?? "").includes("image") ? "img" : "fig",
        date: a.createdAt
          ? new Date(a.createdAt).toLocaleDateString("en-GB")
          : "",
        fileName: a.fileName,
        mimeType: a.mimeType,
        fileSize: a.fileSize,
        createdAt: a.createdAt,
      }))
    : [];
}

export async function deleteAttachmentApi(attachmentId) {
  return req("DELETE", `/api/attachment/${attachmentId}`);
}

// ── Notifications ────────────────────────────────────────────────
export async function getMyNotificationsApi() {
  const data = await req("GET", "/api/notification/me");
  return Array.isArray(data)
    ? data.map((n) => ({
        id: String(n.id),
        userId: String(n.userId),
        message: n.message ?? n.title ?? "Notification",
        type: n.type ?? "Info",
        isRead: n.isRead ?? false,
        createdAt: n.createdAt,
        relatedIssueId: n.relatedIssueId,
        relatedProjectId: n.relatedProjectId,
      }))
    : [];
}

export async function markNotificationAsReadApi(notificationId) {
  return req("PATCH", `/api/notification/${notificationId}/read`);
}

export async function markAllNotificationsAsReadApi() {
  return req("PATCH", "/api/notification/read-all");
}

export async function deleteNotificationApi(notificationId) {
  return req("DELETE", `/api/notification/${notificationId}`);
}

// ── Time Logs ────────────────────────────────────────────────────
export async function createTimeLogApi(timeLogData) {
  const data = await req("POST", "/api/timelog", {
    issueId: parseInt(timeLogData.issueId, 10),
    description: timeLogData.description ?? "",
    hoursSpent: parseFloat(timeLogData.hoursSpent),
    logDate: timeLogData.logDate ?? new Date().toISOString().split("T")[0],
  });
  return {
    id: String(data.id),
    issueId: String(data.issueId),
    description: data.description,
    hoursSpent: data.hoursSpent,
    logDate: data.logDate,
    createdAt: data.createdAt,
  };
}

export async function getIssueTimeLogsApi(issueId) {
  const data = await req("GET", `/api/timelog/issue/${issueId}`);
  return Array.isArray(data)
    ? data.map((t) => ({
        id: String(t.id),
        issueId: String(t.issueId),
        description: t.description,
        hoursSpent: t.hoursSpent,
        logDate: t.logDate,
        createdAt: t.createdAt,
      }))
    : [];
}

export async function getUserTimeLogsApi(userId, startDate, endDate) {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await req("GET", `/api/timelog/user/${userId}${query}`);
  return Array.isArray(data)
    ? data.map((t) => ({
        id: String(t.id),
        issueId: String(t.issueId),
        description: t.description,
        hoursSpent: t.hoursSpent,
        logDate: t.logDate,
        createdAt: t.createdAt,
      }))
    : [];
}

export async function updateTimeLogApi(timeLogId, timeLogData) {
  const data = await req("PUT", `/api/timelog/${timeLogId}`, {
    description: timeLogData.description ?? "",
    hoursSpent: parseFloat(timeLogData.hoursSpent),
    logDate: timeLogData.logDate,
  });
  return {
    id: String(data.id),
    issueId: String(data.issueId),
    description: data.description,
    hoursSpent: data.hoursSpent,
    logDate: data.logDate,
    createdAt: data.createdAt,
  };
}

export async function deleteTimeLogApi(timeLogId) {
  return req("DELETE", `/api/timelog/${timeLogId}`);
}

// ── Audit Logs ───────────────────────────────────────────────────
export async function getAuditLogsApi(filters = {}) {
  const params = new URLSearchParams();
  if (filters.entityType) params.append("entityType", filters.entityType);
  if (filters.userId) params.append("userId", filters.userId);
  if (filters.action) params.append("action", filters.action);
  if (filters.startDate) params.append("startDate", filters.startDate);
  if (filters.endDate) params.append("endDate", filters.endDate);
  if (filters.take) params.append("take", filters.take);

  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await req("GET", `/api/auditlog${query}`);

  return Array.isArray(data)
    ? data.map((log) => ({
        id: String(log.id),
        entityType: log.entityType,
        entityId: log.entityId,
        action: log.action,
        userId: String(log.userId),
        userName: log.userName,
        changes: log.changes,
        timestamp: log.timestamp,
        createdAt: log.createdAt,
      }))
    : [];
}

// ── Issues/Tasks Advanced Queries ────────────────────────────────
export async function getProjectIssuesApi(projectId, filters = {}) {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.priority) params.append("priority", filters.priority);
  if (filters.assigneeId) params.append("assigneeId", filters.assigneeId);
  if (filters.type) params.append("type", filters.type);

  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await req("GET", `/api/issue/project/${projectId}${query}`);

  return Array.isArray(data) ? data.map(mapTaskDto) : [];
}

export async function getProjectAnalyticsApi(projectId) {
  const data = await req("GET", `/api/project/${projectId}/analytics`);
  return {
    projectId: String(data.projectId),
    totalIssues: data.totalIssues ?? 0,
    completedIssues: data.completedIssues ?? 0,
    openIssues: data.openIssues ?? 0,
    inProgressIssues: data.inProgressIssues ?? 0,
    overdueIssues: data.overdueIssues ?? 0,
    atRiskIssues: data.atRiskIssues ?? 0,
    totalHoursLogged: data.totalHoursLogged ?? 0,
    budgetUsed: data.budgetUsed ?? 0,
    teamMembers: data.teamMembers ?? 0,
    completionPercentage: data.completionPercentage ?? 0,
  };
}

export async function getUserWorkloadApi(projectId, userId) {
  const data = await req(
    "GET",
    `/api/issue/user/${userId}/workload?projectId=${projectId}`,
  );
  return {
    userId: String(data.userId),
    projectId: String(data.projectId),
    assignedCount: data.assignedCount ?? 0,
    openCount: data.openCount ?? 0,
    completedCount: data.completedCount ?? 0,
    overdueCount: data.overdueCount ?? 0,
  };
}

// ── Issue History / Status ───────────────────────────────────────
export async function getIssueHistoryApi(issueId) {
  const data = await req("GET", `/api/issuehistory/issue/${issueId}`);
  return Array.isArray(data)
    ? data.map((h) => ({
        id: String(h.id),
        issueId: String(h.issueId),
        changedField: h.changedField,
        oldValue: h.oldValue,
        newValue: h.newValue,
        changedBy: h.changedByName,
        changedAt: h.changedAt,
      }))
    : [];
}

// ── Issue Dependencies ───────────────────────────────────────────
export async function getIssueDependenciesApi(issueId) {
  const data = await req("GET", `/api/issue/${issueId}/dependencies`);
  return Array.isArray(data)
    ? data.map((dep) => ({
        id: String(dep.id),
        fromIssueId: String(dep.fromIssueId),
        toIssueId: String(dep.toIssueId),
        type: dep.dependencyType,
      }))
    : [];
}

export async function createIssueDependencyApi(fromIssueId, toIssueId, type) {
  const data = await req("POST", `/api/issue/${fromIssueId}/dependencies`, {
    toIssueId: parseInt(toIssueId, 10),
    dependencyType: type,
  });
  return {
    id: String(data.id),
    fromIssueId: String(data.fromIssueId),
    toIssueId: String(data.toIssueId),
    type: data.dependencyType,
  };
}
