export const categorizeSpending = (expenses) => {
  if (!expenses || expenses.length === 0) return [];

  const categoryMap = {};

  expenses.forEach((expense) => {
    if (!categoryMap[expense.category]) {
      categoryMap[expense.category] = 0;
    }
    categoryMap[expense.category] += expense.amount;
  });

  // Convert map to array format expected by Recharts
  const data = Object.keys(categoryMap).map((category) => ({
    name: category,
    value: categoryMap[category],
  }));

  // Sort by value descending
  return data.sort((a, b) => b.value - a.value);
};
