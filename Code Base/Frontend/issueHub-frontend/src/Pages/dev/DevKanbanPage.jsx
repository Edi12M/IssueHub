import { useState, useEffect } from "react";
import { Calendar, Flag, CheckCircle } from "lucide-react";
import { DevShell, PageHeader } from "../../Components/dev/DevUI.jsx";
import { useDevIssues } from "../../context/DevIssuesContext.jsx";
import "../Manager/manager.css";

const COLUMNS = [
  { status: "Backlog",     label: "Backlog",      color: "#64748b", overBg: "rgba(100,116,139,0.08)" },
  { status: "To Do",       label: "To Do",        color: "#3b82f6", overBg: "rgba(59,130,246,0.08)"  },
  { status: "In Progress", label: "In Progress",  color: "#8b5cf6", overBg: "rgba(139,92,246,0.08)"  },
  { status: "In Review",   label: "In Review",    color: "#f59e0b", overBg: "rgba(245,158,11,0.08)"  },
  { status: "Done",        label: "Done",         color: "#22c55e", overBg: "rgba(34,197,94,0.08)"   },
];

const PRIORITY = {
  Critical: { color: "#ef4444", bg: "rgba(239,68,68,0.14)"   },
  High:     { color: "#f97316", bg: "rgba(249,115,22,0.14)"  },
  Medium:   { color: "#eab308", bg: "rgba(234,179,8,0.14)"   },
  Low:      { color: "#22c55e", bg: "rgba(34,197,94,0.14)"   },
};

function shortDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isOverdue(iso) {
  return iso ? new Date(iso) < new Date() : false;
}

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

function KanbanCard({ task, isDragging, onDragStart, onDragEnd }) {
  const pConf = PRIORITY[task.priority] ?? PRIORITY.Medium;
  const overdue = isOverdue(task.dueDate) && task.status !== "Done";
  return (
    <div
      className={`kanban-card${isDragging ? " kanban-card--dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      <div className="kcard-header">
        <span className="kcard-id">{task.issueCode ?? task.id}</span>
        <span className="kcard-priority" style={{ color: pConf.color, background: pConf.bg }}>
          <Flag size={9} strokeWidth={2.5} />
          {task.priority}
        </span>
      </div>
      <p className="kcard-title">{task.title}</p>
      <span className="kcard-type">{task.type}</span>
      <div className="kcard-footer">
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

function KanbanColumn({ column, tasks, isDragOver, draggingId, onDragStart, onDragEnd, onDragOver, onDrop }) {
  return (
    <div
      className={`kanban-column${isDragOver ? " kanban-column--over" : ""}`}
      onDragOver={(e) => onDragOver(e, column.status)}
      onDrop={(e) => onDrop(e, column.status)}
    >
      <div className="kanban-col-header">
        <span className="kanban-col-dot" style={{ background: column.color }} />
        <span className="kanban-col-title">{column.label}</span>
        <span className="kanban-col-count">{tasks.length}</span>
      </div>
      <div className="kanban-col-body" style={isDragOver ? { background: column.overBg } : undefined}>
        {tasks.length === 0 ? (
          <div className="kanban-col-empty"><span>No tasks</span></div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
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

export default function DevKanbanPage() {
  const { issues, loading, updateIssueStatus } = useDevIssues();
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [toast, setToast] = useState(null);

  function handleDragStart(e, task) {
    e.dataTransfer.effectAllowed = "move";
    requestAnimationFrame(() => setDraggingId(task.id));
  }

  function handleDragEnd() {
    setDraggingId(null);
    setDragOverCol(null);
  }

  function handleDragOver(e, colStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol((prev) => (prev !== colStatus ? colStatus : prev));
  }

  async function handleDrop(e, colStatus) {
    e.preventDefault();
    if (!draggingId) return;
    const task = issues.find((t) => t.id === draggingId);
    setDraggingId(null);
    setDragOverCol(null);
    if (!task || task.status === colStatus) return;
    try {
      await updateIssueStatus(task.id, task.backendId, colStatus, task.status);
      setToast({ id: Date.now(), message: `"${task.title}" moved to ${colStatus}` });
    } catch (err) {
      setToast({ id: Date.now(), message: `Failed to move task: ${err.message}` });
    }
  }

  return (
    <DevShell>
      <PageHeader title="My Kanban Board" subtitle="Drag tasks between columns to update their status globally." />

      {loading ? (
        <div style={{ color: "#94a3b8", fontSize: 14, padding: "40px", textAlign: "center" }}>
          Loading kanban board…
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12, color: "#64748b", fontSize: 13 }}>
            {issues.length} task{issues.length !== 1 ? "s" : ""} assigned to you
          </div>
          <div className="kanban-wrapper">
            <div className="kanban-board">
              {COLUMNS.map((col) => (
                <KanbanColumn
                  key={col.status}
                  column={col}
                  tasks={issues.filter((t) => t.status === col.status)}
                  isDragOver={dragOverCol === col.status}
                  draggingId={draggingId}
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

      {toast && (
        <Toast key={toast.id} message={toast.message} onDismiss={() => setToast(null)} />
      )}
    </DevShell>
  );
}
