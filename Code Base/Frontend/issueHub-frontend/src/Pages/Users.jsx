import { useState, useEffect } from "react";
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
import {
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/index.js";
import UserForm from "./UserForm.jsx";
import RoleChangeModal from "../Components/Modals/RoleChangeModal.jsx";
import DeactivateModal from "../Components/Modals/DeactivateModal.jsx";
import RemoveUserModal from "../Components/Modals/RemoveUserModal.jsx";
import UserSettingsModal from "../Components/Modals/UserSettingsModal.jsx";
import CreateUserModal from "../Components/Modals/CreateUserModal.jsx";
import UserListItem from "../Components/Users/UserListItem.jsx";
import { ADMIN_NAV_ITEMS } from "./Admin/adminConstants.js";
import "../App.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
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

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const fetched = await getUsersApi();
      setUsers(fetched);
      setApiError(false);
    } catch {
      setApiError(true);
      setUsers(getUsers());
    } finally {
      setLoading(false);
    }
  }

  async function refreshUsers() {
    try {
      const fetched = await getUsersApi();
      setUsers(fetched);
      setApiError(false);
    } catch {
      setApiError(true);
      setUsers(getUsers());
    }
  }

  async function handleChangeRoleConfirm() {
    if (!roleModalUser || !selectedRole || selectedRole === roleModalUser.role) return;
    try {
      if (roleModalUser.backendId) {
        await updateUserApi(roleModalUser.backendId, { ...roleModalUser, role: selectedRole });
      } else {
        updateUserRole(roleModalUser.id, selectedRole);
      }
      await refreshUsers();
      setRoleModalUser(null);
      setSelectedRole("");
    } catch (e) {
      alert(e.message || "Failed to update user role");
    }
  }

  function handleDeactivate(user) {
    setDeactivateUserState(user);
    setSettingsUser(null);
  }

  async function confirmDeactivate() {
    if (!deactivateUserState) return;
    try {
      if (deactivateUserState.backendId) {
        await updateUserApi(deactivateUserState.backendId, {
          ...deactivateUserState,
          status: "Deactivated",
        });
      } else {
        deactivateUser(deactivateUserState.id);
      }
      await refreshUsers();
      setDeactivateUserState(null);
    } catch (e) {
      alert(e.message || "Failed to deactivate user");
    }
  }

  function handleRemove(user) {
    setRemoveUserState(user);
    setSettingsUser(null);
  }

  async function confirmRemove() {
    if (!removeUserState) return;
    try {
      if (removeUserState.backendId) {
        await deleteUserApi(removeUserState.backendId);
      } else {
        removeUser(removeUserState.id);
      }
      await refreshUsers();
      setRemoveUserState(null);
    } catch (e) {
      alert(e.message || "Failed to remove user");
    }
  }

  function openSettings(user) {
    setSettingsUser(user);
  }

  async function handleSaveSettings(payload) {
    setIsSavingSettings(true);
    try {
      const bid = settingsUser?.backendId;
      if (bid) {
        await updateUserApi(bid, payload);
      } else {
        updateUser(payload);
      }
      await refreshUsers();
      setSettingsUser(null);
    } catch (e) {
      alert(e.message || "Failed to update user");
    } finally {
      setIsSavingSettings(false);
    }
  }

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Admin Dashboard"
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

          {apiError && (
            <div
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                color: "#fbbf24",
                marginBottom: 12,
              }}
            >
              Could not reach the server — showing cached data. Start the backend to manage live users.
            </div>
          )}

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

          <CreateUserModal
            isOpen={showForm}
            isSending={sending}
            onSubmit={async (payload) => {
              try {
                setSending(true);
                try {
                  await createUserApi(payload);
                } catch {
                  addUser({ ...payload, id: `local-${Date.now()}`, createdAt: new Date().toISOString() });
                }
                await refreshUsers();
                setShowForm(false);
              } catch (e) {
                alert(e.message || "Failed to add user");
              } finally {
                setSending(false);
              }
            }}
            onCancel={() => setShowForm(false)}
          />

          {selectedUser && (
            <>
              <div
                className="overlay-backdrop"
                onClick={() => setSelectedUser(null)}
              />
              <UserForm
                initial={selectedUser}
                submitLabel="Save"
                onSubmit={async (payload) => {
                  try {
                    if (selectedUser.backendId) {
                      await updateUserApi(selectedUser.backendId, payload);
                    } else {
                      updateUser(payload);
                    }
                    await refreshUsers();
                    setSelectedUser(null);
                  } catch (e) {
                    alert(e.message || "Failed to update user");
                  }
                }}
                onCancel={() => setSelectedUser(null)}
                className="user-edit-overlay"
              />
            </>
          )}
        </section>

        {/* User list */}
        <section className="card" style={{ maxWidth: 920 }}>
          <h2 style={{ marginBottom: 16 }}>Users ({users.length})</h2>

          {loading ? (
            <p style={{ color: "#94a3b8" }}>Loading users…</p>
          ) : users.length === 0 ? (
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
                        .includes(search.trim().toLowerCase())
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
          onRoleChange={setSelectedRole}
          onApply={handleChangeRoleConfirm}
          onCancel={() => { setRoleModalUser(null); setSelectedRole(""); }}
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
