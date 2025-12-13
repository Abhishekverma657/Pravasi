import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getDashboardData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/dashboard/stats?`);
    return res.data.data;
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return null;
  }
};

export const verifyPravasi = async (id) => {
  try {
 
    const res = await axios.put(`${BASE_URL}/admin/verify/${id}`);
    return res.data;
  } catch (err) {
    console.error("Verify API Error:", err);
    throw err;
  }
};
export const deleteUser = async (userId) => {
  
  try {
  if (!userId) throw new Error("User ID is required for deletion");
    const res = await axios.delete(`${BASE_URL}/auth/delete`, { data: { userId } });
    return res.data;
  } catch (err) {
    console.error("Delete API Error:", err);
    throw err;
  }
}
