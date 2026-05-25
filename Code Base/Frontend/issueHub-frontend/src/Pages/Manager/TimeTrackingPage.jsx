import { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Download, Play, Square, Timer } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import Button from "../../Components/Button/button.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getTasks } from "../../data/tasks.js";
import { getUsers, getSession } from "../../data/users.js";
import {
  getTimeLogs,
  addTimeLog,
  deleteTimeLog,
  aggregateHours,
  exportTimeLogsCsv,
} from "../../data/timeLogs.js";
import "../../App.css";
import "./manager.css";

export default function TimeTrackingPage() {
  const session = getSession();
  const [logs, setLogs] = useState(() => getTimeLogs());
  const tasks = useMemo(() => getTasks(), [logs]);
  const users = useMemo(() => getUsers(), []);
  const [projectFilter, setProjectFilter] = useState("all");

  const [taskId, setTaskId] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("0");
  const [billable, setBillable] = useState(true);
  const [note, setNote] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!timerRunning) return undefined;
    timerRef.current = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const filteredLogs = useMemo(() => {
    if (projectFilter === "all") return logs;
    return logs.filter((l) => l.projectId === projectFilter);
  }, [logs, projectFilter]);

  const totals = useMemo(
    () => aggregateHours(filteredLogs),
    [filteredLogs],
  );

  function refresh() {
    setLogs(getTimeLogs());
  }

  function handleLogManual(e) {
    e.preventDefault();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const h = Number(hours) + Number(minutes) / 60;
    if (h <= 0) return;
    addTimeLog({
      taskId: task.id,
      projectId: task.projectId,
      userId: session?.id || "seed-pm",
      hours: Math.round(h * 100) / 100,
      billable,
      note,
      date: new Date().toISOString().slice(0, 10),
    });
    setHours("");
    setMinutes("0");
    setNote("");
    refresh();
  }

  function handleStopTimer() {
    setTimerRunning(false);
    if (timerSeconds < 60 || !taskId) {
      setTimerSeconds(0);
      return;
    }
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    addTimeLog({
      taskId: task.id,
      projectId: task.projectId,
      userId: session?.id || "seed-pm",
      hours: Math.round((timerSeconds / 3600) * 100) / 100,
      billable,
      note: note || "Timer entry",
      date: new Date().toISOString().slice(0, 10),
    });
    setTimerSeconds(0);
    refresh();
  }

  function handleExport() {
    const csv = exportTimeLogsCsv(filteredLogs, tasks, users);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "issuehub-time-logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const timerDisplay = `${String(Math.floor(timerSeconds / 3600)).padStart(2, "0")}:${String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;

  return (
    <div className="preview-shell">
      <Sidebar brandSub="Manager Dashboard" navItems={MANAGER_NAV_ITEMS} activeKey="timetracking" />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">PM_16 · Time Tracking</p>
          <h1>Log Billable Hours</h1>
          <p className="lead">
            Log hours manually or with the built-in timer. Mark entries billable or
            non-billable and export aggregated data.
          </p>
        </section>

        <div className="pm-two-col">
          <section className="card">
            <h3 className="pm-card-title">New entry</h3>
            <form onSubmit={handleLogManual} className="pm-form-stack">
              <label className="pm-field-label">
                Task
                <select className="pm-select pm-select-full" value={taskId} onChange={(e) => setTaskId(e.target.value)} required>
                  <option value="">Select task…</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </label>
              <div className="pm-inline-fields">
                <label className="pm-field-label">
                  Hours
                  <input type="number" className="admin-number-input" min={0} value={hours} onChange={(e) => setHours(e.target.value)} />
                </label>
                <label className="pm-field-label">
                  Minutes
                  <input type="number" className="admin-number-input" min={0} max={59} value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                </label>
              </div>
              <label className="pm-check-row">
                <input type="checkbox" checked={billable} onChange={(e) => setBillable(e.target.checked)} />
                Billable
              </label>
              <label className="pm-field-label">
                Note
                <input type="text" className="admin-text-input pm-text-full" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional description" />
              </label>
              <Button type="submit" variant="primary" size="md">
                <Plus size={16} /> Log hours
              </Button>
            </form>

            <div className="pm-timer-box">
              <div className="pm-timer-display">
                <Timer size={18} />
                {timerDisplay}
              </div>
              {!timerRunning ? (
                <Button variant="secondary" size="sm" onClick={() => setTimerRunning(true)} disabled={!taskId}>
                  <Play size={14} /> Start timer
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={handleStopTimer}>
                  <Square size={14} /> Stop & save
                </Button>
              )}
            </div>
          </section>

          <section className="card">
            <h3 className="pm-card-title">Summary</h3>
            <div className="pm-metric-strip">
              <div><span className="pm-metric-val">{totals.total.toFixed(1)}h</span><span className="pm-metric-lbl">Total</span></div>
              <div><span className="pm-metric-val">{totals.billable.toFixed(1)}h</span><span className="pm-metric-lbl">Billable</span></div>
              <div><span className="pm-metric-val">{totals.nonBillable.toFixed(1)}h</span><span className="pm-metric-lbl">Non-billable</span></div>
            </div>
          </section>
        </div>

        <section className="card" style={{ marginTop: 16 }}>
          <div className="pm-table-toolbar">
            <h3 className="pm-card-title" style={{ margin: 0 }}>Time log</h3>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <select className="pm-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
                <option value="all">All projects</option>
                <option value="p1">Website Redesign</option>
                <option value="p2">Mobile App</option>
              </select>
              <Button variant="ghost" size="sm" onClick={handleExport}>
                <Download size={14} /> Export CSV
              </Button>
            </div>
          </div>
          <table className="pm-data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Task</th>
                <th>Member</th>
                <th>Hours</th>
                <th>Billable</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((l) => {
                const task = tasks.find((t) => t.id === l.taskId);
                const user = users.find((u) => u.id === l.userId);
                return (
                  <tr key={l.id}>
                    <td>{l.date}</td>
                    <td>{task?.title || l.taskId}</td>
                    <td>{user?.name || l.userId}</td>
                    <td>{l.hours}h</td>
                    <td>{l.billable ? "Yes" : "No"}</td>
                    <td>
                      <button type="button" className="pm-link-btn" onClick={() => { deleteTimeLog(l.id); refresh(); }}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
