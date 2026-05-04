import { useMemo, useState } from "react";
import Button from "../Components/Button/button.jsx";
import Sidebar from "../Components/SideBar/sideBar.jsx";
import "../App.css";

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

// HeroPage was moved to src/Pages/Hero.jsx

function AdminDashboardPage() {
  const [activeKey, setActiveKey] = useState("dashboard");

  const activeLabel = useMemo(() => {
    return (
      {
        dashboard: "Dashboard",
        users: "Users",
        projects: "Projects",
        issues: "Issues",
        settings: "Settings",
      }[activeKey] ?? "Dashboard"
    );
  }, [activeKey]);

  return (
    <div className="preview-shell">
      <Sidebar activeKey={activeKey} onSelect={setActiveKey} />

      <main className="preview-main">
        <section className="preview-hero card">
          <p className="eyebrow">Admin dashboard</p>
          <h1>IssueHub Sidebar</h1>
          <p className="lead">
            This is the routed admin view. The sidebar is now visible here, and
            the active section updates when you click items.
          </p>
          <div className="preview-actions">
            <Button to="/" variant="secondary" size="sm">
              Back to hero
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

export { AdminDashboardPage };
