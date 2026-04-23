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
          width="20"
          height="20"
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
          width="20"
          height="20"
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
          width="20"
          height="20"
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
    <>
      {/* Desktop Navigation — Top NavBar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto w-full px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="font-bold text-teal-600 dark:text-teal-400 text-lg">
              SkateEvent
            </h1>
            <div className="flex items-center gap-1">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <button
                    key={tab.path}
                    onClick={() => navigate(tab.path)}
                    className={
                      "px-4 py-2.5 text-sm font-medium rounded-lg transition-colors " +
                      (isActive
                        ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950"
                        : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200")
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
              <div>
                <p className="font-medium text-sm bg-teal-400 p-2  text-white dark:text-white rounded-lg">
                  Passez à la version mobile !
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation — Bottom TabBar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 bg-transparent border-none cursor-pointer"
            >
              {tab.icon(isActive)}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  color: isActive ? "#0d9488" : "#94a3b8",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default TabBar;
