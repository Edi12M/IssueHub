import { useState, useMemo, useEffect } from "react";
import { X, Users as UsersIcon, AlertCircle, Calendar } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import StatusBadge from "../../Components/StatusBadge/StatusBadge.jsx";
import { ADMIN_NAV_ITEMS } from "./adminConstants.js";
import { getProjectsApi, archiveProjectApi, updateProjectStatusApi } from "../../api/index.js";
import { formatDate } from "../../utils/formatTime.js";
import "../../App.css";
import "./admin.css";

const STATUS_FILTERS = ["All", "Active", "Archived", "Closed"];

function ProjectDetailModal({ project, onClose, onStatusChange }) {
  const budgetPct = project.budget > 0
    ? Math.min(100, Math.round((project.spent / project.budget) * 100))
    : 0;
  const [newStatus, setNewStatus] = useState(project.status);
  const [saving, setSaving] = useState(false);

  function handleSave() {
    if (newStatus === project.status) { onClose(); return; }
    setSaving(true);
    setTimeout(() => {
      onStatusChange(project.id, project.backendId, newStatus);
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-container modal-md" style={{ position: "fixed" }}>
        <div
          className="modal-header"
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <div>
            <h3 className="modal-title">{project.name}</h3>
            <p className="modal-description" style={{ marginTop: 4 }}>{project.description}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "0 24px 0" }}>
          <div className="project-detail-grid">
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Status</span>
              <div style={{ marginTop: 4 }}><StatusBadge status={project.status} /></div>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Manager</span>
              <span className="project-detail-cell-value">{project.manager}</span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Team Size</span>
              <span className="project-detail-cell-value">{project.membersCount} members</span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Deadline</span>
              <span className="project-detail-cell-value">{formatDate(project.deadline)}</span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Open Issues</span>
              <span
                className="project-detail-cell-value"
                style={{ color: project.openIssues > 0 ? "#f59e0b" : "#34d399" }}
              >
                {project.openIssues}
              </span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Completed Issues</span>
              <span className="project-detail-cell-value" style={{ color: "#34d399" }}>
                {project.completedIssues}
              </span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Created</span>
              <span className="project-detail-cell-value">{formatDate(project.createdAt)}</span>
            </div>
            <div className="project-detail-cell">
              <span className="project-detail-cell-label">Tags</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
                {(project.tags ?? []).map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      padding: "2px 7px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      color: "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="project-detail-cell-label">Budget Used</span>
              <span style={{ fontSize: 12.5, color: "#cbd5e1", fontWeight: 600 }}>
                {project.budget > 0
                  ? `$${project.spent.toLocaleString()} / $${project.budget.toLocaleString()} (${budgetPct}%)`
                  : "—"}
              </span>
            </div>
            {project.budget > 0 && (
              <div className="project-budget-bar-wrap">
                <div
                  className="project-budget-bar"
                  style={{
                    width: `${budgetPct}%`,
                    background: budgetPct > 90 ? "#f87171" : "linear-gradient(90deg,#ff7aa2,#ffb86b)",
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <label className="form-section-heading" style={{ display: "block", marginBottom: 8 }}>
              Change Status
            </label>
            <select
              className="form-select-base"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-button-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-button-primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const fetched = await getProjectsApi();
      setProjects(fetched);
      setApiError(false);
    } catch {
      setApiError(true);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, backendId, newStatus) {
    if (!backendId) { alert("Cannot update: project has no backend ID."); return; }
    try {
      if (newStatus === "Archived") {
        await archiveProjectApi(backendId);
      } else {
        await updateProjectStatusApi(backendId, newStatus);
      }
      await loadProjects();
    } catch (e) {
      alert(e.message || "Failed to update project status");
    }
  }

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = filter === "All" || p.status === filter;
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.manager ?? "").toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [projects, filter, search]);

  const counts = useMemo(
    () => ({
      All: projects.length,
      Active: projects.filter((p) => p.status === "Active").length,
      Archived: projects.filter((p) => p.status === "Archived").length,
      Closed: projects.filter((p) => p.status === "Closed").length,
    }),
    [projects]
  );

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Admin Panel"
        navItems={ADMIN_NAV_ITEMS}
        enableNavigation={true}
        activeKey="projects"
      />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">System Overview</p>
          <h1 style={{ marginTop: 10, marginBottom: 12 }}>Projects</h1>
          <p className="lead">
            View and manage all projects across the platform.
          </p>

          {apiError && (
            <div
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                color: "#fbbf24",
                marginBottom: 12,
              }}
            >
              Could not reach the server — showing cached data.
            </div>
          )}

          <div className="preview-actions" style={{ marginTop: 16 }}>
            <input
              className="form-input search-input"
              placeholder="Search by name or manager…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 320 }}
            />
          </div>
          <div className="admin-filter-bar" style={{ marginTop: 14 }}>
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                className={`admin-filter-chip${filter === s ? " chip-active" : ""}`}
                onClick={() => setFilter(s)}
              >
                {s}
                <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="card" style={{ maxWidth: 920, padding: 0, overflow: "hidden" }}>
          <div className="admin-table-header">
            <span className="admin-th">Project</span>
            <span className="admin-th admin-th-manager">Manager</span>
            <span className="admin-th admin-th-members">Members</span>
            <span className="admin-th admin-th-issues">Issues</span>
            <span className="admin-th admin-th-deadline">Deadline</span>
          </div>

          {loading ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
              Loading projects…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
              No projects match the current filter.
            </div>
          ) : (
            <ul className="admin-project-list">
              {filtered.map((p) => (
                <li key={p.id} className="admin-project-row" onClick={() => setSelected(p)}>
                  <div className="admin-col-name admin-project-name">
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span className="admin-project-title">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <span className="admin-project-desc">{p.description}</span>
                  </div>
                  <span className="admin-col-manager">{p.manager}</span>
                  <div className="admin-col-members">
                    <UsersIcon size={13} color="#64748b" />
                    <span>{p.membersCount}</span>
                  </div>
                  <div
                    className="admin-col-issues"
                    style={{ color: p.openIssues > 0 ? "#f59e0b" : "#34d399" }}
                  >
                    <AlertCircle size={13} color={p.openIssues > 0 ? "#f59e0b" : "#34d399"} />
                    <span style={{ fontSize: 13 }}>{p.openIssues}</span>
                  </div>
                  <div className="admin-col-deadline">
                    <Calendar size={13} color="#64748b" />
                    <span style={{ fontSize: 12.5, color: "#94a3b8" }}>
                      {formatDate(p.deadline)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {selected && (
        <ProjectDetailModal
          project={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
