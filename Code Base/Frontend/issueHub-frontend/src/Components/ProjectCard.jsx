import { Users } from "lucide-react";
import Button from "./Button/button.jsx";

export default function ProjectCard({ project, onManageMembers }) {
  const members = Array.isArray(project.members) ? project.members : [];

  return (
    <div className="card project-card">
      <h3>{project.name}</h3>
      <p>{project.description || "No description"}</p>

      <div className="project-meta">
        <span>Status: {project.status}</span>
        <span>Methodology: {project.methodology}</span>
        <span>Members: {members.length}</span>
      </div>

      <div className="project-members-preview">
        {members.slice(0, 3).map((member, idx) => (
          <div key={member.id || idx} className="member-preview">
            <span className="member-name">{member.name || member}</span>
            <span className="member-role">{member.role || "Member"}</span>
          </div>
        ))}
        {members.length > 3 && (
          <span className="more-members">+{members.length - 3} more</span>
        )}
      </div>

      <div className="project-actions">
        <Button variant="secondary" size="sm">
          View Dashboard
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManageMembers(project)}
        >
          <Users size={14} /> Manage Members
        </Button>
      </div>
    </div>
  );
}
