export const detectLeaks = (expenses) => {
  if (!expenses || expenses.length === 0) return [];

  // Group by category
  const categoryGroups = {};
  expenses.forEach(exp => {
    if (!categoryGroups[exp.category]) {
      categoryGroups[exp.category] = [];
    }
    categoryGroups[exp.category].push(exp);
  });

  const leaks = [];

  // Simple algorithm:
  // If there are 3+ expenses within the last 30 days in a category.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  Object.keys(categoryGroups).forEach(category => {
    const recentExpenses = categoryGroups[category].filter(
      exp => new Date(exp.date) >= thirtyDaysAgo
    );

    if (recentExpenses.length >= 3) {
      const totalAmount = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const avgAmount = totalAmount / recentExpenses.length;

      // Classify severity based on frequency
      let severity = "Low";
      if (recentExpenses.length >= 7) severity = "High";
      else if (recentExpenses.length >= 5) severity = "Medium";

      leaks.push({
        id: category,
        category,
        count: recentExpenses.length,
        totalAmount,
        averageAmount: avgAmount,
        severity,
        suggestion: `You have ${recentExpenses.length} recent transactions for ${category}. Consider if all of these were necessary to avoid money leaks.`
      });
    }
  });

  // Return highest impact leaks first
  return leaks.sort((a, b) => b.totalAmount - a.totalAmount);
};
