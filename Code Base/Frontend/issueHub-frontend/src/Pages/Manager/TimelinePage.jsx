import { useState, useMemo } from "react";
import { CalendarRange } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getTasks, updateTaskDates } from "../../data/tasks.js";
import { getUsers } from "../../data/users.js";
import "../../App.css";
import "./manager.css";

function parseDate(iso) {
  return iso ? new Date(iso + "T12:00:00") : null;
}

function daysBetween(a, b) {
  return Math.max(1, Math.ceil((b - a) / (24 * 60 * 60 * 1000)));
}

export default function TimelinePage() {
  const [projectId, setProjectId] = useState("p1");
  const [tasks, setTasks] = useState(() => getTasks());
  const users = useMemo(() => getUsers(), []);

  const projectTasks = useMemo(
    () => tasks.filter((t) => t.projectId === projectId && t.startDate && t.dueDate),
    [tasks, projectId],
  );

  const { rangeStart, rangeEnd, totalDays } = useMemo(() => {
    if (!projectTasks.length) {
      const now = new Date();
      return { rangeStart: now, rangeEnd: new Date(now.getTime() + 30 * 86400000), totalDays: 30 };
    }
    const starts = projectTasks.map((t) => parseDate(t.startDate).getTime());
    const ends = projectTasks.map((t) => parseDate(t.dueDate).getTime());
    const rs = new Date(Math.min(...starts));
    const re = new Date(Math.max(...ends));
    return { rangeStart: rs, rangeEnd: re, totalDays: daysBetween(rs, re) };
  }, [projectTasks]);

  const criticalIds = useMemo(() => {
    const byEnd = [...projectTasks].sort(
      (a, b) => parseDate(b.dueDate) - parseDate(a.dueDate),
    );
    const chain = [];
    let cursor = byEnd[0]?.dueDate;
    for (const t of byEnd) {
      if (!cursor || parseDate(t.dueDate) <= parseDate(cursor)) {
        chain.push(t.id);
        cursor = t.startDate;
      }
    }
    return new Set(chain);
  }, [projectTasks]);

  function barStyle(task) {
    const start = parseDate(task.startDate);
    const end = parseDate(task.dueDate);
    const offset = daysBetween(rangeStart, start);
    const width = daysBetween(start, end);
    const leftPct = (offset / totalDays) * 100;
    const widthPct = (width / totalDays) * 100;
    return { left: `${leftPct}%`, width: `${Math.max(4, widthPct)}%` };
  }

  function handleDateChange(taskId, field, value) {
    const t = tasks.find((x) => x.id === taskId);
    if (!t) return;
    const start = field === "startDate" ? value : t.startDate;
    const due = field === "dueDate" ? value : t.dueDate;
    updateTaskDates(taskId, start, due);
    setTasks(getTasks());
  }

  const monthLabels = useMemo(() => {
    const labels = [];
    const d = new Date(rangeStart);
    while (d <= rangeEnd) {
      labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
      d.setDate(d.getDate() + Math.ceil(totalDays / 6));
    }
    return labels;
  }, [rangeStart, rangeEnd, totalDays]);

  return (
    <div className="preview-shell">
      <Sidebar brandSub="Manager Dashboard" navItems={MANAGER_NAV_ITEMS} activeKey="timeline" />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">PM_13 · Timeline / Gantt</p>
          <h1>Timeline View</h1>
          <p className="lead">
            Tasks as horizontal bars on a calendar axis. Adjust dates inline; critical
            path tasks are highlighted.
          </p>
          <select className="pm-select" style={{ marginTop: 12 }} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            <option value="p1">Website Redesign</option>
            <option value="p2">Mobile App</option>
          </select>
        </section>

        <section className="card gantt-card">
          <div className="gantt-axis">
            {monthLabels.map((l) => (
              <span key={l} className="gantt-axis-label">{l}</span>
            ))}
          </div>

          <div className="gantt-rows">
            {projectTasks.map((task) => {
              const assignee = users.find((u) => task.assignees?.includes(u.id));
              const isCritical = criticalIds.has(task.id);
              return (
                <div key={task.id} className="gantt-row">
                  <div className="gantt-row-label">
                    <span className="gantt-task-title">{task.title}</span>
                    <span className="gantt-task-meta">{assignee?.name?.split(" ")[0] || "—"}</span>
                  </div>
                  <div className="gantt-track">
                    <div
                      className={`gantt-bar${isCritical ? " gantt-bar--critical" : ""}`}
                      style={barStyle(task)}
                      title={`${task.startDate} → ${task.dueDate}`}
                    />
                    {task.dependencies?.map((depId) => {
                      const dep = projectTasks.find((x) => x.id === depId);
                      if (!dep) return null;
                      return (
                        <span key={depId} className="gantt-dep" title={`Depends on ${dep.title}`}>
                          ↳ {dep.title.slice(0, 12)}…
                        </span>
                      );
                    })}
                  </div>
                  <div className="gantt-dates">
                    <input
                      type="date"
                      className="gantt-date-input"
                      value={task.startDate}
                      onChange={(e) => handleDateChange(task.id, "startDate", e.target.value)}
                    />
                    <input
                      type="date"
                      className="gantt-date-input"
                      value={task.dueDate}
                      onChange={(e) => handleDateChange(task.id, "dueDate", e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="gantt-legend">
            <CalendarRange size={14} />
            <span className="gantt-legend-critical" /> Critical path
            <span style={{ marginLeft: 16, color: "#64748b" }}>
              Drag bar edges via date inputs to reschedule (PM_13).
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
