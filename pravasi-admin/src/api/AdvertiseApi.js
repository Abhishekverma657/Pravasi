import axios from "axios";
import { BASE_URL } from "../utils/constants";

const BASE = `${BASE_URL}/homeYoutube`;

export const getYoutubeVideos = async () => {
  try {
    const res = await axios.get(BASE);
    console.log("Fetched videos response:", res.data);

    // If single object, wrap in array
    if (res.data && !Array.isArray(res.data)) {
      return [res.data];
    }

    // If array in data property
    if (res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }

    // If direct array
    if (Array.isArray(res.data)) {
      return res.data;
    }

    // Fallback to empty array
    return [];
  } catch (err) {
    console.error("Error fetching videos:", err);
    throw err;
  }
};

export const addYoutubeVideo = async (videoData) => {
  try {
    const res = await axios.post(BASE, videoData);
    return res.data;
  } catch (err) {
    console.error("Error adding video:", err);
    throw err;
  }
};

export const deleteYoutubeVideo = async (id) => {
  try {
    const res = await axios.delete(`${BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting video:", err);
    throw err;
  }
};

export const updateYoutubeVideo = async (id, videoData) => {
  try {
    const res = await axios.put(`${BASE}/${id}`, videoData);
    return res.data;
  } catch (err) {
    console.error("Error updating video:", err);
    throw err;
  }
};