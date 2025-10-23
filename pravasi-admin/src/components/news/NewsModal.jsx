import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Common/Loader";
import AnimatedButton from "../Common/button";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = "http://31.97.231.85:2700";

export default function NewsModal({ open, form, setForm, onSave, onClose, loading }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (form.image instanceof File) {
      setPreview(URL.createObjectURL(form.image));
    } else if (typeof form.image === "string" && form.image) {
      setPreview(
        form.image.startsWith("http")
          ? form.image
          : `${BASE}${form.image}`
      );
    } else {
      setPreview("");
    }
  }, [form.image, open]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setForm((p) => ({ ...p, image: file }));
  };

  const handleRemoveImage = () => {
    setPreview("");
    setForm((p) => ({ ...p, image: "" }));
  };

  function formatDate(dateStr) {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const d = new Date(dateStr);
    return d.toISOString().slice(0, 10);
  }

  // Save handler: only send valid image
  const handleSave = () => {
    let imageToSend = "";
    if (form.image instanceof File) {
      imageToSend = form.image;
    } else if (typeof form.image === "string" && form.image.trim() !== "") {
      imageToSend = form.image;
    }
    const payload = {
      ...form,
      image: imageToSend,
    };
    onSave(payload);
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
            bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
            max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Loader */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                <Loader />
              </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {form._id ? "Edit News" : "Add News"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Body: Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Section (left) */}
                <div className="col-span-1 flex flex-col items-center">
                  <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <img
                      src={preview || PLACEHOLDER}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <AnimatedButton
                      text="Choose Image"
                      onClick={() => document.getElementById("news-image-upload").click()}
                      loading={false}
                      type="button"
                    />
                    <input
                      id="news-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                    {preview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Form Section (right) */}
                <div className="col-span-2 space-y-4">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                  <input
                    type="date"
                    value={formatDate(form.date)}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                  <textarea
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
                    placeholder="Description"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  >
                    <option value="CRIME">Crime</option>
                    <option value="DONATION">Donation</option>
                    <option value="GENERAL">General</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex items-center gap-3 justify-end">
              <AnimatedButton
                text="Save"
                onClick={handleSave}
                loading={loading}
                type="button"
              />
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
