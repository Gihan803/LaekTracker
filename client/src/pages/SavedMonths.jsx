import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import monthService from "../services/monthService";
import { formatCurrency } from "../utils/budgetCalculator";

const SavedMonths = () => {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedMonths();
  }, []);

  const fetchSavedMonths = async () => {
    try {
      const data = await monthService.getSavedMonths();
      setMonths(data);
    } catch (error) {
      console.error("Failed to fetch saved months:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this saved month?")) {
      try {
        await monthService.deleteMonth(id);
        setMonths(months.filter(m => m._id !== id));
      } catch (error) {
        console.error("Failed to delete month:", error);
        alert("Failed to delete month. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Loading saved months...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Saved Months</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your past financial records
        </p>
      </div>

      {months.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <div className="text-6xl mb-6">🗂️</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Saved Months Yet</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            You haven't closed any months yet. Go to your dashboard and close a month to see it here.
          </p>
          <Link
            to="/dashboard"
            className="inline-block mt-6 px-5 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((month) => (
            <Link
              to={`/saved-months/${month._id}`}
              key={month._id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md group block"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {month.monthLabel}
                </h3>
                <div className="flex items-center gap-2">
                  {month.isProfit ? (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      📈 Savings
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      📉 Loss
                    </span>
                  )}
                  <button
                    onClick={(e) => handleDelete(e, month._id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Saved Month"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Income</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(month.income)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Spent</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(month.totalSpent)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                  <span className="text-slate-500">{month.isProfit ? "Saved" : "Overspent"}</span>
                  <span className={`font-bold ${month.isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(month.totalSaved))}
                  </span>
                </div>
              </div>
              <div className="text-sm text-slate-500 mt-4 flex justify-between items-center">
                <span>{month.expenses.length} transactions</span>
                <span className="text-emerald-500 font-semibold text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View details <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMonths;
