import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Common/Loader";
import AnimatedButton from "../Common/button";
import { IMAGE_BASE_URL } from "../../utils/constants";
import { toast } from "react-hot-toast";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = IMAGE_BASE_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function RootModal({ open, initial, onSave, onClose, loading }) {
  const initialFormState = {
    sectionTitle: "",
    heading: "",
    descriptionPoints: [""],
    showMore: true,
    image: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (open && initial) {
      setForm({
        _id: initial._id,
        sectionTitle: initial.sectionTitle || "",
        heading: initial.heading || "",
        descriptionPoints: Array.isArray(initial.descriptionPoints)
          ? initial.descriptionPoints
          : [""],
        showMore: initial.showMore ?? true,
        image: initial.image || "",
      });
    } else if (!open) {
      setForm(initialFormState);
      setPreview("");
    }
  }, [initial, open]);

  useEffect(() => {
    if (form.image instanceof File) {
      setPreview(URL.createObjectURL(form.image));
    } else if (typeof form.image === "string" && form.image) {
      setPreview(
        form.image.startsWith("http") ? form.image : `${BASE}${form.image}`
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

  const handleSave = () => {
    if (!form.sectionTitle.trim() || !form.heading.trim()) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("sectionTitle", form.sectionTitle);
    formData.append("heading", form.heading);
    formData.append(
      "descriptionPoints",
      form.descriptionPoints.filter(Boolean).join("|")
    );
    formData.append("showMore", form.showMore.toString());

    if (form.image instanceof File) {
      formData.append("image", form.image);
    } else if (typeof form.image === "string" && form.image.trim() !== "") {
      formData.append("image", form.image);
    }

    onSave(formData);
  };

  const handleClose = () => {
    setForm(initialFormState);
    setPreview("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
              bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
              max-h-[90vh] overflow-hidden flex flex-col"
          >
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                <Loader />
              </div>
            )}

            <div className="flex items-start justify-between gap-4 p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {initial ? "Edit Root Section" : "Add Root Section"}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* IMAGE UPLOAD SECTION */}
                <div className="col-span-1 flex flex-col items-center">
                  
                  <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <img
                      src={preview || PLACEHOLDER}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* ⭐ IMAGE RATIO GUIDE */}
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Recommended: Upload a square image (1:1) — e.g., 600×600 px
                  </p>

                  <div className="mt-3 flex gap-2">
                    <AnimatedButton
                      text="Choose Image"
                      onClick={() =>
                        document.getElementById("root-image-upload").click()
                      }
                      type="button"
                    />
                    <input
                      id="root-image-upload"
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

                {/* FORM FIELDS */}
                <div className="col-span-2 space-y-4">
                  <input
                    type="text"
                    value={form.sectionTitle}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        sectionTitle: e.target.value,
                      }))
                    }
                    placeholder="Section Title"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#EBA832]"
                  />

                  <input
                    type="text"
                    value={form.heading}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        heading: e.target.value,
                      }))
                    }
                    placeholder="Heading"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#EBA832]"
                  />

                  {form.descriptionPoints.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={point}
                        onChange={(e) => {
                          const newPts = [...form.descriptionPoints];
                          newPts[index] = e.target.value;
                          setForm((prev) => ({
                            ...prev,
                            descriptionPoints: newPts,
                          }));
                        }}
                        placeholder={`Description Point ${index + 1}`}
                        rows={2}
                        className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#EBA832]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            descriptionPoints: prev.descriptionPoints.filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                        className="px-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        descriptionPoints: [...prev.descriptionPoints, ""],
                      }))
                    }
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    + Add Description Point
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex items-center gap-3 justify-end">
              <AnimatedButton
                text="Save"
                onClick={handleSave}
                loading={loading}
                type="button"
              />
              <button
                onClick={handleClose}
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
