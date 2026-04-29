import API from "./api";

// Update user's monthly income
const updateIncome = async (monthlyIncome) => {
  const response = await API.put("/profile/income", { monthlyIncome });
  return response.data;
};

const profileService = { updateIncome };

export default profileService;
