import { useMemo, useState } from "react";
import { LayoutDashboard, Settings } from "lucide-react";
import { GoProject } from "react-icons/go";
import { TbLayoutKanban } from "react-icons/tb";
import { SiGoogletasks } from "react-icons/si";
import { CiTimer } from "react-icons/ci";
import { GrAnalytics } from "react-icons/gr";

import Button from "../../Components/Button/button.jsx";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import "../../App.css";

const PREVIEW_ITEMS = [
  {
    title: "Overview",
    body: "Track issues, projects, and users from a single place with a dashboard layout.",
  },
  {
    title: "Workflow",
    body: "Use the sidebar to jump between the main admin sections as the app grows.",
  },
  {
    title: "Status",
    body: "This route now shows the sidebar in context instead of as a disconnected component demo.",
  },
];

const MANAGER_NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/manager",
  },
  {
    key: "projects",
    label: "Projects",
    icon: GoProject,
    to: "/manager/projects",
  },
  {
    key: "kanbanboard",
    label: "Kanban Board",
    icon: TbLayoutKanban,
    to: "/manager/kanban",
  },
  { key: "tasks", label: "Tasks", icon: SiGoogletasks, to: "/manager/tasks" },
  {
    key: "timetracking",
    label: "Time Tracking",
    icon: CiTimer,
    to: "/manager/timetracking",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: GrAnalytics,
    to: "/manager/analytics",
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    to: "/manager/settings",
  },
];

function ManagerDashboardPage() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const activeLabel = useMemo(() => {
    return (
      {
        dashboard: "Dashboard",
        projects: "Projects",
        kanbanboard: "Kanban Board",
        tasks: "Tasks",
        timetracking: "Time Tracking",
        analytics: "Analytics",
        settings: "Settings",
      }[activeKey] ?? "Dashboard"
    );
  }, [activeKey]);

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
          <p className="eyebrow">Manager Dashboard</p>
          <h1>IssueHub Sidebar</h1>
          <p className="lead">
            This is the routed manager view. The sidebar is now visible here,
            and the active section updates when you click items.
          </p>
          <div className="preview-actions">
            <Button to="/" variant="secondary" size="sm">
              Back to hero
            </Button>
            <Button to="/manager/projects" variant="primary" size="sm">
              View Projects
            </Button>
          </div>
          <div className="preview-status">
            <span className="status-dot" />
            Active item: {activeLabel}
          </div>
        </section>

        <section className="preview-grid">
          {PREVIEW_ITEMS.map((item) => (
            <article className="card preview-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export { ManagerDashboardPage };
