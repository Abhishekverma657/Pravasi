import axiosClient from "./axiosClient";

/**
 * Logs in an admin user.
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The response from the server.
 */
export const loginAdmin = async ({ email, password }) => {
  const response = await axiosClient.post(
    "/admin/auth/login",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * Sends a forgot password request for the given email.
 * @param {string} email - The user's email.
 * @returns {Promise<Object>} The response from the server.
 */
export const forgotPassword = async (email) => {
  const response = await axiosClient.post(
    "/admin/auth/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * Resets the password for the user.
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.token
 * @param {string} params.newPassword
 * @param {string} params.confirmPassword
 * @returns {Promise<Object>} The response from the server.
 */
export const resetPassword = async ({ email, token, newPassword, confirmPassword }) => {
  const response = await axiosClient.post(
    "/admin/auth/reset-password",
    { email, token, newPassword, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

/**
 * Changes the password for the admin.
 * @param {Object} params
 * @param {string} params.adminId
 * @param {string} params.oldPassword
 * @param {string} params.newPassword
 * @param {string} params.confirmPassword
 * @returns {Promise<Object>} The response from the server.
 */
export const changePassword = async ({ adminId, oldPassword, newPassword, confirmPassword }) => {
  const response = await axiosClient.post(
    "/admin/auth/change-password",
    { adminId, oldPassword, newPassword, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};