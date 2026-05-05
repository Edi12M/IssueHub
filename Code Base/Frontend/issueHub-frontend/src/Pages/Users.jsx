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
import { addUser, getUsers, updateUser } from "../data/users.js";
import UserForm from "./UserForm.jsx";
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
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [sending, setSending] = useState(false);
  const [activeKey, setActiveKey] = useState("users");

  function openEditor(user) {
    setSelectedUser(user);
    setShowForm(false);
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

          <div className="preview-actions users-actions">
            <input
              className="form-input search-input"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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

          {/* New user form (reusable component) */}
          {showForm && (
            <UserForm
              initial={{}}
              showPassword={true}
              submitLabel="Create"
              onSubmit={(payload) => {
                const newUser = {
                  ...payload,
                  id: Date.now().toString(),
                  status: "Pending Activation",
                  createdAt: new Date().toISOString(),
                };
                addUser(newUser);
                setUsers(getUsers());
                setShowForm(false);
                resetForm();
                setSending(true);
                setTimeout(() => setSending(false), 800);
              }}
              onCancel={() => {
                setShowForm(false);
                resetForm();
              }}
            />
          )}

          {/* Edit selected user */}
          {selectedUser && (
            <>
              <div
                className="overlay-backdrop"
                onClick={() => {
                  setSelectedUser(null);
                }}
              />
              <UserForm
                initial={selectedUser}
                submitLabel="Save"
                onSubmit={(payload) => {
                  const ok = updateUser(payload);
                  if (ok) {
                    setUsers(getUsers());
                    setSelectedUser(null);
                  } else alert("Failed to update user");
                }}
                onCancel={() => {
                  setSelectedUser(null);
                }}
                className="user-edit-overlay"
              />
            </>
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
              {users
                .filter((u) =>
                  !search.trim()
                    ? true
                    : `${u.name} ${u.email}`
                        .toLowerCase()
                        .includes(search.trim().toLowerCase()),
                )
                .map((u) => (
                  <li
                    key={u.id}
                    className="user-item"
                    onClick={() => openEditor(u)}
                    style={{ cursor: "pointer" }}
                  >
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
