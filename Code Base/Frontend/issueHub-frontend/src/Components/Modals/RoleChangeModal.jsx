import Button from "../Button/button";

export default function RoleChangeModal({
  user,
  selectedRole,
  onRoleChange,
  onApply,
  onCancel,
}) {
  if (!user) return null;

  return (
    <>
      <div className="overlay-backdrop" onClick={onCancel} />
      <div
        className="card"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "90%",
          maxWidth: "400px",
          padding: "24px",
        }}
      >
        <h2 style={{ marginBottom: 16 }}>Change User Role</h2>
        <p style={{ marginBottom: 16, color: "#64748b" }}>
          Update the system role for <strong>{user.name}</strong>
        </p>

        <div className="form-group">
          <label className="form-label">System role</label>
          <select
            className="form-input"
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
          >
            <option>Developer</option>
            <option>Project Manager</option>
            <option>System Administrator</option>
            <option>Viewer</option>
          </select>
        </div>

        <div className="preview-actions" style={{ marginTop: 24 }}>
          <Button
            variant="primary"
            size="sm"
            onClick={onApply}
            disabled={selectedRole === user.role}
          >
            Apply Change
          </Button>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
