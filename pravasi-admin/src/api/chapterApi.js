 
import axiosClient from "./axiosClient";

const chapterApi = {
  // GET list
  getAll: async (type = "india") => {
    const res = await axiosClient.get(`/cities/${type}`);
    return res.data;
  },

  // ✅ Create new city/chapter
  create: async (type = "india", payload = {}) => {
    if (payload instanceof FormData) {
      const res = await axiosClient.post(`/cities/${type}`, payload);
      return res.data;
    }
    const form = new FormData();
    form.append("name", payload.name || "");
    if (payload.imageFile) form.append("image", payload.imageFile);

    const contact = payload.contact || {};
    form.append("contact", JSON.stringify(contact));

    // people fields (curl-style)
    (payload.people || []).forEach((p, idx) => {
      form.append(`people[${idx}][name]`, p.name || "");
      form.append(`people[${idx}][designation]`, p.designation || "");
      form.append(`people[${idx}][about]`, p.about || "");
      form.append(`people[${idx}][email]`, p.email || "");
      form.append(`people[${idx}][phone]`, p.phone || "");
    });

    // 🔥 Debug (optional — shows exactly what is sent)
    for (const [key, value] of form.entries()) {
      console.log("FormData:", key, value);
    }

    // ✅ IMPORTANT: axiosClient must not transform FormData
    const res = await axiosClient.post(`/cities/${type}`, form
     
 
    );

    return res.data;
  },

  // Update existing
  update: async (id, payload = {}) => {
    if (payload instanceof FormData) {
      const res = await axiosClient.put(`/cities/${id}`, payload);
      return res.data;
    }
    const form = new FormData();
    if (payload.name) form.append("name", payload.name);
    if (payload.imageFile) form.append("image", payload.imageFile);

    const contact = payload.contact || {};
    form.append("contact", JSON.stringify(contact));

    (payload.people || []).forEach((p, idx) => {
      form.append(`people[${idx}][name]`, p.name || "");
      form.append(`people[${idx}][designation]`, p.designation || "");
      form.append(`people[${idx}][about]`, p.about || "");
      form.append(`people[${idx}][email]`, p.email || "");
      form.append(`people[${idx}][phone]`, p.phone || "");
    });

    const res = await axiosClient.put(`/cities/${id}`, form);

    return res.data;
  },

  
  updatePeople: async (id, people = []) => {
    const res = await axiosClient.post(`/cities/${id}/people`, { people });
    return res.data;
  },

  // Delete
  delete: async (id) => {
    const res = await axiosClient.delete(`/cities/${id}`);
    return res.data;
  },
};

export default chapterApi;
