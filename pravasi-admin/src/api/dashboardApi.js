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

/**
 * Verify pravasi by id
 * Uses same endpoint as your curl:
 * PUT http://31.97.231.85:2700/api/admin/verify/:id
 *
 * Replace BASE_URL in ../utils/constants if needed.
 */
export const verifyPravasi = async (id) => {
  try {
    // if your BASE_URL isn't set to the API host, you can
    // hardcode the URL like in the curl:
    // const res = await axios.put(`http://31.97.231.85:2700/api/admin/verify/${id}`);
    const res = await axios.put(`${BASE_URL}/admin/verify/${id}`);
    return res.data;
  } catch (err) {
    console.error("Verify API Error:", err);
    throw err;
  }
};
