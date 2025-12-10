import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";
import Loader from "../Common/Loader";
import { toast } from "react-hot-toast";
import { Edit, Edit2 } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 4;

export default function AboutModal({ open, form, setForm, onSave, onClose, saving }) {
  const [previews, setPreviews] = useState(Array(MAX_IMAGES).fill(null));
  const [imagesData, setImagesData] = useState(Array(MAX_IMAGES).fill(null)); // URLs or File objects
  const [editIndex, setEditIndex] = useState(null);

  // Load images on modal open
  useEffect(() => {
    if (open) {
      // Fill up to 4 slots with existing images, rest null
      const arr = Array(MAX_IMAGES).fill(null);
      (form.images || []).forEach((img, idx) => {
        if (idx < MAX_IMAGES) arr[idx] = img;
      });
      setImagesData(arr);
      setPreviews(arr.map(img => (img instanceof File ? URL.createObjectURL(img) : img)));
    }
  }, [open, form.images]);

  // Add/Replace image at index
  const handleReplaceImage = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 5MB)");
      return;
    }
    setImagesData(prev => {
      const updated = [...prev];
      updated[idx] = file;
      return updated;
    });
    setPreviews(prev => {
      const updated = [...prev];
      updated[idx] = URL.createObjectURL(file);
      return updated;
    });
    setEditIndex(null);
    e.target.value = "";
  };

  // Add new image to first empty slot
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 5MB)");
      return;
    }
    const emptyIdx = imagesData.findIndex(img => !img);
    if (emptyIdx === -1) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    handleReplaceImage(e, emptyIdx);
  };

  // Save: send only 4 images, each as engagementImage0...engagementImage3
  const handleSave = () => {
    if (!form.whoWeAre.trim()) {
      return toast.error("Who We Are is required!");
    }
    const fd = new FormData();
    fd.append("whoWeAre", form.whoWeAre);
    fd.append("whyChooseUs", JSON.stringify(form.whyChooseUs || []));
    fd.append("ourObjective", JSON.stringify(form.ourObjective || []));
    fd.append("chapters", JSON.stringify(form.chapters || []));
    fd.append("engagementWithDiaspora", JSON.stringify(form.engagementWithDiaspora || []));

    imagesData.forEach((img, idx) => {
      if (img) {
        fd.append(`engagementImage${idx}`, img);
      }
    });

    onSave(fd);
  };
  // ---------- STRING ARRAY HANDLERS ----------
const handleStringArrayChange = (field, index, value) => {
  const updated = [...form[field]];
  updated[index] = value;
  setForm({ ...form, [field]: updated });
};

const addStringArrayItem = (field) => {
  setForm({ ...form, [field]: [...form[field], ""] });
};

const removeStringArrayItem = (field, index) => {
  const updated = form[field].filter((_, i) => i !== index);
  setForm({ ...form, [field]: updated });
};


// ---------- OBJECT ARRAY (title + subtitle) ----------
const handleArrayChange = (field, index, key, value) => {
  const updated = [...form[field]];
  updated[index][key] = value;
  setForm({ ...form, [field]: updated });
};

const addArrayItem = (field, item) => {
  setForm({ ...form, [field]: [...form[field], item] });
};

const removeArrayItem = (field, index) => {
  const updated = form[field].filter((_, i) => i !== index);
  setForm({ ...form, [field]: updated });
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
              {/* SAME UI CODE ABOVE — UNCHANGED */}

              <div>
                <label className="font-semibold">Who We Are</label>
                <textarea
                  value={form.whoWeAre}
                  onChange={(e) => setForm({ ...form, whoWeAre: e.target.value })}
                  placeholder="Who We Are"
                  className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  rows={3}
                />
              </div>

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
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Reason"
                      />
                      <button
                        type="button"
                        onClick={() => removeStringArrayItem("whyChooseUs", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addStringArrayItem("whyChooseUs")}
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded hover:bg-[#d89c2a]"
                  >
                    + Add Reason
                  </button>
                </div>
              </div>

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
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Objective"
                      />
                      <button
                        type="button"
                        onClick={() => removeStringArrayItem("ourObjective", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addStringArrayItem("ourObjective")}
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded hover:bg-[#d89c2a]"
                  >
                    + Add Objective
                  </button>
                </div>
              </div>

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
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) =>
                          handleArrayChange("chapters", idx, "subtitle", e.target.value)
                        }
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Subtitle"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("chapters", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
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
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded hover:bg-[#d89c2a]"
                  >
                    + Add Chapter
                  </button>
                </div>
              </div>

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
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) =>
                          handleArrayChange("engagementWithDiaspora", idx, "subtitle", e.target.value)
                        }
                        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                        placeholder="Subtitle"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("engagementWithDiaspora", idx)}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
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
                    className="mt-2 px-3 py-1 bg-[#EBA832] text-white rounded hover:bg-[#d89c2a]"
                  >
                    + Add Engagement
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="font-semibold block mb-2">Engagement Images (Max 4)</label>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-40 h-24 bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ aspectRatio: "16/9" }}
                    >
                      {src ? (
                        <>
                          <img
                            src={src}
                            alt={`engagement-${idx}`}
                            className="object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => setEditIndex(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-green-600 transition text-sm font-bold"
                            title="Edit"
                          >
                            <Edit2 size={10}/>
                          </button>
                          {editIndex === idx && (
                            <input
                              id={`edit-image-input-${idx}`}
                              type="file"
                              accept="image/*"
                              className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                              style={{ zIndex: 10 }}
                              onChange={(e) => handleReplaceImage(e, idx)}
                              autoFocus
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setEditIndex(idx)}
                            className="w-full h-full flex items-center justify-center text-yellow-500 font-bold text-2xl"
                            title="Add Image"
                          >
                            +
                          </button>
                          {editIndex === idx && (
                            <input
                              id={`add-image-input-${idx}`}
                              type="file"
                              accept="image/*"
                              className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                              style={{ zIndex: 10 }}
                              onChange={(e) => handleReplaceImage(e, idx)}
                              autoFocus
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                  Recommended: Upload 16:9 images (1280×720). Max 5MB per file. Only 4 images allowed.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 justify-end">
              <AnimatedButton text="Save" onClick={handleSave} loading={saving} />
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                disabled={saving}
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
