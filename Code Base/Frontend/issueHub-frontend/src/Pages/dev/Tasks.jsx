import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDevIssues, isOverdue } from "../../data/mockIssues";
import { getSession } from "../../data/users.js";
import { getDevTasksApi, isBackendUser } from "../../api/index.js";
import {
  DevShell,
  PageHeader,
  PriorityTag,
  StatusTag,
  C,
} from "../../Components/dev/DevUI";
import Button from "../../Components/Button/button";

export default function DevTasksPage() {
  const navigate = useNavigate();
  const session = getSession();
  const backendUser = isBackendUser(session);
  const [sort, setSort] = useState("deadline");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (backendUser) {
          const data = await getDevTasksApi(session.backendId);
          if (!cancelled) setIssues(data);
        } else {
          if (!cancelled) setIssues(getDevIssues(session?.id));
        }
      } catch {
        if (!cancelled) setIssues(getDevIssues(session?.id));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const sorted = [...issues].sort((a, b) => {
    if (sort === "deadline") {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline.localeCompare(b.deadline);
    }
    const po = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return (po[a.priority] ?? 4) - (po[b.priority] ?? 4);
  });

  const total = issues.length;
  const completed = issues.filter((i) => i.status === "Done").length;
  const overdueCt = issues.filter((i) => isOverdue(i)).length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;

  if (loading) {
    return (
      <DevShell>
        <div style={{ color: C.muted, fontSize: 14, padding: "40px 0", textAlign: "center" }}>
          Loading tasks…
        </div>
      </DevShell>
    );
  }

  return (
    <DevShell>
      <PageHeader
        title="My Tasks"
        subtitle={`Personal task tracker — sorted by ${sort}`}
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total", val: total, color: "#7c8cf8" },
          { label: "In Progress", val: inProgress, color: "#f59e0b" },
          { label: "Done", val: completed, color: "#22c55e" },
          { label: "Overdue", val: overdueCt, color: "#ef4444" },
        ].map(({ label, val, color }) => (
          <div
            key={label}
            style={{
              background: C.surface,
              border: `1px solid ${color}33`,
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div
              style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}
            >
              {val}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Sort controls */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 13, color: C.muted }}>Sort by:</span>
        <Button
          variant={sort === "deadline" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setSort("deadline")}
        >
          Deadline
        </Button>
        <Button
          variant={sort === "priority" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setSort("priority")}
        >
          Priority
        </Button>
      </div>

      {sorted.length === 0 && (
        <div
          style={{
            color: C.subtle,
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          No tasks found.
        </div>
      )}

      {/* Task rows */}
      {sorted.map((issue) => {
        const done = issue.status === "Done";
        const od = isOverdue(issue);
        return (
          <div
            key={issue.id}
            onClick={() => navigate(`/dev/issues/${issue.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 16px",
              background: C.surface,
              border: "1px solid",
              borderColor: od ? "#ef444422" : done ? "#22c55e22" : C.border,
              borderRadius: 10,
              marginBottom: 8,
              cursor: "pointer",
              transition: "border-color .15s",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                flexShrink: 0,
                border: `2px solid ${done ? "#22c55e" : od ? "#ef4444" : C.accent}`,
                background: done ? "#22c55e" : "transparent",
              }}
            />
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              {issue.issueCode && (
                <div style={{ fontSize: 11, color: C.muted, fontFamily: "'DM Mono',monospace", marginBottom: 2 }}>
                  {issue.issueCode}
                </div>
              )}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: done ? C.subtle : C.textHi,
                  textDecoration: done ? "line-through" : "none",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {issue.title}
              </div>
            </div>
            <PriorityTag priority={issue.priority} />
            <StatusTag status={issue.status} />
            {issue.deadline && (
              <span
                style={{
                  fontSize: 12,
                  color: od && !done ? "#ef4444" : C.muted,
                  flexShrink: 0,
                }}
              >
                {od && !done ? "⚠ " : ""}
                {issue.deadline}
              </span>
            )}
          </div>
        );
      })}
    </DevShell>
  );
}
