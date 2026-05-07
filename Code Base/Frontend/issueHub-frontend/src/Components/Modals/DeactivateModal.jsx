import Button from "../Button/button";
import "./modals.css";

export default function DeactivateModal({ user, onConfirm, onCancel }) {
  if (!user) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop" onClick={onCancel} />

      {/* Modal Container */}
      <div className="modal-container modal-sm">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title modal-text-warning">Deactivate User?</h2>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          <p className="modal-paragraph modal-text-secondary">
            Are you sure you want to deactivate <strong>{user.name}</strong>?
          </p>

          <p
            className="modal-paragraph modal-text-tertiary"
            style={{ fontSize: "13px" }}
          >
            The user's access will be suspended, but all their data will be
            preserved.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Deactivate
          </Button>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
