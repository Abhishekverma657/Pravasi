import axiosClient from "./axiosClient";

export const getContacts = async () => {
  try {
    const res = await axiosClient.get("/admin/contact-messages");
    return res.data?.data || [];
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Failed to fetch contacts");
  }
};

export const deleteContact = async (id) => {
  try {
    const res = await axiosClient.delete(`/admin/contact-messages/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Failed to delete contact");
  }
};

export const toggleReadStatus = async (id, read) => {
  try {
    const res = await axiosClient.patch(`/admin/contact-message/${id}/read`, { read });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Failed to update status");
  }
};

export default {
  getContacts,
  deleteContact,
  toggleReadStatus,
};
