import { useState, useMemo } from "react";
import { X, Search, Users } from "lucide-react";
import Button from "../Button/button.jsx";

const MEMBER_ROLES = ["Developer", "Designer", "QA", "Viewer", "Co-Manager"];

export default function AddMemberModal({
  isOpen,
  onClose,
  project,
  availableUsers,
  onAddMembers,
}) {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roles, setRoles] = useState({});

  const existingIds = new Set(project?.members?.map((m) => m.id));

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase().trim();
    return availableUsers.filter((u) => {
      const notAdmin = u.role !== "System Administrator";
      const notAlreadyMember = !existingIds.has(u.id);
      const matchesSearch =
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return notAdmin && notAlreadyMember && matchesSearch;
    });
  }, [search, availableUsers, project]);

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const setRole = (id, role) => {
    setRoles((prev) => ({ ...prev, [id]: role }));
  };

  const reset = () => {
    setSelectedUsers([]);
    setRoles({});
    setSearch("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    const newMembers = selectedUsers.map((id) => {
      const user = availableUsers.find((u) => u.id === id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roles[id] || "Viewer",
        joinedAt: new Date().toISOString(),
      };
    });
    onAddMembers(project.id, newMembers);
    handleClose();
  };

  if (!isOpen || !project) return null;

  const currentMembers = project.members || [];

  return (
    <div className="modal-overlay">
      <div className="member-modal-modern">
        {/* HEADER */}
        <div className="modal-header">
          <div className="modal-title">
            <Users size={18} />
            <span>Add Members</span>
          </div>
          <div className="modal-subtitle">{project.name}</div>
          <button className="modal-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body-modern">
          {/* CURRENT MEMBERS */}
          {currentMembers.length > 0 && (
            <div className="section">
              <label className="form-label">
                Current Members ({currentMembers.length})
              </label>
              <div className="member-grid">
                {currentMembers.map((m, i) => (
                  <div key={i} className="member-card small">
                    <div>
                      <div className="user-name">{m.name}</div>
                      <small className="user-email">{m.email}</small>
                    </div>
                    <span className="badge">{m.role || "Member"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH */}
          <div className="section sticky-search">
            <div className="search-box">
              <Search size={16} color="#94a3b8" />
              <input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* AVAILABLE USERS */}
          <div className="section">
            <label className="form-label">Available Users</label>
            <div className="user-list">
              {filteredUsers.length === 0 ? (
                <div style={{ opacity: 0.6, fontSize: 13, padding: "8px" }}>
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const isSelected = selectedUsers.includes(user.id);
                  return (
                    <div
                      key={user.id}
                      className={`user-card ${isSelected ? "active" : ""}`}
                      onClick={() => toggleUser(user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="user-info">
                        <div className="name">{user.name}</div>
                        <div className="email">{user.email}</div>
                      </div>

                      {isSelected && (
                        <select
                          className="role-select"
                          value={roles[user.id] || "Viewer"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setRole(user.id, e.target.value)}
                        >
                          {MEMBER_ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* SUMMARY */}
          {selectedUsers.length > 0 && (
            <div className="summary">
              {selectedUsers.length} user(s) selected and ready to add
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="modal-actions" style={{ padding: "16px" }}>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={!selectedUsers.length}
          >
            Add Members
          </Button>
        </div>
      </div>
    </div>
  );
}
