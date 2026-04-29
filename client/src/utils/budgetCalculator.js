/**
 * Budget Calculator Utility
 *
 * Calculates budget health based on monthly income and expenses.
 * Returns total spent, remaining budget, percentage, and status.
 */

/**
 * Get expenses for the current month only
 */
export const getCurrentMonthExpenses = (expenses) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });
};

/**
 * Calculate budget health
 * @param {number} monthlyIncome - User's monthly income
 * @param {Array} expenses - Array of expense objects (all expenses, will be filtered to current month)
 * @returns {Object} Budget health data
 */
export const calculateBudget = (monthlyIncome, expenses = []) => {
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);

  const totalSpent = currentMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remaining = monthlyIncome - totalSpent;

  const spentPercentage =
    monthlyIncome > 0 ? Math.round((totalSpent / monthlyIncome) * 100) : 0;

  // Determine status based on spending percentage
  let status = "safe";
  if (monthlyIncome === 0) {
    status = "no-income";
  } else if (spentPercentage >= 90) {
    status = "danger";
  } else if (spentPercentage >= 75) {
    status = "warning";
  }

  return {
    totalSpent,
    remaining,
    spentPercentage,
    status,
    currentMonthExpenses,
    expenseCount: currentMonthExpenses.length,
  };
};

/**
 * Format currency in Rs.
 */
export const formatCurrency = (amount) => {
  return `Rs. ${Math.abs(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
