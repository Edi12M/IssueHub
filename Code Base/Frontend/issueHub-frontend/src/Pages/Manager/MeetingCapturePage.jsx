import { useMemo, useState, useEffect } from "react";
import { FileText, CheckCircle2, Sparkles, ClipboardList } from "lucide-react";

import Button from "../../Components/Button/button.jsx";
import Sidebar from "../../Components/SideBar/sideBar.jsx";
import {
  MANAGER_NAV_ITEMS,
  PROJECTS_KEY,
  INITIAL_PROJECTS,
} from "./managerConstants.js";
import { getTasks, saveTasks } from "../../data/tasks.js";
import "../../App.css";

const MEETING_RECORDS_KEY = "issuehub_meeting_records";

function loadMeetingRecords() {
  try {
    const stored = localStorage.getItem(MEETING_RECORDS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function createMockTranscript(fileName) {
  const name = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  return `Transcript generated from ${fileName}.\n\nHighlights:\n- Capture follow-up actions from the ${name} meeting.\n- Identify owners, deadlines, and next steps.\n- Review any blockers or decisions that need alignment.\n\nSuggested action items:`;
}

function buildActionItems(text, projectName) {
  const lower = text.toLowerCase();
  const actions = [];

  if (lower.includes("review")) {
    actions.push({
      title: `Review ${projectName} deliverables`,
      description: `Review the project deliverables and confirm the next acceptance criteria.`,
      priority: "High",
    });
  }

  if (lower.includes("deadline") || lower.includes("due")) {
    actions.push({
      title: `Confirm upcoming deadlines`,
      description: `Validate the dates for upcoming milestones and update the project schedule.`,
      priority: "Medium",
    });
  }

  if (lower.includes("blocker") || lower.includes("blocked")) {
    actions.push({
      title: `Resolve blockers for the current sprint`,
      description: `Identify the blocker, assign an owner, and define the next step to unblock progress.`,
      priority: "Critical",
    });
  }

  if (lower.includes("decision") || lower.includes("agreed")) {
    actions.push({
      title: `Document decisions made in meeting`,
      description: `Record all decisions agreed upon during the meeting for future reference.`,
      priority: "Medium",
    });
  }

  if (lower.includes("risk") || lower.includes("concern")) {
    actions.push({
      title: `Log identified risks`,
      description: `Document risks raised during the meeting and assign mitigation owners.`,
      priority: "High",
    });
  }

  if (actions.length === 0) {
    actions.push(
      {
        title: `Capture follow-up tasks from ${projectName}`,
        description: `Turn the meeting notes into actionable work items for the project team.`,
        priority: "Medium",
      },
      {
        title: `Assign owners for the next sprint items`,
        description: `Assign the next set of action items to responsible team members.`,
        priority: "High",
      },
      {
        title: `Validate next meeting agenda`,
        description: `Document the decisions and prepare the agenda for the next meeting.`,
        priority: "Low",
      },
    );
  }

  return actions.map((action, index) => ({
    id: `suggested-${Date.now()}-${index}`,
    selected: true,
    ...action,
  }));
}

function generateSummary(selected, projectName) {
  const hasBlocker = selected.some((t) =>
    t.title.toLowerCase().includes("blocker"),
  );
  const hasDeadline = selected.some((t) =>
    t.title.toLowerCase().includes("deadline"),
  );

  return {
    decisionsMatch: `Team agreed to proceed with the current sprint plan for ${projectName}.`,
    risksIdentified: hasBlocker
      ? `A blocker was identified and assigned for resolution.`
      : hasDeadline
        ? `Deadline pressure noted — team to monitor upcoming milestones closely.`
        : `No critical risks identified during this meeting.`,
    tasksCreated: selected.map((t) => `• ${t.title}`).join("\n"),
    nextMeetingPoints: `Follow up on task progress.\nReview any newly identified blockers.\nConfirm sprint velocity.`,
  };
}

export default function MeetingCapturePage() {
  const [activeKey, setActiveKey] = useState("meetings");
  const [projects] = useState(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // shared
  const [projectId, setProjectId] = useState("");
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [meetingRecords, setMeetingRecords] = useState(loadMeetingRecords);
  const [message, setMessage] = useState("");

  // PM_09 — audio
  const [inputMode, setInputMode] = useState("audio");
  const [fileName, setFileName] = useState("");

  // PM_10 — transcript
  const [pastedText, setPastedText] = useState("");
  const [transcriptFile, setTranscriptFile] = useState("");

  // PM_11 — summary
  const [summary, setSummary] = useState(null);
  const [summaryEdits, setSummaryEdits] = useState({});
  const [summarySaved, setSummarySaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(MEETING_RECORDS_KEY, JSON.stringify(meetingRecords));
  }, [meetingRecords]);

  // ── PM_09 handler ──
  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setTranscript(createMockTranscript(file.name));
    setSuggestions([]);
    setSummary(null);
    setMessage("Audio file loaded. Generate suggested tasks next.");
  }

  // ── PM_10 handler ──
  function handleTranscriptFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setTranscriptFile(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setPastedText(text);
      setTranscript(text);
      setSuggestions([]);
      setSummary(null);
      setMessage("Transcript file loaded. Generate suggested tasks next.");
    };
    reader.readAsText(file);
  }

  function handleGenerateSuggestions() {
    if (!projectId) {
      setMessage("Please choose a project before generating suggested tasks.");
      return;
    }

    const source =
      inputMode === "audio" ? transcript : pastedText || transcript;

    if (!source.trim()) {
      setMessage(
        inputMode === "audio"
          ? "Upload an audio file first."
          : "Paste or upload a transcript first.",
      );
      return;
    }

    const projectName =
      projects.find((p) => p.id === projectId)?.name || "Selected project";
    const extracted = buildActionItems(source, projectName);

    setSuggestions(extracted);
    setSummary(null);
    setSummarySaved(false);
    setMessage(
      `${extracted.length} suggested task(s) generated. Review and confirm the ones you want to create.`,
    );
  }

  function toggleSuggestion(selectedId) {
    setSuggestions((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, selected: !item.selected } : item,
      ),
    );
  }

  // ── PM_09 + PM_10 confirm, then trigger PM_11 ──
  function handleCreateTasks() {
    const selected = suggestions.filter((item) => item.selected);
    if (selected.length === 0) {
      setMessage("Select at least one suggested task before creating.");
      return;
    }

    const existingTasks = getTasks();
    const newTasks = selected.map((item, index) => ({
      id: `TASK-${Date.now()}-${index}`,
      title: item.title,
      description: item.description,
      type: "Meeting Action",
      acceptanceCriteria: "",
      subtasks: [],
      projectId,
      assignees: [],
      dependencies: [],
      priority: item.priority,
      startDate: null,
      dueDate: null,
      status: "Backlog",
      createdAt: new Date().toISOString(),
    }));

    saveTasks([...existingTasks, ...newTasks]);

    const projectName =
      projects.find((p) => p.id === projectId)?.name || "Project";

    // PM_11 — auto-generate summary
    const generatedSummary = generateSummary(selected, projectName);
    setSummary(generatedSummary);
    setSummaryEdits(generatedSummary);
    setSummarySaved(false);

    const sourceLabel =
      inputMode === "audio" ? fileName : transcriptFile || "Pasted transcript";

    setMeetingRecords((prev) => [
      {
        id: `meeting-${Date.now()}`,
        projectId,
        fileName: sourceLabel,
        transcript: inputMode === "audio" ? transcript : pastedText,
        createdAt: new Date().toISOString(),
        summary: null,
      },
      ...prev,
    ]);

    setSuggestions([]);
    setFileName("");
    setTranscript("");
    setPastedText("");
    setTranscriptFile("");
    setMessage(
      `Created ${selected.length} task(s). Review and save the summary below.`,
    );
  }

  // ── PM_11 save summary ──
  function handleSaveSummary() {
    setMeetingRecords((prev) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], summary: summaryEdits };
      return updated;
    });
    setSummarySaved(true);
    setMessage("Meeting summary saved to the meeting log.");
  }

  const activeLabel = useMemo(
    () =>
      ({
        dashboard: "Dashboard",
        projects: "Projects",
        kanbanboard: "Kanban Board",
        capacity: "Capacity",
        tasks: "Tasks",
        timetracking: "Time Tracking",
        analytics: "Analytics",
        settings: "Settings",
        meetings: "Meeting Capture",
      })[activeKey] ?? "Meeting Capture",
    [activeKey],
  );

  const tabStyle = (mode) => ({
    padding: "8px 20px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor:
      inputMode === mode ? "rgba(255,122,162,0.4)" : "rgba(255,255,255,0.08)",
    background: inputMode === mode ? "rgba(255,122,162,0.1)" : "transparent",
    color: inputMode === mode ? "#ff7aa2" : "#94a3b8",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.15s ease",
  });

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
        {/* HEADER */}
        <section className="preview-hero card">
          <p className="eyebrow">Meeting Capture</p>
          <h1>Generate Tasks from Meeting</h1>
          <p className="lead">
            Upload audio or paste a transcript and let IssueHub extract action
            items into real tasks.
          </p>
          <div className="preview-actions">
            <Button
              variant="primary"
              size="md"
              onClick={handleGenerateSuggestions}
            >
              <Sparkles size={16} style={{ marginRight: 8 }} />
              Generate Suggestions
            </Button>
          </div>
          <div className="preview-status">
            <span className="status-dot" /> Active item: {activeLabel}
          </div>
        </section>

        {/* INPUT SECTION */}
        <section className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gap: 16 }}>
            {/* TAB SWITCHER */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={tabStyle("audio")}
                onClick={() => setInputMode("audio")}
              >
                🎙 Audio Upload
              </button>
              <button
                style={tabStyle("transcript")}
                onClick={() => setInputMode("transcript")}
              >
                📄 Transcript
              </button>
            </div>

            {/* PROJECT SELECTOR */}
            <div style={{ flex: 1, minWidth: 240 }}>
              <label className="form-label">Project</label>
              <select
                className="form-select-base"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">Select a project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AUDIO MODE — PM_09 */}
            {inputMode === "audio" && (
              <div>
                <label className="form-label">
                  Upload Audio (MP3, WAV, M4A)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  className="form-input-base"
                  onChange={handleFileUpload}
                />
                {fileName && (
                  <p style={{ color: "#cbd5e1", fontSize: 13, marginTop: 6 }}>
                    Loaded: {fileName}
                  </p>
                )}
                {transcript && (
                  <div style={{ marginTop: 12 }}>
                    <label className="form-label">Transcript Preview</label>
                    <textarea
                      className="form-input-base"
                      value={transcript}
                      readOnly
                      rows={6}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* TRANSCRIPT MODE — PM_10 */}
            {inputMode === "transcript" && (
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label className="form-label">
                    Upload Transcript{" "}
                    <span className="form-label-optional">
                      — .txt files supported
                    </span>
                  </label>
                  <input
                    type="file"
                    accept=".txt"
                    className="form-input-base"
                    onChange={handleTranscriptFileUpload}
                  />
                  {transcriptFile && (
                    <p style={{ color: "#cbd5e1", fontSize: 13, marginTop: 6 }}>
                      Loaded: {transcriptFile}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: 13,
                  }}
                >
                  — or —
                </div>

                <div>
                  <label className="form-label">Paste Transcript Text</label>
                  <textarea
                    className="form-input-base"
                    rows={8}
                    placeholder="Paste your meeting transcript here..."
                    value={pastedText}
                    onChange={(e) => {
                      setPastedText(e.target.value);
                      setTranscript(e.target.value);
                    }}
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>
            )}

            {/* MESSAGE */}
            {message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.18)",
                  color: "#cffafe",
                }}
              >
                <FileText size={18} />
                <span>{message}</span>
              </div>
            )}
          </div>
        </section>

        {/* SUGGESTIONS PANEL */}
        {suggestions.length > 0 && (
          <section className="card" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <p className="eyebrow">Suggested Tasks</p>
                <h2>Review extracted action items</h2>
              </div>
              <Button variant="primary" size="md" onClick={handleCreateTasks}>
                <CheckCircle2 size={16} style={{ marginRight: 8 }} />
                Confirm & Create Tasks
              </Button>
            </div>
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={suggestion.selected}
                      onChange={() => toggleSuggestion(suggestion.id)}
                    />
                    <span style={{ fontWeight: 600, color: "#f8fafc" }}>
                      {suggestion.title}
                    </span>
                  </label>
                  <p style={{ color: "#94a3b8", margin: "8px 0 0 24px" }}>
                    {suggestion.description}
                  </p>
                  <span
                    style={{ fontSize: 12, color: "#cbd5e1", marginLeft: 24 }}
                  >
                    Priority: {suggestion.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PM_11 — SUMMARY PANEL */}
        {summary && (
          <section className="card" style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <div>
                <p className="eyebrow">Meeting Summary</p>
                <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ClipboardList size={20} />
                  Auto-Generated Summary
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
                  Review and edit each section, then save to the meeting log.
                </p>
              </div>
              <Button
                variant={summarySaved ? "secondary" : "primary"}
                size="md"
                onClick={handleSaveSummary}
                disabled={summarySaved}
              >
                <CheckCircle2 size={16} style={{ marginRight: 8 }} />
                {summarySaved ? "Summary Saved ✓" : "Save & Share"}
              </Button>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {[
                { key: "decisionsMatch", label: "✅ Decisions Made" },
                { key: "risksIdentified", label: "⚠️ Risks Identified" },
                { key: "tasksCreated", label: "📋 Tasks Created" },
                { key: "nextMeetingPoints", label: "📅 Next Meeting Points" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="form-label">{label}</label>
                  <textarea
                    className="form-input-base"
                    rows={key === "tasksCreated" ? 4 : 3}
                    value={summaryEdits[key] || ""}
                    onChange={(e) =>
                      setSummaryEdits((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    style={{ resize: "vertical" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MEETING LOG */}
        <section className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p className="eyebrow">Meeting Log</p>
              <h2>Stored Records</h2>
            </div>
          </div>

          {meetingRecords.length === 0 ? (
            <div className="empty-state" style={{ marginTop: 16 }}>
              <div className="empty-state-content">
                <h2>No meeting records yet</h2>
                <p>Process a meeting to create the first record.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
              {meetingRecords.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  style={{
                    padding: 16,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <strong style={{ color: "#f8fafc" }}>
                        {record.fileName}
                      </strong>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>
                        {projects.find((p) => p.id === record.projectId)
                          ?.name || record.projectId}
                      </div>
                    </div>
                    <div style={{ color: "#cbd5e1", fontSize: 12 }}>
                      {formatDate(record.createdAt)}
                    </div>
                  </div>

                  {record.summary && (
                    <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                      {[
                        { key: "decisionsMatch", label: "✅ Decisions" },
                        { key: "risksIdentified", label: "⚠️ Risks" },
                        { key: "nextMeetingPoints", label: "📅 Next Steps" },
                      ].map(({ key, label }) =>
                        record.summary[key] ? (
                          <div key={key}>
                            <span
                              style={{
                                color: "#64748b",
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {label}
                            </span>
                            <p
                              style={{
                                color: "#cbd5e1",
                                fontSize: 13,
                                margin: "4px 0 0",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {record.summary[key]}
                            </p>
                          </div>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
