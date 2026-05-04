import styles from "./sideBar.module.css";

// Default nav items — override via `navItems` prop
const DEFAULT_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "▦" },
  { key: "users", label: "Users", icon: "◌" },
  { key: "projects", label: "Projects", icon: "▣" },
  { key: "issues", label: "Issues", icon: "●" },
  { key: "settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar({
  brandName = "IssueHub",
  brandSub = "Admin Dashboard",
  navItems = DEFAULT_NAV_ITEMS,
  activeKey,
  onSelect,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles["sidebar-brand"]}>
        <div className={styles["sidebar-brand-name"]}>{brandName}</div>
        <div className={styles["sidebar-brand-sub"]}>{brandSub}</div>
      </div>

      <hr className={styles["sidebar-divider"]} />

      <nav className={styles["sidebar-nav"]} aria-label="Sidebar navigation">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect?.(key)}
            className={`${styles["sidebar-link"]} ${activeKey === key ? styles.active : ""}`}
          >
            <span className={styles["sidebar-icon"]} aria-hidden="true">
              {typeof Icon === "string" ? Icon : "•"}
            </span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
git p