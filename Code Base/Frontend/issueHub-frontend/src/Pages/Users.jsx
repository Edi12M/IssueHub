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
import {
  addUser,
  getUsers,
  updateUser,
  updateUserRole,
  deactivateUser,
  removeUser,
} from "../data/users.js";
import UserForm from "./UserForm.jsx";
import RoleChangeModal from "../Components/Modals/RoleChangeModal.jsx";
import DeactivateModal from "../Components/Modals/DeactivateModal.jsx";
import RemoveUserModal from "../Components/Modals/RemoveUserModal.jsx";
import UserSettingsModal from "../Components/Modals/UserSettingsModal.jsx";
import CreateUserModal from "../Components/Modals/CreateUserModal.jsx";
import UserListItem from "../Components/Users/UserListItem.jsx";
import "../App.css";

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
  const [roleModalUser, setRoleModalUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [deactivateUserState, setDeactivateUserState] = useState(null);
  const [removeUserState, setRemoveUserState] = useState(null);
  const [settingsUser, setSettingsUser] = useState(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  function handleChangeRole(value) {
    setSelectedRole(value);
  }

  function handleChangeRoleConfirm() {
    if (roleModalUser && selectedRole && selectedRole !== roleModalUser.role) {
      const ok = updateUserRole(roleModalUser.id, selectedRole);
      if (ok) {
        setUsers(getUsers());
        setRoleModalUser(null);
        setSelectedRole("");
      } else {
        alert("Failed to update user role");
      }
    }
  }

  function handleDeactivate(user) {
    setDeactivateUserState(user);
    setSettingsUser(null);
  }

  function confirmDeactivate() {
    if (deactivateUserState) {
      const ok = deactivateUser(deactivateUserState.id);
      if (ok) {
        setUsers(getUsers());
        setDeactivateUserState(null);
      } else {
        alert("Failed to deactivate user");
      }
    }
  }

  function handleRemove(user) {
    setRemoveUserState(user);
    setSettingsUser(null);
  }

  function confirmRemove() {
    if (removeUserState) {
      const ok = removeUser(removeUserState.id);
      if (ok) {
        setUsers(getUsers());
        setRemoveUserState(null);
      } else {
        alert("Failed to remove user");
      }
    }
  }

  function openSettings(user) {
    setSettingsUser(user);
  }

  function handleSaveSettings(payload) {
    setIsSavingSettings(true);
    setTimeout(() => {
      const ok = updateUser(payload);
      setIsSavingSettings(false);
      if (ok) {
        setUsers(getUsers());
        setSettingsUser(null);
      } else {
        alert("Failed to update user");
      }
    }, 500);
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
          <CreateUserModal
            isOpen={showForm}
            isSending={sending}
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
              setSending(true);
              setTimeout(() => setSending(false), 800);
            }}
            onCancel={() => {
              setShowForm(false);
            }}
          />

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
                  <UserListItem key={u.id} user={u} onSettings={openSettings} />
                ))}
            </ul>
          )}
        </section>

        {/* Modals */}
        <RoleChangeModal
          user={roleModalUser}
          selectedRole={selectedRole}
          onRoleChange={handleChangeRole}
          onApply={handleChangeRoleConfirm}
          onCancel={() => {
            setRoleModalUser(null);
            setSelectedRole("");
          }}
        />

        <DeactivateModal
          user={deactivateUserState}
          onConfirm={confirmDeactivate}
          onCancel={() => setDeactivateUserState(null)}
        />

        <RemoveUserModal
          user={removeUserState}
          onConfirm={confirmRemove}
          onCancel={() => setRemoveUserState(null)}
        />

        <UserSettingsModal
          user={settingsUser}
          onSave={handleSaveSettings}
          onCancel={() => setSettingsUser(null)}
          isSaving={isSavingSettings}
          onDeactivate={handleDeactivate}
          onRemove={handleRemove}
        />
      </main>
    </div>
  );
}
