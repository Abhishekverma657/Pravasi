import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API_BASE = `${BASE_URL}/admin`;

export const getBenefits = async () => {
  const res = await axios.get(`${API_BASE}/benefits`);
  return res.data.data;
};

export const addBenefit = async (data) => {
  // data should be FormData
  const res = await axios.post(`${API_BASE}/benefits`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBenefit = async (id, data) => {
  // data should be FormData
  const res = await axios.put(`${API_BASE}/benefits/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBenefit = async (id) => {
  const res = await axios.delete(`${API_BASE}/benefits/${id}`);
  return res.data;
};

// Example for handleSave in BenefitsPage.jsx

const handleSave = async () => {
  setSaving(true);

  // Prepare FormData for image upload
  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("subtitle", form.subtitle);
  if (form.image instanceof File) {
    fd.append("image", form.image);
  }

  try {
    if (form._id) {
      // Edit/update
      await updateBenefit(form._id, fd); // fd is FormData
    } else {
      // Add/create
      await addBenefit(fd); // fd is FormData
    }
    // Refresh list, close modal, etc.
  } catch (err) {
    // Handle error
  }
  setSaving(false);
};
