import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API_URL = `${BASE_URL}/admin/hero-slides`;

export const getHeroSlides = async () => {
  const { data } = await axios.get(API_URL);
  return data.data;
};

export const addHeroSlide = async (formData) => {
  const { data } = await axios.post(API_URL, formData);
  return data;
};

export const updateHeroSlide = async (id, formData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, formData);
  return data;
};

export const deleteHeroSlide = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
