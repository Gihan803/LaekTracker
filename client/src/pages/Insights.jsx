import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import expenseService from "../services/expenseService";
import { categorizeSpending } from "../utils/categorizeSpending";
import { detectLeaks } from "../utils/detectLeaks";
import LeakAlert from "../components/LeakAlert";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

const Insights = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expenseService.getExpenses();
        setExpenses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching expenses for insights:", err);
        setError("Failed to load insights data");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading insights...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  const categoryData = categorizeSpending(expenses);
  const leaks = detectLeaks(expenses);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Insights</h1>
        <p className="text-sm text-slate-500 mt-1">
          Smart analysis and leak detection
        </p>
      </div>

      {expenses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Not Enough Data
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Add some expenses to see your spending patterns, category breakdowns, and smart leak alerts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Leaks Section */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🔍</span> Detected Leaks
            </h2>
            {leaks.length > 0 ? (
              leaks.map((leak) => (
                <LeakAlert key={leak.id} leak={leak} />
              ))
            ) : (
              <div className="bg-green-500/10 border border-green-500 text-green-700 p-4 rounded-xl flex items-center gap-3 shadow-sm animate-fade-in">
                <span className="text-2xl">🎉</span>
                <div>
                  <h3 className="font-bold">No Leaks Detected!</h3>
                  <p className="text-sm">Your spending patterns look healthy. Keep it up!</p>
                </div>
              </div>
            )}
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>🥧</span> Spending by Category
            </h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `Rs. ${value.toLocaleString()}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
