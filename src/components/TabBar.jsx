import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dark, toggleDark } = useTheme();

  const tabs = [
    {
      label: "Events",
      path: "/",
      icon: (active) => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke={active ? "#0d9488" : "#64748b"}
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Organisateurs",
      path: "/organisateurs",
      icon: (active) => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke={active ? "#0d9488" : "#64748b"}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  // Masque la TabBar sur /admin
  if (location.pathname === "/admin") return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 bg-transparent border-none cursor-pointer"
          >
            {tab.icon(isActive)}
            <span
              className={
                "text-[10px] font-medium tracking-wide " +
                (isActive
                  ? "text-teal-600 dark:text-teal-400"
                  : "text-gray-400 dark:text-slate-400")
              }
            >
              {tab.label}
            </span>
          </button>
        );
      })}

      {/* Switch dark mode */}
      <button
        onClick={toggleDark}
        className="flex flex-col items-center gap-1 py-2.5 px-5 bg-transparent border-none cursor-pointer"
      >
        {dark ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 3v1m0 16v1M4.22 4.22l.71.71m12.73 12.73.71.71M3 12h1m16 0h1M4.93 19.07l.71-.71M18.36 5.64l.71-.71" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        )}
        <span className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-slate-400">
          {dark ? "Light" : "Dark"}
        </span>
      </button>
    </nav>
  );
}

export default TabBar;
