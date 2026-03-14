import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dark, toggleDark } = useTheme();

  const isActive = location.pathname === "/";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-center"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Tab Events */}
      <button
        onClick={() => navigate("/")}
        className="flex-1 flex flex-col items-center gap-1 py-2.5 bg-transparent border-none cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          className={
            isActive
              ? "text-teal-600 dark:text-teal-400"
              : "text-gray-400 dark:text-slate-600"
          }
          stroke="currentColor"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span
          className={`text-[10px] font-medium tracking-wide ${isActive ? "text-teal-600 dark:text-teal-400" : "text-gray-400 dark:text-slate-600"}`}
        >
          Events
        </span>
      </button>

      {/* Switch dark mode */}
      <button
        onClick={toggleDark}
        className="flex flex-col items-center gap-1 py-2.5 px-6 bg-transparent border-none cursor-pointer"
      >
        {dark ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400 dark:text-slate-500"
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
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        )}
        <span className="text-[10px] font-medium tracking-wide text-gray-400 dark:text-slate-500">
          {dark ? "Light" : "Dark"}
        </span>
      </button>
    </nav>
  );
}

export default TabBar;
