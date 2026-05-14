import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_ISSUES, isOverdue } from "../../data/mockIssues";
import {
  DevShell,
  PageHeader,
  PriorityTag,
  StatusTag,
  C,
} from "../../Components/dev/DevUI";
import Button from "../../Components/Button/button";

export default function TasksPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("deadline");

  const sorted = [...MOCK_ISSUES].sort((a, b) => {
    if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
    const po = { High: 0, Medium: 1, Low: 2 };
    return po[a.priority] - po[b.priority];
  });

  const total = MOCK_ISSUES.length;
  const completed = MOCK_ISSUES.filter((i) => i.status === "Completed").length;
  const overdueCt = MOCK_ISSUES.filter((i) => isOverdue(i)).length;
  const inProgress = MOCK_ISSUES.filter(
    (i) => i.status === "In Progress",
  ).length;

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
          { label: "Completed", val: completed, color: "#22c55e" },
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

      {/* Sort controls — Button component */}
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

      {/* Task rows */}
      {sorted.map((issue) => {
        const done = issue.status === "Completed";
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
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                flex: 1,
                color: done ? C.subtle : C.textHi,
                textDecoration: done ? "line-through" : "none",
              }}
            >
              {issue.title}
            </div>
            <PriorityTag priority={issue.priority} />
            <StatusTag status={issue.status} />
            <span
              style={{ fontSize: 12, color: od && !done ? "#ef4444" : C.muted }}
            >
              {od && !done ? "⚠ " : ""}
              {issue.deadline}
            </span>
          </div>
        );
      })}
    </DevShell>
  );
}
