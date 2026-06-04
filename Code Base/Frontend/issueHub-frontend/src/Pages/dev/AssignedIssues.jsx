import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STATUS_TO_SLUG, isOverdue } from "../../data/mockIssues";
import { useDevIssues } from "../../context/DevIssuesContext.jsx";
import {
  DevShell,
  PageHeader,
  FilterButton,
  PriorityTag,
  StatusTag,
  C,
} from "../../Components/dev/DevUI";
import { SearchBar } from "../../Components/dev/SearchBar";
import {
  FilterPanel,
  AVAILABLE_LABELS,
} from "../../Components/dev/FilterPanel";

const FILTERS = ["All", "Backlog", "To Do", "In Progress", "In Review", "Done"];

function applySearchAndFilters(issues, searchQuery, filters) {
  return issues.filter((issue) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      issue.id.toLowerCase().includes(query) ||
      issue.title.toLowerCase().includes(query) ||
      issue.description?.toLowerCase().includes(query) ||
      issue.project.toLowerCase().includes(query) ||
      issue.priority.toLowerCase().includes(query) ||
      issue.status.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (filters.labels.length > 0) {
      const matchesAllLabels = filters.labels.every((labelId) =>
        issue.labels?.includes(labelId),
      );
      if (!matchesAllLabels) return false;
    }

    const createdDate = issue.createdAt;
    if (filters.dateRange.from && createdDate < filters.dateRange.from) {
      return false;
    }
    if (filters.dateRange.to && createdDate > filters.dateRange.to) {
      return false;
    }

    return true;
  });
}

export default function AssignedIssuesPage() {
  const { issues, loading } = useDevIssues();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ labels: [], dateRange: {} });

  const filteredIssues = applySearchAndFilters(issues, searchQuery, filters);

  const hasActiveFilters =
    searchQuery ||
    filters.labels.length > 0 ||
    filters.dateRange.from ||
    filters.dateRange.to;

  return (
    <DevShell>
      <PageHeader
        title="My Assigned Issues"
        subtitle={
          loading
            ? "Loading…"
            : `${filteredIssues.length} of ${issues.length} issue${
                issues.length !== 1 ? "s" : ""
              } ${hasActiveFilters ? "matching" : "assigned to you"}`
        }
      />

      <SearchBar
        placeholder="Search issues by title, ID, priority..."
        value={searchQuery}
        onSearch={setSearchQuery}
      />

      <FilterPanel
        onFilterChange={setFilters}
        selectedLabels={filters.labels}
        dateRange={filters.dateRange}
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
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

      {loading && (
        <div
          style={{
            color: C.muted,
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          Loading issues…
        </div>
      )}

      {!loading && filteredIssues.length === 0 && issues.length > 0 && (
        <div
          style={{
            color: C.subtle,
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          No issues match your search or filters.
        </div>
      )}

      {!loading && issues.length === 0 && (
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

      {!loading &&
        filteredIssues.map((issue) => (
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
            {issue.issueCode ?? issue.id} · {issue.project}
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
            {issue.labels && issue.labels.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {issue.labels.map((labelId) => {
                  const labelMeta = AVAILABLE_LABELS.find(
                    (l) => l.id === labelId,
                  );
                  if (!labelMeta) return null;
                  return (
                    <span
                      key={labelId}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        background: labelMeta.bg,
                        color: labelMeta.color,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {labelMeta.label}
                    </span>
                  );
                })}
              </div>
            )}
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
