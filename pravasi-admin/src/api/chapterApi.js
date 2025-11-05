// import axiosClient from "./axiosClient";

// const chapterApi = {
//   // GET list by type: 'india' or 'abroad'
//   getAll: async (type = "india") => {
    
//     const res = await axiosClient.get(`/cities/${type}`, {
//          headers: { "Content-Type": "multipart/form-data"
//          }
//           },
//     );
//     return res.data;
//   },

//   // Create new city/chapter. `type` must be 'india' or 'abroad'
//   create: async (type = "india", payload = {}) => {
//     const form = new FormData();
//     form.append("name", payload.name || "");
//     if (payload.imageFile) form.append("image", payload.imageFile);
//     const contact = payload.contact || {};
//     form.append("contact[address]", contact.address || "");
//     form.append("contact[phone]", contact.phone || "");
//     form.append("contact[email]", contact.email || "");
//     form.append("contact[website]", contact.website || "");
//     (payload.people || []).forEach((p, idx) => {
//   form.append(`people[${idx}][name]`, `"${p.name || ""}"`);
//   form.append(`people[${idx}][designation]`, `"${p.designation || ""}"`);
//   form.append(`people[${idx}][about]`, `"${p.about || ""}"`);
//   form.append(`people[${idx}][email]`, `"${p.email || ""}"`);
//   form.append(`people[${idx}][phone]`, `"${p.phone || ""}"`);
// });


//     // Fallback: also send people as JSON (some servers expect JSON field instead of nested form keys)
//     form.append("people", JSON.stringify(payload.people || []));

//     // DEBUG: inspect form fields in console (remove in production)
//     // for (const pair of form.entries()) console.log(pair[0], pair[1]);

//     // DO NOT set Content-Type manually — let axios set boundary
//     const res = await axiosClient.post(`/cities/${type}`, form 
    
//     );
//     return res.data;
//   },

//   // Update existing city (multipart). `id` is city _id.
//   update: async (id, payload = {}) => {

//     const form = new FormData();
//     if (payload.name) form.append("name", payload.name);
//     if (payload.imageFile) form.append("image", payload.imageFile);
//     const contact = payload.contact || {};
//     if ("address" in contact) form.append("contact[address]", contact.address || "");
//     if ("phone" in contact) form.append("contact[phone]", contact.phone || "");
//     if ("email" in contact) form.append("contact[email]", contact.email || "");
//     if ("website" in contact) form.append("contact[website]", contact.website || "");
//    (payload.people || []).forEach((p, idx) => {
//   form.append(`people[${idx}][name]`, `"${p.name || ""}"`);
//   form.append(`people[${idx}][designation]`, `"${p.designation || ""}"`);
//   form.append(`people[${idx}][about]`, `"${p.about || ""}"`);
//   form.append(`people[${idx}][email]`, `"${p.email || ""}"`);
//   form.append(`people[${idx}][phone]`, `"${p.phone || ""}"`);
// });


//     // Fallback JSON
//     form.append("people", JSON.stringify(payload.people || []));

//     // DEBUG: inspect form fields
//     // for (const pair of form.entries()) console.log(pair[0], pair[1]);

//     // Let axios set Content-Type with proper boundary
//     const res = await axiosClient.put(`/cities/${id}`, form);
//     return res.data;
//   },

//   // Delete by id
//   delete: async (id) => {
//     const res = await axiosClient.delete(`/cities/${id}`);
//     return res.data;
//   },
// };

// export default chapterApi;
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
