import API from "./api";

// Register a new user
const register = async (name, email, password) => {
  const response = await API.post("/auth/register", { name, email, password });
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

// Get current logged-in user info
const getMe = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

const authService = { register, login, getMe };

export default authService;
