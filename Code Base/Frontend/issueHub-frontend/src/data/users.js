const STORAGE_KEY = "issuehub.users";

const seedUsers = [
  {
    id: "seed-1",
    name: "Alex Morgan",
    email: "alex.morgan@issuehub.local",
    password: "Pass1234!",
    role: "Developer",
    status: "Pending Activation",
    createdAt: new Date().toISOString(),
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

    return parsed;
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
