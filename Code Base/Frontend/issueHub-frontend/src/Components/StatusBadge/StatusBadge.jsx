import styles from "./StatusBadge.module.css";

/**
 * Reusable status badge — works for users, projects, and tasks.
 * Accepts any status string; maps known values to colour presets.
 */
const STATUS_MAP = {
  Active: "active",
  Deactivated: "deactivated",
  "Pending Activation": "pending",
  Archived: "archived",
  Closed: "closed",
  Online: "active",
  Offline: "deactivated",
  "In Progress": "inprogress",
  "In Review": "review",
  Done: "done",
  "To Do": "todo",
};

const LABEL_OVERRIDE = {
  "Pending Activation": "Pending",
};

export default function StatusBadge({ status }) {
  const cls = STATUS_MAP[status] ?? "default";
  const label = LABEL_OVERRIDE[status] ?? status;

  return (
    <span className={`${styles.badge} ${styles[cls]}`}>
      <span className={styles.dot} />
      {label}
    </span>
  );
}
