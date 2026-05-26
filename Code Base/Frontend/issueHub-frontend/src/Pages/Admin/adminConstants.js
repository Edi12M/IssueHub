import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardList,
  Settings,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { key: "users", label: "Users", icon: Users, to: "/admin/users" },
  { key: "projects", label: "Projects", icon: FolderKanban, to: "/admin/projects" },
  { key: "audit", label: "Audit Log", icon: ClipboardList, to: "/admin/audit" },
  { key: "settings", label: "Settings", icon: Settings, to: "/admin/settings" },
];
