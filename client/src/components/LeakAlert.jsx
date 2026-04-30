import React from "react";

const LeakAlert = ({ leak }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500/10 border-red-500 text-red-500";
      case "Medium":
        return "bg-orange-500/10 border-orange-500 text-orange-500";
      case "Low":
        return "bg-yellow-500/10 border-yellow-500 text-yellow-500";
      default:
        return "bg-slate-500/10 border-slate-500 text-slate-500";
    }
  };

  const getSeverityEmoji = (severity) => {
    switch (severity) {
      case "High": return "🚨";
      case "Medium": return "⚠️";
      case "Low": return "💡";
      default: return "ℹ️";
    }
  };

  return (
    <div
      className={`p-4 border rounded-xl mb-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm animate-fade-in ${getSeverityColor(
        leak.severity
      )}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{getSeverityEmoji(leak.severity)}</span>
          <h3 className="font-bold text-lg">{leak.category} Leak Detected</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-medium">
            {leak.severity} Severity
          </span>
        </div>
        <p className="text-sm opacity-90">{leak.suggestion}</p>
      </div>
      <div className="mt-3 md:mt-0 md:text-right">
        <div className="text-sm opacity-80">Total Impact</div>
        <div className="font-bold text-xl">
          Rs. {leak.totalAmount.toLocaleString()}
        </div>
        <div className="text-xs opacity-70 mt-1">
          {leak.count} transactions
        </div>
      </div>
    </div>
  );
};

export default LeakAlert;
