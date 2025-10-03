import { useState } from "react";
import MediaBlogCard from "../components/media&blogs/MediaBlogCard";
import MediaBlogForm from "../components/media&blogs/MediaBlogForm";
import mediaBlogsData from "../data/mediaBlogsData";

export default function MediaBlogs() {
  const [blogs, setBlogs] = useState(mediaBlogsData);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    subtitle: "",
    about: "",
    image: "",
  });

  const handleSave = () => {
    if (form.id) {
      setBlogs(blogs.map((b) => (b.id === form.id ? form : b)));
    } else {
      setBlogs([...blogs, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm({ id: null, title: "", subtitle: "", about: "", image: "" });
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media & Blogs</h1>
        <button
          onClick={() => {
            setForm({ id: null, title: "", subtitle: "", about: "", image: "" });
            setShowForm(true);
          }}
          className="bg-[#EBA832] text-white px-4 py-2 rounded hover:bg-[#d99b28]"
        >
          + Add Blog
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <MediaBlogCard
            key={blog.id}
            data={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal Form */}
      <MediaBlogForm
        open={showForm}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}
