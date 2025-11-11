import axiosClient from "./axiosClient";

export const notificationApi = {
  // Get all notifications (admin) with pagination
  getAll: async (page = 1) => {
    try {
      const res = await axiosClient.get("/notification/admin-notifications", {
        params: { page },
      });
      return res.data;
    } catch (error) {
      console.error("Failed to fetch notifications:", error.response?.data || error.message);
      throw error;
    }
  },

  // Send notification to all users
  sendToAll: async (data) => {
    try {
      const payload = { ...data, sentBy: "admin" };
      const res = await axiosClient.post("/notification/send-to-all", payload);
      console.log("Notification sent successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error sending notification:", error.response?.data || error.message);
      throw error;
    }
  },

  // Delete notification by id
  deleteNotification: async (notificationId) => {
    try {
      const res = await axiosClient.delete(`/notification/notifications/${notificationId}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting notification:", error.response?.data || error.message);
      throw error;
    }
  },

  // Update notification by id
  updateNotification: async (notificationId, data) => {
    try {
      const payload = { ...data, sentBy: "admin" };
      const res = await axiosClient.put(`/notification/notifications/${notificationId}`, payload);
      console.log("Notification updated successfully:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating notification:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default notificationApi;