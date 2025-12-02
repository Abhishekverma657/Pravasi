import axiosClient from "./axiosClient";

export const getSambalYojna = async () => {
  const res = await axiosClient.get("/admin/sambhal-yojana");
  return res.data?.data?.[0] || null;
};

export const updateSambalYojna = async (id, payload) => {
  const res = await axiosClient.put(`/admin/sambhal-yojana/${id}`, payload);
  return res.data;
};