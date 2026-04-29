import { formatCurrency, formatDate } from "../utils/budgetCalculator";

const categoryIcons = {
  Food: "🍔",
  Transport: "🚗",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Bills: "📄",
  Health: "🏥",
  Education: "📚",
  Subscriptions: "🔄",
  Other: "📌",
};

const categoryBadgeStyles = {
  Food: "bg-orange-50 text-orange-700",
  Transport: "bg-blue-50 text-blue-700",
  Entertainment: "bg-fuchsia-50 text-fuchsia-700",
  Shopping: "bg-yellow-50 text-yellow-700",
  Bills: "bg-green-50 text-green-700",
  Health: "bg-red-50 text-red-700",
  Education: "bg-indigo-50 text-indigo-700",
  Subscriptions: "bg-violet-50 text-violet-700",
  Other: "bg-slate-100 text-slate-600",
};

const ExpenseRow = ({ expense, onDelete, showDelete = true }) => {
  const icon = categoryIcons[expense.category] || "📌";
  const badgeStyle = categoryBadgeStyles[expense.category] || categoryBadgeStyles.Other;

  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-150 animate-fade-in group">
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="text-2xl w-10 h-10 flex items-center justify-center bg-slate-50 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <span className={`inline-flex items-center px-3 py-0.5 text-xs font-semibold rounded-full tracking-wide ${badgeStyle}`}>
            {expense.category}
          </span>
          {expense.note && (
            <p className="text-xs text-slate-400 truncate max-w-[250px] mt-0.5">
              {expense.note}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="text-base font-bold text-red-500 whitespace-nowrap">
          -{formatCurrency(expense.amount)}
        </span>
        <span className="text-xs text-slate-400 whitespace-nowrap min-w-[80px] text-right">
          {formatDate(expense.date)}
        </span>
        {showDelete && (
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all duration-150 cursor-pointer"
            onClick={() => onDelete(expense._id)}
            title="Delete expense"
            aria-label="Delete expense"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseRow;
