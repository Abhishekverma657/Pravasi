import axios from "axios";

import { BASE_URL } from "../utils/constants";

export const getMissions = async () => {
  const res = await axios.get(`${BASE_URL}/admin/mission-cards`);
  return res.data?.data || [];
};

export const addMission = async (mission) => {
  const res = await axios.post(`${BASE_URL}/admin/mission-cards`, mission);
  return res.data;
};

export const updateMission = async (id, mission) => {
  const res = await axios.put(`${BASE_URL}/admin/mission-cards/${id}`, mission);
  return res.data;
};

export const deleteMission = async (id) => {
  const res = await axios.delete(`${BASE_URL}/admin/mission-cards/${id}`);
  return res.data;
};
