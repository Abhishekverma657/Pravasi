import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function MediaBlogModal({ open, form, setForm, onSave, onClose }) {
  // default object agar parent se undefined aaye
  const safeForm = form || { id: null, title: "", subtitle: "", about: "", image: "" };

  const [preview, setPreview] = useState(safeForm.image || "");

  useEffect(() => {
    setPreview(safeForm.image || "");
  }, [safeForm.image, open]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm({ ...safeForm, image: url });
  };

  const handleRemoveImage = () => {
    setPreview("");
    setForm({ ...safeForm, image: "" });
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
            bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200
            max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {safeForm.id ? "Edit Blog" : "Add Blog"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Upload */}
                <div className="col-span-1 flex flex-col items-center">
                  <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-100">
                    <img
                      src={preview || PLACEHOLDER}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <label
                      htmlFor="media-upload"
                      className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
                    >
                      Choose Image
                    </label>
                    <input
                      id="media-upload"
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

                {/* Form Inputs */}
                <div className="col-span-2 flex flex-col gap-4">
                  <input
                    type="text"
                    value={safeForm.title}
                    onChange={(e) => setForm({ ...safeForm, title: e.target.value })}
                    placeholder="Blog Title"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                  <input
                    type="text"
                    value={safeForm.subtitle}
                    onChange={(e) => setForm({ ...safeForm, subtitle: e.target.value })}
                    placeholder="Subtitle"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                  <textarea
                    value={safeForm.about}
                    onChange={(e) => setForm({ ...safeForm, about: e.target.value })}
                    placeholder="About Blog"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex items-center gap-3 justify-end">
              <button
                onClick={onSave}
                className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
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
