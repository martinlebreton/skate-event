import { useLocation, useNavigate } from "react-router-dom";

function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

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
          stroke={active ? "#0d9488" : "#94a3b8"}
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Ajouter",
      path: "/contact",
      icon: (active) => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          stroke={active ? "#0d9488" : "#94a3b8"}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" strokeLinecap="round" />
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
          stroke={active ? "#0d9488" : "#94a3b8"}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

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
                  : "text-slate-400 dark:text-slate-600")
              }
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;
