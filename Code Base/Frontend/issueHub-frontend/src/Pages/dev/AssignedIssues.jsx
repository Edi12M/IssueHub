// src/Pages/dev/AssignedIssues.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_ISSUES, STATUS_TO_SLUG, isOverdue } from "../../data/mockIssues";
import { DevShell, FilterButton, PriorityTag, StatusTag, C } from "../../Components/dev/DevUI";

const FILTERS = ["All", "Open", "In Progress", "Review", "Completed", "Blocked"];

export default function AssignedIssuesPage() {
  return (
    <DevShell>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:4, color:C.textHi }}>
        My Assigned Issues
      </div>
      <div style={{ fontSize:13, color:C.muted, marginBottom:24 }}>
        {MOCK_ISSUES.length} issues assigned to you
      </div>

      {/* Filter bar — each button navigates to its own URL */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        {FILTERS.map((f) => {
          const to = f === "All"
            ? "/dev/assigned-issues"
            : `/dev/assigned-issues/${STATUS_TO_SLUG[f]}`;
          return <FilterButton key={f} label={f} active={f === "All"} to={to} />;
        })}
      </div>

      {MOCK_ISSUES.map((issue) => (
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
      style={{ background:C.surface, border:"1px solid",
        borderColor: hovered ? C.accent : C.border,
        borderRadius:12, padding:"20px 24px", marginBottom:16,
        cursor:"pointer", transition:"border-color .15s, transform .1s",
        transform: hovered ? "translateY(-1px)" : "none" }}
    >
      <div style={{ display:"flex", alignItems:"flex-start",
        justifyContent:"space-between", gap:16 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11,
            color:C.muted, marginBottom:4 }}>
            {issue.id} · {issue.project}
          </div>
          <div style={{ fontSize:15, fontWeight:600, color:C.textHi, marginBottom:8 }}>
            {issue.title}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <PriorityTag priority={issue.priority} />
            <StatusTag status={issue.status} />
            <span style={{ fontSize:12, color: overdue ? "#ef4444" : C.muted }}>
              {overdue ? "⚠ Overdue · " : "Due: "}{issue.deadline}
            </span>
          </div>
        </div>
        <div style={{ width:28, height:28, borderRadius:"50%",
          background:"linear-gradient(135deg,#7c8cf8,#a78bfa)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:11, fontWeight:700, color:"#fff", flexShrink:0,
          fontFamily:"'DM Mono',monospace" }}>
          AR
        </div>
      </div>
    </div>
  );
}