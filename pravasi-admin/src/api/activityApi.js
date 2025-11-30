import axiosClient from "./axiosClient";

// API endpoints
export const getRajasthanGovtInitiatives = () =>
  axiosClient.get("/admin/rajasthan-govt-initiatives");

export const updateRajasthanGovtInitiatives = (id, data) =>
  axiosClient.put(`/admin/rajasthan-govt-initiatives/${id}`, data);

export const getInvestmentSectors = () =>
  axiosClient.get("/admin/investment-sectors");

export const updateInvestmentSectors = (id, data) =>
  axiosClient.put(`/admin/investment-sectors/${id}`, data);

export const getActivitiesRPF = () =>
  axiosClient.get("/admin/activities-rpf");

export const updateActivitiesRPF = (id, data) =>
  axiosClient.put(`/admin/activities-rpf/${id}`, data);