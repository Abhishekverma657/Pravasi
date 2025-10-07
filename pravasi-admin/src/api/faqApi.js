// import axiosClient from "./axiosClient";

// const FAQ_API = {
//   // ✅ Fetch all FAQs
//   getAll: async () => {
//     const res = await axiosClient.get("/admin/faqs");
//     return res.data.data;  
//   },

//   // ✅ Add new FAQ
//   add: async (faq) => {
//     const res = await axiosClient.post("/admin/faqs", faq);
//     return res.data;
//   },

//   // ✅ Update FAQ
//   update: async (id, faq) => {
//     const res = await axiosClient.put(`/admin/faqs/${id}`, faq);
//     return res.data;
//   },

//   // ✅ Delete FAQ
//   delete: async (id) => {
//     const res = await axiosClient.delete(`/admin/faqs/${id}`);
//     return res.data;
//   },
// };

// export default FAQ_API;

// src/api/faqApi.js
import axiosClient from "./axiosClient";

export const FAQ_API = {
  async getAll() {
    const res = await axiosClient.get("/admin/faqs");
    return res.data?.data || [];
  },

  async add(payload) {
    const res = await axiosClient.post("/admin/faqs", payload);
    return res.data;
  },

  async update(id, payload) {
    const res = await axiosClient.put(`/admin/faqs/${id}`, payload);
    return res.data;
  },

  async remove(id) {
    const res = await axiosClient.delete(`/admin/faqs/${id}`);
    return res.data;
  },
};
