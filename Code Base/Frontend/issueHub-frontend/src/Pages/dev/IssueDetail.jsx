// src/Pages/dev/IssueDetail.jsx
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MOCK_ISSUES, STATUSES, today, isOverdue } from "../../data/mockIssues";
import {
  DevShell,
  PageHeader,
  BackLink,
  PriorityTag,
  StatusTag,
  Avatar,
  SectionLabel,
  Card,
  TinyBtn,
  C,
} from "../../Components/dev/DevUI";
import Button from "../../Components/Button/button";

export default function IssueDetailPage() {
  const { id } = useParams();
  const source = MOCK_ISSUES.find((i) => i.id === id);

  if (!source) {
    return (
      <DevShell>
        <div style={{ color: C.muted, fontSize: 14 }}>Issue not found.</div>
      </DevShell>
    );
  }

  return <IssueDetail source={source} />;
}

function IssueDetail({ source }) {
  const [issue, setIssue] = useState(source);
  const [newStatus, setNewStatus] = useState(source.status);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [attachments, setAttachments] = useState(source.attachments);
  const fileRef = useRef();

  const overdue = isOverdue(issue);

  /* ── Status ──────────────────────────────── */
  function handleStatusUpdate() {
    if (newStatus === issue.status) return;
    const now = new Date().toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
    setIssue((prev) => ({
      ...prev,
      status: newStatus,
      statusHistory: [
        ...prev.statusHistory,
        { status: newStatus, date: now, by: "Alex Rivera" },
      ],
    }));
  }

  /* ── Comments ────────────────────────────── */
  function handleAddComment() {
    if (!commentText.trim()) return;
    const now = new Date().toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    });
    setIssue((prev) => ({
      ...prev,
      comments: [
        ...prev.comments,
        {
          id: "c" + Date.now(),
          author: "Alex Rivera",
          avatar: "AR",
          text: commentText.trim(),
          date: now,
          mine: true,
        },
      ],
    }));
    setCommentText("");
  }

  function handleSaveEdit() {
    setIssue((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === editingComment.id ? { ...c, text: editingComment.text } : c,
      ),
    }));
    setEditingComment(null);
  }

  function handleDeleteComment(id) {
    setIssue((prev) => ({
      ...prev,
      comments: prev.comments.filter((c) => c.id !== id),
    }));
  }

  /* ── Attachments ─────────────────────────── */
  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [
      ...prev,
      ...files.map((f) => ({
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
      })),
    ]);
  }

  function AttachIcon({ type }) {
    const map = {
      img: { bg: "#1e3a5f", color: "#60a5fa", label: "IMG" },
      txt: { bg: "#1a3328", color: "#34d399", label: "TXT" },
      fig: { bg: "#2d1e4a", color: "#a78bfa", label: "FIG" },
    };
    const m = map[type] || map.fig;
    return (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: m.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 700,
          color: m.color,
          flexShrink: 0,
        }}
      >
        {m.label}
      </div>
    );
  }

  return (
    <DevShell>
      {/* Back → uses Button with `to` prop (React Router Link) */}
      <BackLink to="/dev/assigned-issues" label="Back to Assigned Issues" />

      <PageHeader 
        title={issue.title}
        subtitle={issue.id}
      />

      {/* Meta tags */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <PriorityTag priority={issue.priority} />
        <StatusTag status={issue.status} />
        {overdue && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#fef2f2",
              color: "#ef4444",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 99,
            }}
          >
            ⚠ Overdue
          </span>
        )}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}
      >
        {/* ── LEFT ── */}
        <div>
          {/* Description */}
          <Card>
            <SectionLabel>Description</SectionLabel>
            <p
              style={{
                fontSize: 14,
                color: "#cbd5e1",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {issue.description}
            </p>
          </Card>

          {/* Comments */}
          <Card>
            <SectionLabel>Comments ({issue.comments.length})</SectionLabel>
            {issue.comments.length === 0 && (
              <div style={{ color: C.subtle, fontSize: 13, marginBottom: 12 }}>
                No comments yet.
              </div>
            )}
            {issue.comments.map((c) => (
              <div
                key={c.id}
                style={{
                  background: c.mine ? "#1a1f35" : C.surface,
                  border: `1px solid ${c.mine ? "#2d3561" : C.border}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Avatar initials={c.avatar} size={24} />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#a78bfa",
                      }}
                    >
                      {c.author}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: C.subtle }}>
                    {c.date}
                  </span>
                </div>

                {editingComment?.id === c.id ? (
                  <>
                    <textarea
                      value={editingComment.text}
                      onChange={(e) =>
                        setEditingComment({
                          ...editingComment,
                          text: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        background: "#0f1117",
                        border: `1px solid ${C.border}`,
                        borderRadius: 8,
                        color: C.text,
                        padding: "10px 12px",
                        fontSize: 13,
                        resize: "vertical",
                        minHeight: 72,
                        marginBottom: 8,
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingComment(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                      }}
                    >
                      {c.text}
                    </div>
                    {c.mine && (
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <TinyBtn
                          onClick={() =>
                            setEditingComment({ id: c.id, text: c.text })
                          }
                        >
                          Edit
                        </TinyBtn>
                        <TinyBtn
                          danger
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          Delete
                        </TinyBtn>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <div style={{ marginTop: 12 }}>
              <textarea
                placeholder="Add a comment…"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  width: "100%",
                  background: "#0f1117",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  color: C.text,
                  padding: "10px 12px",
                  fontSize: 13,
                  resize: "vertical",
                  minHeight: 72,
                  marginBottom: 8,
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <Button variant="primary" size="sm" onClick={handleAddComment}>
                Post Comment
              </Button>
            </div>
          </Card>

          {/* Attachments */}
          <Card>
            <SectionLabel>Attachments ({attachments.length})</SectionLabel>
            {attachments.length === 0 && (
              <div style={{ color: C.subtle, fontSize: 13 }}>
                No attachments yet.
              </div>
            )}
            {attachments.map((att) => (
              <div
                key={att.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AttachIcon type={att.type} />
                  <div>
                    <div
                      style={{ fontSize: 13, color: C.text, fontWeight: 500 }}
                    >
                      {att.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.subtle }}>
                      {att.size} · {att.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => {}}>
                  ↓ Download
                </Button>
              </div>
            ))}
            <div
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${C.border}`,
                borderRadius: 10,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                fontSize: 13,
                color: C.subtle,
                marginTop: 12,
              }}
            >
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
          </Card>
        </div>

        {/* ── RIGHT ── */}
        <div>
          {/* Meta */}
          <Card>
            <SectionLabel>Details</SectionLabel>
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
                <span style={{ color: C.muted }}>{k}</span>
                <span style={{ color: C.text, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </Card>

          {/* Update status */}
          <Card>
            <SectionLabel>Update Status</SectionLabel>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              style={{
                background: "#0f1117",
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                color: C.text,
                padding: "8px 12px",
                fontSize: 13,
                width: "100%",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleStatusUpdate}
            >
              Apply Status Change
            </Button>
          </Card>

          {/* Status history */}
          <Card>
            <SectionLabel>Status History</SectionLabel>
            {issue.statusHistory.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.accent,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: C.text }}>
                    {h.status}
                  </div>
                  <div style={{ color: C.muted, fontSize: 11 }}>
                    {h.by} · {h.date}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </DevShell>
  );
}
