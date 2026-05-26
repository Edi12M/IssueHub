import { useState, useMemo, useEffect } from "react";
import { Calendar, Flag, CheckCircle } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getSession } from "../../data/users.js";
import {
  getProjectsApi,
  getProjectIssuesApi,
  getUsersApi,
  updateIssueStatusApi,
  isBackendUser,
} from "../../api/index.js";
import "../../App.css";
import "./manager.css";

// ── Column definitions ────────────────────────────────────────────────────────

const COLUMNS = [
  {
    status: "Backlog",
    label: "Backlog",
    color: "#64748b",
    overBg: "rgba(100,116,139,0.08)",
  },
  {
    status: "To Do",
    label: "To Do",
    color: "#3b82f6",
    overBg: "rgba(59,130,246,0.08)",
  },
  {
    status: "In Progress",
    label: "In Progress",
    color: "#8b5cf6",
    overBg: "rgba(139,92,246,0.08)",
  },
  {
    status: "In Review",
    label: "In Review",
    color: "#f59e0b",
    overBg: "rgba(245,158,11,0.08)",
  },
  {
    status: "Done",
    label: "Done",
    color: "#22c55e",
    overBg: "rgba(34,197,94,0.08)",
  },
];

const PRIORITY = {
  Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.14)" },
  High: { color: "#f97316", bg: "rgba(249,115,22,0.14)" },
  Medium: { color: "#eab308", bg: "rgba(234,179,8,0.14)" },
  Low: { color: "#22c55e", bg: "rgba(34,197,94,0.14)" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name) {
  if (!name) return "?";
  const words = name.trim().split(/\s+/);
  return words.length >= 2
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function shortDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(iso) {
  return iso ? new Date(iso) < new Date() : false;
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="kanban-toast">
      <CheckCircle size={14} />
      <span>{message}</span>
    </div>
  );
}

// ── KanbanCard ────────────────────────────────────────────────────────────────

function KanbanCard({ task, usersById, isDragging, onDragStart, onDragEnd }) {
  const pConf = PRIORITY[task.priority] ?? PRIORITY.Medium;
  const overdue = isOverdue(task.dueDate) && task.status !== "Done";
  const assigneeUsers = (task.assignees ?? [])
    .map((id) => usersById[id])
    .filter(Boolean);

  return (
    <div
      className={`kanban-card${isDragging ? " kanban-card--dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      {/* Task ID + priority */}
      <div className="kcard-header">
        <span className="kcard-id">{task.id}</span>
        <span
          className="kcard-priority"
          style={{ color: pConf.color, background: pConf.bg }}
        >
          <Flag size={9} strokeWidth={2.5} />
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <p className="kcard-title">{task.title}</p>

      {/* Type */}
      <span className="kcard-type">{task.type}</span>

      {/* Assignees + due date */}
      <div className="kcard-footer">
        <div className="kcard-assignees">
          {assigneeUsers.length > 0 ? (
            assigneeUsers.slice(0, 3).map((u) => (
              <span key={u.id} className="kcard-avatar" title={u.name}>
                {initials(u.name)}
              </span>
            ))
          ) : (
            <span className="kcard-unassigned">Unassigned</span>
          )}
        </div>
        {task.dueDate && (
          <div className={`kcard-due${overdue ? " kcard-due--overdue" : ""}`}>
            <Calendar size={11} />
            <span>{shortDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── KanbanColumn ──────────────────────────────────────────────────────────────

function KanbanColumn({
  column,
  tasks,
  isDragOver,
  draggingId,
  usersById,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}) {
  return (
    <div
      className={`kanban-column${isDragOver ? " kanban-column--over" : ""}`}
      onDragOver={(e) => onDragOver(e, column.status)}
      onDrop={(e) => onDrop(e, column.status)}
    >
      {/* Header */}
      <div className="kanban-col-header">
        <span className="kanban-col-dot" style={{ background: column.color }} />
        <span className="kanban-col-title">{column.label}</span>
        <span className="kanban-col-count">{tasks.length}</span>
      </div>

      {/* Body */}
      <div
        className="kanban-col-body"
        style={isDragOver ? { background: column.overBg } : undefined}
      >
        {tasks.length === 0 ? (
          <div className="kanban-col-empty">
            <span>No tasks</span>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              usersById={usersById}
              isDragging={task.id === draggingId}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
        {isDragOver && <div className="kanban-drop-zone" />}
      </div>
    </div>
  );
}

// ── KanbanPage ────────────────────────────────────────────────────────────────

export default function KanbanPage() {
  const session = getSession();
  const useBackend = isBackendUser(session);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(useBackend);

  // Load data from backend if user is authenticated
  useEffect(() => {
    if (!useBackend) {
      setLoading(false);
      return;
    }

    const loadBackendData = async () => {
      try {
        const projectsData = await getProjectsApi();
        setProjects(projectsData);

        const usersData = await getUsersApi();
        setUsers(usersData);

        // Load tasks for first project if available
        if (projectsData.length > 0) {
          setSelectedProjectId(String(projectsData[0].backendId));
          const tasksData = await getProjectIssuesApi(
            String(projectsData[0].backendId),
          );
          setTasks(tasksData);
        }
      } catch (e) {
        console.error("Failed to load kanban data:", e.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadBackendData();
  }, [useBackend]);

  // Reload tasks when project changes
  useEffect(() => {
    if (!useBackend || !selectedProjectId) return;

    const loadProjectTasks = async () => {
      try {
        const tasksData = await getProjectIssuesApi(selectedProjectId);
        setTasks(tasksData);
      } catch (e) {
        console.error("Failed to load project tasks:", e.message);
      }
    };

    loadProjectTasks();
  }, [selectedProjectId, useBackend]);

  const usersById = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      map[u.id] = u;
    });
    return map;
  }, [users]);

  const filteredTasks = useMemo(() => {
    if (!selectedProjectId) return tasks;
    return tasks.filter((t) => t.projectId === selectedProjectId);
  }, [tasks, selectedProjectId]);

  // ── Drag handlers ──────────────────────────────────────────────────────────

  function handleDragStart(e, task) {
    e.dataTransfer.effectAllowed = "move";
    // Delay state update so the browser captures the drag ghost before opacity changes
    requestAnimationFrame(() => setDraggingId(task.id));
  }

  function handleDragEnd() {
    setDraggingId(null);
    setDragOverCol(null);
  }

  function handleDragOver(e, colStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    // Only update state when the column actually changes to avoid render churn
    setDragOverCol((prev) => (prev !== colStatus ? colStatus : prev));
  }

  function handleDrop(e, colStatus) {
    e.preventDefault();
    if (!draggingId) return;

    const task = tasks.find((t) => t.id === draggingId);
    if (task && task.status !== colStatus) {
      if (task.backendId) {
        updateIssueStatusApi(task.backendId, colStatus)
          .then(() => {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === draggingId ? { ...t, status: colStatus } : t,
              ),
            );
            setToast({ id: Date.now(), message: `"${task.title}" moved to ${colStatus}` });
          })
          .catch((err) => {
            console.error("Failed to update task status:", err.message);
            setToast({ id: Date.now(), message: `Failed to move task: ${err.message}` });
          });
      }
      // Simulate team notification (PM_12 step 5)
      console.log(
        `[IssueHub] PM moved task "${task.title}" (${task.id}) → ${colStatus}. Team members notified.`,
      );
    }

    setDraggingId(null);
    setDragOverCol(null);
  }

  // ── Counts for toolbar ────────────────────────────────────────────────────

  const taskCount = filteredTasks.length;
  const projectLabel = selectedProjectId
    ? (projects.find((p) => p.id === selectedProjectId)?.name ?? "")
    : "All projects";

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        enableNavigation={true}
        activeKey="kanbanboard"
      />

      <main className="preview-main">
        {loading ? (
          <div
            style={{
              color: "#94a3b8",
              fontSize: 14,
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading kanban board...
          </div>
        ) : (
          <>
            {/* ── Page header ─────────────────────────────────────────────────── */}
            <section className="preview-hero card">
              <p className="eyebrow">Project Management</p>
              <h1 style={{ marginTop: 10, marginBottom: 12 }}>Kanban Board</h1>
              <p className="lead">
                Drag task cards between columns to update their status. Changes
                are saved instantly and team members are notified.
              </p>

              <div
                className="preview-actions kanban-toolbar"
                style={{ marginTop: 16 }}
              >
                <select
                  className="pm-select"
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                >
                  <option value="">All Projects</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <span className="kanban-task-count">
                  {taskCount} task{taskCount !== 1 ? "s" : ""} · {projectLabel}
                </span>
              </div>
            </section>

            {/* ── Kanban board ────────────────────────────────────────────────── */}
            <div className="kanban-wrapper">
              <div className="kanban-board">
                {COLUMNS.map((col) => (
                  <KanbanColumn
                    key={col.status}
                    column={col}
                    tasks={filteredTasks.filter((t) => t.status === col.status)}
                    isDragOver={dragOverCol === col.status}
                    draggingId={draggingId}
                    usersById={usersById}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
