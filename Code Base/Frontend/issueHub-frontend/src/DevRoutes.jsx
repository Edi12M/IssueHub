/**
 * IssueHub — Developer Route Config
 * 
 * Add these routes inside your existing <Routes> block.
 * All dev pages use the real Sidebar (react-router-dom) and Button components.
 */

import { Routes, Route } from "react-router-dom";

import AssignedIssuesPage from "./pages/dev/AssignedIssues";
import FilteredIssuesPage from "./pages/dev/FilteredIssues";
import IssueDetailPage    from "./pages/dev/IssueDetail";
import TasksPage          from "./pages/dev/Tasks";

export default function DevRoutes() {
  return (
    <Routes>
      {/* /dev/assigned-issues — full list, "All" filter active */}
      <Route path="/dev/assigned-issues" element={<AssignedIssuesPage />} />

      {/* /dev/assigned-issues/open
          /dev/assigned-issues/in-progress
          /dev/assigned-issues/review
          /dev/assigned-issues/completed
          /dev/assigned-issues/blocked      */}
      <Route path="/dev/assigned-issues/:status" element={<FilteredIssuesPage />} />

      {/* /dev/issues/ISS-001  etc. */}
      <Route path="/dev/issues/:id" element={<IssueDetailPage />} />

      {/* /dev/tasks */}
      <Route path="/dev/tasks" element={<TasksPage />} />
    </Routes>
  );
}
