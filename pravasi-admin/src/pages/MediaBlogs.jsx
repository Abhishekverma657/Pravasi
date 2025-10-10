import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaBlogs from "../hooks/useMediaBlogs";
import MediaBlogCard from "../components/media&blogs/MediaBlogCard";
import MediaBlogForm from "../components/media&blogs/MediaBlogForm";
import MediaBlogDrawer from "../components/media&blogs/MediaBlogDrawer";
import AnimatedButton from "../components/Common/button";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import Loader from "../components/Common/Loader";
import NoData from "../components/Common/NoData";

export default function MediaBlogs() {
  const { blogs, loading, addBlog, editBlog, removeBlog } = useMediaBlogs();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: null, title: "", subtitle: "", about: "", image: "" });
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("about", form.about);
    if (form.image instanceof File) formData.append("image", form.image);

    const blogId = form._id || form.id;
    if (blogId) {
      editBlog(blogId, formData);
    } else {
      addBlog(formData);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Media & Blogs</h1>
        <AnimatedButton
          text="Add Blog"
          onClick={() => {
            setForm({ id: null, title: "", subtitle: "", about: "", image: "" });
            setShowForm(true);
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Loader text="Loading Blogs..." />
          </motion.div>
        ) : blogs && blogs.length === 0 ? (
          <NoData text="No Blogs Found" subtext="Start by adding your first blog!" />
        ) : (
          <motion.div
            key="bloglist"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence>
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                >
                  <MediaBlogCard
                    data={blog}
                    onEdit={(b) => {
                      setForm(b);
                      setShowForm(true);
                    }}
                    onDelete={handleDelete}
                    onRead={setSelected}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <MediaBlogForm
        open={showForm}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setShowForm(false)}
      />

      <MediaBlogDrawer open={!!selected} data={selected} onClose={() => setSelected(null)} />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          removeBlog(deleteId);
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
