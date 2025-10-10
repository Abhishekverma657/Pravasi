// src/api/newsApi.js
const BASE_URL = "http://31.97.231.85:2700/api/admin/news";

export async function getNews() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch news");
  const json = await res.json();
  return json.data || [];
}

export async function addNews(formData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to add news");
  return await res.json();
}

export async function updateNews(id, formData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update news");
  return await res.json();
}

export async function deleteNews(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete news");
  return await res.json();
}
