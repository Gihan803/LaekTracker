import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/add", label: "Add Expense", icon: "➕" },
    { path: "/expenses", label: "All Expenses", icon: "📋" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/insights", label: "Insights", icon: "💡" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💸</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              LeakTracker
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
              onClick={onClose}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User section & Logout */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {user?.email || ""}
              </span>
            </div>
          </div>
          <button
            className="w-full px-4 py-2.5 bg-transparent border border-slate-200 rounded-lg text-sm font-medium text-slate-500 text-left transition-all duration-150 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
            onClick={handleLogout}
            id="logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
