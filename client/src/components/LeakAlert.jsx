import React from "react";

const LeakAlert = ({ leak, compact = false }) => {
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
      className={`${compact ? 'p-3 mb-3' : 'p-4 mb-4'} border rounded-xl flex flex-col md:flex-row md:items-center justify-between shadow-sm animate-fade-in ${getSeverityColor(
        leak.severity
      )}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={compact ? "text-lg" : "text-xl"}>{getSeverityEmoji(leak.severity)}</span>
          <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'}`}>{leak.category} Leak Detected</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 font-medium">
            {leak.severity} Severity
          </span>
        </div>
        <p className={`opacity-90 ${compact ? 'text-xs' : 'text-sm'}`}>{leak.suggestion}</p>
      </div>
      <div className="mt-3 md:mt-0 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-x-4 shrink-0 border-t md:border-t-0 md:border-l border-black/5 pt-3 md:pt-0 md:pl-4">
        <div className="flex flex-col md:items-end">
          <span className={`font-bold ${compact ? 'text-lg' : 'text-xl'} leading-none`}>
            Rs. {leak.totalAmount.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold mt-1.5">Total Impact</span>
        </div>
        <div className={`text-[10px] font-bold px-2.5 py-1 bg-black/10 rounded-full ${compact ? 'mt-0' : 'md:mt-2'}`}>
          {leak.count} TRANSACTIONS
        </div>
      </div>
    </div>
  );
};

export default LeakAlert;
