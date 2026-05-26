import { Settings } from "lucide-react";

export default function UserListItem({ user, onSettings }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending Activation":
        return { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", dot: "#fbbf24" };
      case "Active":
        return { bg: "rgba(52,211,153,0.12)", text: "#34d399", border: "rgba(52,211,153,0.25)", dot: "#34d399" };
      case "Deactivated":
        return { bg: "rgba(248,113,113,0.12)", text: "#f87171", border: "rgba(248,113,113,0.25)", dot: "#f87171" };
      default:
        return { bg: "rgba(148,163,184,0.12)", text: "#94a3b8", border: "rgba(148,163,184,0.25)", dot: "#94a3b8" };
    }
  };

  const getRoleConfig = (role) => {
    switch (role) {
      case "System Administrator": return { bg: "rgba(99,102,241,0.15)", text: "#a5b4fc" };
      case "Project Manager":      return { bg: "rgba(236,72,153,0.12)",  text: "#f9a8d4" };
      case "Developer":            return { bg: "rgba(56,189,248,0.12)",   text: "#7dd3fc" };
      case "Viewer":               return { bg: "rgba(148,163,184,0.12)",  text: "#cbd5e1" };
      default:                     return { bg: "rgba(148,163,184,0.10)",  text: "#94a3b8" };
    }
  };

  const statusConfig = getStatusConfig(user.status);
  const roleConfig = getRoleConfig(user.role);

  const avatarColors = [
    ["#6366f1", "#8b5cf6"],
    ["#ec4899", "#f43f5e"],
    ["#06b6d4", "#3b82f6"],
    ["#10b981", "#059669"],
  ];
  const colorPair =
    avatarColors[
      (user.name && user.name.length > 0 ? user.name.charCodeAt(0) : 0) %
        avatarColors.length
    ];

  return (
    <li className="uli-item">
      {/* Avatar */}
      <div
        className="uli-avatar"
        style={{ background: `linear-gradient(135deg, ${colorPair[0]} 0%, ${colorPair[1]} 100%)` }}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Name + Email */}
      <div className="uli-info">
        <div className="uli-name">{user.name}</div>
        <div className="uli-email">{user.email}</div>
      </div>

      {/* Spacer (hidden on mobile) */}
      <div className="uli-spacer" />

      {/* Badges */}
      <div className="uli-badges">
        <span
          className="uli-role-badge"
          style={{ background: roleConfig.bg, color: roleConfig.text }}
        >
          {user.role}
        </span>
        <span
          className="uli-status-badge"
          style={{
            background: statusConfig.bg,
            color: statusConfig.text,
            borderColor: statusConfig.border,
          }}
        >
          <span className="uli-dot" style={{ background: statusConfig.dot }} />
          {user.status}
        </span>
      </div>

      {/* Settings button */}
      <div className="uli-action" onClick={(e) => e.stopPropagation()}>
        <button className="uli-settings-btn" onClick={() => onSettings(user)} title="User settings">
          <Settings size={13} strokeWidth={2} />
          Settings
        </button>
      </div>
    </li>
  );
}
