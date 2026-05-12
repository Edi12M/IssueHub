const STORAGE_KEY = "issuehub.users";

const seedUsers = [
  {
    id: "seed-admin",
    name: "System Admin",
    email: "admin@issuehub.com",
    password: "Admin@123",
    role: "System Administrator",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-pm",
    name: "Project Manager",
    email: "pm@issuehub.com",
    password: "PM@123",
    role: "Project Manager",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-dev",
    name: "Developer",
    email: "dev@issuehub.com",
    password: "Dev@123",
    role: "Developer",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
];

function readStoredUsers() {
  if (typeof window === "undefined") {
    return [...seedUsers];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [...seedUsers];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...seedUsers];
    }

    // Ensure seed accounts always exist so demo logins work after migrations
    const existingIds = new Set(parsed.map((u) => u.id));
    const merged = [...parsed];
    for (const seed of seedUsers) {
      if (!existingIds.has(seed.id)) {
        merged.push(seed);
      }
    }
    return merged;
  } catch {
    return [...seedUsers];
  }
}

function persistUsers() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usersStore));
}

export const usersStore = readStoredUsers();

export function getUsers() {
  return [...usersStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function addUser(user) {
  usersStore.push(user);
  persistUsers();
}

export function getUserById(id) {
  return usersStore.find((u) => String(u.id) === String(id)) ?? null;
}

export function updateUser(updated) {
  const idx = usersStore.findIndex((u) => String(u.id) === String(updated.id));
  if (idx === -1) return false;

  // Only update allowed fields
  const existing = usersStore[idx];
  usersStore[idx] = {
    ...existing,
    name: updated.name ?? existing.name,
    email: updated.email ?? existing.email,
    department: updated.department ?? existing.department ?? "",
    role: updated.role ?? existing.role,
    status: updated.status ?? existing.status,
  };

  persistUsers();
  return true;
}

export function getUserByEmail(email) {
  const normalizedEmail = email.trim().toLowerCase();
  return (
    usersStore.find((u) => u.email.toLowerCase() === normalizedEmail) ?? null
  );
}

export function validateUserCredentials(email, password) {
  const user = getUserByEmail(email);
  if (!user) {
    return null;
  }

  if (!user.password) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  return user;
}

export function updateUserRole(userId, newRole) {
  const idx = usersStore.findIndex((u) => String(u.id) === String(userId));
  if (idx === -1) return false;

  usersStore[idx].role = newRole;
  persistUsers();
  return true;
}

export function deactivateUser(userId) {
  const idx = usersStore.findIndex((u) => String(u.id) === String(userId));
  if (idx === -1) return false;

  usersStore[idx].status = "Deactivated";
  persistUsers();
  return true;
}

export function removeUser(userId) {
  const idx = usersStore.findIndex((u) => String(u.id) === String(userId));
  if (idx === -1) return false;

  usersStore.splice(idx, 1);
  persistUsers();
  return true;
}
