// src/api/newsApi.js
import axiosClient from "./axiosClient";

// named exports used by NewsPage.jsx
export const getNews = async () => {
  const res = await axiosClient.get("/admin/news");
  return res.data?.data || [];
};

export const addNews = async (formData) => {
  const res = await axiosClient.post("/admin/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateNews = async (id, formData) => {
  const res = await axiosClient.put(`/admin/news/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteNews = async (id) => {
  const res = await axiosClient.delete(`/admin/news/${id}`);
  return res.data;
};

// keep default export for other callers
const newsApi = {
  getAll: getNews,
  create: addNews,
  update: updateNews,
  delete: deleteNews,
};

export default newsApi;
