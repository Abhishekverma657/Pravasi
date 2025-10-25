import axios from "axios";
import { BASE_URL } from "../utils/constants";

const BASE = `${BASE_URL}/admin/businesses`;

export const getBusinesses = async () => {
  const res = await axios.get(BASE);
  return res.data.data;
};

export const addBusiness = async (businessData) => {
  const formData = new FormData();
  Object.keys(businessData).forEach((key) => {
    formData.append(key, businessData[key]);
  });
  const res = await axios.post(BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBusiness = async (id, businessData) => {
  const formData = new FormData();
  Object.keys(businessData).forEach((key) => {
    formData.append(key, businessData[key]);
  });
  const res = await axios.put(`${BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBusiness = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data;
};