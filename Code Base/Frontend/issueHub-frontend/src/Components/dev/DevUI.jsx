// src/Components/dev/DevUI.jsx
import { PRIORITY_META, STATUS_META } from "../../data/mockIssues";
import Sidebar from "../dev-ui/sideBar";
import Button from "../Button/button";

/* ── Design tokens ──────────────────────────── */
export const C = {
  bg:      "#0f1117",
  surface: "#161b27",
  border:  "#1e2535",
  accent:  "#7c8cf8",
  accent2: "#a78bfa",
  muted:   "#64748b",
  subtle:  "#475569",
  text:    "#e2e8f0",
  textHi:  "#f1f5f9",
};

/* ── Priority tag ───────────────────────────── */
export function PriorityTag({ priority }) {
  const m = PRIORITY_META[priority] || PRIORITY_META.Low;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5,
      background:m.bg, color:m.color, fontSize:11, fontWeight:600,
      padding:"3px 9px", borderRadius:99 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:m.dot }} />
      {priority}
    </span>
  );
}

/* ── Status tag ─────────────────────────────── */
export function StatusTag({ status }) {
  const m = STATUS_META[status] || { color:"#94a3b8", bg:"#1e2535" };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5,
      background:m.bg, color:m.color, fontSize:11, fontWeight:600,
      padding:"3px 9px", borderRadius:99 }}>
      {status}
    </span>
  );
}

/* ── Avatar ─────────────────────────────────── */
export function Avatar({ initials, size = 28 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:"linear-gradient(135deg,#7c8cf8,#a78bfa)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size * 0.38, fontWeight:700, color:"#fff",
      fontFamily:"'DM Mono', monospace", flexShrink:0,
    }}>
      {initials}
    </div>
  );
}

/* ── Dev shell ──────────────────────────────── */
// Wraps every developer page with the top bar + your real Sidebar.
// navItems="dev" → Assigned Issues & My Tasks with /dev/... routes.
// Active item is auto-detected from the URL inside Sidebar via useLocation.
export function DevShell({ children }) {
  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif",
      background:C.bg, minHeight:"100vh", color:C.text,
      display:"flex", flexDirection:"column" }}>

      {/* Top bar */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`,
        padding:"0 28px", display:"flex", alignItems:"center",
        justifyContent:"space-between", height:58,
        position:"sticky", top:0, zIndex:100 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:700,
          fontSize:18, color:C.accent, letterSpacing:-0.5 }}>
          Issue<span style={{ color:C.text }}>Hub</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10,
          background:"#1e2535", borderRadius:99,
          padding:"5px 14px 5px 8px", fontSize:13 }}>
          <Avatar initials="AR" />
          <span>Alex Rivera</span>
          <span style={{ color:C.muted }}>· Developer</span>
        </div>
      </div>

      <div style={{ display:"flex", flex:1 }}>
        <Sidebar
          brandName="IssueHub"
          brandSub="Developer Portal"
          navItems="dev"
        />
        <div style={{ flex:1, padding:"28px 32px", overflowY:"auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Back link ──────────────────────────────── */
export function BackLink({ to, label = "Back" }) {
  return (
    <Button variant="ghost" size="sm" to={to} style={{ marginBottom:20 }}>
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
    <div style={{ fontSize:11, fontWeight:700, color:C.muted,
      letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
      {children}
    </div>
  );
}

/* ── Card ───────────────────────────────────── */
export function Card({ children, style }) {
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`,
      borderRadius:12, padding:"24px", marginBottom:16, ...style }}>
      {children}
    </div>
  );
}

/* ── Tiny inline text button (Edit / Delete) ── */
export function TinyBtn({ danger, children, onClick }) {
  return (
    <button onClick={onClick}
      style={{ fontSize:11, color: danger ? "#ef4444" : C.muted,
        background:"none", border:"none", cursor:"pointer",
        padding:0, fontWeight:600 }}>
      {children}
    </button>
  );
}