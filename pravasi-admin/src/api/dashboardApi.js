import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getDashboardData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/stats`);
    return res.data.data;
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return null;
  }
};
