import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import profileService from "../services/profileService";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.monthlyIncome !== undefined) {
      setMonthlyIncome(user.monthlyIncome.toString());
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const incomeValue = Number(monthlyIncome);

    if (isNaN(incomeValue) || incomeValue < 0) {
      setMessage({ type: "error", text: "Please enter a valid positive number" });
      return;
    }

    setLoading(true);
    try {
      const data = await profileService.updateIncome(incomeValue);
      updateUser({ monthlyIncome: data.monthlyIncome });
      setMessage({ type: "success", text: "Monthly income updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update income. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account settings and income
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Financial Settings</h3>

        {message.text && (
          <div
            className={`flex items-center gap-2.5 p-3.5 rounded-lg border text-sm font-medium mb-5 animate-slide-down ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.type === "success" ? "✅" : "⚠️"} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-slate-900 mb-1.5"
              htmlFor="monthly-income"
            >
              Monthly Income (Rs.)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Used to calculate your budget and spending limits.
            </p>
            <input
              type="number"
              id="monthly-income"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-slate-300 transition-all duration-150 outline-none"
              placeholder="e.g. 50000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 active:translate-y-0 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
