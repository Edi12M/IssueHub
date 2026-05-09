import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Pages/Hero.jsx";
import { AdminDashboardPage } from "./Pages/Dashboard.jsx";
import { ManagerDashboardPage } from "./Pages/Manager/ManagerLayout.jsx";
import Users from "./Pages/Users.jsx";
import Login from "./Pages/Login.jsx";
import ProjectsPage from "./Pages/Manager/ProjectsPage.jsx";
import TasksPage from "./Pages/Manager/TasksPage.jsx";
import KanbanPage from "./Pages/Manager/KanbanPage.jsx";
import AnalyticsPage from "./Pages/Manager/AnalyticsPage.jsx";
import PMSettingsPage from "./Pages/Manager/PMSettingsPage.jsx";
import TimeTrackingPage from "./Pages/Manager/TimeTrackingPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/manager" element={<ManagerDashboardPage />} />
      <Route path="/manager/projects" element={<ProjectsPage />} />
      <Route path="/manager/tasks" element={<TasksPage />} />
      <Route path="/manager/kanban" element={<KanbanPage />} />
      <Route path="/manager/analytics" element={<AnalyticsPage />} />
      <Route path="/manager/timetracking" element={<TimeTrackingPage />} />
      <Route path="/manager/settings" element={<PMSettingsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
