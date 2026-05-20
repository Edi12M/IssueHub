import { usersAPI } from "../services/api.js";

const SESSION_KEY = "issuehub_session";

// Cache for users to avoid repeated API calls
let usersCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is still valid
function isCacheValid() {
  return usersCache && Date.now() - cacheTimestamp < CACHE_DURATION;
}

/**
 * Get all users from the API
 * Results are cached for 5 minutes
 */
export async function getUsers() {
  try {
    // Return cached data if still valid
    if (isCacheValid()) {
      return [...usersCache];
    }

    const users = await usersAPI.getAll();
    // Map API response fields to expected frontend fields
    const mappedUsers = users.map((user) => ({
      id: user.id,
      name: user.fullName || user.name,
      email: user.email,
      role: user.role,
      status: user.status === "PendingVerification" ? "Active" : user.status,
      createdAt: user.createAt || user.createdAt,
      password: undefined, // Don't expose passwords
    }));

    // Cache the results
    usersCache = mappedUsers;
    cacheTimestamp = Date.now();

    return [...mappedUsers];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    // Return cached data if available, even if expired
    if (usersCache) {
      return [...usersCache];
    }
    // Return empty array as fallback
    return [];
  }
}

/**
 * Add a new user
 */
export async function addUser(user) {
  try {
    const userData = {
      fullName: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    const result = await usersAPI.create(userData);
    // Invalidate cache
    usersCache = null;

    return {
      ...result,
      name: result.fullName || result.name,
      status:
        result.status === "PendingVerification" ? "Active" : result.status,
    };
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
}

/**
 * Get a user by ID
 */
export async function getUserById(id) {
  try {
    const user = await usersAPI.getById(id);
    return {
      ...user,
      name: user.fullName || user.name,
      status: user.status === "PendingVerification" ? "Active" : user.status,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

/**
 * Update a user
 */
export async function updateUser(updated) {
  try {
    const userData = {
      fullName: updated.name || updated.fullName,
      email: updated.email,
      role: updated.role,
      status: updated.status,
    };

    await usersAPI.update(updated.id, userData);
    // Invalidate cache
    usersCache = null;
    return true;
  } catch (error) {
    console.error("Failed to update user:", error);
    return false;
  }
}

/**
 * Get a user by email
 */
export async function getUserByEmail(email) {
  try {
    const users = await getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    return users.find((u) => u.email.toLowerCase() === normalizedEmail) ?? null;
  } catch (error) {
    console.error("Failed to fetch user by email:", error);
    return null;
  }
}

/**
 * Validate user credentials (for login)
 * Note: This should be handled by a separate auth API endpoint
 */
export async function validateUserCredentials(email) {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    // In a real application, this would validate against the backend
    // For now, we'll return the user if they exist
    // TODO: Implement proper backend authentication endpoint
    return user;
  } catch (error) {
    console.error("Failed to validate credentials:", error);
    return null;
  }
}

/**
 * Update a user's role
 */
export async function updateUserRole(userId, newRole) {
  try {
    await usersAPI.updateRole(userId, { role: newRole });
    // Invalidate cache
    usersCache = null;
    return true;
  } catch (error) {
    console.error("Failed to update user role:", error);
    return false;
  }
}

/**
 * Deactivate a user
 */
export async function deactivateUser(userId) {
  try {
    await usersAPI.deactivate(userId);
    // Invalidate cache
    usersCache = null;
    return true;
  } catch (error) {
    console.error("Failed to deactivate user:", error);
    return false;
  }
}

/**
 * Remove (delete) a user
 */
export async function removeUser(userId) {
  try {
    await usersAPI.delete(userId);
    // Invalidate cache
    usersCache = null;
    return true;
  } catch (error) {
    console.error("Failed to remove user:", error);
    return false;
  }
}

// Session management (for authentication tokens)
export function setSession(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
