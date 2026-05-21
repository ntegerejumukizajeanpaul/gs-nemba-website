import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiCalendar,
  FiEdit3,
  FiFileText,
  FiImage,
  FiSettings,
} from "react-icons/fi";

const links = [
  { label: "Dashboard", path: "/admin", icon: <FiBarChart2 /> },
  {
    label: "Announcements",
    path: "/admin/announcements",
    icon: <FiFileText />,
  },
  { label: "News", path: "/admin/news", icon: <FiEdit3 /> },
  { label: "Gallery", path: "/admin/gallery", icon: <FiImage /> },
  { label: "Admissions", path: "/admin/admissions", icon: <FiFileText /> },
  { label: "Timetable", path: "/admin/timetable", icon: <FiCalendar /> },
  { label: "Settings", path: "/admin/settings", icon: <FiSettings /> },
];

function AdminSidebar() {
  return (
    <aside className="sticky top-24 hidden w-72 shrink-0 space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900 lg:block">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Admin area
        </p>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Management
        </h2>
      </div>
      <nav className="space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
