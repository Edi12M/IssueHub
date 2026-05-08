import { Settings } from "lucide-react";
import Button from "../Button/button.jsx";

export default function UserListItem({ user, onSettings }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending Activation":
        return {
          bg: "rgba(251, 191, 36, 0.12)",
          text: "#fbbf24",
          border: "rgba(251, 191, 36, 0.25)",
          dot: "#fbbf24",
        };
      case "Active":
        return {
          bg: "rgba(52, 211, 153, 0.12)",
          text: "#34d399",
          border: "rgba(52, 211, 153, 0.25)",
          dot: "#34d399",
        };
      case "Deactivated":
        return {
          bg: "rgba(248, 113, 113, 0.12)",
          text: "#f87171",
          border: "rgba(248, 113, 113, 0.25)",
          dot: "#f87171",
        };
      default:
        return {
          bg: "rgba(148, 163, 184, 0.12)",
          text: "#94a3b8",
          border: "rgba(148, 163, 184, 0.25)",
          dot: "#94a3b8",
        };
    }
  };

  const getRoleConfig = (role) => {
    switch (role) {
      case "System Administrator":
        return { bg: "rgba(99, 102, 241, 0.15)", text: "#a5b4fc" };
      case "Project Manager":
        return { bg: "rgba(236, 72, 153, 0.12)", text: "#f9a8d4" };
      case "Developer":
        return { bg: "rgba(56, 189, 248, 0.12)", text: "#7dd3fc" };
      case "Viewer":
        return { bg: "rgba(148, 163, 184, 0.12)", text: "#cbd5e1" };
      default:
        return { bg: "rgba(148, 163, 184, 0.10)", text: "#94a3b8" };
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
    <li
      style={{
        display: "flex",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backgroundColor: "transparent",
        transition: "background-color 0.15s ease",
        cursor: "pointer",
        gap: "16px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          background: `linear-gradient(135deg, ${colorPair[0]} 0%, ${colorPair[1]} 100%)`,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "15px",
          flexShrink: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Name + Email */}
      <div style={{ flex: "0 0 220px", minWidth: 0 }}>
        <div
          style={{
            color: "#f1f5f9",
            fontWeight: "600",
            fontSize: "13.5px",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
          }}
        >
          {user.name}
        </div>
        <div
          style={{
            color: "#64748b",
            fontSize: "12px",
            marginTop: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "0.005em",
          }}
        >
          {user.email}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Badges */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Role Badge */}
        <span
          style={{
            padding: "4px 10px",
            backgroundColor: roleConfig.bg,
            color: roleConfig.text,
            borderRadius: "6px",
            fontSize: "11.5px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          {user.role}
        </span>

        {/* Status Badge */}
        <span
          style={{
            padding: "4px 10px",
            backgroundColor: statusConfig.bg,
            color: statusConfig.text,
            borderRadius: "6px",
            fontSize: "11.5px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            border: `1px solid ${statusConfig.border}`,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            letterSpacing: "0.01em",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: statusConfig.dot,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          {user.status}
        </span>
      </div>

      {/* Settings Button */}
      <div
        style={{ marginLeft: "8px", flexShrink: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="sm"
          variant="primary"
          onClick={() => onSettings(user)}
          title="User settings"
          style={{
            padding: "7px 13px",
            fontSize: "12px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            borderRadius: "8px",
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            color: "#a5b4fc",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            transition: "all 0.15s ease",
            letterSpacing: "0.01em",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.28)";
            e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
            e.currentTarget.style.color = "#c7d2fe";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(99, 102, 241, 0.15)";
            e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.25)";
            e.currentTarget.style.color = "#a5b4fc";
          }}
        >
          <Settings size={14} strokeWidth={2} />
          Settings
        </Button>
      </div>
    </li>
  );
}
