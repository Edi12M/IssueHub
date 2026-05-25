import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { MANAGER_NAV_ITEMS } from "./managerConstants.js";
import { getUsers, getSession } from "../../data/users.js";
import { getTasks, updateTaskAssignees } from "../../data/tasks.js";
import { getSprints } from "../../data/sprints.js";
import WorkloadCard from "../../Components/WorkloadCard.jsx";
import {
  getUsersApi,
  getProjectIssuesApi,
  getUserWorkloadApi,
  isBackendUser,
} from "../../api/index.js";
import "../../App.css";
import "./manager.css";

function hoursForTask(task) {
  switch (task.status) {
    case "In Progress":
      return 16;
    case "To Do":
      return 6;
    case "In Review":
      return 4;
    case "Backlog":
      return 2;
    default:
      return 0;
  }
}

export default function CapacityPage() {
  const session = getSession();
  const useBackend = isBackendUser(session);

  const [sprintFilter, setSprintFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tasks, setTasks] = useState(() => getTasks());
  const [users, setUsers] = useState(() =>
    getUsers().filter((u) => u.role !== "System Administrator"),
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(useBackend);

  useEffect(() => {
    if (!useBackend) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const usersData = await getUsersApi();
        setUsers(usersData.filter((u) => u.role !== "System Administrator"));

        const tasksData = await getProjectIssuesApi("p1");
        setTasks(tasksData);
      } catch (e) {
        console.error("Failed to load capacity data:", e.message);
        setTasks(getTasks());
        setUsers(getUsers().filter((u) => u.role !== "System Administrator"));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [useBackend]);

  const sprints = useMemo(() => getSprints(), []);

  const filteredTasks = useMemo(() => {
    let list = [...tasks];
    if (sprintFilter !== "all") {
      const sprint = sprints.find((s) => s.id === sprintFilter);
      if (sprint) {
        list = list.filter((t) => sprint.taskIds.includes(t.id));
      }
    }
    if (dateFrom) {
      list = list.filter((t) => !t.dueDate || t.dueDate >= dateFrom);
    }
    if (dateTo) {
      list = list.filter((t) => !t.startDate || t.startDate <= dateTo);
    }
    return list;
  }, [tasks, sprintFilter, dateFrom, dateTo, sprints]);

  const rows = users.map((user) => {
    const assigned = filteredTasks.filter(
      (t) => Array.isArray(t.assignees) && t.assignees.includes(user.id),
    );
    const allocated = assigned.reduce((s, t) => s + hoursForTask(t), 0);
    const available = 40;
    return { user, allocated, available, assigned };
  });

  const totalAllocated = rows.reduce((s, r) => s + r.allocated, 0);
  const totalAvailable = rows.reduce((s, r) => s + r.available, 0);

  function handleReassign(taskId, newUserId) {
    updateTaskAssignees(taskId, [newUserId]);
    setTasks(getTasks());
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        activeKey="capacity"
      />

      <main className="preview-main" key={refreshKey}>
        {loading ? (
          <div
            style={{
              color: "#94a3b8",
              fontSize: 14,
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading capacity data...
          </div>
        ) : (
          <>
            <section className="preview-hero card">
              <p className="eyebrow">PM_15 · Team Workload</p>
              <h1>Capacity & Availability</h1>
              <p className="lead">
                Monitor each member&apos;s load with color-coded bars. Rebalance
                by reassigning tasks and filter by sprint or date range.
              </p>
            </section>

            <section className="card" style={{ marginBottom: 16 }}>
              <div className="pm-table-toolbar">
                <span style={{ fontWeight: 600 }}>Filters</span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <select
                    className="pm-select"
                    value={sprintFilter}
                    onChange={(e) => setSprintFilter(e.target.value)}
                  >
                    <option value="all">All sprints</option>
                    {sprints.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="gantt-date-input"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From"
                  />
                  <input
                    type="date"
                    className="gantt-date-input"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
            </section>

            <section className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 700 }}>Team Overview</div>
                <div style={{ color: "#94a3b8" }}>
                  {totalAllocated}h allocated · {totalAvailable}h available
                </div>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {rows.map(({ user, allocated, available, assigned }) => (
                  <div key={user.id}>
                    <WorkloadCard
                      user={user}
                      allocatedHours={allocated}
                      availableHours={available}
                    />
                    {assigned.length > 0 && (
                      <div className="pm-reassign-list">
                        {assigned.map((t) => (
                          <div key={t.id} className="pm-reassign-row">
                            <span className="pm-reassign-task">{t.title}</span>
                            <select
                              className="pm-select"
                              style={{ minWidth: 140 }}
                              value={t.assignees[0]}
                              onChange={(e) =>
                                handleReassign(t.id, e.target.value)
                              }
                              aria-label={`Reassign ${t.title}`}
                            >
                              {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
