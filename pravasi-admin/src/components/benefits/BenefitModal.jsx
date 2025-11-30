import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Common/Loader";
import AnimatedButton from "../Common/button";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { toast } from "react-hot-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function BenefitModal({
  open,
  form,
  setForm,
  onSave,
  onClose,
  saving,
}) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (form.image instanceof File) {
      setPreview(URL.createObjectURL(form.image));
    } else if (typeof form.image === "string" && form.image) {
      setPreview(
        form.image.startsWith("http") ? form.image : `${IMAGE_BASE_URL}${form.image}`
      );
    } else {
      setPreview("");
    }
  }, [form.image, open]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Maximum allowed is 5MB");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveImage = () => {
    setPreview("");
    setForm((prev) => ({ ...prev, image: "" }));
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
          {/* Background blur */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
                       bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200
                       p-6"
          >
            {saving && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                <Loader text="Saving..." />
              </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {form._id ? "Edit Benefit" : "Add Benefit"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center mb-2">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">No Image</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <AnimatedButton
                    text="Choose Image"
                    onClick={() =>
                      document.getElementById("benefit-image-upload").click()
                    }
                    type="button"
                  />
                  <input
                    id="benefit-image-upload"
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
                <p className="text-xs text-gray-500 mt-2 italic">
                  Recommended: Square image, max 5MB
                </p>
              </div>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Benefit Title"
                className="w-full p-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />

              <textarea
                value={form.subtitle}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                placeholder="Benefit Description"
                rows={3}
                className="w-full p-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 
                           focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>

                <AnimatedButton
                  text="Save"
                  onClick={onSave}
                  loading={saving}
                  type="button"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
