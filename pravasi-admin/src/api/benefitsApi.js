import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API_BASE = `${BASE_URL}/admin`;

export const getBenefits = async () => {
  const res = await axios.get(`${API_BASE}/benefits`);
  return res.data.data;
};

export const addBenefit = async (data) => {
  const res = await axios.post(`${API_BASE}/benefits`, data);
  return res.data;
};

export const updateBenefit = async (id, data) => {
  const res = await axios.put(`${API_BASE}/benefits/${id}`, data);
  return res.data;
};

export const deleteBenefit = async (id) => {
  const res = await axios.delete(`${API_BASE}/benefits/${id}`);
  return res.data;
};
