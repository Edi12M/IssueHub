import styles from "./StatCard.module.css";

/**
 * Reusable metric/stat card — use for dashboards across all roles.
 * Props:
 *   icon    — lucide-react icon component
 *   label   — short metric name (e.g. "Total Users")
 *   value   — primary value to display (string or number)
 *   sub     — optional secondary line (e.g. "18 active · 2 pending")
 *   color   — accent hex for the icon background/tint (default: #ff7aa2)
 */
export default function StatCard({ icon: Icon, label, value, sub, color = "#ff7aa2" }) {
  const tint = `${color}1a`;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={{ background: tint, color }}>
        {Icon && <Icon size={20} strokeWidth={2} />}
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </div>
    </div>
  );
}
