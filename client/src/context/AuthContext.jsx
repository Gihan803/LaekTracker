import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("leaktracker_token"));
  const [loading, setLoading] = useState(true);

  // On mount, check if token exists and fetch user data
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (error) {
          // Token expired or invalid — clear everything
          console.error("Auth init failed:", error);
          localStorage.removeItem("leaktracker_token");
          localStorage.removeItem("leaktracker_user");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem("leaktracker_token", data.token);
    localStorage.setItem("leaktracker_user", JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  // Register function — auto-login after registration
  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    localStorage.setItem("leaktracker_token", data.token);
    localStorage.setItem("leaktracker_user", JSON.stringify(data));
    setToken(data.token);
    setUser(data);
    return data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("leaktracker_token");
    localStorage.removeItem("leaktracker_user");
    setToken(null);
    setUser(null);
  };

  // Update user data (e.g., after income update)
  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    localStorage.setItem(
      "leaktracker_user",
      JSON.stringify({ ...user, ...updatedData })
    );
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
