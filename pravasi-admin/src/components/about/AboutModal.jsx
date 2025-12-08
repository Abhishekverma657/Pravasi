import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";
import Loader from "../Common/Loader";
import { toast } from "react-hot-toast";
import { IMAGE_BASE_URL } from "../../utils/constants";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function AboutModal({ open, form, setForm, onSave, onClose, saving }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (form.engagementImages && open) {
      const newPreviews = form.engagementImages.map((img) => {
        if (img instanceof File) {
          return URL.createObjectURL(img);
        }
        // Handle existing images from API
        if (typeof img === "string") {
          return img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`;
        }
        return img;
      });
      setPreviews(newPreviews);
    }
  }, [form.engagementImages, open]);

  // Array field helpers
  const handleArrayChange = (field, idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === idx ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addArrayItem = (field, template) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), template],
    }));
  };

  const removeArrayItem = (field, idx) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }));
  };

  // For whyChooseUs/objective (string array)
  const handleStringArrayChange = (field, idx, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === idx ? value : item)),
    }));
  };

  const addStringArrayItem = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const removeStringArrayItem = (field, idx) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }));
  };

  // Images - Properly handle multiple select
  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.size <= MAX_FILE_SIZE);
    if (valid.length < files.length) toast.error("Some files too large (max 5MB)");

    setForm((p) => ({
      ...p,
      engagementImages: [...(p.engagementImages || []), ...valid],
    }));

    // Reset input so user can select same files again if needed
    e.target.value = "";
  };

  const removeImage = (idx) => {
    setForm((p) => ({
      ...p,
      engagementImages: p.engagementImages.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    const fd = new FormData();
    fd.append("whoWeAre", form.whoWeAre);
    fd.append("whyChooseUs", JSON.stringify(form.whyChooseUs));
    fd.append("ourObjective", JSON.stringify(form.ourObjective));
    fd.append("chapters", JSON.stringify(form.chapters));
    fd.append("engagementWithDiaspora", JSON.stringify(form.engagementWithDiaspora));

    // Handle images - separate new files from existing ones
    const existingImages = [];
    (form.engagementImages || []).forEach((img, idx) => {
      if (img instanceof File) {
        fd.append("engagementImages", img);
      } else if (typeof img === "string") {
        // Keep existing image URLs/paths
        existingImages.push(img);
      }
    });

    // Send existing images as JSON array
    if (existingImages.length > 0) {
      fd.append("existingImages", JSON.stringify(existingImages));
    }

    onSave(fd);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div className="relative z-50 bg-white rounded-xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            {saving && <Loader text="Saving..." />}
            <h2 className="text-lg font-bold mb-4">Edit About</h2>
            <div className="space-y-4">
              {/* Who We Are */}
              <div>
                <label className="font-semibold">Who We Are</label>
                <textarea
                  value={form.whoWeAre}
                  onChange={(e) => setForm({ ...form, whoWeAre: e.target.value })}
                  placeholder="Who We Are"
                  className="w-full p-2 border rounded mt-1"
                  rows={3}
                />
              </div>

              {/* Why Choose Us */}
              <div>
                <label className="font-semibold">Why Choose Us</label>
                <div className="space-y-2 mt-2">
                  {(form.whyChooseUs || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleStringArrayChange("whyChooseUs", idx, e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Reason"
                      />
                      <button
                        type="button"
                        onClick={() => removeStringArrayItem("whyChooseUs", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addStringArrayItem("whyChooseUs")}
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded"
                  >
                    + Add Reason
                  </button>
                </div>
              </div>

              {/* Our Objectives */}
              <div>
                <label className="font-semibold">Our Objectives</label>
                <div className="space-y-2 mt-2">
                  {(form.ourObjective || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleStringArrayChange("ourObjective", idx, e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Objective"
                      />
                      <button
                        type="button"
                        onClick={() => removeStringArrayItem("ourObjective", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addStringArrayItem("ourObjective")}
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded"
                  >
                    + Add Objective
                  </button>
                </div>
              </div>

              {/* Chapters */}
              <div>
                <label className="font-semibold">Chapters</label>
                <div className="space-y-2 mt-2">
                  {(form.chapters || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleArrayChange("chapters", idx, "title", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) =>
                          handleArrayChange("chapters", idx, "subtitle", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Subtitle"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("chapters", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("chapters", { title: "", subtitle: "" })
                    }
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded"
                  >
                    + Add Chapter
                  </button>
                </div>
              </div>

              {/* Engagement With Diaspora */}
              <div>
                <label className="font-semibold">Engagement With Diaspora</label>
                <div className="space-y-2 mt-2">
                  {(form.engagementWithDiaspora || []).map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          handleArrayChange("engagementWithDiaspora", idx, "title", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) =>
                          handleArrayChange("engagementWithDiaspora", idx, "subtitle", e.target.value)
                        }
                        className="flex-1 p-2 border rounded"
                        placeholder="Subtitle"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("engagementWithDiaspora", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("engagementWithDiaspora", { title: "", subtitle: "" })
                    }
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded"
                  >
                    + Add Engagement
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="font-semibold">Engagement Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="mt-1 block w-full"
                />
                <div className="flex gap-3 mt-3 flex-wrap">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-40 h-24 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        src={src}
                        alt="engagement"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600 transition"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                  Recommended: Upload 16:9 images (e.g., 1280×720 px)
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <AnimatedButton text="Save" onClick={handleSave} loading={saving} />
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}