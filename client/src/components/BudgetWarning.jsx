const BudgetWarning = ({ status, spentPercentage }) => {
  if (status === "safe" || status === "no-income") return null;

  const isDanger = status === "danger";

  return (
    <div
      className={`flex items-start gap-3.5 p-4 rounded-xl mb-5 animate-slide-down ${
        isDanger
          ? "bg-red-50 border border-red-200"
          : "bg-amber-50 border border-amber-200"
      }`}
    >
      <div className="text-2xl flex-shrink-0 leading-none">
        {isDanger ? "🚨" : "⚠️"}
      </div>
      <div className="flex-1">
        <p
          className={`text-sm font-bold mb-0.5 ${
            isDanger ? "text-red-800" : "text-amber-800"
          }`}
        >
          {isDanger ? "Budget Critical!" : "Budget Warning"}
        </p>
        <p
          className={`text-sm leading-relaxed ${
            isDanger ? "text-red-600" : "text-amber-700"
          }`}
        >
          {isDanger
            ? `You've spent ${spentPercentage}% of your monthly budget. Consider cutting back on non-essential expenses.`
            : `You've used ${spentPercentage}% of your monthly budget. Be mindful of your remaining spending.`}
        </p>
      </div>
    </div>
  );
};

export default BudgetWarning;
