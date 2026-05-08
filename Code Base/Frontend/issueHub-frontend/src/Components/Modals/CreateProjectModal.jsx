import { useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/button.jsx";

const METHODOLOGY_OPTIONS = ["Scrum", "Kanban", "Waterfall"];
const VISIBILITY_OPTIONS = ["Private", "Team", "Organisation"];

export default function CreateProjectModal({
  isOpen,
  onClose,
  onCreateProject,
}) {
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    goals: "",
    startDate: "",
    endDate: "",
    visibility: "Private",
    methodology: "Scrum",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!projectForm.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (projectForm.startDate && projectForm.endDate) {
      const start = new Date(projectForm.startDate);
      const end = new Date(projectForm.endDate);

      if (end <= start) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (projectForm.startDate && !projectForm.endDate) {
      newErrors.endDate = "End date is required when start date is set";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newProject = {
      id: `proj_${Date.now()}`,
      ...projectForm,
      createdAt: new Date().toISOString(),
      status: "Active",
      members: [],
    };

    onCreateProject(newProject);

    // Reset form
    setProjectForm({
      name: "",
      description: "",
      goals: "",
      startDate: "",
      endDate: "",
      visibility: "Private",
      methodology: "Scrum",
    });

    setErrors({});
    onClose();
  };

  const handleInputChange = (field, value) => {
    setProjectForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
      }

      // Special validation for dates
      if (field === "startDate" && value && updatedForm.endDate) {
        const start = new Date(value);
        const end = new Date(updatedForm.endDate);
        if (end <= start) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "End date must be after start date",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, endDate: undefined }));
        }
      }

      if (field === "endDate" && value && updatedForm.startDate) {
        const start = new Date(updatedForm.startDate);
        const end = new Date(value);
        if (end <= start) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: "End date must be after start date",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, endDate: undefined }));
        }
      }

      return updatedForm;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content create-project-modal">
        <div className="modal-header">
          <h2>Create New Project</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className={`form-group ${errors.name ? "error" : ""}`}>
            <label htmlFor="projectName">Project Name *</label>
            <input
              id="projectName"
              type="text"
              className="form-input"
              value={projectForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter project name"
              required
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">Description</label>
            <textarea
              id="projectDescription"
              className="form-input"
              value={projectForm.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the project"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectGoals">Goals</label>
            <textarea
              id="projectGoals"
              className="form-input"
              value={projectForm.goals}
              onChange={(e) => handleInputChange("goals", e.target.value)}
              placeholder="What are the main goals of this project?"
              rows={2}
            />
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.startDate ? "error" : ""}`}>
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                className="form-input"
                value={projectForm.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.startDate && (
                <span className="form-error">{errors.startDate}</span>
              )}
            </div>
            <div className={`form-group ${errors.endDate ? "error" : ""}`}>
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                className="form-input"
                value={projectForm.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                min={
                  projectForm.startDate ||
                  new Date().toISOString().split("T")[0]
                }
              />
              {errors.endDate && (
                <span className="form-error">{errors.endDate}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                className="form-input"
                value={projectForm.visibility}
                onChange={(e) =>
                  handleInputChange("visibility", e.target.value)
                }
              >
                {VISIBILITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="methodology">Methodology</label>
              <select
                id="methodology"
                className="form-input"
                value={projectForm.methodology}
                onChange={(e) =>
                  handleInputChange("methodology", e.target.value)
                }
              >
                {METHODOLOGY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              !projectForm.name.trim() || Object.keys(errors).length > 0
            }
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
