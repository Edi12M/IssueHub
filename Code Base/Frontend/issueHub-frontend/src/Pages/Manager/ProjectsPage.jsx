import { useMemo, useState, useEffect } from "react";
import { Plus } from "lucide-react";

import Button from "../../Components/Button/button.jsx";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import { MANAGER_NAV_ITEMS, PROJECTS_KEY } from "./managerConstants.js";
import {
  getProjectsApi,
  createProjectApi,
  getUsersApi,
  assignUserToProjectApi,
  isBackendUser,
} from "../../api/index.js";
import { getSession } from "../../data/users.js";
import { getProjects, createProject } from "../../data/projects.js";

import CreateProjectModal from "../../Components/Modals/CreateProjectModal.jsx";
import AddMemberModal from "../../Components/Modals/AddMemberModal.jsx";
import NotificationModal from "../../Components/Modals/NotificationModal.jsx";

import ProjectCard from "../../Components/ProjectCard.jsx";
import "../../App.css";

function loadLocalProjects() {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* use seed */
  }
  return getProjects();
}

export default function ProjectsPage() {
  const session = getSession();
  const backendUser = isBackendUser(session);

  const [activeKey, setActiveKey] = useState("projects");
  const [apiError, setApiError] = useState(false);
  const [projects, setProjects] = useState(() =>
    backendUser ? [] : loadLocalProjects(),
  );
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!backendUser) return;
    getProjectsApi()
      .then((fetched) => {
        setProjects(fetched);
        setApiError(false);
      })
      .catch(() => {
        setApiError(true);
        setProjects(loadLocalProjects());
      });
  }, [backendUser]);

  useEffect(() => {
    if (!backendUser) return;
    getUsersApi()
      .then((users) => setAvailableUsers(users))
      .catch(() => {});
  }, [backendUser]);

  useEffect(() => {
    if (!backendUser) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    }
  }, [projects, backendUser]);

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

  const handleCreateProject = async (newProject) => {
    if (backendUser && session?.backendId) {
      try {
        const created = await createProjectApi(newProject, session.backendId);
        setProjects((prev) => [created, ...prev]);
        setNotification({
          isOpen: true,
          type: "success",
          title: "Project Created",
          message: `Project "${created.name}" has been created successfully.`,
        });
        return;
      } catch {
        const created = createProject(newProject);
        setProjects((prev) => [created, ...prev]);
        setNotification({
          isOpen: true,
          type: "success",
          title: "Project Created",
          message: `Project "${created.name}" has been created successfully.`,
        });
        return;
      }
    }

    const created = createProject(newProject);
    setProjects((prev) => [created, ...prev]);
    setNotification({
      isOpen: true,
      type: "success",
      title: "Project Created",
      message: `Project "${created.name}" has been created successfully.`,
    });
  };

  const handleAddMembers = async (projectId, newMembers) => {
    if (backendUser && selectedProject?.backendId) {
      for (const member of newMembers) {
        const userId = member.backendId ?? parseInt(member.id, 10);
        if (!isNaN(userId)) {
          try {
            await assignUserToProjectApi(selectedProject.backendId, userId);
          } catch (e) {
            console.warn("Failed to assign member to project:", e.message);
          }
        }
      }
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? { ...project, members: [...(project.members ?? []), ...newMembers] }
          : project,
      ),
    );
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

          {apiError && (
            <div
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                color: "#fbbf24",
                marginBottom: 12,
              }}
            >
              Could not reach the server. Showing cached projects.
            </div>
          )}

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
