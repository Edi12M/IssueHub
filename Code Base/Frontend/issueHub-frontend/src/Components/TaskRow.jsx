const PRIORITY_COLOURS = {
  Critical: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#22c55e",
};

const STATUS_COLOURS = {
  Backlog: "#94a3b8",
  "To Do": "#60a5fa",
  "In Progress": "#a78bfa",
  "In Review": "#f59e0b",
  Done: "#22c55e",
};

export default function TaskRow({ task, onClick }) {
  const priorityColor = PRIORITY_COLOURS[task.priority] || "#94a3b8";
  const statusColor = STATUS_COLOURS[task.status] || "#94a3b8";

  return (
    <div
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 100px 100px 120px 110px",
        alignItems: "center",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.15s ease",
        gap: "12px",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
      }
    >
      {/* Task ID */}
      <span
        style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "monospace" }}
      >
        {task.id}
      </span>

      {/* Title */}
      <span style={{ color: "#f8fafc", fontSize: "13.5px", fontWeight: "500" }}>
        {task.title}
      </span>

      {/* Type */}
      <span
        style={{
          color: "#94a3b8",
          fontSize: "12px",
          background: "rgba(255,255,255,0.05)",
          padding: "3px 8px",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {task.type}
      </span>

      {/* Priority */}
      <span
        style={{
          color: priorityColor,
          fontSize: "12px",
          background: `${priorityColor}18`,
          border: `1px solid ${priorityColor}40`,
          padding: "3px 8px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {task.priority}
      </span>

      {/* Due Date */}
      <span style={{ color: "#94a3b8", fontSize: "12px" }}>
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
      </span>

      {/* Status */}
      <span
        style={{
          color: statusColor,
          fontSize: "12px",
          background: `${statusColor}18`,
          border: `1px solid ${statusColor}40`,
          padding: "3px 8px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        {task.status}
      </span>
    </div>
  );
}
