import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getSession } from "../data/users.js";
import { getDevTasksApi, updateIssueStatusApi, isBackendUser } from "../api/index.js";
import { getDevIssues } from "../data/mockIssues.js";

const DevIssuesContext = createContext(null);

export function DevIssuesProvider({ children }) {
  const session = getSession();
  const backendUser = isBackendUser(session);
  const sessionId = session?.id;
  const backendId = session?.backendId;

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (backendUser) {
          const data = await getDevTasksApi(backendId);
          if (!cancelled) setIssues(data);
        } else {
          if (!cancelled) setIssues(getDevIssues(sessionId));
        }
      } catch {
        if (!cancelled) setIssues(getDevIssues(sessionId));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [backendUser, sessionId, backendId]);

  // Optimistic update: reflects immediately across all dev pages, rolls back on API failure.
  const updateIssueStatus = useCallback(async (issueId, issueBackendId, newStatus, prevStatus) => {
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: newStatus } : i));
    if (backendUser && issueBackendId) {
      try {
        await updateIssueStatusApi(issueBackendId, newStatus);
      } catch (err) {
        // Rollback to previous status
        setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: prevStatus } : i));
        throw err;
      }
    }
  }, [backendUser]);

  return (
    <DevIssuesContext.Provider value={{ issues, loading, updateIssueStatus }}>
      {children}
    </DevIssuesContext.Provider>
  );
}

export function useDevIssues() {
  const ctx = useContext(DevIssuesContext);
  if (!ctx) throw new Error("useDevIssues must be used within DevIssuesProvider");
  return ctx;
}
