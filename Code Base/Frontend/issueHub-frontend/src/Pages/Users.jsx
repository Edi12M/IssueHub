import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  FolderKanban,
  CircleDot,
  Settings,
} from "lucide-react";
import Button from "../Components/Button/button.jsx";
import Sidebar from "../Components/SideBar/sideBar.jsx";
import { addUser, getUsers } from "../data/users.js";
import "../App.css";

const ROLE_OPTIONS = [
  "Developer",
  "Project Manager",
  "System Administrator",
  "Viewer",
];

const ADMIN_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { key: "users", label: "Users", icon: UsersIcon, to: "/admin/users" },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "issues", label: "Issues", icon: CircleDot },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function Users() {
  const [users, setUsers] = useState(() => getUsers());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [sending, setSending] = useState(false);
  const [activeKey, setActiveKey] = useState("users");

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setRole(ROLE_OPTIONS[0]);
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      role,
      status: "Pending Activation",
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);
    setUsers(getUsers());
    resetForm();
    setShowForm(false);

    setSending(true);
    setTimeout(() => {
      console.log(`Activation email sent to ${newUser.email}`);
      setSending(false);
    }, 800);
  }

  return (
    <div className="preview-shell">
      <Sidebar
        navItems={ADMIN_NAV_ITEMS}
        enableNavigation={true}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <main className="preview-main">
        {/* Header */}
        <section className="preview-hero card">
          <p className="eyebrow">User Management</p>
          <h1 className="users-title">Users</h1>
          <p className="lead">Manage system users and their initial roles.</p>

          <div className="preview-actions">
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? "Cancel" : "Add User"}
            </Button>
            {sending && (
              <span className="status-sending">Sending activation email…</span>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <form
              className="user-form card"
              style={{ marginTop: 24 }}
              onSubmit={handleCreate}
            >
              <h2 style={{ marginBottom: 16 }}>New User</h2>

              <div className="form-group">
                <label className="form-label">Full name</label>
                <input
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email address</label>
                <input
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">System role</label>
                <select
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Temporary password</label>
                <input
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Set initial password"
                  minLength={6}
                  required
                />
              </div>

              <div className="preview-actions" style={{ marginTop: 8 }}>
                <Button type="submit" variant="primary">
                  Create User
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </section>

        {/* User list */}
        <section className="card" style={{ maxWidth: 920 }}>
          <h2 style={{ marginBottom: 16 }}>Users ({users.length})</h2>

          {users.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No users yet. Click "Add User" to get started.
            </p>
          ) : (
            <ul className="user-list">
              {users.map((u) => (
                <li key={u.id} className="user-item">
                  <div className="user-avatar">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{u.name}</div>
                    <div className="user-email">{u.email}</div>
                  </div>
                  <div className="user-meta">
                    <span className="user-role">{u.role}</span>
                    <span className="user-status">{u.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
