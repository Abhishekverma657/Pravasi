import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";

export default function YoutubeModal({ open, initial, onSave, onClose, loading }) {
  const [form, setForm] = useState({
    title: "",
    url: ""
  });

  // Reset form when modal opens/closes or gets initial data
  useEffect(() => {
    if (open && initial) {
      setForm({
        title: initial.title || "",
        url: initial.url || ""
      });
    } else if (!open) {
      // Reset form when modal closes
      setForm({ title: "", url: "" });
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      alert("Please fill all fields");
      return;
    }
    onSave(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />

          <motion.div
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {initial ? 'Edit Video' : 'Add Video'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Video Title"
                className="w-full p-3 rounded-lg bg-white/70 border focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="YouTube URL"
                className="w-full p-3 rounded-lg bg-white/70 border focus:ring-2 focus:ring-orange-500"
              />

              <div className="flex justify-end gap-3 mt-6">
                <AnimatedButton
                  text={initial ? "Update" : "Save"}
                  loading={loading}
                  type="submit"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}