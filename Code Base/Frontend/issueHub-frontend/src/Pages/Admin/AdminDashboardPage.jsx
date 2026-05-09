import { useMemo } from "react";
import {
  Users as UsersIcon,
  FolderKanban,
  AlertCircle,
  CheckCircle,
  UserCheck,
  Shield,
  Layers,
} from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import StatCard from "../../Components/StatCard/StatCard.jsx";
import Button from "../../Components/Button/button.jsx";
import { ADMIN_NAV_ITEMS } from "./adminConstants.js";
import { getAuditLog } from "../../data/auditLog.js";
import { getProjects } from "../../data/projects.js";
import { formatTimeAgo, formatDate } from "../../utils/formatTime.js";
import "../../App.css";
import "./admin.css";

const ROLE_DIST = [
  { key: "admin", label: "System Admin", count: 2, total: 24, color: "#6366f1", barColor: "#6366f1" },
  { key: "pm", label: "Project Manager", count: 5, total: 24, color: "#f9a8d4", barColor: "#ec4899" },
  { key: "dev", label: "Developer", count: 17, total: 24, color: "#7dd3fc", barColor: "#38bdf8" },
];

function catKey(category) {
  if (!category) return "system";
  const c = category.toLowerCase();
  if (c.includes("user")) return "user";
  if (c.includes("project")) return "project";
  if (c.includes("security")) return "security";
  return "system";
}

export function AdminDashboardPage() {
  const projects = useMemo(() => getProjects(), []);
  const recentEvents = useMemo(() => getAuditLog().slice(0, 8), []);

  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const archivedProjects = projects.filter((p) => p.status === "Archived").length;
  const closedProjects = projects.filter((p) => p.status === "Closed").length;
  const openIssues = projects.reduce((sum, p) => sum + p.openIssues, 0);

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Admin Panel"
        navItems={ADMIN_NAV_ITEMS}
        enableNavigation={true}
        activeKey="dashboard"
      />

      <main className="preview-main">
        {/* Page header */}
        <section className="preview-hero card">
          <p className="eyebrow">System Administrator</p>
          <h1 style={{ marginTop: 10, marginBottom: 12 }}>Dashboard</h1>
          <p className="lead">
            Monitor and manage the IssueHub platform from one place. Review system
            activity, manage users, and track project health.
          </p>
          <div className="preview-actions">
            <Button to="/admin/users" variant="primary" size="sm">
              Add User
            </Button>
            <Button to="/admin/projects" variant="secondary" size="sm">
              View Projects
            </Button>
            <Button to="/admin/audit" variant="secondary" size="sm">
              Audit Log
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="admin-stats-grid">
          <StatCard
            icon={UsersIcon}
            label="Total Users"
            value="24"
            sub="18 active · 4 deactivated · 2 pending"
            color="#6366f1"
          />
          <StatCard
            icon={FolderKanban}
            label="Active Projects"
            value={String(activeProjects)}
            sub={`${archivedProjects} archived · ${closedProjects} closed`}
            color="#ff7aa2"
          />
          <StatCard
            icon={AlertCircle}
            label="Open Issues"
            value={String(openIssues)}
            sub="Across all active projects"
            color="#f59e0b"
          />
          <StatCard
            icon={CheckCircle}
            label="System Health"
            value="99.8%"
            sub="Uptime this month"
            color="#34d399"
          />
        </section>

        {/* Activity + Role distribution */}
        <section className="admin-lower-grid">
          {/* Recent Activity */}
          <div className="card admin-activity">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>Recent Activity</h2>
              <Button to="/admin/audit" variant="ghost" size="sm">
                View all
              </Button>
            </div>

            <ul className="admin-activity-list">
              {recentEvents.map((event) => {
                const ck = catKey(event.category);
                return (
                  <li key={event.id} className="admin-activity-item">
                    <span className={`admin-event-dot cat-${ck}`} />
                    <div className="admin-activity-body">
                      <span className="admin-activity-desc">{event.description}</span>
                      <span className="admin-activity-meta">
                        {event.performedBy} · {formatTimeAgo(event.timestamp)}
                      </span>
                    </div>
                    <span className={`admin-cat-badge cat-${ck}`}>{event.category}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Role distribution */}
          <div className="card" style={{ alignSelf: "start" }}>
            <h2 style={{ margin: 0 }}>User Roles</h2>
            <p style={{ fontSize: 12.5, color: "#64748b", marginTop: 4 }}>
              24 total platform users
            </p>
            <div className="admin-role-list">
              {ROLE_DIST.map((r) => (
                <div key={r.key} className="admin-role-row">
                  <span className={`role-label role-${r.key}`}>{r.label}</span>
                  <div className="role-bar-wrap">
                    <div
                      className="role-bar"
                      style={{
                        width: `${(r.count / r.total) * 100}%`,
                        background: r.barColor,
                      }}
                    />
                  </div>
                  <span className="role-count">{r.count}</span>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                Quick Actions
              </p>
              <Button to="/admin/users" variant="secondary" size="sm" fullWidth>
                <UserCheck size={13} style={{ marginRight: 6 }} />
                Manage Users
              </Button>
              <Button to="/admin/settings" variant="secondary" size="sm" fullWidth>
                <Shield size={13} style={{ marginRight: 6 }} />
                Security Settings
              </Button>
              <Button to="/admin/projects" variant="secondary" size="sm" fullWidth>
                <Layers size={13} style={{ marginRight: 6 }} />
                All Projects
              </Button>
            </div>
          </div>
        </section>

        {/* System summary row */}
        <section
          className="card"
          style={{
            maxWidth: 920,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          {[
            {
              icon: <UsersIcon size={16} color="#a5b4fc" />,
              label: "Last User Created",
              value: "Maya Patel",
              sub: formatDate("2026-05-09T09:42:00Z"),
            },
            {
              icon: <FolderKanban size={16} color="#ff7aa2" />,
              label: "Last Project Created",
              value: "Analytics Dashboard",
              sub: formatDate("2026-05-01T15:00:00Z"),
            },
            {
              icon: <Shield size={16} color="#fbbf24" />,
              label: "Last Security Event",
              value: "Failed Login (3×)",
              sub: formatDate("2026-05-07T08:44:00Z"),
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "18px 22px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                {item.icon}
                <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {item.label}
                </span>
              </div>
              <p style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14, margin: 0 }}>{item.value}</p>
              <p style={{ color: "#64748b", fontSize: 12, margin: "3px 0 0" }}>{item.sub}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
