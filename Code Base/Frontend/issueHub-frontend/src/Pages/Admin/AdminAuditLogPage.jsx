import { useState, useMemo } from "react";
import {
  Users as UsersIcon,
  FolderKanban,
  Shield,
  Settings,
  Search,
} from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { ADMIN_NAV_ITEMS } from "./adminConstants.js";
import { getAuditLog } from "../../data/auditLog.js";
import { formatTimeAgo, formatDateTime } from "../../utils/formatTime.js";
import "../../App.css";
import "./admin.css";

const CATEGORIES = ["All", "User Management", "Project Management", "Security", "System"];

function catKey(category) {
  if (!category) return "system";
  const c = category.toLowerCase();
  if (c.includes("user")) return "user";
  if (c.includes("project")) return "project";
  if (c.includes("security")) return "security";
  return "system";
}

function CatIcon({ category }) {
  const ck = catKey(category);
  const size = 15;
  if (ck === "user") return <UsersIcon size={size} />;
  if (ck === "project") return <FolderKanban size={size} />;
  if (ck === "security") return <Shield size={size} />;
  return <Settings size={size} />;
}

export default function AdminAuditLogPage() {
  const allEvents = useMemo(() => getAuditLog(), []);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allEvents.filter((e) => {
      const matchCat = categoryFilter === "All" || e.category === categoryFilter;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        e.description.toLowerCase().includes(q) ||
        e.performedBy.toLowerCase().includes(q) ||
        (e.target && e.target.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allEvents, categoryFilter, search]);

  const counts = useMemo(() => {
    const c = { All: allEvents.length };
    CATEGORIES.slice(1).forEach((cat) => {
      c[cat] = allEvents.filter((e) => e.category === cat).length;
    });
    return c;
  }, [allEvents]);

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Admin Panel"
        navItems={ADMIN_NAV_ITEMS}
        enableNavigation={true}
        activeKey="audit"
      />

      <main className="preview-main">
        {/* Header */}
        <section className="preview-hero card">
          <p className="eyebrow">System Administrator</p>
          <h1 style={{ marginTop: 10, marginBottom: 12 }}>Audit Log</h1>
          <p className="lead">
            Immutable record of all system actions — user management, project
            changes, security events, and configuration updates.
          </p>

          {/* Search */}
          <div className="preview-actions" style={{ marginTop: 16 }}>
            <div style={{ position: "relative", maxWidth: 360 }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#64748b",
                  pointerEvents: "none",
                }}
              />
              <input
                className="form-input"
                placeholder="Search events, users, targets…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="admin-filter-bar" style={{ marginTop: 14 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`admin-filter-chip${categoryFilter === cat ? " chip-active" : ""}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
                <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Log list */}
        <section className="card" style={{ maxWidth: 920, padding: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8" }}>
              {filtered.length} {filtered.length === 1 ? "event" : "events"}
              {categoryFilter !== "All" && ` in ${categoryFilter}`}
            </span>
            <span style={{ fontSize: 12, color: "#475569" }}>
              All times in local timezone
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
              No events match the current filter.
            </div>
          ) : (
            <ul className="admin-audit-list">
              {filtered.map((event) => {
                const ck = catKey(event.category);
                return (
                  <li key={event.id} className="admin-audit-item">
                    {/* Icon */}
                    <div className={`audit-icon-wrap cat-${ck}`}>
                      <CatIcon category={event.category} />
                    </div>

                    {/* Body */}
                    <div className="audit-body">
                      <p className="audit-desc">{event.description}</p>
                      <div className="audit-meta">
                        <span className="audit-performer">
                          By: <strong style={{ color: "#cbd5e1" }}>{event.performedBy}</strong>
                        </span>
                        {event.target && (
                          <span className="audit-target">Target: {event.target}</span>
                        )}
                        <span className={`admin-cat-badge cat-${ck}`}>{event.category}</span>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="audit-timestamp">
                      {formatTimeAgo(event.timestamp)}
                      <span className="audit-timestamp-abs">
                        {formatDateTime(event.timestamp)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
