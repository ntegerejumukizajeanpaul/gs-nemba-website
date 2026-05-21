import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/timetable", label: "Timetable" },
  { href: "/contact", label: "Contact" },
];

function Navbar() {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="font-semibold text-xl text-primary">
          GS Nemba
        </Link>
        <button
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:border-primary/70"
          onClick={() => setOpen((prev) => !prev)}
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <nav
          className={`absolute left-0 right-0 top-full mt-2 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl transition-all duration-300 md:static md:mt-0 md:flex md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none ${open ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {token ? (
              <button
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-900 transition hover:border-primary"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link
                className="rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                to="/admin/login"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
