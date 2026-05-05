import { useState } from "react";
import Button from "../Components/Button/button";

export default function UserForm({
  initial = {},
  submitLabel = "Save",
  showPassword = false,
  onSubmit,
  onCancel,
  className = "",
}) {
  const [name, setName] = useState(initial.name ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState(initial.department ?? "");
  const [role, setRole] = useState(initial.role ?? "Developer");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...initial,
      name: name.trim(),
      email: email.trim(),
      department: department.trim(),
      role,
    };
    if (showPassword) payload.password = password;
    onSubmit?.(payload);
  }

  return (
    <form className={`user-form card ${className}`} onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>{submitLabel} User</h2>

      <div className="form-group">
        <label className="form-label">Full name</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email address</label>
        <input
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Department</label>
        <input
          className="form-input"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department (optional)"
        />
      </div>

      <div className="form-group">
        <label className="form-label">System role</label>
        <select
          className="form-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Developer</option>
          <option>Project Manager</option>
          <option>System Administrator</option>
          <option>Viewer</option>
        </select>
      </div>

      {showPassword && (
        <div className="form-group">
          <label className="form-label">Temporary password</label>
          <input
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Set initial password"
            minLength={6}
            required
          />
        </div>
      )}

      <div className="preview-actions" style={{ marginTop: 8 }}>
        <Button  size="sm" type="submit">
          {submitLabel}
        </Button>
        
        <Button  size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
