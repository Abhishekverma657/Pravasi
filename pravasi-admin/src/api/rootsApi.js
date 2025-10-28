import axios from "axios";
import { BASE_URL } from "../utils/constants";

const BASE = `${BASE_URL}/our-roots`;

export const getRoots = async () => {
  try {
    const res = await axios.get(BASE);
    return Array.isArray(res.data) ? res.data : [res.data];
  } catch (err) {
    console.error("Error fetching roots:", err);
    throw err;
  }
};

export const addRoot = async (rootData) => {
  try {
    // If caller already prepared a FormData (modal does), send it directly.
    if (rootData instanceof FormData) {
      const res = await axios.post(BASE, rootData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }

    // Otherwise build FormData from plain object
    const formData = new FormData();
    Object.keys(rootData).forEach((key) => {
      if (key === "descriptionPoints" && Array.isArray(rootData[key])) {
        formData.append(key, rootData[key].join("|"));
      } else if (key === "showMore") {
        formData.append(key, rootData[key].toString());
      } else {
        formData.append(key, rootData[key]);
      }
    });

    const res = await axios.post(BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding root:", err);
    throw err;
  }
};

export const deleteRoot = async (id) => {
  try {
    const res = await axios.delete(`${BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting root:", err);
    throw err;
  }
};

export const updateRoot = async (id, rootData) => {
  try {
    let formData;
    if (rootData instanceof FormData) {
      formData = rootData;
    } else {
      formData = new FormData();
      Object.keys(rootData).forEach((key) => {
        if (key === "descriptionPoints" && Array.isArray(rootData[key])) {
          formData.append(key, rootData[key].join("|"));
        } else if (key === "showMore") {
          formData.append(key, rootData[key].toString());
        } else {
          formData.append(key, rootData[key]);
        }
      });
    }

    const res = await axios.put(`${BASE}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating root:", err);
    throw err;
  }
};