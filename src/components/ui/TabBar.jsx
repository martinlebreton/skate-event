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
          stroke={active ? "#fff" : "rgba(255,255,255,0.45)"}
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
          stroke={active ? "#fff" : "rgba(255,255,255,0.45)"}
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
          stroke={active ? "#fff" : "rgba(255,255,255,0.45)"}
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
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch"
      style={{
        background: "#0f766e",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 border-none cursor-pointer"
            style={{ background: "transparent" }}
          >
            {tab.icon(isActive)}
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.3px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                fontFamily: "Inter, sans-serif",
              }}
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
