import { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import Button from "../Button/button.jsx";

const NOTIFICATION_TYPES = {
  success: {
    icon: CheckCircle,
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.5)",
    borderColor: "rgba(16, 185, 129, 0.2)",
  },
  error: {
    icon: XCircle,
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  warning: {
    icon: AlertCircle,
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  info: {
    icon: AlertCircle,
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
};

export default function NotificationModal({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  autoClose = true,
  autoCloseDelay = 3000,
}) {
  const config = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.info;
  const IconComponent = config.icon;

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content notification-modal"
        style={{
          background: config.bgColor,
          border: `1px solid ${config.borderColor}`,
          maxWidth: "400px",
        }}
      >
        <div className="notification-header">
          <div className="notification-icon">
            <IconComponent size={24} color={config.color} />
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="notification-body">
          {title && (
            <h3 style={{ color: "#f8fafc", marginBottom: "8px" }}>{title}</h3>
          )}
          {message && <p style={{ color: "#cbd5e1", margin: 0 }}>{message}</p>}
        </div>

        <div className="notification-actions">
          <Button variant="secondary" size="sm" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
