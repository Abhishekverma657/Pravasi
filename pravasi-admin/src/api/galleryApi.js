import { BASE_URL  } from "../utils/constants";
const BASE = `${BASE_URL}/admin/gallery`;

export const getGallery = async () => {
  const res = await fetch(BASE);
  return res.json();
};

export const addGallery = async (formData) => {
  const res = await fetch(BASE, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

export const updateGallery = async (id, formData) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    body: formData,
  });
  return res.json();
};

export const deleteGallery = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
