import axios from "axios";

const API_URL = "http://31.97.231.85:2700/api/admin/contact-messages";

export const getContacts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data?.data || [];
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch contacts");
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete contact");
  }
};

export const toggleReadStatus = async (id, read) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, { read });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update status");
  }
};
