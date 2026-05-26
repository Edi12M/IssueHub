import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Users from "./Pages/Users.jsx";
import Login from "./Pages/Login.jsx";

// Admin pages
import { AdminDashboardPage } from "./Pages/Admin/AdminDashboardPage.jsx";
import AdminProjectsPage from "./Pages/Admin/AdminProjectsPage.jsx";
import AdminAuditLogPage from "./Pages/Admin/AdminAuditLogPage.jsx";
import AdminSettingsPage from "./Pages/Admin/AdminSettingsPage.jsx";

// Manager pages
import { ManagerDashboardPage } from "./Pages/Manager/ManagerLayout.jsx";
import ProjectsPage from "./Pages/Manager/ProjectsPage.jsx";
import TasksPage from "./Pages/Manager/TasksPage.jsx";
import KanbanPage from "./Pages/Manager/KanbanPage.jsx";
import AnalyticsPage from "./Pages/Manager/AnalyticsPage.jsx";
import CapacityPage from "./Pages/Manager/CapacityPage.jsx";
import MeetingCapturePage from "./Pages/Manager/MeetingCapturePage.jsx";
import PMSettingsPage from "./Pages/Manager/PMSettingsPage.jsx";
import TimeTrackingPage from "./Pages/Manager/TimeTrackingPage.jsx";
import TimelinePage from "./Pages/Manager/TimelinePage.jsx";
import SprintPage from "./Pages/Manager/SprintPage.jsx";
import AssignedIssuesPage from "./Pages/dev/AssignedIssues.jsx";
import FilteredIssuesPage from "./Pages/dev/FilteredIssues.jsx";
import IssueDetailPage from "./Pages/dev/IssueDetail.jsx";
import DevTasksPage from "./Pages/dev/Tasks.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin routes */}
      <Route element={<ProtectedRoute allowedRoles={["System Administrator"]} />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />
        <Route path="/admin/audit" element={<AdminAuditLogPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Manager routes */}
      <Route element={<ProtectedRoute allowedRoles={["Project Manager"]} />}>
        <Route path="/manager" element={<ManagerDashboardPage />} />
        <Route path="/manager/projects" element={<ProjectsPage />} />
        <Route path="/manager/kanban" element={<KanbanPage />} />
        <Route path="/manager/timeline" element={<TimelinePage />} />
        <Route path="/manager/capacity" element={<CapacityPage />} />
        <Route path="/manager/sprints" element={<SprintPage />} />
        <Route path="/manager/meetings" element={<MeetingCapturePage />} />
        <Route path="/manager/analytics" element={<AnalyticsPage />} />
        <Route path="/manager/timetracking" element={<TimeTrackingPage />} />
        <Route path="/manager/settings" element={<PMSettingsPage />} />
        <Route path="/manager/tasks" element={<TasksPage />} />
      </Route>

      {/* Developer Routes */}
      <Route element={<ProtectedRoute allowedRoles={["Developer", "Viewer"]} />}>
        <Route
          path="/dev"
          element={<Navigate to="/dev/assigned-issues" replace />}
        />
        <Route path="/dev/assigned-issues" element={<AssignedIssuesPage />} />
        <Route
          path="/dev/assigned-issues/:status"
          element={<FilteredIssuesPage />}
        />
        <Route path="/dev/issues/:id" element={<IssueDetailPage />} />
        <Route path="/dev/tasks" element={<DevTasksPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
