// import axios from "axios";

// const API_URL = "http://31.97.231.85:2700/api/admin/persons";

// export const getPeople = async () => {
//   const { data } = await axios.get(API_URL);
//   return data.data;
// };

// export const addPerson = async (formData) => {
//   const { data } = await axios.post(API_URL, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

// export const updatePerson = async (id, formData) => {
//   const { data } = await axios.put(`${API_URL}/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return data;
// };

// export const deletePerson = async (id) => {
//   const { data } = await axios.delete(`${API_URL}/${id}`);
//   return data;
// };

import axios from "axios";
import { toast } from "react-hot-toast";
import {  BASE_URL } from "../utils/constants";

const BASE = `${BASE_URL}/admin/persons`;

/** Common Axios config */
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

/** ✅ Get all people */
export const getPeople = async () => {
  try {
    const { data } = await axios.get(BASE);
    return data.data || [];
  } catch (err) {
    toast.error("Failed to load people!");
    throw err;
  }
};

/** ✅ Add a new person (member only) */
export const addPerson = async (formData) => {
  try {
    const { data } = await axios.post(BASE, formData, config);
    toast.success("Member added successfully!");
    return data;
  } catch (err) {
    toast.error("Failed to add member!");
    throw err;
  }
};

/** ✅ Update a person (founder/member both) */
export const updatePerson = async (id, formData) => {
  try {
    const { data } = await axios.put(`${BASE}/${id}`, formData, config);
    toast.success("Updated successfully!");
    return data;
  } catch (err) {
    toast.error("Failed to update!");
    throw err;
  }
};

/** ✅ Delete person */
export const deletePerson = async (id) => {
  try {
    const { data } = await axios.delete(`${BASE}/${id}`);
    toast.success("Deleted successfully!");
    return data;
  } catch (err) {
    toast.error("Failed to delete!");
    throw err;
  }
};
