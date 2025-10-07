import axios from "axios";

import { BASE_URL } from "../utils/constants";

export const getAllMediaBlogs = async () => {
  const res = await axios.get(`${BASE_URL}/admin/media-blogs`);
  console.log("wkheh bfw");
  console.log(res.data);
  return res.data.data;
};

export const createMediaBlog = async (formData) => {
  const res = await axios.post(`${BASE_URL}/admin/media-blogs`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateMediaBlog = async (id, formData) => {
  const res = await axios.put(`${BASE_URL}/admin/media-blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMediaBlog = async (id) => {
  const res = await axios.delete(`${BASE_URL}/admin/media-blogs/${id}`);
  return res.data;
};
