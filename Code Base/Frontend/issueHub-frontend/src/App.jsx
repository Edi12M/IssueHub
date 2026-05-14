import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Pages/Hero.jsx";
import { AdminDashboardPage } from "./Pages/Dashboard.jsx";
import Users from "./Pages/Users.jsx";
import AssignedIssuesPage from "./Pages/dev/AssignedIssues.jsx";
import FilteredIssuesPage from "./Pages/dev/FilteredIssues.jsx";
import IssueDetailPage from "./Pages/dev/IssueDetail.jsx";
import TasksPage from "./Pages/dev/Tasks.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/users" element={<Users />} />

      {/* Developer Routes */}
      <Route path="/dev" element={<Navigate to="/dev/assigned-issues" replace />} />
      <Route path="/dev/assigned-issues" element={<AssignedIssuesPage />} />
      <Route
        path="/dev/assigned-issues/:status"
        element={<FilteredIssuesPage />}
      />
      <Route path="/dev/issues/:id" element={<IssueDetailPage />} />
      <Route path="/dev/tasks" element={<TasksPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
