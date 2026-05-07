import { useState } from "react";
import { useNavigate } from "react-router-dom";
import expenseService from "../services/expenseService";

const categories = [
  "Food", "Transport", "Entertainment", "Shopping",
  "Bills", "Health", "Education", "Subscriptions", "Other",
];

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: "", category: "", date: new Date().toISOString().split("T")[0], note: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.amount || !formData.category) { setError("Please add amount and category"); return; }
    if (Number(formData.amount) <= 0) { setError("Amount must be greater than 0"); return; }

    setLoading(true);
    try {
      await expenseService.addExpense({
        amount: Number(formData.amount), category: formData.category,
        date: formData.date, note: formData.note,
      });
      navigate("/expenses");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense.");
    } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-slate-300 transition-all duration-150 outline-none";

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Add Expense</h1>
        <p className="text-sm text-slate-500 mt-1">Log a new expense to track your spending</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
        {error && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-5 animate-slide-down">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-900 mb-1.5" htmlFor="expense-amount">Amount (Rs.)</label>
            <input type="number" id="expense-amount" name="amount" className={inputCls} placeholder="e.g. 250" value={formData.amount} onChange={handleChange} min="0" step="0.01" />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-900 mb-1.5" htmlFor="expense-category">Category</label>
            <select id="expense-category" name="category" className={`${inputCls} cursor-pointer`} value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-900 mb-1.5" htmlFor="expense-date">Date</label>
            <input type="date" id="expense-date" name="date" className={inputCls} value={formData.date} onChange={handleChange} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-1.5" htmlFor="expense-note">Note (optional)</label>
            <textarea id="expense-note" name="note" rows="3" className={`${inputCls} resize-none`} placeholder="What was this expense for?" value={formData.note} onChange={handleChange}></textarea>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer" disabled={loading} id="add-expense-submit-btn">
              {loading ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>Adding...</>) : "Add Expense"}
            </button>
            <button type="button" className="px-6 py-3 border-2 border-slate-200 text-slate-500 text-sm font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 cursor-pointer" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
