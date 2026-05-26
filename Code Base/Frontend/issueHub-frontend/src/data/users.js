const SESSION_KEY = "issuehub_session";

// ── Seed users (localStorage fallback) ───────────────────────────
let SEED_USERS = [
  {
    id: "seed-admin",
    name: "System Admin",
    email: "admin@issuehub.com",
    password: "Testing123!",
    role: "System Administrator",
    status: "Active",
    department: "IT",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "seed-pm",
    name: "Project Manager",
    email: "pm@issuehub.com",
    password: "Testing123!",
    role: "Project Manager",
    status: "Active",
    department: "Management",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "seed-dev",
    name: "Developer One",
    email: "dev1@issuehub.com",
    password: "Testing123!",
    role: "Developer",
    status: "Active",
    department: "Engineering",
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: "seed-dev-2",
    name: "Developer Two",
    email: "dev2@issuehub.com",
    password: "Testing123!",
    role: "Developer",
    status: "Active",
    department: "Engineering",
    createdAt: "2024-01-04T00:00:00.000Z",
  },
  {
    id: "seed-dev-3",
    name: "Developer Three",
    email: "dev3@issuehub.com",
    password: "Testing123!",
    role: "Developer",
    status: "Active",
    department: "Engineering",
    createdAt: "2024-01-05T00:00:00.000Z",
  },
];

// ── Auth helpers ─────────────────────────────────────────────────
export function validateUserCredentials(email, password) {
  const user = SEED_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return null;
  const { password: _, ...safe } = user;
  return safe;
}

// ── Session management ───────────────────────────────────────────
export function setSession(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    // Backend sessions carry an expiry; drop them once the JWT is stale so we
    // don't keep sending a token the server will reject. Seed (offline)
    // sessions have no expiresAt and never expire client-side.
    if (session?.expiresAt && new Date(session.expiresAt).getTime() <= Date.now()) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

// ── CRUD (fallback when API is unavailable) ──────────────────────
export function getUsers() {
  return SEED_USERS.map(({ password: _, ...u }) => u);
}

export function addUser(user) {
  const newUser = {
    ...user,
    id: "seed-" + Date.now(),
    createdAt: new Date().toISOString(),
    status: user.status ?? "Active",
  };
  SEED_USERS = [...SEED_USERS, newUser];
  return newUser;
}

export function updateUser(updated) {
  SEED_USERS = SEED_USERS.map((u) =>
    u.id === updated.id ? { ...u, ...updated } : u
  );
  return true;
}

export function updateUserRole(userId, newRole) {
  SEED_USERS = SEED_USERS.map((u) =>
    u.id === userId ? { ...u, role: newRole } : u
  );
  return true;
}

export function deactivateUser(userId) {
  SEED_USERS = SEED_USERS.map((u) =>
    u.id === userId ? { ...u, status: "Deactivated" } : u
  );
  return true;
}

export function removeUser(userId) {
  SEED_USERS = SEED_USERS.filter((u) => u.id !== userId);
  return true;
}
