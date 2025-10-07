import axios from "axios";
import { BASE_URL } from "../utils/constants";

const BASE = `${BASE_URL}/admin/events`;

export const getEvents = async () => {
  const res = await axios.get(BASE);
  return res.data.data;
};

export const addEvent = async (eventData) => {
  const formData = new FormData();
  Object.keys(eventData).forEach((key) => {
    formData.append(key, eventData[key]);
  });
  const res = await axios.post(BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateEvent = async (id, eventData) => {
  const formData = new FormData();
  Object.keys(eventData).forEach((key) => {
    formData.append(key, eventData[key]);
  });
  const res = await axios.put(`${BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data;
};
