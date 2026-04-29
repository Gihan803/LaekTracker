import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import expenseService from "../services/expenseService";
import ExpenseRow from "../components/ExpenseRow";

const categories = ["All","Food","Transport","Entertainment","Shopping","Bills","Health","Education","Subscriptions","Other"];

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const data = await expenseService.getExpenses();
      setExpenses(data);
    } catch (error) { console.error("Failed to fetch expenses:", error);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await expenseService.deleteExpense(id);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (error) { console.error("Failed to delete:", error); }
  };

  const filtered = expenses.filter((exp) => {
    const matchesSearch = search === "" || exp.note?.toLowerCase().includes(search.toLowerCase()) || exp.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
        <div className="w-9 h-9 border-3 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">All Expenses</h1>
          <p className="text-sm text-slate-500 mt-1">{expenses.length} total expenses</p>
        </div>
        <Link to="/add" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-150">
          ➕ Add Expense
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input type="text" className="flex-1 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-150" placeholder="🔍 Search by note or category..." value={search} onChange={(e) => setSearch(e.target.value)} id="expense-search" />
        <select className="px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-sm text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all duration-150 cursor-pointer" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} id="expense-category-filter">
          {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
      </div>

      {/* Expense List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-base font-semibold text-slate-500 mb-1">No expenses found</p>
            <p className="text-sm text-slate-400">{expenses.length > 0 ? "Try adjusting your search or filter" : "Start by adding your first expense"}</p>
          </div>
        ) : (
          filtered.map((expense) => (
            <ExpenseRow key={expense._id} expense={expense} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllExpenses;
