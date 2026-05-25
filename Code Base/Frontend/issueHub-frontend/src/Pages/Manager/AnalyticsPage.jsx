import { useState, useMemo, useEffect } from "react";
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
import { getUsers, getSession } from "../../data/users.js";
import { getBudgetUsage } from "../../data/pmSettings.js";
import {
  getProjectsApi,
  getProjectAnalyticsApi,
  getProjectIssuesApi,
  getUsersApi,
  getUserTimeLogsApi,
  isBackendUser,
} from "../../api/index.js";
import "../../App.css";
import "./manager.css";

const PROJECTS_KEY = "issuehub_projects";
const INITIAL_PROJECTS = [
  { id: "p1", name: "Website Redesign" },
  { id: "p2", name: "Mobile App" },
];

export default function AnalyticsPage() {
  const session = getSession();
  const useBackend = isBackendUser(session);

  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });
  const [projectId, setProjectId] = useState("p1");
  const [reportRange, setReportRange] = useState("weekly");
  const [reportPreview, setReportPreview] = useState(null);

  // Data states
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(useBackend);

  // Load data from backend if user is authenticated
  useEffect(() => {
    if (!useBackend) {
      // Use mock data
      setTasks(getTasks());
      setLogs(getTimeLogs());
      setUsers(getUsers().filter((u) => u.role !== "System Administrator"));
      setLoading(false);
      return;
    }

    const loadBackendData = async () => {
      try {
        // Fetch projects from API
        const projectsData = await getProjectsApi();
        setProjects(projectsData);

        // Load analytics for this project
        const analyticsData = await getProjectAnalyticsApi(projectId);
        setAnalytics(analyticsData);

        // Load project issues
        const issuesData = await getProjectIssuesApi(projectId);
        setTasks(issuesData);

        // Load users
        const usersData = await getUsersApi();
        setUsers(usersData.filter((u) => u.role !== "System Administrator"));

        // Load time logs for this project
        const timeLogsData = await getUserTimeLogsApi(session.backendId);
        setLogs(timeLogsData);
      } catch (e) {
        console.error("Failed to load analytics data:", e.message);
        // Fallback to mock data
        setTasks(getTasks());
        setLogs(getTimeLogs());
        setUsers(getUsers().filter((u) => u.role !== "System Administrator"));
      } finally {
        setLoading(false);
      }
    };

    loadBackendData();
  }, [useBackend, projectId, session?.backendId]);

  const projectTasks = useMemo(
    () => tasks.filter((t) => String(t.projectId) === String(projectId)),
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
        if (!t.deadline || t.status === "Done") return false;
        const d = new Date(t.deadline).getTime();
        return d >= now && d <= in7;
      })
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
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
    const rangeLabel =
      reportRange === "weekly" ? "Weekly summary" : "Custom range";
    const projectTasks = tasks.filter(
      (t) => String(t.projectId) === String(projectId),
    );
    const projectText =
      projectId === "p1"
        ? "Website Redesign"
        : projectId === "p2"
          ? "Mobile App"
          : projectId;
    const done = projectTasks.filter((t) => t.status === "Done").length;
    const total = projectTasks.length;
    const hours = aggregateHours(logs, { projectId });
    const lines = [
      `IssueHub Progress Report — ${rangeLabel}`,
      `Project: ${projectText}`,
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
      ...projectTasks.map(
        (t) => `  - [${t.status}] ${t.title} (due ${t.deadline || "—"})`,
      ),
    ];
    setReportPreview(lines.join("\n"));
  }

  function handleDownloadReport() {
    if (!reportPreview) handleGenerateReport();
    const projectTasks = tasks.filter(
      (t) => String(t.projectId) === String(projectId),
    );
    const projectText =
      projectId === "p1"
        ? "Website Redesign"
        : projectId === "p2"
          ? "Mobile App"
          : projectId;
    const done = projectTasks.filter((t) => t.status === "Done").length;
    const total = projectTasks.length;
    const hours = aggregateHours(logs, { projectId });
    const text =
      reportPreview ||
      [
        `IssueHub Progress Report — ${reportRange === "weekly" ? "Weekly summary" : "Custom range"}`,
        `Project: ${projectText}`,
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
        ...projectTasks.map(
          (t) => `  - [${t.status}] ${t.title} (due ${t.deadline || "—"})`,
        ),
      ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-report-${projectId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="preview-shell">
        <Sidebar
          brandSub="Manager Dashboard"
          navItems={MANAGER_NAV_ITEMS}
          activeKey="analytics"
        />
        <main className="preview-main">
          <div
            style={{
              color: "#94a3b8",
              fontSize: 14,
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading analytics...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        activeKey="analytics"
      />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">PM_21 · PM_22 · PM_17</p>
          <h1>Project Health & Reports</h1>
          <p className="lead">
            Consolidated health dashboard with completion, workload, budget
            usage, and progress report generation.
          </p>
          <div style={{ marginTop: 14 }}>
            <select
              className="pm-select"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects.map((p) => (
                <option
                  key={p.backendId || p.id}
                  value={String(p.backendId || p.id)}
                >
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="pm-stats-grid">
          <StatCard
            icon={CheckCircle2}
            label="Completion rate"
            value={`${completionPct}%`}
            sub={`${doneCount} of ${projectTasks.length} tasks done`}
            color="#22c55e"
          />
          <StatCard
            icon={Users}
            label="Team workload"
            value={`${workloadRows.filter((r) => r.pct >= 75).length}`}
            sub="members at high load"
            color="#8b5cf6"
          />
          <StatCard
            icon={DollarSign}
            label="Budget used"
            value={`${Math.round(budget.pct)}%`}
            sub={
              budget.alertLevel
                ? `Alert: ${budget.alertLevel}%`
                : "Within limits"
            }
            color={budget.pct >= 90 ? "#ef4444" : "#6be4ff"}
          />
          <StatCard
            icon={AlertTriangle}
            label="Overdue"
            value={overdue.length}
            sub={`${atRisk.length} at risk`}
            color="#f97316"
          />
        </div>

        {budget.alertLevel && (
          <div className={`pm-alert pm-alert--${budget.alertLevel}`}>
            Budget alert: {Math.round(budget.pct)}% of allocated budget used
            {budget.blocked
              ? " — task assignment blocked until override enabled in Settings."
              : "."}
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
                      background:
                        pct >= 100
                          ? "#ef4444"
                          : pct >= 75
                            ? "#f59e0b"
                            : "#22c55e",
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
              <p style={{ color: "#64748b", fontSize: 13 }}>
                No deadlines in the next week.
              </p>
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
            <h3 className="pm-card-title" style={{ marginTop: 20 }}>
              Overdue & at risk
            </h3>
            <ul className="pm-list-plain">
              {[...overdue, ...atRisk].map((t) => (
                <li key={t.id} className="pm-list-danger">
                  <AlertTriangle size={14} />
                  <span>{t.title}</span>
                  <span className="pm-list-meta">
                    {overdue.includes(t) ? "Overdue" : "At risk"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card" style={{ marginTop: 16 }}>
          <div className="pm-table-toolbar">
            <h3 className="pm-card-title" style={{ margin: 0 }}>
              <FileText
                size={18}
                style={{ verticalAlign: "middle", marginRight: 8 }}
              />
              Generate progress report (PM_22)
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <select
              className="pm-select"
              value={reportRange}
              onChange={(e) => setReportRange(e.target.value)}
            >
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
