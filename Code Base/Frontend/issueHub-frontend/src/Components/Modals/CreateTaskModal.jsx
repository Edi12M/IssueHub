import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TASK_TYPES = [
  "Feature",
  "Bug",
  "Improvement",
  "Research",
  "Meeting Action",
];
const PRIORITIES = [
  { label: "Critical", color: "#ef4444" },
  { label: "High", color: "#f97316" },
  { label: "Medium", color: "#eab308" },
  { label: "Low", color: "#22c55e" },
];
const DEPENDENCY_TYPES = ["Blocks", "Blocked By", "Relates To", "Duplicates"];

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  projects = [],
  tasks = [],
  editTask = null,
  availableUsers = [],
}) {
  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [type, setType] = useState(editTask?.type || "Feature");
  const [acceptanceCriteria, setAcceptanceCriteria] = useState(
    editTask?.acceptanceCriteria || "",
  );
  const [subtasks, setSubtasks] = useState(editTask?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");
  const [projectId, setProjectId] = useState(editTask?.projectId || "");
  const [assignees, setAssignees] = useState(editTask?.assignees || []);
  const [dependencies, setDependencies] = useState(
    editTask?.dependencies || [],
  );
  const [selectedDependencyTaskId, setSelectedDependencyTaskId] = useState("");
  const [selectedDependencyType, setSelectedDependencyType] =
    useState("Blocks");
  const [priority, setPriority] = useState(editTask?.priority || "Medium");
  const [startDate, setStartDate] = useState(
    editTask?.startDate ? new Date(editTask.startDate) : null,
  );
  const [dueDate, setDueDate] = useState(
    editTask?.dueDate ? new Date(editTask.dueDate) : null,
  );

  function reset() {
    setTitle(editTask?.title || "");
    setDescription(editTask?.description || "");
    setType(editTask?.type || "Feature");
    setAcceptanceCriteria(editTask?.acceptanceCriteria || "");
    setSubtasks(editTask?.subtasks || []);
    setNewSubtask("");
    setProjectId(editTask?.projectId || "");
    setAssignees(editTask?.assignees || []);
    setDependencies(editTask?.dependencies || []);
    setSelectedDependencyTaskId("");
    setSelectedDependencyType("Blocks");
    setPriority(editTask?.priority || "Medium");
    setStartDate(editTask?.startDate ? new Date(editTask.startDate) : null);
    setDueDate(editTask?.dueDate ? new Date(editTask.dueDate) : null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleAddSubtask() {
    if (!newSubtask.trim()) return;
    setSubtasks((prev) => [...prev, { text: newSubtask.trim(), done: false }]);
    setNewSubtask("");
  }

  function handleRemoveSubtask(index) {
    setSubtasks((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleAssignee(userId) {
    setAssignees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const task = {
      id: editTask?.id || `TASK-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      acceptanceCriteria: acceptanceCriteria.trim(),
      subtasks,
      projectId,
      assignees,
      dependencies,
      priority,
      startDate: startDate ? startDate.toISOString() : null,
      dueDate: dueDate ? dueDate.toISOString() : null,
      status: editTask?.status || "Backlog",
      createdAt: editTask?.createdAt || new Date().toISOString(),
    };

    onSubmit(task);
    reset();
  }

  const projectMembers = availableUsers.length > 0
    ? availableUsers
    : (projects.find((p) => p.id === projectId)?.members || []);
  const availableDependencyTasks = tasks.filter((task) => {
    if (task.id === editTask?.id) return false;
    if (!projectId) return true;
    return task.projectId === projectId;
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container modal-md" style={{ maxWidth: "580px" }}>
        {/* HEADER */}
        <div className="modal-header modal-header-flex">
          <div>
            <h2 className="modal-title">
              {editTask ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="modal-description">
              {editTask
                ? "Update the task details below"
                : "Fill in the details below"}
            </p>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* TASK DETAILS */}
          <div className="form-section">
            <p className="form-section-heading">Task Details</p>
            <div className="form-group-container">
              {/* Title */}
              <div>
                <label className="form-label">Task Title</label>
                <input
                  className="form-input-base"
                  type="text"
                  placeholder="e.g. Implement login page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input-base"
                  placeholder="Describe the task..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Type */}
              <div>
                <label className="form-label">Task Type</label>
                <select
                  className="form-select-base"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {TASK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Acceptance Criteria */}
              <div>
                <label className="form-label">
                  Acceptance Criteria{" "}
                  <span className="form-label-optional">— optional</span>
                </label>
                <textarea
                  className="form-input-base"
                  placeholder="Define what done looks like..."
                  value={acceptanceCriteria}
                  onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  rows={2}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>
          </div>

          {/* PRIORITY & DATES */}
          <div className="form-section">
            <p className="form-section-heading">Priority & Dates</p>
            <div className="form-group-container">
              {/* Priority */}
              <div>
                <label className="form-label">Priority</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPriority(p.label)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        border: `1px solid ${priority === p.label ? p.color : "rgba(255,255,255,0.1)"}`,
                        background:
                          priority === p.label ? `${p.color}22` : "transparent",
                        color: priority === p.label ? p.color : "#94a3b8",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Select start date"
                    className="form-input-base"
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Due Date</label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select due date"
                    minDate={startDate}
                    className="form-input-base"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT & ASSIGNEES */}
          <div className="form-section">
            <p className="form-section-heading">Project & Assignees</p>
            <div className="form-group-container">
              {/* Project */}
              <div>
                <label className="form-label">Link to Project</label>
                <select
                  className="form-select-base"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="">— Select a project —</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assignees */}
              <div>
                <label className="form-label">Assignees</label>
                {projectMembers.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                    No users available
                  </p>
                ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {projectMembers.map((member) => {
                        const isSelected = assignees.includes(member.id);
                        return (
                          <div
                            key={member.id}
                            onClick={() => toggleAssignee(member.id)}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              border: `1px solid ${isSelected ? "rgba(255,122,162,0.3)" : "rgba(255,255,255,0.06)"}`,
                              background: isSelected
                                ? "rgba(255,122,162,0.08)"
                                : "rgba(255,255,255,0.03)",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  color: "#f8fafc",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                }}
                              >
                                {member.name}
                              </div>
                              <div
                                style={{ color: "#94a3b8", fontSize: "12px" }}
                              >
                                {member.role}
                              </div>
                            </div>
                            {isSelected && (
                              <span
                                style={{
                                  color: "#ff7aa2",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                }}
                              >
                                ✓ Assigned
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* SUBTASKS */}
          <div className="form-section">
            <p className="form-section-heading">
              Subtasks{" "}
              <span
                className="form-label-optional"
                style={{ textTransform: "none", letterSpacing: 0 }}
              >
                — optional
              </span>
            </p>
            <div className="form-group-container">
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  className="form-input-base"
                  type="text"
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddSubtask())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  style={{
                    padding: "0 14px",
                    background: "rgba(255,122,162,0.15)",
                    border: "1px solid rgba(255,122,162,0.3)",
                    borderRadius: "8px",
                    color: "#ff7aa2",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              {subtasks.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {subtasks.map((subtask, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span style={{ color: "#cbd5e1", fontSize: "13px" }}>
                        {subtask.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#94a3b8",
                          cursor: "pointer",
                          padding: "2px",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DEPENDENCIES */}
          <div className="form-section">
            <p className="form-section-heading">
              Dependencies{" "}
              <span
                className="form-label-optional"
                style={{ textTransform: "none", letterSpacing: 0 }}
              >
                — optional
              </span>
            </p>
            <div className="form-group-container">
              <div style={{ display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <select
                    className="form-select-base"
                    value={selectedDependencyTaskId}
                    onChange={(e) =>
                      setSelectedDependencyTaskId(e.target.value)
                    }
                  >
                    <option value="">— Select task —</option>
                    {availableDependencyTasks.map((task) => (
                      <option key={task.id} value={task.id}>
                        {task.title}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select-base"
                    value={selectedDependencyType}
                    onChange={(e) => setSelectedDependencyType(e.target.value)}
                  >
                    {DEPENDENCY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedDependencyTaskId) return;
                      const exists = dependencies.some(
                        (dep) => dep.taskId === selectedDependencyTaskId,
                      );
                      if (exists) return;
                      setDependencies((prev) => [
                        ...prev,
                        {
                          taskId: selectedDependencyTaskId,
                          type: selectedDependencyType,
                        },
                      ]);
                      setSelectedDependencyTaskId("");
                    }}
                    style={{
                      padding: "0 14px",
                      background: "rgba(255,122,162,0.15)",
                      border: "1px solid rgba(255,122,162,0.3)",
                      borderRadius: "8px",
                      color: "#ff7aa2",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
                {projectId === "" && availableDependencyTasks.length === 0 && (
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                    No tasks available yet. Create a task first or select a
                    project with stored tasks.
                  </p>
                )}
                {projectId !== "" && availableDependencyTasks.length === 0 && (
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>
                    No other tasks available in this project.
                  </p>
                )}
                {dependencies.length > 0 && (
                  <div style={{ display: "grid", gap: "8px" }}>
                    {dependencies.map((dependency, index) => {
                      const dependencyTask = tasks.find(
                        (task) => task.id === dependency.taskId,
                      );
                      return (
                        <div
                          key={`${dependency.taskId}-${index}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div>
                            <div style={{ color: "#f8fafc", fontSize: "13px" }}>
                              {dependencyTask?.title || "Unknown task"}
                            </div>
                            <div style={{ color: "#94a3b8", fontSize: "12px" }}>
                              {dependency.type}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setDependencies((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                            style={{
                              background: "none",
                              border: "none",
                              color: "#94a3b8",
                              cursor: "pointer",
                              padding: "2px",
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleClose}
              className="modal-button-cancel"
            >
              Cancel
            </button>
            <button type="submit" className="modal-button-primary">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
