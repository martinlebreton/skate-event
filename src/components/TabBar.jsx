import { useLocation, useNavigate } from "react-router-dom";

function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [{ label: "Events", icon: "🛹", path: "/" }];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-around z-50">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
              isActive ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;
