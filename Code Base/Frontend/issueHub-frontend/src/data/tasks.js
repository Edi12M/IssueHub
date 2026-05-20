import { issuesAPI } from "../services/api.js";

// Cache for tasks/issues
let tasksCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is still valid
function isCacheValid() {
  return tasksCache && Date.now() - cacheTimestamp < CACHE_DURATION;
}

/**
 * Get all tasks/issues from the API
 * Results are cached for 5 minutes
 */
export async function getTasks() {
  try {
    // Return cached data if still valid
    if (isCacheValid()) {
      return [...tasksCache];
    }

    const issues = await issuesAPI.getAll();

    // Map API response to expected frontend format
    const mappedTasks = issues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description || "",
      type: issue.type || "Task",
      priority: issue.priority || "Medium",
      status: issue.status || "To Do",
      projectId: issue.projectId,
      assignees: issue.assignedTo ? [issue.assignedTo] : [],
      dueDate: issue.dueDate,
      startDate: issue.startDate,
      createdAt: issue.createdAt,
      subtasks: issue.subtasks || [],
      acceptanceCriteria: issue.acceptanceCriteria || "",
      dependencies: issue.dependencies || [],
    }));

    // Cache the results
    tasksCache = mappedTasks;
    cacheTimestamp = Date.now();

    return [...mappedTasks];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    // Return cached data if available, even if expired
    if (tasksCache) {
      return [...tasksCache];
    }
    // Return empty array as fallback
    return [];
  }
}

/**
 * Save/update tasks (updates local state)
 * Note: For actual persistence, individual update/create calls should be made
 */
export async function saveTasks(tasks) {
  // This function is kept for backward compatibility
  // Individual task updates should use updateTaskStatus or create new issues
  tasksCache = tasks;
  cacheTimestamp = Date.now();
}

/**
 * Update task status
 */
export async function updateTaskStatus(taskId, newStatus) {
  try {
    await issuesAPI.updateStatus(taskId, { status: newStatus });
    // Invalidate cache
    tasksCache = null;
    return await getTasks();
  } catch (error) {
    console.error("Failed to update task status:", error);
    throw error;
  }
}

/**
 * Create a new task/issue
 */
export async function createTask(taskData) {
  try {
    const issueData = {
      title: taskData.title,
      description: taskData.description,
      type: taskData.type,
      priority: taskData.priority,
      status: taskData.status,
      projectId: taskData.projectId,
      assignedTo: taskData.assignees?.[0],
      dueDate: taskData.dueDate,
      startDate: taskData.startDate,
    };

    const result = await issuesAPI.create(issueData);
    // Invalidate cache
    tasksCache = null;
    return result;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
}

/**
 * Update a task/issue
 */
export async function updateTask(taskId, taskData) {
  try {
    const issueData = {
      title: taskData.title,
      description: taskData.description,
      type: taskData.type,
      priority: taskData.priority,
      status: taskData.status,
      projectId: taskData.projectId,
      assignedTo: taskData.assignees?.[0],
      dueDate: taskData.dueDate,
      startDate: taskData.startDate,
    };

    await issuesAPI.update(taskId, issueData);
    // Invalidate cache
    tasksCache = null;
    return true;
  } catch (error) {
    console.error("Failed to update task:", error);
    return false;
  }
}

/**
 * Delete a task/issue
 */
export async function deleteTask(taskId) {
  try {
    await issuesAPI.delete(taskId);
    // Invalidate cache
    tasksCache = null;
    return true;
  } catch (error) {
    console.error("Failed to delete task:", error);
    return false;
  }
}
