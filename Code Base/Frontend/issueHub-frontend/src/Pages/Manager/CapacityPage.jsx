import { useState, useMemo } from "react";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import {
  MANAGER_NAV_ITEMS,
  PROJECTS_KEY,
  INITIAL_PROJECTS,
} from "./managerConstants.js";
import { getUsers } from "../../data/users.js";
import { getTasks } from "../../data/tasks.js";
import WorkloadCard from "../../Components/WorkloadCard.jsx";

export default function CapacityPage() {
  useState(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const users = useMemo(
    () => getUsers().filter((u) => u.role !== "System Administrator"),
    [],
  );
  const tasks = useMemo(() => getTasks(), []);

  // Simple heuristic for allocated hours per task status
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

  const rows = users.map((user) => {
    const assigned = tasks.filter(
      (t) => Array.isArray(t.assignees) && t.assignees.includes(user.id),
    );
    const allocated = assigned.reduce((s, t) => s + hoursForTask(t), 0);
    // default available hours per week, could be made editable later
    const available = 40;
    return { user, allocated, available };
  });

  const totalAllocated = rows.reduce((s, r) => s + r.allocated, 0);
  const totalAvailable = rows.reduce((s, r) => s + r.available, 0);

  return (
    <div className="preview-shell">
      <Sidebar
        brandSub="Manager Dashboard"
        navItems={MANAGER_NAV_ITEMS}
        enableNavigation={true}
        activeKey="capacity"
      />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">Team Capacity</p>
          <h1>Capacity & Availability</h1>
          <p className="lead">
            Overview of weekly availability and allocated hours per team member.
          </p>
        </section>

        <section className="card" style={{ marginTop: 16 }}>
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
            {rows.map(({ user, allocated, available }) => (
              <WorkloadCard
                key={user.id}
                user={user}
                allocatedHours={allocated}
                availableHours={available}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
