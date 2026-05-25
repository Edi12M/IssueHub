import { useState, useMemo } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  FileText,
  Download,
} from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import Button from "../../Components/Button/button.jsx";
import StatCard from "../../Components/StatCard/StatCard.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getTasks, getOverdueTasks, getAtRiskTasks } from "../../data/tasks.js";
import { getTimeLogs, aggregateHours } from "../../data/timeLogs.js";
import { getUsers } from "../../data/users.js";
import { getBudgetUsage } from "../../data/pmSettings.js";
import "../../App.css";
import "./manager.css";

function generateReportText({ tasks, logs, users, projectId, rangeLabel }) {
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const done = projectTasks.filter((t) => t.status === "Done").length;
  const total = projectTasks.length;
  const hours = aggregateHours(logs, { projectId });
  const lines = [
    `IssueHub Progress Report — ${rangeLabel}`,
    `Project: ${projectId === "p1" ? "Website Redesign" : "Mobile App"}`,
    "",
    `Task completion: ${done}/${total} (${total ? Math.round((done / total) * 100) : 0}%)`,
    `Hours logged: ${hours.total.toFixed(1)}h (${hours.billable.toFixed(1)}h billable)`,
    "",
    "Team activity:",
    ...users
      .filter((u) => u.role === "Developer")
      .map((u) => {
        const h = aggregateHours(logs, { projectId, userId: u.id }).total;
        return `  - ${u.name}: ${h.toFixed(1)}h`;
      }),
    "",
    "Milestones:",
    ...projectTasks.map((t) => `  - [${t.status}] ${t.title} (due ${t.dueDate || "—"})`),
  ];
  return lines.join("\n");
}

export default function AnalyticsPage() {
  const [projectId, setProjectId] = useState("p1");
  const [reportRange, setReportRange] = useState("weekly");
  const [reportPreview, setReportPreview] = useState(null);

  const tasks = useMemo(() => getTasks(), []);
  const logs = useMemo(() => getTimeLogs(), []);
  const users = useMemo(() => getUsers().filter((u) => u.role !== "System Administrator"), []);

  const projectTasks = useMemo(
    () => tasks.filter((t) => t.projectId === projectId),
    [tasks, projectId],
  );

  const doneCount = projectTasks.filter((t) => t.status === "Done").length;
  const completionPct = projectTasks.length
    ? Math.round((doneCount / projectTasks.length) * 100)
    : 0;

  const overdue = useMemo(() => getOverdueTasks(projectTasks), [projectTasks]);
  const atRisk = useMemo(() => getAtRiskTasks(projectTasks), [projectTasks]);

  const projectHours = useMemo(
    () => aggregateHours(logs, { projectId }).total,
    [logs, projectId],
  );
  const budget = useMemo(
    () => getBudgetUsage(projectId, projectHours),
    [projectId, projectHours],
  );

  const upcoming = useMemo(() => {
    const in7 = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    return projectTasks
      .filter((t) => {
        if (!t.dueDate || t.status === "Done") return false;
        const d = new Date(t.dueDate).getTime();
        return d >= now && d <= in7;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [projectTasks]);

  const workloadRows = useMemo(() => {
    return users.map((user) => {
      const assigned = projectTasks.filter(
        (t) => Array.isArray(t.assignees) && t.assignees.includes(user.id),
      );
      const open = assigned.filter((t) => t.status !== "Done").length;
      const pct = Math.min(100, open * 25);
      return { user, open, pct };
    });
  }, [users, projectTasks]);

  function handleGenerateReport() {
    const rangeLabel = reportRange === "weekly" ? "Weekly summary" : "Custom range";
    setReportPreview(generateReportText({ tasks, logs, users, projectId, rangeLabel }));
  }

  function handleDownloadReport() {
    if (!reportPreview) handleGenerateReport();
    const text = reportPreview || generateReportText({
      tasks, logs, users, projectId,
      rangeLabel: reportRange === "weekly" ? "Weekly summary" : "Custom range",
    });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-report-${projectId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="preview-shell">
      <Sidebar brandSub="Manager Dashboard" navItems={MANAGER_NAV_ITEMS} activeKey="analytics" />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">PM_21 · PM_22 · PM_17</p>
          <h1>Project Health & Reports</h1>
          <p className="lead">
            Consolidated health dashboard with completion, workload, budget usage,
            and progress report generation.
          </p>
          <div style={{ marginTop: 14 }}>
            <select className="pm-select" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              <option value="p1">Website Redesign</option>
              <option value="p2">Mobile App</option>
            </select>
          </div>
        </section>

        <div className="pm-stats-grid">
          <StatCard icon={CheckCircle2} label="Completion rate" value={`${completionPct}%`} sub={`${doneCount} of ${projectTasks.length} tasks done`} color="#22c55e" />
          <StatCard icon={Users} label="Team workload" value={`${workloadRows.filter((r) => r.pct >= 75).length}`} sub="members at high load" color="#8b5cf6" />
          <StatCard icon={DollarSign} label="Budget used" value={`${Math.round(budget.pct)}%`} sub={budget.alertLevel ? `Alert: ${budget.alertLevel}%` : "Within limits"} color={budget.pct >= 90 ? "#ef4444" : "#6be4ff"} />
          <StatCard icon={AlertTriangle} label="Overdue" value={overdue.length} sub={`${atRisk.length} at risk`} color="#f97316" />
        </div>

        {budget.alertLevel && (
          <div className={`pm-alert pm-alert--${budget.alertLevel}`}>
            Budget alert: {Math.round(budget.pct)}% of allocated budget used
            {budget.blocked ? " — task assignment blocked until override enabled in Settings." : "."}
          </div>
        )}

        <div className="pm-two-col" style={{ marginTop: 16 }}>
          <section className="card">
            <h3 className="pm-card-title">Workload snapshot</h3>
            {workloadRows.map(({ user, open, pct }) => (
              <div key={user.id} className="pm-mini-bar-row">
                <span>{user.name}</span>
                <div className="pm-mini-bar-track">
                  <div
                    className="pm-mini-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: pct >= 100 ? "#ef4444" : pct >= 75 ? "#f59e0b" : "#22c55e",
                    }}
                  />
                </div>
                <span className="pm-mini-bar-pct">{open} open</span>
              </div>
            ))}
          </section>

          <section className="card">
            <h3 className="pm-card-title">Upcoming deadlines (7 days)</h3>
            {upcoming.length === 0 ? (
              <p style={{ color: "#64748b", fontSize: 13 }}>No deadlines in the next week.</p>
            ) : (
              <ul className="pm-list-plain">
                {upcoming.map((t) => (
                  <li key={t.id}>
                    <Clock size={14} />
                    <span>{t.title}</span>
                    <span className="pm-list-meta">{t.dueDate}</span>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="pm-card-title" style={{ marginTop: 20 }}>Overdue & at risk</h3>
            <ul className="pm-list-plain">
              {[...overdue, ...atRisk].map((t) => (
                <li key={t.id} className="pm-list-danger">
                  <AlertTriangle size={14} />
                  <span>{t.title}</span>
                  <span className="pm-list-meta">{overdue.includes(t) ? "Overdue" : "At risk"}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card" style={{ marginTop: 16 }}>
          <div className="pm-table-toolbar">
            <h3 className="pm-card-title" style={{ margin: 0 }}>
              <FileText size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
              Generate progress report (PM_22)
            </h3>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
            <select className="pm-select" value={reportRange} onChange={(e) => setReportRange(e.target.value)}>
              <option value="weekly">Weekly summary</option>
              <option value="custom">Custom date range</option>
            </select>
            <Button variant="primary" size="md" onClick={handleGenerateReport}>
              Generate report
            </Button>
            <Button variant="ghost" size="md" onClick={handleDownloadReport}>
              <Download size={16} /> Download
            </Button>
          </div>
          {reportPreview && (
            <pre className="pm-report-preview">{reportPreview}</pre>
          )}
        </section>
      </main>
    </div>
  );
}
