import API from "./api";

// Add a new expense
const addExpense = async (expenseData) => {
  const response = await API.post("/expenses", expenseData);
  return response.data;
};

// Get all expenses for logged-in user
const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

// Delete an expense by ID
const deleteExpense = async (id) => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};

const expenseService = { addExpense, getExpenses, deleteExpense };

export default expenseService;
