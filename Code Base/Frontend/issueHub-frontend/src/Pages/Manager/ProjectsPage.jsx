import { useMemo, useState, useEffect } from "react";
import { LayoutDashboard, Settings, Plus } from "lucide-react";

import { GoProject } from "react-icons/go";
import { TbLayoutKanban } from "react-icons/tb";
import { SiGoogletasks } from "react-icons/si";
import { CiTimer } from "react-icons/ci";
import { GrAnalytics } from "react-icons/gr";

import Button from "../../Components/Button/button.jsx";
import Sidebar from "../../Components/SideBar/sideBar.jsx";

import CreateProjectModal from "../../Components/Modals/CreateProjectModal.jsx";
import AddMemberModal from "../../Components/Modals/AddMemberModal.jsx";
import NotificationModal from "../../Components/Modals/NotificationModal.jsx";

import ProjectCard from "../../Components/ProjectCard.jsx";

import { getUsers } from "../../data/users.js";

import "../../App.css";

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
  {
    key: "tasks",
    label: "Tasks",
    icon: SiGoogletasks,
    to: "/manager/tasks",
  },
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

export default function ProjectsPage() {
  const [activeKey, setActiveKey] = useState("projects");

  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [availableUsers] = useState(getUsers());

  const [notification, setNotification] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const activeLabel = useMemo(
    () =>
      ({
        dashboard: "Dashboard",
        projects: "Projects",
        kanbanboard: "Kanban Board",
        tasks: "Tasks",
        timetracking: "Time Tracking",
        analytics: "Analytics",
        settings: "Settings",
      })[activeKey] ?? "Projects",
    [activeKey],
  );

  // PM_01 Create Project
  const handleCreateProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);

    console.log(
      `Project "${newProject.name}" created with ID: ${newProject.id}`,
    );

    console.log(`Methodology template applied: ${newProject.methodology}`);

    setNotification({
      isOpen: true,
      type: "success",
      title: "Project Created",
      message: `Project "${newProject.name}" has been created successfully.`,
    });
  };

  // PM_02 Add Team Members
  const handleAddMembers = (projectId, newMembers) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            members: [...project.members, ...newMembers],
          }
        : project,
    );

    setProjects(updatedProjects);

    newMembers.forEach((member) => {
      console.log(`In-app notification sent to ${member.email}`);

      console.log(`Email notification sent to ${member.email}`);
    });

    setNotification({
      isOpen: true,
      type: "success",
      title: "Members Added",
      message: `${newMembers.length} member(s) added successfully.`,
    });
  };

  const handleManageMembers = (project) => {
    setSelectedProject(project);
    setShowAddMemberModal(true);
  };

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
          <p className="eyebrow">Project Management</p>

          <h1>Projects</h1>

          <p className="lead">
            Manage active projects, create new workspaces, and organize your
            project teams.
          </p>

          <div className="preview-actions users-actions">
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowCreateProjectModal(true)}
            >
              <Plus size={16} style={{ marginRight: 8 }} />
              New Project
            </Button>

            <span className="status-sending">Active panel: {activeLabel}</span>
          </div>
        </section>

        {projects.length === 0 ? (
          <section className="empty-state">
            <div className="empty-state-content">
              <h2>No projects yet</h2>

              <p>Create your first project to get started.</p>

              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowCreateProjectModal(true)}
                style={{ marginTop: 16 }}
              >
                Create Project
              </Button>
            </div>
          </section>
        ) : (
          <section className="card" style={{ maxWidth: 920 }}>
            <h2 style={{ marginBottom: 16 }}>
              Project List ({projects.length})
            </h2>

            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onManageMembers={handleManageMembers}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <CreateProjectModal
        isOpen={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
        onCreateProject={handleCreateProject}
      />

      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        project={selectedProject}
        availableUsers={availableUsers}
        onAddMembers={handleAddMembers}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() =>
          setNotification((prev) => ({
            ...prev,
            isOpen: false,
          }))
        }
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
}
