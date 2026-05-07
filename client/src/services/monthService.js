import API from "./api";

const closeMonth = async (monthData) => {
  const response = await API.post("/months/close", monthData);
  return response.data;
};

const getSavedMonths = async () => {
  const response = await API.get("/months");
  return response.data;
};

const getMonthDetail = async (id) => {
  const response = await API.get(`/months/${id}`);
  return response.data;
};

const deleteMonth = async (id) => {
  const response = await API.delete(`/months/${id}`);
  return response.data;
};

const monthService = {
  closeMonth,
  getSavedMonths,
  getMonthDetail,
  deleteMonth,
};

export default monthService;
