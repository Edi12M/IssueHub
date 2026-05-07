import { useState } from "react";
import { X } from "lucide-react";
import Button from "../Button/button";
import "./modals.css";

export default function CreateUserModal({
  isOpen,
  onSubmit,
  onCancel,
  isSending = false,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("Developer");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      department: department.trim(),
      role,
    };

    onSubmit(payload);

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("");
    setRole("Developer");
  }

  function handleCancel() {
    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("");
    setRole("Developer");
    onCancel();
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={handleCancel} />

      {/* Modal Container */}
      <div className="modal-container modal-md">
        {/* Modal Header */}
        <div className="modal-header modal-header-flex">
          <div>
            <h2 className="modal-title">Create New User</h2>
            <p className="modal-description">Add a new user to the system</p>
          </div>
          <button
            className="modal-close-btn"
            onClick={handleCancel}
            title="Close"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit}>
          {/* User Information Section */}
          <div className="form-section">
            <p className="form-section-heading">User Information</p>

            <div className="form-group-container">
              {/* Full Name */}
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="form-input-base"
                />
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="form-input-base"
                />
              </div>

              {/* Department */}
              <div>
                <label className="form-label">
                  Department{" "}
                  <span className="form-label-optional">— optional</span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Engineering"
                  className="form-input-base"
                />
              </div>
            </div>
          </div>

          {/* Role & Credentials Section */}
          {/* Role & Credentials Section */}
          <div className="form-section">
            <p className="form-section-heading">Role & Credentials</p>

            <div className="form-group-container">
              {/* Role */}
              <div>
                <label className="form-label">System Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select-base"
                >
                  <option>Developer</option>
                  <option>Project Manager</option>
                  <option>System Administrator</option>
                  <option>Viewer</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="form-label">Temporary Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  required
                  className="form-input-base"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSending}
              className="modal-button-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="modal-button-primary"
            >
              {isSending ? "Creating…" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
