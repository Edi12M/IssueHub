import { projectsAPI } from "../services/api.js";

// Cache for projects
let projectsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is still valid
function isCacheValid() {
  return projectsCache && Date.now() - cacheTimestamp < CACHE_DURATION;
}

/**
 * Get all projects from the API
 * Results are cached for 5 minutes
 */
export async function getProjects() {
  try {
    // Return cached data if still valid
    if (isCacheValid()) {
      return [...projectsCache];
    }

    const projects = await projectsAPI.getAll();

    // Cache the results
    projectsCache = projects;
    cacheTimestamp = Date.now();

    return [...projects];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    // Return cached data if available, even if expired
    if (projectsCache) {
      return [...projectsCache];
    }
    // Return empty array as fallback
    return [];
  }
}

/**
 * Get a project by ID
 */
export async function getProjectById(id) {
  try {
    return await projectsAPI.getById(id);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status) {
  try {
    const projects = await getProjects();
    return projects.filter((p) => p.status === status);
  } catch (error) {
    console.error("Failed to fetch projects by status:", error);
    return [];
  }
}

/**
 * Create a new project
 */
export async function createProject(projectData) {
  try {
    const result = await projectsAPI.create(projectData);
    // Invalidate cache
    projectsCache = null;
    return result;
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
}

/**
 * Update a project
 */
export async function updateProject(id, projectData) {
  try {
    const result = await projectsAPI.update(id, projectData);
    // Invalidate cache
    projectsCache = null;
    return result;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
}

/**
 * Update project status
 */
export async function updateProjectStatus(id, newStatus) {
  try {
    await projectsAPI.update(id, { status: newStatus });
    // Invalidate cache
    projectsCache = null;
    return true;
  } catch (error) {
    console.error("Failed to update project status:", error);
    return false;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id) {
  try {
    await projectsAPI.delete(id);
    // Invalidate cache
    projectsCache = null;
    return true;
  } catch (error) {
    console.error("Failed to delete project:", error);
    return false;
  }
}
