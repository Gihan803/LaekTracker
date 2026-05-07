import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import expenseService from "../services/expenseService";
import { calculateBudget, formatCurrency } from "../utils/budgetCalculator";
import { detectLeaks } from "../utils/detectLeaks";
import monthService from "../services/monthService";
import StatCard from "../components/StatCard";
import ExpenseRow from "../components/ExpenseRow";
import BudgetWarning from "../components/BudgetWarning";
import CloseMonthModal from "../components/CloseMonthModal";

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await expenseService.deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleCloseMonth = async () => {
    setClosing(true);
    try {
      const leaks = detectLeaks(expenses);
      await monthService.closeMonth({ leaks });
      setExpenses([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to close month:", error);
      alert("Failed to close month. Please try again.");
    } finally {
      setClosing(false);
    }
  };

  const budget = calculateBudget(user?.monthlyIncome || 0, expenses);
  const recentExpenses = expenses.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Your financial overview at a glance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={expenses.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 transition-all duration-150 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            🗂️ Close Month
          </button>
          <Link
            to="/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-150"
            id="add-expense-btn"
          >
            ➕ Add Expense
          </Link>
        </div>
      </div>

      {/* Budget Warning */}
      <BudgetWarning
        status={budget.status}
        spentPercentage={budget.spentPercentage}
        remaining={budget.remaining}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="💰"
          label="Monthly Income"
          value={
            user?.monthlyIncome
              ? formatCurrency(user.monthlyIncome)
              : "Not set"
          }
          subtext={!user?.monthlyIncome ? "Set in Profile" : "This month"}
          variant="primary"
          delay={0}
        />
        <StatCard
          icon="🔥"
          label="Total Spent"
          value={formatCurrency(budget.totalSpent)}
          subtext={`${budget.expenseCount} expenses this month`}
          variant={budget.status === "danger" ? "danger" : "default"}
          delay={100}
        />
        <StatCard
          icon="🏦"
          label="Remaining"
          value={
            user?.monthlyIncome
              ? formatCurrency(budget.remaining)
              : "—"
          }
          subtext={
            budget.remaining < 0
              ? "Over budget!"
              : user?.monthlyIncome
                ? "Left to spend"
                : "Set income first"
          }
          variant={
            budget.remaining < 0
              ? "danger"
              : budget.status === "warning"
                ? "warning"
                : "info"
          }
          delay={200}
        />
        <StatCard
          icon="📊"
          label="Spent %"
          value={
            user?.monthlyIncome
              ? `${budget.spentPercentage}%`
              : "—"
          }
          subtext={
            user?.monthlyIncome
              ? budget.status === "danger"
                ? "Critical level"
                : budget.status === "warning"
                  ? "Getting high"
                  : "Healthy"
              : "Set income first"
          }
          variant={
            budget.status === "danger"
              ? "danger"
              : budget.status === "warning"
                ? "warning"
                : "primary"
          }
          delay={300}
        />
      </div>

      {/* Recent Expenses */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Expenses
          </h2>
          {expenses.length > 5 && (
            <Link
              to="/expenses"
              className="text-sm text-emerald-500 font-semibold hover:text-emerald-700 transition-colors"
            >
              View all →
            </Link>
          )}
        </div>

        {recentExpenses.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-base font-semibold text-slate-500 mb-1">
              No expenses yet
            </p>
            <p className="text-sm text-slate-400 mb-4">
              Start tracking your spending to see insights
            </p>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-150"
            >
              ➕ Add your first expense
            </Link>
          </div>
        ) : (
          <div>
            {recentExpenses.map((expense) => (
              <ExpenseRow
                key={expense._id}
                expense={expense}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CloseMonthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCloseMonth}
        loading={closing}
      />
    </div>
  );
};

export default Dashboard;
