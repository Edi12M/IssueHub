import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../data/users.js";

// Where each role belongs by default — used to bounce a logged-in user who
// hits a route they aren't allowed to see (instead of dumping them on login).
const ROLE_HOME = {
  "System Administrator": "/admin",
  "Project Manager": "/manager",
  Developer: "/dev/assigned-issues",
  Viewer: "/dev/assigned-issues",
};

/**
 * Gate for authenticated routes.
 *
 * - No valid session (missing or expired — getSession() drops stale tokens) →
 *   redirect to the login page.
 * - Valid session but role not in `allowedRoles` → redirect to that role's home.
 *
 * Use as a layout route (renders <Outlet/>) or with children.
 */
export default function ProtectedRoute({ allowedRoles, children }) {
  const session = getSession();

  if (!session || !session.role) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return <Navigate to={ROLE_HOME[session.role] ?? "/"} replace />;
  }

  return children ?? <Outlet />;
}
