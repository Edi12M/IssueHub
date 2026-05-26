import { API_BASE_URL } from "../config.js";

// Helper function to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Generic fetch wrapper
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  return handleResponse(response);
}

// Auth API endpoints
export const authAPI = {
  login: (credentials) =>
    fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};

// User API endpoints
export const usersAPI = {
  getAll: () => fetchAPI("/users"),
  getById: (id) => fetchAPI(`/users/${id}`),
  create: (userData) =>
    fetchAPI("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  update: (id, userData) =>
    fetchAPI(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
  updateRole: (id, roleData) =>
    fetchAPI(`/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify(roleData),
    }),
  deactivate: (id) =>
    fetchAPI(`/users/${id}/deactivate`, {
      method: "PATCH",
    }),
  delete: (id) =>
    fetchAPI(`/users/${id}`, {
      method: "DELETE",
    }),
};

// Projects API endpoints
export const projectsAPI = {
  getAll: () => fetchAPI("/projects"),
  getById: (id) => fetchAPI(`/projects/${id}`),
  create: (projectData) =>
    fetchAPI("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),
  update: (id, projectData) =>
    fetchAPI(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    }),
  delete: (id) =>
    fetchAPI(`/projects/${id}`, {
      method: "DELETE",
    }),
};

// Issues API endpoints
export const issuesAPI = {
  getAll: () => fetchAPI("/issues"),
  getById: (id) => fetchAPI(`/issues/${id}`),
  create: (issueData) =>
    fetchAPI("/issues", {
      method: "POST",
      body: JSON.stringify(issueData),
    }),
  update: (id, issueData) =>
    fetchAPI(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(issueData),
    }),
  updateStatus: (id, statusData) =>
    fetchAPI(`/issues/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(statusData),
    }),
  delete: (id) =>
    fetchAPI(`/issues/${id}`, {
      method: "DELETE",
    }),
};

// Comments API endpoints
export const commentsAPI = {
  getByIssue: (issueId) => fetchAPI(`/issues/${issueId}/comments`),
  getById: (id) => fetchAPI(`/comments/${id}`),
  create: (commentData) =>
    fetchAPI("/comments", {
      method: "POST",
      body: JSON.stringify(commentData),
    }),
  update: (id, commentData) =>
    fetchAPI(`/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify(commentData),
    }),
  delete: (id) =>
    fetchAPI(`/comments/${id}`, {
      method: "DELETE",
    }),
};

// Meetings API endpoints
export const meetingsAPI = {
  getAll: () => fetchAPI("/meetings"),
  getById: (id) => fetchAPI(`/meetings/${id}`),
  create: (meetingData) =>
    fetchAPI("/meetings", {
      method: "POST",
      body: JSON.stringify(meetingData),
    }),
  update: (id, meetingData) =>
    fetchAPI(`/meetings/${id}`, {
      method: "PUT",
      body: JSON.stringify(meetingData),
    }),
  delete: (id) =>
    fetchAPI(`/meetings/${id}`, {
      method: "DELETE",
    }),
};

// Time Logs API endpoints
export const timeLogsAPI = {
  getAll: () => fetchAPI("/timelogs"),
  getById: (id) => fetchAPI(`/timelogs/${id}`),
  create: (timeLogData) =>
    fetchAPI("/timelogs", {
      method: "POST",
      body: JSON.stringify(timeLogData),
    }),
  update: (id, timeLogData) =>
    fetchAPI(`/timelogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(timeLogData),
    }),
  delete: (id) =>
    fetchAPI(`/timelogs/${id}`, {
      method: "DELETE",
    }),
};

// Notifications API endpoints
export const notificationsAPI = {
  getAll: () => fetchAPI("/notifications"),
  getById: (id) => fetchAPI(`/notifications/${id}`),
  markAsRead: (id) =>
    fetchAPI(`/notifications/${id}/read`, {
      method: "PATCH",
    }),
  delete: (id) =>
    fetchAPI(`/notifications/${id}`, {
      method: "DELETE",
    }),
};

// Project Members API endpoints
export const projectMembersAPI = {
  getByProject: (projectId) => fetchAPI(`/projects/${projectId}/members`),
  addMember: (projectId, memberData) =>
    fetchAPI(`/projects/${projectId}/members`, {
      method: "POST",
      body: JSON.stringify(memberData),
    }),
  removeMember: (projectId, userId) =>
    fetchAPI(`/projects/${projectId}/members/${userId}`, {
      method: "DELETE",
    }),
};

// Attachments API endpoints
export const attachmentsAPI = {
  getByIssue: (issueId) => fetchAPI(`/issues/${issueId}/attachments`),
  upload: (issueId, formData) =>
    fetch(`${API_BASE_URL}/issues/${issueId}/attachments`, {
      method: "POST",
      body: formData, // Don't set Content-Type for FormData
    }).then(handleResponse),
  delete: (id) =>
    fetchAPI(`/attachments/${id}`, {
      method: "DELETE",
    }),
};

// Workflows API endpoints
export const workflowsAPI = {
  getAll: () => fetchAPI("/workflows"),
  getById: (id) => fetchAPI(`/workflows/${id}`),
  create: (workflowData) =>
    fetchAPI("/workflows", {
      method: "POST",
      body: JSON.stringify(workflowData),
    }),
  update: (id, workflowData) =>
    fetchAPI(`/workflows/${id}`, {
      method: "PUT",
      body: JSON.stringify(workflowData),
    }),
  delete: (id) =>
    fetchAPI(`/workflows/${id}`, {
      method: "DELETE",
    }),
};

// Issue Dependencies API endpoints
export const issueDependenciesAPI = {
  getByIssue: (issueId) => fetchAPI(`/issues/${issueId}/dependencies`),
  create: (dependencyData) =>
    fetchAPI("/issuedependencies", {
      method: "POST",
      body: JSON.stringify(dependencyData),
    }),
  delete: (id) =>
    fetchAPI(`/issuedependencies/${id}`, {
      method: "DELETE",
    }),
};

export default {
  authAPI,
  usersAPI,
  projectsAPI,
  issuesAPI,
  commentsAPI,
  meetingsAPI,
  timeLogsAPI,
  notificationsAPI,
  projectMembersAPI,
  attachmentsAPI,
  workflowsAPI,
  issueDependenciesAPI,
};
