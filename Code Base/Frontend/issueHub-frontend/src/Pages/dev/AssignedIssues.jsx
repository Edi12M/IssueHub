import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDevIssues, STATUS_TO_SLUG, isOverdue } from "../../data/mockIssues";
import { getSession } from "../../data/users.js";
import {
  DevShell,
  PageHeader,
  FilterButton,
  PriorityTag,
  StatusTag,
  C,
} from "../../Components/dev/DevUI";

const FILTERS = ["All", "Backlog", "To Do", "In Progress", "In Review", "Done"];

export default function AssignedIssuesPage() {
  const session = getSession();
  const issues = getDevIssues(session?.id);

  return (
    <DevShell>
      <PageHeader
        title="My Assigned Issues"
        subtitle={`${issues.length} issue${issues.length !== 1 ? "s" : ""} assigned to you`}
      />

      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        {FILTERS.map((f) => {
          const to =
            f === "All"
              ? "/dev/assigned-issues"
              : `/dev/assigned-issues/${STATUS_TO_SLUG[f]}`;
          return (
            <FilterButton key={f} label={f} active={f === "All"} to={to} />
          );
        })}
      </div>

      {issues.length === 0 && (
        <div
          style={{
            color: C.subtle,
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          No issues assigned to you yet.
        </div>
      )}

      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </DevShell>
  );
}

function IssueCard({ issue }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const overdue = isOverdue(issue);

  return (
    <div
      onClick={() => navigate(`/dev/issues/${issue.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: "1px solid",
        borderColor: hovered ? C.accent : C.border,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
        cursor: "pointer",
        transition: "border-color .15s, transform .1s",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 11,
              color: C.muted,
              marginBottom: 4,
            }}
          >
            {issue.id} · {issue.project}
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.textHi,
              marginBottom: 8,
            }}
          >
            {issue.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <PriorityTag priority={issue.priority} />
            <StatusTag status={issue.status} />
            {issue.deadline && (
              <span
                style={{ fontSize: 12, color: overdue ? "#ef4444" : C.muted }}
              >
                {overdue ? "⚠ Overdue · " : "Due: "}
                {issue.deadline}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
