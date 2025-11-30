import axiosClient from "./axiosClient";

const ENDPOINT = "/admin/about";

const AboutApi = {
  get: () => axiosClient.get(ENDPOINT),
  create: (formData) =>
    axiosClient.post(ENDPOINT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (formData) =>
    axiosClient.put(ENDPOINT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: () => axiosClient.delete(ENDPOINT),
};

export default AboutApi;