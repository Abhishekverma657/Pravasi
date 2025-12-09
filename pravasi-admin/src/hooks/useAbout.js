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
      console.log("About data fetched:", res.data);

      // Convert indexed image fields (images0, images1, etc.) into array
      const aboutData = res.data;
      const imageArray = [];
      let idx = 0;
      while (aboutData[`images${idx}`]) {
        imageArray.push(aboutData[`images${idx}`]);
        idx++;
      }

      // Set images as array if any found
      if (imageArray.length > 0) {
        aboutData.images = imageArray;
      } else {
        aboutData.images = [];
      }

      setAbout(aboutData);
    } catch (e) {
      console.error("Fetch error:", e);
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
      const res = await AboutApi.create(formData);
      console.log("About created:", res);
      toast.success("About created!");
      fetchAbout();
    } catch (e) {
      console.error("Create error:", e);
      toast.error(e.response?.data?.message || "Create failed");
    }
    setLoading(false);
  };

  const updateAbout = async (formData) => {
    setLoading(true);
    try {
      const res = await AboutApi.update(formData);
      console.log("About updated:", res);
      toast.success("About updated!");
      fetchAbout();
    } catch (e) {
      console.error("Update error:", e);
      toast.error(e.response?.data?.message || "Update failed");
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
      console.error("Delete error:", e);
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  return { about, loading, createAbout, updateAbout, deleteAbout, refetch: fetchAbout };
}