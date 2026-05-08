import Button from "../Button/button";
import "./modals.css";

export default function RemoveUserModal({ user, onConfirm, onCancel }) {
  if (!user) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={onCancel} />

      {/* Modal Container */}
      <div className="modal-container modal-sm">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title modal-text-warning">Remove User?</h2>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <p className="modal-paragraph modal-text-secondary">
            Are you sure you want to permanently remove{" "}
            <strong>{user.name}</strong>?
          </p>

          <p
            className="modal-paragraph modal-text-danger"
            style={{ fontSize: "13px" }}
          >
            <strong>Warning:</strong> This action cannot be undone. All data
            associated with this user will be permanently deleted.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Remove User
          </Button>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
