import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-blue-50 p-6">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg animate-scale-in">
        {/* Logo */}
        <div className="text-3xl mb-5 flex items-center gap-2.5">
          💸{" "}
          <span className="font-extrabold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            LeakTracker
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500 mb-7">
          Sign in to track your expenses
        </p>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-5 animate-slide-down">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-sm font-semibold text-slate-900 mb-1.5"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              type="email"
              id="login-email"
              name="email"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-slate-300 transition-all duration-150 outline-none"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="mb-5">
            <label
              className="block text-sm font-semibold text-slate-900 mb-1.5"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 hover:border-slate-300 transition-all duration-150 outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30 active:translate-y-0 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
            disabled={loading}
            id="login-submit-btn"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-500 font-semibold hover:text-emerald-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
