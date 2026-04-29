import axios from "axios";

// Create axios instance with base URL from environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor — attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("leaktracker_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor — handle 401 errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("leaktracker_token");
      localStorage.removeItem("leaktracker_user");
      // Only redirect if not already on auth pages
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
