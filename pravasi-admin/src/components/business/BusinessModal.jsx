import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";
import { IMAGE_BASE_URL } from "../../utils/constants";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function BusinessModal({ initial = null, onSave, onClose }) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    subtitle: "",
    about: "",
    place: "",
    image: ""
  });
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (initial) {
      setForm(initial);
      if (initial.image) {
        setImgPreview(
          initial.image.startsWith("http")
            ? initial.image
            : `${IMAGE_BASE_URL}${initial.image}`
        );
      } else {
        setImgPreview("");
      }
    } else {
      setForm({ id: null, title: "", subtitle: "", about: "", place: "", image: "" });
      setImgPreview("");
    }
  }, [initial]);

  // Only for preview, not for form.image!
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgPreview(URL.createObjectURL(file));
    setForm((p) => ({ ...p, image: file }));
  };

  const handleRemoveImage = () => {
    setImgPreview("");
    setForm((p) => ({ ...p, image: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("Please enter title");
      return;
    }
    // id/_id dono handle karo
    const businessToSave = {
      ...form,
      id: form._id || form.id || undefined
    };
    onSave(businessToSave);
    onClose();
  };

  return (
    <AnimatePresence>
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
          transition={{ duration: 0.3 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
          bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
          p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {initial ? "Edit Business" : "Add Business"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Image Preview */}
            <div className="col-span-1 flex flex-col items-center">
              <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                <img
                  src={imgPreview || PLACEHOLDER}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="mt-3 flex gap-2">
                <AnimatedButton
                  text="Choose"
                  onClick={() => document.getElementById("business-image-upload").click()}
                  type="button"
                  loading={false}
                  className="px-4 py-2"
                />
                <input
                  id="business-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="col-span-2 space-y-3">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Business Title"
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
              <input
                type="text"
                name="place"
                value={form.place}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="About Business"
                rows={4}
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />

              <div className="flex items-center gap-3 mt-2">
                <AnimatedButton
                  text="Save"
                  onClick={handleSave}
                  loading={false}
                  type="button"
                />
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}