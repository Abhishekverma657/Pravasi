import axiosClient from "./axiosClient";

export const getMissions = async () => {
  const res = await axiosClient.get("/admin/mission-cards");
  return res.data?.data || [];
};

export const addMission = async (formData) => {
  // expects FormData
  const res = await axiosClient.post("/admin/mission-cards", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateMission = async (id, formData) => {
  const res = await axiosClient.put(`/admin/mission-cards/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMission = async (id) => {
  const res = await axiosClient.delete(`/admin/mission-cards/${id}`);
  return res.data;
};

export default {
  getMissions,
  addMission,
  updateMission,
  deleteMission,
};
