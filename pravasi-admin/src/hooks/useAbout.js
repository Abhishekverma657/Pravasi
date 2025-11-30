import { useState, useEffect } from "react";
import AboutApi from "../api/AboutApi";
import { toast } from "react-hot-toast";

export default function useAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await AboutApi.get();
      setAbout(res.data);
    } catch (e) {
      toast.error("Failed to fetch About info");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const createAbout = async (formData) => {
    setLoading(true);
    try {
      await AboutApi.create(formData);
      toast.success("About created!");
      fetchAbout();
    } catch (e) {
      toast.error("Create failed");
    }
    setLoading(false);
  };

  const updateAbout = async (formData) => {
    setLoading(true);
    try {
      await AboutApi.update(formData);
      toast.success("About updated!");
      fetchAbout();
    } catch (e) {
      toast.error("Update failed");
    }
    setLoading(false);
  };

  const deleteAbout = async () => {
    setLoading(true);
    try {
      await AboutApi.delete();
      toast.success("About deleted!");
      setAbout(null);
    } catch (e) {
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  return { about, loading, createAbout, updateAbout, deleteAbout, refetch: fetchAbout };
}