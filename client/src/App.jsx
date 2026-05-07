import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AllExpenses from "./pages/AllExpenses";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import SavedMonths from "./pages/SavedMonths";
import MonthDetail from "./pages/MonthDetail";

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 mt-16 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes inside App Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AppLayout>
              <AddExpense />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <AppLayout>
              <AllExpenses />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/insights"
        element={
          <PrivateRoute>
            <AppLayout>
              <Insights />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/saved-months"
        element={
          <PrivateRoute>
            <AppLayout>
              <SavedMonths />
            </AppLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/saved-months/:id"
        element={
          <PrivateRoute>
            <AppLayout>
              <MonthDetail />
            </AppLayout>
          </PrivateRoute>
        }
      />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
