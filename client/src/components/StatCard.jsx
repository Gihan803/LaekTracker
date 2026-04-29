const variantStyles = {
  default: "border-slate-200 bg-white",
  primary: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white",
  warning: "border-amber-200 bg-gradient-to-br from-amber-50 to-white",
  danger: "border-red-200 bg-gradient-to-br from-red-50 to-white",
  info: "border-blue-200 bg-gradient-to-br from-blue-50 to-white",
};

const valueStyles = {
  default: "text-slate-900",
  primary: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-red-600",
  info: "text-blue-600",
};

const StatCard = ({ icon, label, value, subtext, variant = "default", delay = 0 }) => {
  return (
    <div
      className={`border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slide-up ${variantStyles[variant] || variantStyles.default}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-extrabold leading-tight ${valueStyles[variant] || valueStyles.default}`}>
        {value}
      </div>
      {subtext && (
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
      )}
    </div>
  );
};

export default StatCard;
