// src/Pages/dev/FilteredIssues.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MOCK_ISSUES,
  STATUS_SLUG,
  STATUS_TO_SLUG,
  isOverdue,
} from "../../data/mockIssues";
import {
  DevShell,
  PageHeader,
  FilterButton,
  PriorityTag,
  StatusTag,
  C,
} from "../../Components/dev/DevUI";

const FILTERS = [
  "All",
  "Open",
  "In Progress",
  "Review",
  "Completed",
  "Blocked",
];

export default function FilteredIssuesPage() {
  // :status slug comes from the URL, e.g. "in-progress"
  const { status: statusSlug } = useParams();

  // "in-progress" → "In Progress"
  const activeFilter = STATUS_SLUG[statusSlug] || "All";

  const shown =
    activeFilter === "All"
      ? MOCK_ISSUES
      : MOCK_ISSUES.filter((i) => i.status === activeFilter);

  return (
    <DevShell>
      <PageHeader
        title="My Assigned Issues"
        subtitle={`${shown.length} issue${shown.length !== 1 ? "s" : ""} · filtered by `}
      />
      {/* Filter indicator */}
      <div style={{ marginBottom: 20, color: C.muted, fontSize: 13 }}>
        Showing{" "}
        <span style={{ color: C.accent, fontWeight: 600 }}>{activeFilter}</span>
      </div>

      {/* Filter bar — active button matches current URL slug */}
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
        <div style={{ flex: 1 }}>
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
            <span
              style={{ fontSize: 12, color: overdue ? "#ef4444" : C.muted }}
            >
              {overdue ? "⚠ Overdue · " : "Due: "}
              {issue.deadline}
            </span>
          </div>
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c8cf8,#a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
            fontFamily: "'DM Mono',monospace",
          }}
        >
          AR
        </div>
      </div>
    </div>
  );
}
