// src/Components/dev/DevUI.jsx
import { PRIORITY_META, STATUS_META } from "../../data/mockIssues";
import { getSession } from "../../data/users.js";
import Sidebar from "../SideBar/sideBar";
import Button from "../Button/button";
import { CheckSquare, ListTodo, Kanban } from "lucide-react";

/* ── Dev nav items ──────────────────────────── */
const DEV_NAV_ITEMS = [
  {
    key: "assigned-issues",
    label: "Assigned Issues",
    icon: CheckSquare,
    to: "/dev/assigned-issues",
  },
  { key: "tasks", label: "My Tasks", icon: ListTodo, to: "/dev/tasks" },
  { key: "kanban", label: "Kanban Board", icon: Kanban, to: "/dev/kanban" },
];

/* ── Design tokens ──────────────────────────── */
// eslint-disable-next-line react-refresh/only-export-components
export const C = {
  bg: "#0f1117",
  surface: "#161b27",
  border: "#1e2535",
  accent: "#7c8cf8",
  accent2: "#a78bfa",
  muted: "#64748b",
  subtle: "#475569",
  text: "#e2e8f0",
  textHi: "#f1f5f9",
};

/* ── Priority tag ───────────────────────────── */
export function PriorityTag({ priority }) {
  const m = PRIORITY_META[priority] || PRIORITY_META.Low;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: m.bg,
        color: m.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 99,
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot }}
      />
      {priority}
    </span>
  );
}

/* ── Status tag ─────────────────────────────── */
export function StatusTag({ status }) {
  const m = STATUS_META[status] || { color: "#94a3b8", bg: "#1e2535" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: m.bg,
        color: m.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 99,
      }}
    >
      {status}
    </span>
  );
}

/* ── Avatar ─────────────────────────────────── */
export function Avatar({ initials, size = 28 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#7c8cf8,#a78bfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "'DM Mono', monospace",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ── Dev shell ──────────────────────────────── */
// Wraps every developer page with sidebar only. Page header is handled per-page.
export function DevShell({ children }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        background: C.bg,
        minHeight: "100vh",
        color: C.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          brandName="IssueHub"
          brandSub="Developer Portal"
          navItems={DEV_NAV_ITEMS}
        />
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Page header with user profile ──────────── */
export function PageHeader({ title, subtitle }) {
  const session = getSession();
  const name = session?.name || "Developer";
  const role = session?.role || "Developer";
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 4,
            color: C.textHi,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 13, color: C.muted }}>{subtitle}</div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 99,
          padding: "8px 16px 8px 8px",
          fontSize: 13,
        }}
      >
        <Avatar initials={initials} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 600, color: C.text }}>{name}</span>
          <span style={{ fontSize: 11, color: C.muted }}>{role}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Back link ──────────────────────────────── */
export function BackLink({ to, label = "Back" }) {
  return (
    <Button variant="ghost" size="sm" to={to} style={{ marginBottom: 20 }}>
      ← {label}
    </Button>
  );
}

/* ── Filter button ──────────────────────────── */
// active=true → primary (pink-orange), active=false → ghost
// Uses Button's `to` prop — React Router Link, no onClick needed
export function FilterButton({ label, active, to }) {
  return (
    <Button variant={active ? "primary" : "ghost"} size="sm" to={to}>
      {label}
    </Button>
  );
}

/* ── Section label ──────────────────────────── */
export function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

/* ── Card ───────────────────────────────────── */
export function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "24px",
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Tiny inline text button (Edit / Delete) ── */
export function TinyBtn({ danger, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 11,
        color: danger ? "#ef4444" : C.muted,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}
