import { LayoutDashboard, Settings } from "lucide-react";
import { GoProject } from "react-icons/go";
import { TbLayoutKanban } from "react-icons/tb";
import { SiGoogletasks } from "react-icons/si";
import { CiTimer } from "react-icons/ci";
import { GrAnalytics } from "react-icons/gr";

export const MANAGER_NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard",    icon: LayoutDashboard, to: "/manager" },
  { key: "projects",     label: "Projects",     icon: GoProject,       to: "/manager/projects" },
  { key: "kanbanboard",  label: "Kanban Board", icon: TbLayoutKanban,  to: "/manager/kanban" },
  { key: "tasks",        label: "Tasks",        icon: SiGoogletasks,   to: "/manager/tasks" },
  { key: "timetracking", label: "Time Tracking",icon: CiTimer,         to: "/manager/timetracking" },
  { key: "analytics",    label: "Analytics",    icon: GrAnalytics,     to: "/manager/analytics" },
  { key: "settings",     label: "Settings",     icon: Settings,        to: "/manager/settings" },
];

export const PROJECTS_KEY = "issuehub_projects";

export const INITIAL_PROJECTS = [
  {
    id: "p1",
    name: "Website Redesign",
    description: "Redesign the company website UI.",
    goals: "Improve UX and accessibility.",
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    visibility: "Team",
    methodology: "Scrum",
    status: "In Progress",
    members: [],
  },
  {
    id: "p2",
    name: "Mobile App",
    description: "Build a cross-platform mobile app.",
    goals: "Launch MVP for beta users.",
    startDate: "2025-10-01",
    endDate: "2025-12-20",
    visibility: "Private",
    methodology: "Kanban",
    status: "Planning",
    members: [],
  },
];
