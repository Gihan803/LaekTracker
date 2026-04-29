import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuToggle }) => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white/85 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors duration-150"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          id="menu-toggle-btn"
        >
          <span className="text-xl">☰</span>
        </button>
        <h1 className="text-lg font-medium text-slate-500">
          {getGreeting()},{" "}
          <span className="font-bold text-slate-900">
            {user?.name?.split(" ")[0] || "there"}
          </span>{" "}
          👋
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-sm">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
