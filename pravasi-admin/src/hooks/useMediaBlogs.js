import { useState, useEffect } from "react";
import {
  getAllMediaBlogs,
  createMediaBlog,
  updateMediaBlog,
  deleteMediaBlog,
} from "../api/mediaBlogsApi";
import toast from "react-hot-toast";

export default function useMediaBlogs() {
  const [blogs, setBlogs] = useState([]); // ✅ always an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllMediaBlogs();
      setBlogs(Array.isArray(data) ? data : []); // ✅ ensures safety
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Failed to load media blogs");
      setBlogs([]); // ✅ fallback to empty
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (formData) => {
    try {
      setLoading(true);
      await createMediaBlog(formData);
      toast.success("Blog added successfully");
      await fetchBlogs();
    } catch (err) {
      toast.error("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  const editBlog = async (id, formData) => {
    try {
      setLoading(true);
      await updateMediaBlog(id, formData);
      toast.success("Blog updated successfully");
      await fetchBlogs();
    } catch (err) {
      toast.error("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  const removeBlog = async (id) => {
    try {
      setLoading(true);
      await deleteMediaBlog(id);
      toast.success("Blog deleted successfully");
      await fetchBlogs();
    } catch (err) {
      toast.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, loading, error, addBlog, editBlog, removeBlog, fetchBlogs };
}
