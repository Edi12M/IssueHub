export default function WorkloadCard({ user, availableHours, allocatedHours }) {
  const remaining = Math.max(0, availableHours - allocatedHours);
  const pct =
    availableHours > 0
      ? Math.round((allocatedHours / availableHours) * 100)
      : 0;
  const barColor = pct >= 100 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#22c55e";

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 12,
        background: "rgba(255,255,255,0.02)",
        borderRadius: 10,
      }}
    >
      <div style={{ width: 56, textAlign: "center" }}>
        <div style={{ fontWeight: 700 }}>
          {user.name.split(" ")[0][0]}
          {(user.name.split(" ")[1] || "")[0]}
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>{user.role}</div>
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            {allocatedHours}h / {availableHours}h
          </div>
        </div>

        <div
          style={{
            height: 12,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min(100, Math.max(0, pct))}%`,
              height: "100%",
              background: barColor,
            }}
          />
        </div>

        <div style={{ marginTop: 6, fontSize: 12, color: "#94a3b8" }}>
          Remaining: {remaining}h
        </div>
      </div>
    </div>
  );
}
