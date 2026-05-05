import styles from "./sideBar.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CircleDot,
  Settings,
  Menu,
  X,
} from "lucide-react";

const DEFAULT_NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  { key: "users", label: "Users", icon: Users, to: "/users" },
  { key: "projects", label: "Projects", icon: FolderKanban, to: "/projects" },
  { key: "issues", label: "Issues", icon: CircleDot, to: "/issues" },
  { key: "settings", label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar({
  brandName = "IssueHub",
  brandSub = "Admin Dashboard",
  navItems = DEFAULT_NAV_ITEMS,
  activeKey,
  onSelect,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function update() {
      const mobile = typeof window !== "undefined" && window.innerWidth <= 720;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function handleItemClick(key, to) {
    onSelect?.(key);
    if (to) navigate(to);
  }

  return (
    <>
      {isMobile && !isOpen && (
        <button
          className={styles["sidebar-toggle"]}
          aria-label="Open sidebar"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={18} />
        </button>
      )}

      {isOpen && (
        <aside className={`${styles.sidebar} ${isMobile ? styles.mobile : ""}`}>
          <div className={styles["sidebar-brand"]}>
            <div className={styles["sidebar-brand-name"]}>{brandName}</div>
            <div className={styles["sidebar-brand-sub"]}>{brandSub}</div>
          </div>

          {isMobile && (
            <button
              className={styles["sidebar-close"]}
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          )}

          <hr className={styles["sidebar-divider"]} />

          <nav
            className={styles["sidebar-nav"]}
            aria-label="Sidebar navigation"
          >
            {navItems.map(({ key, label, icon: Icon, to }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  handleItemClick(key, to);
                  if (isMobile) setIsOpen(false);
                }}
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
      )}
    </>
  );
}
