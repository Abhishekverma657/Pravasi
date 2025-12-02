import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";
import { toast } from "react-hot-toast";
import { IMAGE_BASE_URL } from "../../utils/constants";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = IMAGE_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MissionForm = ({ onSubmit, editData, onCancel }) => {
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({ title: editData.title, subtitle: editData.subtitle });
      setPreview(editData.image ? (editData.image.startsWith("http") ? editData.image : `${BASE}${editData.image}`) : "");
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Maximum allowed is 5MB");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
    if (editData && editData.image) setPreview("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.subtitle.trim()) return alert("All fields required");
    if (!image && !preview) return alert("Image required");
    setLoading(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    if (image) formData.append("image", image);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={onCancel}
        />
        <motion.form
          onSubmit={handleSave}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-50 bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editData ? "Edit Mission" : "Add Mission"}
          </h3>

          {/* Image Upload */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
              <img
                src={preview || PLACEHOLDER}
                alt="Mission"
                className="object-cover w-full h-full"
                style={{ aspectRatio: "1/1" }}
              />
            </div>
            <div className="mt-2 flex gap-2">
              <AnimatedButton
                text="Choose Image"
                onClick={() => document.getElementById("mission-image-upload").click()}
                loading={false}
                type="button"
              />
              <input
                id="mission-image-upload"
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
            <p className="text-xs text-gray-500 mt-1 italic">
              Recommended: 1:1 ratio (e.g., 512×512 px)
            </p>
          </div>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
          />
          <textarea
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            rows={4}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <AnimatedButton
              text={editData ? "Update" : "Add"}
              loading={loading}
              type="submit"
            />
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default MissionForm;
