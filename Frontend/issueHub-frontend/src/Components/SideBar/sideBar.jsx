import styles from "./sideBar.module.css";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban, CircleDot, Settings } from "lucide-react";

const DEFAULT_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { key: "users",     label: "Users",     icon: Users,           to: "/users" },
  { key: "projects",  label: "Projects",  icon: FolderKanban,    to: "/projects" },
  { key: "issues",    label: "Issues",    icon: CircleDot,       to: "/issues" },
  { key: "settings",  label: "Settings",  icon: Settings,        to: "/settings" },
];

export default function Sidebar({
  brandName = "IssueHub",
  brandSub  = "Admin Dashboard",
  navItems  = DEFAULT_NAV_ITEMS,
  activeKey,
  onSelect,
}) {
  const navigate = useNavigate();

  function handleItemClick(key, to) {
    onSelect?.(key);
    if (to) navigate(to);
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles["sidebar-brand"]}>
        <div className={styles["sidebar-brand-name"]}>{brandName}</div>
        <div className={styles["sidebar-brand-sub"]}>{brandSub}</div>
      </div>

      <hr className={styles["sidebar-divider"]} />

      <nav className={styles["sidebar-nav"]} aria-label="Sidebar navigation">
        {navItems.map(({ key, label, icon: Icon, to }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleItemClick(key, to)}
            className={`${styles["sidebar-link"]} ${activeKey === key ? styles.active : ""}`}
          >
            <span className={styles["sidebar-icon"]} aria-hidden="true">
              <Icon size={16} />
            </span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}