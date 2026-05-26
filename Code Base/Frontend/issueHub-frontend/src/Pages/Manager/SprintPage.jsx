import { useState, useMemo, useEffect } from "react";
import { Plus, TrendingUp } from "lucide-react";

import Sidebar from "../../Components/SideBar/sideBar.jsx";
import Button from "../../Components/Button/button.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getTasks } from "../../data/tasks.js";
import {
  getSprints,
  saveSprints,
  createSprint,
  completeSprint,
} from "../../data/sprints.js";
import { getSession } from "../../data/users.js";
import {
  getProjectsApi,
  getProjectIssuesApi,
  isBackendUser,
} from "../../api/index.js";
import "../../App.css";
import "./manager.css";

const PROJECTS_KEY = "issuehub_projects";

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

export default function SprintPage() {
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
  const [sprints, setSprints] = useState(() => getSprints());
  const [tasks, setTasks] = useState(() => getTasks());
  const [loading, setLoading] = useState(useBackend);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  // Load projects from backend if user is authenticated
  useEffect(() => {
    if (!useBackend) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const projectsData = await getProjectsApi();
        setProjects(projectsData);

        // Set first project as default if available
        if (projectsData.length > 0) {
          const firstProjectId = String(
            projectsData[0].backendId || projectsData[0].id,
          );
          setProjectId(firstProjectId);
          const tasksData = await getProjectIssuesApi(firstProjectId);
          setTasks(tasksData);
        }
      } catch (e) {
        console.error("Failed to load sprint data:", e.message);
        setTasks(getTasks());
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [useBackend]);

  // Reload tasks when project changes
  useEffect(() => {
    if (!projectId) return;

    const loadProjectTasks = async () => {
      try {
        const tasksData = await getProjectIssuesApi(projectId);
        setTasks(tasksData);
      } catch (e) {
        console.error("Failed to load project tasks:", e.message);
      }
    };

    if (useBackend) {
      loadProjectTasks();
    }
  }, [projectId, useBackend]);

  const projectSprints = useMemo(
    () => sprints.filter((s) => s.projectId === projectId),
    [sprints, projectId],
  );

  const activeSprint = projectSprints.find((s) => s.status === "active");
  const backlog = tasks.filter(
    (t) =>
      t.projectId === projectId &&
      !projectSprints.some((s) => s.taskIds.includes(t.id)),
  );

  function refreshSprints() {
    setSprints(getSprints());
  }

  function handleCreateSprint(e) {
    e.preventDefault();
    createSprint({
      name: newName,
      projectId,
      startDate: newStart,
      endDate: newEnd,
      status: "active",
      taskIds: [],
    });
    setNewName("");
    setNewStart("");
    setNewEnd("");
    setShowNew(false);
    refreshSprints();
  }

  function addTaskToSprint(sprintId, taskId) {
    const sprint = sprints.find((s) => s.id === sprintId);
    if (!sprint || sprint.taskIds.includes(taskId)) return;
    const updated = sprints.map((s) =>
      s.id === sprintId ? { ...s, taskIds: [...s.taskIds, taskId] } : s,
    );
    saveSprints(updated);
    refreshSprints();
  }

  function removeFromSprint(sprintId, taskId) {
    const updated = sprints.map((s) =>
      s.id === sprintId
        ? { ...s, taskIds: s.taskIds.filter((id) => id !== taskId) }
        : s,
    );
    saveSprints(updated);
    refreshSprints();
  }

  function handleCompleteSprint(sprintId) {
    const sprint = sprints.find((s) => s.id === sprintId);
    const sprintTasks = tasks.filter((t) => sprint?.taskIds.includes(t.id));
    const points = sprintTasks
      .filter((t) => t.status === "Done")
      .reduce((s, t) => s + (t.storyPoints || 0), 0);
    completeSprint(sprintId, points);
    refreshSprints();
  }

  const velocityHistory = projectSprints
    .filter((s) => s.velocity != null)
    .map((s) => s.velocity);
  const avgVelocity = velocityHistory.length
    ? Math.round(
        velocityHistory.reduce((a, b) => a + b, 0) / velocityHistory.length,
      )
    : 0;

  const committedPoints = activeSprint
    ? tasks
        .filter((t) => activeSprint.taskIds.includes(t.id))
        .reduce((s, t) => s + (t.storyPoints || 0), 0)
    : 0;

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        activeKey="sprints"
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
            Loading sprints...
          </div>
        ) : (
          <>
            <section className="preview-hero card">
              <p className="eyebrow">PM_23 · Sprint Planning</p>
              <h1>Sprints & Velocity</h1>
              <p className="lead">
                Create sprints, assign backlog tasks, and track historical
                velocity for better estimations.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
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
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setShowNew(true)}
                >
                  <Plus size={16} /> New sprint
                </Button>
              </div>
            </section>

            {showNew && (
              <section className="card" style={{ marginBottom: 16 }}>
                <form onSubmit={handleCreateSprint} className="pm-form-stack">
                  <input
                    className="admin-text-input pm-text-full"
                    placeholder="Sprint name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                  <div className="pm-inline-fields">
                    <input
                      type="date"
                      className="gantt-date-input"
                      value={newStart}
                      onChange={(e) => setNewStart(e.target.value)}
                      required
                    />
                    <input
                      type="date"
                      className="gantt-date-input"
                      value={newEnd}
                      onChange={(e) => setNewEnd(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" size="sm">
                    Create sprint
                  </Button>
                </form>
              </section>
            )}

            <div className="pm-two-col">
              <section className="card">
                <h3 className="pm-card-title">Active sprint</h3>
                {activeSprint ? (
                  <>
                    <p style={{ color: "#94a3b8", fontSize: 13 }}>
                      {activeSprint.name} · {activeSprint.startDate} →{" "}
                      {activeSprint.endDate}
                    </p>
                    <p style={{ margin: "12px 0", fontWeight: 600 }}>
                      {committedPoints} story points committed
                    </p>
                    <ul className="pm-sprint-tasks">
                      {tasks
                        .filter((t) => activeSprint.taskIds.includes(t.id))
                        .map((t) => (
                          <li key={t.id}>
                            <span>{t.title}</span>
                            <span className="pm-list-meta">
                              {t.storyPoints || 0} pts
                            </span>
                            <button
                              type="button"
                              className="pm-link-btn"
                              onClick={() =>
                                removeFromSprint(activeSprint.id, t.id)
                              }
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                    </ul>
                    <Button
                      variant="secondary"
                      size="sm"
                      style={{ marginTop: 12 }}
                      onClick={() => handleCompleteSprint(activeSprint.id)}
                    >
                      Complete sprint
                    </Button>
                  </>
                ) : (
                  <p style={{ color: "#64748b" }}>
                    No active sprint. Create one to start planning.
                  </p>
                )}
              </section>

              <section className="card">
                <h3 className="pm-card-title">
                  <TrendingUp
                    size={18}
                    style={{ verticalAlign: "middle", marginRight: 6 }}
                  />
                  Velocity trend
                </h3>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9" }}>
                  {avgVelocity}
                </p>
                <p style={{ color: "#64748b", fontSize: 13 }}>
                  avg points / sprint
                </p>
                <div className="pm-velocity-chart">
                  {velocityHistory.map((v, i) => (
                    <div
                      key={i}
                      className="pm-velocity-bar"
                      style={{
                        height: `${Math.max(12, (v / Math.max(...velocityHistory, 1)) * 80)}px`,
                      }}
                      title={`${v} pts`}
                    />
                  ))}
                </div>
              </section>
            </div>

            <section className="card" style={{ marginTop: 16 }}>
              <h3 className="pm-card-title">Backlog — drag into sprint</h3>
              <ul className="pm-sprint-tasks">
                {backlog.map((t) => (
                  <li key={t.id}>
                    <span>{t.title}</span>
                    <span className="pm-list-meta">
                      {t.storyPoints || 0} pts · {t.status}
                    </span>
                    {activeSprint && (
                      <button
                        type="button"
                        className="pm-link-btn"
                        onClick={() => addTaskToSprint(activeSprint.id, t.id)}
                      >
                        Add to sprint
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
