import { useState, useRef } from "react";
import { today, isOverdue } from "../data/mockIssues.js";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const MOCK_ISSUES = [
  {
    id: "ISS-001",
    title: "Fix login timeout bug",
    description:
      "Users are being logged out unexpectedly after 2 minutes of inactivity even though session timeout is set to 30 minutes. Investigate the JWT refresh logic and ensure tokens are being renewed correctly.",
    priority: "High",
    status: "In Progress",
    deadline: "2026-05-08",
    project: "AuthService",
    assignee: "Alex Rivera",
    createdAt: "2026-04-28",
    statusHistory: [
      { status: "Open", date: "2026-04-28", by: "Maria Chen (PM)" },
      { status: "In Progress", date: "2026-05-01", by: "Alex Rivera" },
    ],
    comments: [
      {
        id: "c1",
        author: "Alex Rivera",
        avatar: "AR",
        text: "Looking into the JWT refresh middleware now. Might be a race condition.",
        date: "2026-05-01 09:14",
        mine: true,
      },
      {
        id: "c2",
        author: "Maria Chen",
        avatar: "MC",
        text: "Thanks Alex! Let me know if you need anything from the backend team.",
        date: "2026-05-01 10:02",
        mine: false,
      },
    ],
    attachments: [
      {
        id: "a1",
        name: "session-logs.txt",
        size: "12 KB",
        type: "txt",
        date: "2026-04-29",
      },
      {
        id: "a2",
        name: "error-screenshot.png",
        size: "84 KB",
        type: "img",
        date: "2026-04-30",
      },
    ],
  },
  {
    id: "ISS-002",
    title: "Design new dashboard layout",
    description:
      "The current dashboard feels cluttered. Redesign it using the new design system tokens. Focus on clarity, hierarchy, and ensuring mobile responsiveness.",
    priority: "Medium",
    status: "Open",
    deadline: "2026-05-15",
    project: "Frontend",
    assignee: "Alex Rivera",
    createdAt: "2026-05-01",
    statusHistory: [
      { status: "Open", date: "2026-05-01", by: "Maria Chen (PM)" },
    ],
    comments: [],
    attachments: [
      {
        id: "a3",
        name: "figma-mockup.fig",
        size: "2.1 MB",
        type: "fig",
        date: "2026-05-01",
      },
    ],
  },
  {
    id: "ISS-003",
    title: "Write unit tests for payment module",
    description:
      "Coverage for the payment module is at 34%. We need at least 80% coverage before the next release. Focus on edge cases: failed transactions, refunds, and currency conversion.",
    priority: "High",
    status: "Completed",
    deadline: "2026-05-03",
    project: "Payments",
    assignee: "Alex Rivera",
    createdAt: "2026-04-25",
    statusHistory: [
      { status: "Open", date: "2026-04-25", by: "Sam Torres (PM)" },
      { status: "In Progress", date: "2026-04-27", by: "Alex Rivera" },
      { status: "Completed", date: "2026-05-03", by: "Alex Rivera" },
    ],
    comments: [
      {
        id: "c3",
        author: "Alex Rivera",
        avatar: "AR",
        text: "Tests done! Coverage is now at 87%. PR submitted.",
        date: "2026-05-03 16:45",
        mine: true,
      },
    ],
    attachments: [],
  },
  {
    id: "ISS-004",
    title: "Integrate Stripe webhook",
    description:
      "Set up Stripe webhook listeners for payment_intent.succeeded and payment_intent.payment_failed events. Store events in DB and trigger appropriate notifications.",
    priority: "Low",
    status: "Open",
    deadline: "2026-04-30",
    project: "Payments",
    assignee: "Alex Rivera",
    createdAt: "2026-04-20",
    statusHistory: [
      { status: "Open", date: "2026-04-20", by: "Sam Torres (PM)" },
    ],
    comments: [],
    attachments: [],
  },
  {
    id: "ISS-005",
    title: "Optimize image loading pipeline",
    description:
      "Profile the image loading pipeline and implement lazy loading + WebP conversion. Target: reduce initial page load by 40%.",
    priority: "Medium",
    status: "In Progress",
    deadline: "2026-05-20",
    project: "Frontend",
    assignee: "Alex Rivera",
    createdAt: "2026-05-02",
    statusHistory: [
      { status: "Open", date: "2026-05-02", by: "Maria Chen (PM)" },
      { status: "In Progress", date: "2026-05-04", by: "Alex Rivera" },
    ],
    comments: [],
    attachments: [],
  },
];

const STATUSES = ["Open", "In Progress", "Review", "Completed", "Blocked"];

const PRIORITY_META = {
  High: { color: "#ff4d4d", bg: "#fff0f0", dot: "#ff4d4d" },
  Medium: { color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  Low: { color: "#22c55e", bg: "#f0fdf4", dot: "#22c55e" },
};

const STATUS_META = {
  Open: { color: "#6366f1", bg: "#eef2ff" },
  "In Progress": { color: "#f59e0b", bg: "#fffbeb" },
  Review: { color: "#8b5cf6", bg: "#f5f3ff" },
  Completed: { color: "#22c55e", bg: "#f0fdf4" },
  Blocked: { color: "#ef4444", bg: "#fef2f2" },
};

/* ─────────────────────────────────────────────
   STYLES (CSS-in-JS object)
───────────────────────────────────────────── */
const S = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#0f1117",
    minHeight: "100vh",
    color: "#e2e8f0",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#161b27",
    borderBottom: "1px solid #1e2535",
    padding: "0 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 58,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'DM Mono', monospace",
    fontWeight: 700,
    fontSize: 18,
    color: "#7c8cf8",
    letterSpacing: -0.5,
  },
  logoSpan: { color: "#e2e8f0" },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#1e2535",
    borderRadius: 99,
    padding: "5px 14px 5px 8px",
    fontSize: 13,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#7c8cf8,#a78bfa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'DM Mono', monospace",
  },
  layout: { display: "flex", flex: 1 },
  sidebar: {
    width: 200,
    background: "#161b27",
    borderRight: "1px solid #1e2535",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    position: "sticky",
    top: 58,
    height: "calc(100vh - 58px)",
    overflowY: "auto",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 20px",
    cursor: "pointer",
    fontSize: 13.5,
    fontWeight: active ? 600 : 400,
    color: active ? "#7c8cf8" : "#8892a4",
    background: active ? "#1e2535" : "transparent",
    borderLeft: active ? "3px solid #7c8cf8" : "3px solid transparent",
    transition: "all .15s",
    userSelect: "none",
  }),
  main: { flex: 1, padding: "28px 32px", overflowY: "auto" },
  pageTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 4,
    color: "#f1f5f9",
  },
  pageSubtitle: { fontSize: 13, color: "#64748b", marginBottom: 24 },
  card: {
    background: "#161b27",
    border: "1px solid #1e2535",
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 16,
    cursor: "pointer",
    transition: "border-color .15s, transform .1s",
  },
  cardHover: { borderColor: "#7c8cf8", transform: "translateY(-1px)" },
  issueRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  issueId: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    color: "#64748b",
    marginBottom: 4,
  },
  issueTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#f1f5f9",
    marginBottom: 8,
  },
  tag: (color, bg) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: bg,
    color: color,
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 9px",
    borderRadius: 99,
  }),
  dot: (color) => ({
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: color,
  }),
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  deadlineText: (overdue) => ({
    fontSize: 12,
    color: overdue ? "#ef4444" : "#64748b",
  }),
  pill: (color) => ({
    background: "#1e2535",
    color: color || "#94a3b8",
    fontSize: 11,
    padding: "2px 9px",
    borderRadius: 99,
    fontWeight: 500,
  }),
  filterBar: { display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" },
  filterBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 99,
    border: "1px solid",
    borderColor: active ? "#7c8cf8" : "#1e2535",
    background: active ? "#1e2535" : "transparent",
    color: active ? "#7c8cf8" : "#64748b",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .15s",
  }),
  sortBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 99,
    border: "1px solid #1e2535",
    background: active ? "#7c8cf8" : "transparent",
    color: active ? "#fff" : "#64748b",
    fontSize: 12,
    cursor: "pointer",
  }),
  // Detail view
  detailBack: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#7c8cf8",
    fontSize: 13,
    cursor: "pointer",
    marginBottom: 20,
    fontWeight: 500,
  },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 },
  detailCard: {
    background: "#161b27",
    border: "1px solid #1e2535",
    borderRadius: 12,
    padding: "24px",
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  descText: { fontSize: 14, color: "#cbd5e1", lineHeight: 1.7 },
  statusSelect: {
    background: "#0f1117",
    border: "1px solid #1e2535",
    borderRadius: 8,
    color: "#e2e8f0",
    padding: "8px 12px",
    fontSize: 13,
    width: "100%",
    cursor: "pointer",
    marginBottom: 10,
  },
  updateBtn: {
    width: "100%",
    padding: "9px",
    background: "linear-gradient(135deg,#7c8cf8,#a78bfa)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  historyItem: {
    display: "flex",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid #1e2535",
    fontSize: 13,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#7c8cf8",
    marginTop: 5,
    flexShrink: 0,
  },
  commentBubble: (mine) => ({
    background: mine ? "#1a1f35" : "#161b27",
    border: `1px solid ${mine ? "#2d3561" : "#1e2535"}`,
    borderRadius: 10,
    padding: "12px 14px",
    marginBottom: 10,
  }),
  commentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  commentAuthor: { fontSize: 12, fontWeight: 700, color: "#a78bfa" },
  commentDate: { fontSize: 11, color: "#475569" },
  commentText: { fontSize: 13.5, color: "#cbd5e1", lineHeight: 1.6 },
  commentActions: { display: "flex", gap: 8, marginTop: 8 },
  tinyBtn: (danger) => ({
    fontSize: 11,
    color: danger ? "#ef4444" : "#64748b",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontWeight: 600,
  }),
  textarea: {
    width: "100%",
    background: "#0f1117",
    border: "1px solid #1e2535",
    borderRadius: 8,
    color: "#e2e8f0",
    padding: "10px 12px",
    fontSize: 13,
    resize: "vertical",
    minHeight: 72,
    marginBottom: 8,
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  sendBtn: {
    padding: "7px 18px",
    background: "#7c8cf8",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  attachRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "9px 0",
    borderBottom: "1px solid #1e2535",
    fontSize: 13,
  },
  attachIcon: (type) => ({
    width: 32,
    height: 32,
    borderRadius: 6,
    background:
      type === "img" ? "#1e3a5f" : type === "txt" ? "#1a3328" : "#2d1e4a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    color: type === "img" ? "#60a5fa" : type === "txt" ? "#34d399" : "#a78bfa",
    flexShrink: 0,
  }),
  uploadZone: {
    border: "2px dashed #1e2535",
    borderRadius: 10,
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
    marginTop: 12,
    transition: "border-color .2s",
  },
  // Tasks page
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14,
    marginBottom: 24,
  },
  statCard: (accent) => ({
    background: "#161b27",
    border: `1px solid ${accent}33`,
    borderRadius: 12,
    padding: "18px 20px",
  }),
  statNum: (accent) => ({
    fontSize: 28,
    fontWeight: 800,
    color: accent,
    lineHeight: 1,
  }),
  statLabel: { fontSize: 12, color: "#64748b", marginTop: 4 },
  taskRow: (overdue, done) => ({
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "12px 16px",
    background: "#161b27",
    border: "1px solid",
    borderColor: overdue ? "#ef444422" : done ? "#22c55e22" : "#1e2535",
    borderRadius: 10,
    marginBottom: 8,
    cursor: "pointer",
  }),
  taskTitle: (done) => ({
    fontSize: 14,
    fontWeight: 600,
    color: done ? "#475569" : "#f1f5f9",
    textDecoration: done ? "line-through" : "none",
    flex: 1,
  }),
};

/* ─────────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────────── */
function Tag({ priority }) {
  const m = PRIORITY_META[priority] || PRIORITY_META.Low;
  return (
    <span style={S.tag(m.color, m.bg)}>
      <span style={S.dot(m.dot)} />
      {priority}
    </span>
  );
}
function StatusTag({ status }) {
  const m = STATUS_META[status] || { color: "#94a3b8", bg: "#1e2535" };
  return <span style={S.tag(m.color, m.bg)}>{status}</span>;
}
function Avatar({ initials, size = 28 }) {
  return (
    <div
      style={{
        ...S.avatar,
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ISSUE CARD (list item)
───────────────────────────────────────────── */
function IssueCard({ issue, onClick }) {
  const [hovered, setHovered] = useState(false);
  const overdue = isOverdue(issue);
  return (
    <div
      style={{ ...S.card, ...(hovered ? S.cardHover : {}) }}
      onClick={() => onClick(issue)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={S.issueRow}>
        <div style={{ flex: 1 }}>
          <div style={S.issueId}>
            {issue.id} · {issue.project}
          </div>
          <div style={S.issueTitle}>{issue.title}</div>
          <div style={S.metaRow}>
            <Tag priority={issue.priority} />
            <StatusTag status={issue.status} />
            <span style={S.deadlineText(overdue)}>
              {overdue ? "⚠ Overdue · " : "Due: "}
              {issue.deadline}
            </span>
          </div>
        </div>
        <Avatar initials="AR" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEW: ASSIGNED ISSUES
───────────────────────────────────────────── */
function AssignedIssuesView({ issues, onSelect }) {
  const [filter, setFilter] = useState("All");
  const filters = [
    "All",
    "Open",
    "In Progress",
    "Review",
    "Completed",
    "Blocked",
  ];
  const shown =
    filter === "All" ? issues : issues.filter((i) => i.status === filter);
  return (
    <div>
      <div style={S.pageTitle}>My Assigned Issues</div>
      <div style={S.pageSubtitle}>{issues.length} issues assigned to you</div>
      <div style={S.filterBar}>
        {filters.map((f) => (
          <button
            key={f}
            style={S.filterBtn(filter === f)}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {shown.length === 0 && (
        <div
          style={{
            color: "#475569",
            fontSize: 14,
            padding: "40px 0",
            textAlign: "center",
          }}
        >
          No issues match this filter.
        </div>
      )}
      {shown.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onClick={onSelect} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEW: ISSUE DETAIL
───────────────────────────────────────────── */
function IssueDetailView({ issue: initIssue, onBack, onUpdate }) {
  const [issue, setIssue] = useState(initIssue);
  const [newStatus, setNewStatus] = useState(initIssue.status);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null); // {id, text}
  const [attachments, setAttachments] = useState(initIssue.attachments);
  const fileRef = useRef();

  function handleStatusUpdate() {
    if (newStatus === issue.status) return;
    const now = new Date().toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const updated = {
      ...issue,
      status: newStatus,
      statusHistory: [
        ...issue.statusHistory,
        { status: newStatus, date: now, by: "Alex Rivera" },
      ],
    };
    setIssue(updated);
    onUpdate(updated);
  }

  function handleAddComment() {
    if (!commentText.trim()) return;
    const now = new Date().toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const newComment = {
      id: "c" + Date.now(),
      author: "Alex Rivera",
      avatar: "AR",
      text: commentText.trim(),
      date: now,
      mine: true,
    };
    const updated = { ...issue, comments: [...issue.comments, newComment] };
    setIssue(updated);
    onUpdate(updated);
    setCommentText("");
  }

  function handleEditComment(id) {
    const c = issue.comments.find((x) => x.id === id);
    setEditingComment({ id, text: c.text });
  }
  function handleSaveEdit() {
    const updated = {
      ...issue,
      comments: issue.comments.map((c) =>
        c.id === editingComment.id ? { ...c, text: editingComment.text } : c,
      ),
    };
    setIssue(updated);
    onUpdate(updated);
    setEditingComment(null);
  }
  function handleDeleteComment(id) {
    const updated = {
      ...issue,
      comments: issue.comments.filter((c) => c.id !== id),
    };
    setIssue(updated);
    onUpdate(updated);
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    const newAtts = files.map((f) => ({
      id: "a" + Date.now() + Math.random(),
      name: f.name,
      size:
        f.size > 1024 * 1024
          ? (f.size / 1024 / 1024).toFixed(1) + " MB"
          : Math.round(f.size / 1024) + " KB",
      type: f.name.match(/\.(png|jpg|jpeg|gif|webp)$/i)
        ? "img"
        : f.name.match(/\.txt$/i)
          ? "txt"
          : "fig",
      date: today(),
    }));
    setAttachments((prev) => [...prev, ...newAtts]);
  }

  const overdue = isOverdue(issue);

  return (
    <div>
      <div style={S.detailBack} onClick={onBack}>
        ← Back to Issues
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "#64748b",
          }}
        >
          {issue.id}
        </span>
        <Tag priority={issue.priority} />
        <StatusTag status={issue.status} />
        {overdue && <span style={S.tag("#ef4444", "#fef2f2")}>⚠ Overdue</span>}
      </div>
      <div style={{ ...S.pageTitle, marginBottom: 20 }}>{issue.title}</div>

      <div style={S.detailGrid}>
        {/* LEFT COLUMN */}
        <div>
          {/* Description */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Description</div>
            <div style={S.descText}>{issue.description}</div>
          </div>

          {/* Comments */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Comments ({issue.comments.length})</div>
            {issue.comments.length === 0 && (
              <div style={{ color: "#475569", fontSize: 13, marginBottom: 12 }}>
                No comments yet.
              </div>
            )}
            {issue.comments.map((c) => (
              <div key={c.id} style={S.commentBubble(c.mine)}>
                <div style={S.commentHeader}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Avatar initials={c.avatar} size={24} />
                    <span style={S.commentAuthor}>{c.author}</span>
                  </div>
                  <span style={S.commentDate}>{c.date}</span>
                </div>
                {editingComment && editingComment.id === c.id ? (
                  <>
                    <textarea
                      style={S.textarea}
                      value={editingComment.text}
                      onChange={(e) =>
                        setEditingComment({
                          ...editingComment,
                          text: e.target.value,
                        })
                      }
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={S.sendBtn} onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        style={{ ...S.sendBtn, background: "#1e2535" }}
                        onClick={() => setEditingComment(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={S.commentText}>{c.text}</div>
                    {c.mine && (
                      <div style={S.commentActions}>
                        <button
                          style={S.tinyBtn(false)}
                          onClick={() => handleEditComment(c.id)}
                        >
                          Edit
                        </button>
                        <button
                          style={S.tinyBtn(true)}
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <div style={{ marginTop: 12 }}>
              <textarea
                style={S.textarea}
                placeholder="Add a comment…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button style={S.sendBtn} onClick={handleAddComment}>
                Post Comment
              </button>
            </div>
          </div>

          {/* Attachments */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Attachments ({attachments.length})</div>
            {attachments.length === 0 && (
              <div style={{ color: "#475569", fontSize: 13 }}>
                No attachments yet.
              </div>
            )}
            {attachments.map((att) => (
              <div key={att.id} style={S.attachRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={S.attachIcon(att.type)}>
                    {att.type === "img"
                      ? "IMG"
                      : att.type === "txt"
                        ? "TXT"
                        : "FIG"}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#e2e8f0",
                        fontWeight: 500,
                      }}
                    >
                      {att.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#475569" }}>
                      {att.size} · {att.date}
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    ...S.tinyBtn(false),
                    fontSize: 12,
                    color: "#7c8cf8",
                  }}
                >
                  ↓ Download
                </button>
              </div>
            ))}
            <div style={S.uploadZone} onClick={() => fileRef.current.click()}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>📎</div>
              <div>Click to upload a file</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                Any file type supported
              </div>
            </div>
            <input
              type="file"
              multiple
              ref={fileRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Issue Meta */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Details</div>
            {[
              ["Project", issue.project],
              ["Assignee", issue.assignee],
              ["Priority", issue.priority],
              ["Created", issue.createdAt],
              ["Deadline", issue.deadline],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  fontSize: 13,
                }}
              >
                <span style={{ color: "#64748b" }}>{k}</span>
                <span style={{ color: "#e2e8f0", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Update Status */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Update Status</div>
            <select
              style={S.statusSelect}
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button style={S.updateBtn} onClick={handleStatusUpdate}>
              Apply Status Change
            </button>
          </div>

          {/* Status History */}
          <div style={S.detailCard}>
            <div style={S.sectionLabel}>Status History</div>
            {issue.statusHistory.map((h, i) => (
              <div key={i} style={S.historyItem}>
                <div style={S.historyDot} />
                <div>
                  <div
                    style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}
                  >
                    {h.status}
                  </div>
                  <div style={{ color: "#64748b", fontSize: 11 }}>
                    {h.by} · {h.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEW: PERSONAL TASKS
───────────────────────────────────────────── */
function PersonalTasksView({ issues, onSelect }) {
  const [sort, setSort] = useState("deadline");

  const sorted = [...issues].sort((a, b) => {
    if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
    const po = { High: 0, Medium: 1, Low: 2 };
    return po[a.priority] - po[b.priority];
  });

  const total = issues.length;
  const completed = issues.filter((i) => i.status === "Completed").length;
  const overdue = issues.filter((i) => isOverdue(i)).length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;

  return (
    <div>
      <div style={S.pageTitle}>My Tasks</div>
      <div style={S.pageSubtitle}>Personal task tracker — sorted by {sort}</div>

      <div style={S.statsGrid}>
        {[
          { label: "Total", val: total, color: "#7c8cf8" },
          { label: "In Progress", val: inProgress, color: "#f59e0b" },
          { label: "Completed", val: completed, color: "#22c55e" },
          { label: "Overdue", val: overdue, color: "#ef4444" },
        ].map(({ label, val, color }) => (
          <div key={label} style={S.statCard(color)}>
            <div style={S.statNum(color)}>{val}</div>
            <div style={S.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#64748b", alignSelf: "center" }}>
          Sort by:
        </span>
        {["deadline", "priority"].map((s) => (
          <button
            key={s}
            style={S.sortBtn(sort === s)}
            onClick={() => setSort(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {sorted.map((issue) => {
        const done = issue.status === "Completed";
        const od = isOverdue(issue);
        return (
          <div
            key={issue.id}
            style={S.taskRow(od, done)}
            onClick={() => onSelect(issue)}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: `2px solid ${done ? "#22c55e" : od ? "#ef4444" : "#7c8cf8"}`,
                background: done ? "#22c55e" : "transparent",
                flexShrink: 0,
              }}
            />
            <div style={S.taskTitle(done)}>{issue.title}</div>
            <Tag priority={issue.priority} />
            <StatusTag status={issue.status} />
            <span style={S.deadlineText(od)}>
              {od && !done ? "⚠ " : ""}
              {issue.deadline}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function IssueHubDeveloper() {
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [nav, setNav] = useState("issues");
  const [selected, setSelected] = useState(null);

  function handleUpdate(updated) {
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setSelected(updated);
  }

  function openIssue(issue) {
    setSelected(issue);
    setNav("detail");
  }

  const navItems = [
    { id: "issues", label: "Assigned Issues", icon: "📋" },
    { id: "tasks", label: "My Tasks", icon: "✅" },
  ];

  return (
    <div style={S.root}>
      {/* Top Bar */}
      <div style={S.topBar}>
        <div style={S.logo}>
          Issue<span style={S.logoSpan}>Hub</span>
        </div>
        <div style={S.userChip}>
          <Avatar initials="AR" />
          <span>Alex Rivera</span>
          <span style={{ color: "#475569" }}>· Developer</span>
        </div>
      </div>

      <div style={S.layout}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={S.navItem(
                nav === item.id || (nav === "detail" && item.id === "issues"),
              )}
              onClick={() => {
                setNav(item.id);
                if (item.id !== "detail") setSelected(null);
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={S.main}>
          {nav === "detail" && selected ? (
            <IssueDetailView
              issue={selected}
              onBack={() => {
                setNav("issues");
                setSelected(null);
              }}
              onUpdate={handleUpdate}
            />
          ) : nav === "tasks" ? (
            <PersonalTasksView issues={issues} onSelect={openIssue} />
          ) : (
            <AssignedIssuesView issues={issues} onSelect={openIssue} />
          )}
        </div>
      </div>
    </div>
  );
}
