import axios from 'axios';

const BASE_URL = 'http://31.97.231.85:2700/api';

export const notificationApi = {
  // Get all notifications
  getAll: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/notification/admin-notifications?page=${page}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send notification to all users
  sendToAll: async (data) => {
    try {
      const notificationData = {
        ...data,
        sentBy: "admin" // Adding fixed sentBy field
      };
      
      const response = await axios.post(`${BASE_URL}/notification/send-to-all`, notificationData);
      console.log("Notification sent successfully:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/notification/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  },

  // Update notification
  updateNotification: async (notificationId, data) => {
    try {
      const updateData = {
        ...data,
        sentBy: "admin" // Ensure sentBy remains admin
      };
      
      const response = await axios.put(
        `${BASE_URL}/notification/notifications/${notificationId}`, 
        updateData
      );
      console.log("Notification updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating notification:", error);
      throw error;
    }
  }
};