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
    name: "Alex Rivera",
    email: "alex@issuehub.com",
    password: "Alex@123",
    role: "Developer",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-dev-2",
    name: "Maya Patel",
    email: "maya@issuehub.com",
    password: "Maya@123",
    role: "Developer",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "seed-dev-3",
    name: "Jordan Kim",
    email: "jordan@issuehub.com",
    password: "Jordan@123",
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

    // Keep existing user-created accounts; sync seed accounts so name/email
    // changes in the seed definition propagate to existing localStorage data.
    const seedMap = Object.fromEntries(seedUsers.map((s) => [s.id, s]));
    const merged = parsed.map((u) => {
      const seed = seedMap[u.id];
      if (!seed) return u;
      // Overwrite identity fields for seeds; preserve any admin-made edits to
      // status/department by only touching the fields seeds own.
      return { ...u, name: seed.name, email: seed.email, role: seed.role, password: seed.password };
    });
    for (const seed of seedUsers) {
      if (!merged.find((u) => u.id === seed.id)) {
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

const SESSION_KEY = "issuehub_session";

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
