import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDevIssues,
  STATUS_SLUG,
  STATUS_TO_SLUG,
  isOverdue,
} from "../../data/mockIssues";
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

export default function FilteredIssuesPage() {
  const { status: statusSlug } = useParams();
  const activeFilter = STATUS_SLUG[statusSlug] || "All";

  const session = getSession();
  const issues = getDevIssues(session?.id);
  const shown =
    activeFilter === "All"
      ? issues
      : issues.filter((i) => i.status === activeFilter);

  return (
    <DevShell>
      <PageHeader
        title="My Assigned Issues"
        subtitle={`${shown.length} issue${shown.length !== 1 ? "s" : ""} · filtered by status`}
      />

      <div style={{ marginBottom: 20, color: C.muted, fontSize: 13 }}>
        Showing{" "}
        <span style={{ color: C.accent, fontWeight: 600 }}>{activeFilter}</span>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}
      >
        {FILTERS.map((f) => {
          const to =
            f === "All"
              ? "/dev/assigned-issues"
              : `/dev/assigned-issues/${STATUS_TO_SLUG[f]}`;
          return (
            <FilterButton
              key={f}
              label={f}
              active={f === activeFilter}
              to={to}
            />
          );
        })}
      </div>

      {shown.length === 0 && (
        <div
          style={{
            color: C.subtle,
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          No issues with status <strong>{activeFilter}</strong>.
        </div>
      )}

      {shown.map((issue) => (
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
