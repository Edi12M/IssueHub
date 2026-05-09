import { useState } from "react";
import { Lock, Trash2, X } from "lucide-react";

const inputBase = {
  width: "100%",
  backgroundColor: "rgba(15, 23, 42, 0.4)",
  border: "1px solid rgba(107, 228, 255, 0.2)",
  color: "#f1f5f9",
  padding: "10px 12px",
  fontSize: "13.5px",
  borderRadius: "8px",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "11.5px",
  fontWeight: "600",
  color: "#94a3b8",
  marginBottom: "6px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

const sectionHeadingStyle = {
  margin: "0 0 18px 0",
  fontSize: "11px",
  fontWeight: "700",
  color: "#64748b",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

function FormInput({ value, onChange, type = "text", placeholder, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      style={{
        ...inputBase,
        borderColor: focused
          ? "rgba(107, 228, 255, 0.6)"
          : "rgba(107, 228, 255, 0.2)",
        boxShadow: focused ? "0 0 0 3px rgba(107, 228, 255, 0.15)" : "none",
        backgroundColor: focused
          ? "rgba(15, 23, 42, 0.5)"
          : "rgba(15, 23, 42, 0.4)",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}

function FormSelect({ value, onChange, children }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        ...inputBase,
        borderColor: focused
          ? "rgba(107, 228, 255, 0.6)"
          : "rgba(107, 228, 255, 0.2)",
        boxShadow: focused ? "0 0 0 3px rgba(107, 228, 255, 0.15)" : "none",
        backgroundColor: focused
          ? "rgba(15, 23, 42, 0.5)"
          : "rgba(15, 23, 42, 0.4)",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

const getStatusConfig = (status) => {
  switch (status) {
    case "Pending Activation":
      return {
        bg: "rgba(251,191,36,0.12)",
        text: "#fbbf24",
        border: "rgba(251,191,36,0.25)",
        dot: "#fbbf24",
      };
    case "Active":
      return {
        bg: "rgba(52,211,153,0.12)",
        text: "#34d399",
        border: "rgba(52,211,153,0.25)",
        dot: "#34d399",
      };
    case "Deactivated":
      return {
        bg: "rgba(248,113,113,0.12)",
        text: "#f87171",
        border: "rgba(248,113,113,0.25)",
        dot: "#f87171",
      };
    default:
      return {
        bg: "rgba(148,163,184,0.12)",
        text: "#94a3b8",
        border: "rgba(148,163,184,0.25)",
        dot: "#94a3b8",
      };
  }
};

export default function UserSettingsModal({
  user,
  onSave,
  onCancel,
  isSaving = false,
  onDeactivate,
  onRemove,
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [department, setDepartment] = useState(user?.department ?? "");
  const [role, setRole] = useState(user?.role ?? "Developer");
  const [showConfirm, setShowConfirm] = useState(false);

  if (!user) return null;

  const statusConfig = getStatusConfig(user.status);

  function handleSaveClick() {
    setShowConfirm(true);
  }

  function handleConfirmSave() {
    onSave({
      ...user,
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      role,
    });
    setShowConfirm(false);
  }

  const modalCard = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "90%",
    maxWidth: "520px",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "14px",
    backgroundColor: "#141c2b",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
  };

  const divider = { borderBottom: "1px solid rgba(255,255,255,0.06)" };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 999,
        }}
      />

      <div style={modalCard}>
        {/* Header */}
        <div
          style={{
            padding: "22px 24px 20px",
            ...divider,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#f1f5f9",
                fontSize: "17px",
                fontWeight: "700",
                letterSpacing: "-0.02em",
              }}
            >
              User Settings
            </h2>
            <p
              style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}
            >
              Editing profile for{" "}
              <span style={{ color: "#94a3b8", fontWeight: "500" }}>
                {user.name}
              </span>
            </p>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Information */}
        <div style={{ padding: "22px 24px", ...divider }}>
          <p style={sectionHeadingStyle}>Profile Information</p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label style={labelStyle}>Full Name</label>
              <FormInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label style={labelStyle}>
                Department{" "}
                <span
                  style={{
                    color: "#475569",
                    fontWeight: "400",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  — optional
                </span>
              </label>
              <FormInput
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering"
              />
            </div>
          </div>
        </div>

        {/* Permissions & Status */}
        <div style={{ padding: "22px 24px", ...divider }}>
          <p style={sectionHeadingStyle}>Permissions & Status</p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label style={labelStyle}>System Role</label>
              <FormSelect
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Developer</option>
                <option>Project Manager</option>
                <option>System Administrator</option>
                <option>Viewer</option>
              </FormSelect>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: "600",
                  color: "#64748b",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Current Status
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  backgroundColor: statusConfig.bg,
                  color: statusConfig.text,
                  border: `1px solid ${statusConfig.border}`,
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: statusConfig.dot,
                    flexShrink: 0,
                  }}
                />
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ padding: "22px 24px", ...divider }}>
          <p style={{ ...sectionHeadingStyle, color: "#ef4444", opacity: 0.7 }}>
            Danger Zone
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {user.status !== "Deactivated" && (
              <button
                onClick={() => onDeactivate?.(user)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "9px 14px",
                  backgroundColor: "rgba(251,191,36,0.1)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251,191,36,0.2)",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(251,191,36,0.18)";
                  e.currentTarget.style.borderColor = "rgba(251,191,36,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(251,191,36,0.1)";
                  e.currentTarget.style.borderColor = "rgba(251,191,36,0.2)";
                }}
              >
                <Lock size={13} strokeWidth={2.5} />
                Deactivate
              </button>
            )}
            <button
              onClick={() => onRemove?.(user)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "9px 14px",
                backgroundColor: "rgba(248,113,113,0.1)",
                color: "#f87171",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(248,113,113,0.18)";
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.1)";
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.2)";
              }}
            >
              <Trash2 size={13} strokeWidth={2.5} />
              Remove User
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "18px 24px", display: "flex", gap: "10px" }}>
          <button
            onClick={onCancel}
            disabled={isSaving}
            style={{
              flex: "0 0 auto",
              padding: "10px 18px",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#94a3b8",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
            }
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            style={{
              flex: 1,
              padding: "10px 18px",
              backgroundColor: isSaving
                ? "rgba(99,102,241,0.4)"
                : "rgba(99,102,241,0.9)",
              color: "#fff",
              border: "1px solid rgba(99,102,241,0.5)",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: isSaving ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              if (!isSaving)
                e.currentTarget.style.backgroundColor = "rgba(99,102,241,1)";
            }}
            onMouseLeave={(e) => {
              if (!isSaving)
                e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.9)";
            }}
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <>
          <div
            onClick={() => setShowConfirm(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              zIndex: 1000,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              width: "90%",
              maxWidth: "360px",
              backgroundColor: "#141c2b",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
                color: "#f1f5f9",
                fontSize: "15px",
                fontWeight: "700",
              }}
            >
              Confirm Changes
            </h3>
            <p
              style={{
                margin: "0 0 22px",
                color: "#64748b",
                fontSize: "13.5px",
                lineHeight: 1.5,
              }}
            >
              Save changes to{" "}
              <span style={{ color: "#94a3b8", fontWeight: "600" }}>
                {name}
              </span>
              's profile?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  padding: "9px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                style={{
                  flex: 1,
                  padding: "9px",
                  backgroundColor: "rgba(99,102,241,0.9)",
                  color: "#fff",
                  border: "1px solid rgba(99,102,241,0.5)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Yes, Save
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
