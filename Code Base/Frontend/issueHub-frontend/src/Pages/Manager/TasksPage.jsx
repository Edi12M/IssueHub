import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import Button from "../../Components/Button/button.jsx";
import CreateTaskModal from "../../Components/Modals/CreateTaskModal.jsx";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getTasks, saveTasks } from "../../data/tasks.js";

const PROJECTS_KEY = "issuehub_projects";

const STATUSES = [
  "All",
  "Backlog",
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];
const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];

const INITIAL_PROJECTS = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Redesign the company website UI.",
    goals: "Improve UX and accessibility.",
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    visibility: "Team",
    methodology: "Scrum",
    status: "In Progress",
    members: [],
  },
  {
    id: "p2",
    name: "Mobile App",
    description: "Build a cross-platform mobile app.",
    goals: "Launch MVP for beta users.",
    startDate: "2025-10-01",
    endDate: "2025-12-20",
    visibility: "Private",
    methodology: "Kanban",
    status: "Planning",
    members: [],
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(() => getTasks());

  const [projects] = useState(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [activeKey, setActiveKey] = useState("tasks");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  function handleEditTask(task) {
    setEditingTask(task);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditingTask(null);
  }

  function handleCreateTask(task) {
    if (editingTask) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks((prev) => [task, ...prev]);
    }
    setShowModal(false);
    setEditingTask(null);
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case "Critical":
        return "#ef4444";
      case "High":
        return "#f97316";
      case "Medium":
        return "#eab308";
      case "Low":
        return "#22c55e";
      default:
        return "#64748b";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "Backlog":
        return "rgba(148, 163, 184, 0.08)";
      case "To Do":
        return "rgba(96, 165, 250, 0.08)";
      case "In Progress":
        return "rgba(167, 139, 250, 0.08)";
      case "In Review":
        return "rgba(251, 191, 36, 0.08)";
      case "Done":
        return "rgba(34, 197, 94, 0.08)";
      default:
        return "rgba(255, 255, 255, 0.03)";
    }
  }

  const filteredTasks = tasks.filter((t) => {
    const projectMatch =
      !selectedProjectId || t.projectId === selectedProjectId;
    const statusMatch = filterStatus === "All" || t.status === filterStatus;
    const priorityMatch =
      filterPriority === "All" || t.priority === filterPriority;
    return projectMatch && statusMatch && priorityMatch;
  });

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        enableNavigation={true}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">Task Management</p>
          <h1>Tasks</h1>
          <p className="lead">
            Manage tasks for your projects, track progress, and assign work.
          </p>
          <div className="preview-actions">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setEditingTask(null);
                setShowModal(true);
              }}
            >
              <Plus size={16} />
              New Task
            </Button>
          </div>
        </section>

        {/* PROJECT SELECTOR */}
        <section className="card" style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <label style={{ color: "#94a3b8", fontSize: "14px" }}>
              Select Project:
            </label>
            <select
              className="form-select-base"
              style={{
                width: "200px",
                fontSize: "14px",
                padding: "8px 12px",
              }}
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
          </div>
        </section>

        {/* FILTERS */}
        <section className="card" style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "12px",
                  marginRight: "8px",
                }}
              >
                Status
              </label>
              <select
                className="form-select-base"
                style={{
                  width: "auto",
                  fontSize: "13px",
                  padding: "6px 32px 6px 10px",
                }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  color: "#94a3b8",
                  fontSize: "12px",
                  marginRight: "8px",
                }}
              >
                Priority
              </label>
              <select
                className="form-select-base"
                style={{
                  width: "auto",
                  fontSize: "13px",
                  padding: "6px 32px 6px 10px",
                }}
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* TASK CARDS */}
        {filteredTasks.length === 0 ? (
          <section className="empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">
                <Plus size={48} />
              </div>
              <h2>No tasks found</h2>
              <p>Create your first task or adjust filters to see tasks.</p>
              <Button
                variant="primary"
                onClick={() => {
                  setEditingTask(null);
                  setShowModal(true);
                }}
              >
                New Task
              </Button>
            </div>
          </section>
        ) : (
          <section className="card">
            <h2 style={{ marginBottom: "16px" }}>
              Tasks ({filteredTasks.length})
            </h2>
            <div
              className="project-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="card task-card"
                  style={{
                    borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                    backgroundColor: getStatusColor(task.status),
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <h3 style={{ margin: 0, flex: 1 }}>{task.title}</h3>
                    <button
                      onClick={() => handleEditTask(task)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#cbd5e1",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "4px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                      title="Edit task"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  >
                    {task.description || "No description"}
                  </p>
                  {Array.isArray(task.dependencies) &&
                    task.dependencies.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#94a3b8",
                            background: "rgba(255,255,255,0.05)",
                            padding: "6px 10px",
                            borderRadius: 8,
                          }}
                        >
                          {task.dependencies.length} dependency
                          {task.dependencies.length !== 1 ? "ies" : ""}
                        </span>
                      </div>
                    )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                      Type: {task.type}
                    </span>
                    <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                      Priority: {task.priority}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                      Status: {task.status}
                    </span>
                    <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MODAL */}
        <CreateTaskModal
          key={editingTask?.id || "new-task"}
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={handleCreateTask}
          projects={projects}
          tasks={tasks}
          editTask={editingTask}
        />
      </main>
    </div>
  );
}
