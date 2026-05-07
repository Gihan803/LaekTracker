import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import monthService from "../services/monthService";
import { formatCurrency } from "../utils/budgetCalculator";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { categorizeSpending } from "../utils/categorizeSpending";
import LeakAlert from "../components/LeakAlert";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

const MonthDetail = () => {
  const { id } = useParams();
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonthDetail();
  }, [id]);

  const fetchMonthDetail = async () => {
    try {
      const data = await monthService.getMonthDetail(id);
      setMonthData(data);
    } catch (error) {
      console.error("Failed to fetch month details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Loading details...</p>
      </div>
    );
  }

  if (!monthData) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto text-center mt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Month Not Found</h2>
        <Link to="/saved-months" className="text-emerald-500 hover:text-emerald-600 font-semibold">
          &larr; Back to Saved Months
        </Link>
      </div>
    );
  }

  const categoryData = categorizeSpending(monthData.expenses);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      <Link to="/saved-months" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        &larr; Back to all months
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            {monthData.monthLabel}
            {monthData.isProfit ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                📈 Savings
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                📉 Loss
              </span>
            )}
          </h1>
          <p className="text-slate-500 mt-2">
            Closed on {new Date(monthData.closedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      /* Summary Cards */
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(monthData.income)}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(monthData.totalSpent)}</p>
        </div>
        <div className={`bg-white border ${monthData.isProfit ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'} rounded-xl p-6 shadow-sm`}>
          <p className={`text-sm font-semibold mb-1 ${monthData.isProfit ? 'text-emerald-700' : 'text-red-700'}`}>
            {monthData.isProfit ? 'Total Saved' : 'Total Overspent'}
          </p>
          <p className={`text-2xl font-bold ${monthData.isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(Math.abs(monthData.totalSaved))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>🥧</span> Spending by Category
          </h2>
          {monthData.expenses.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-slate-500 text-center mt-10">No expenses recorded for this month.</p>
          )}
        </div>

        {/* Leaks */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🔍</span> Detected Leaks
          </h2>
          {monthData.leaks && monthData.leaks.length > 0 ? (
            <div className="space-y-3">
              {monthData.leaks.map((leak, idx) => (
                <LeakAlert key={idx} leak={leak} compact={true} />
              ))}
            </div>
          ) : (
            <div className="bg-emerald-50/50 border border-emerald-200 text-emerald-800 p-5 rounded-xl flex items-center gap-4 shadow-sm">
              <span className="text-3xl">🎉</span>
              <div>
                <h3 className="font-bold">No Leaks Detected!</h3>
                <p className="text-sm mt-1">You managed your money perfectly this month.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">All Expenses</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {monthData.expenses.length > 0 ? (
            monthData.expenses.map((expense, idx) => (
              <div key={idx} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shrink-0">
                    {expense.category === "Food" ? "🍔" : 
                     expense.category === "Transport" ? "🚗" : 
                     expense.category === "Entertainment" ? "🎬" : 
                     expense.category === "Shopping" ? "🛍️" : "💸"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{expense.category}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                      {expense.note && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[150px] sm:max-w-[300px]">{expense.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-slate-900">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">No expenses recorded.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthDetail;
