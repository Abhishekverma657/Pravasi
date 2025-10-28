// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import AnimatedButton from "../Common/button";

// const PLACEHOLDER =
//   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100

// export default function RootModal({ onClose, onSave, initial = null }) {
//   const [form, setForm] = useState({
//     sectionTitle: "",
//     heading: "",
//     descriptionPoints: [""],
//     showMore: true,
//     image: null
//   });
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (initial) {
//       setForm({
//         sectionTitle: initial.sectionTitle || "",
//         heading: initial.heading || "",
//         descriptionPoints: Array.isArray(initial.descriptionPoints) ? initial.descriptionPoints : [""],
//         showMore: !!initial.showMore,
//         image: initial.image || null
//       });
//       setPreview(initial.image ? (initial.image.startsWith("http") ? initial.image : initial.image) : "");
//     } else {
//       setForm({ sectionTitle: "", heading: "", descriptionPoints: [""], showMore: true, image: null });
//       setPreview("");
//     }
//   }, [initial]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePointChange = (index, value) => {
//     const newPoints = [...form.descriptionPoints];
//     newPoints[index] = value;
//     setForm(prev => ({ ...prev, descriptionPoints: newPoints }));
//   };

//   const addPoint = () => {
//     setForm(prev => ({ ...prev, descriptionPoints: [...prev.descriptionPoints, ""] }));
//   };

//   const removePoint = (index) => {
//     setForm(prev => ({ ...prev, descriptionPoints: prev.descriptionPoints.filter((_, i) => i !== index) }));
//   };

//   const handleImage = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setForm(prev => ({ ...prev, image: file }));
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.sectionTitle.trim() || !form.heading.trim() || !form.descriptionPoints.filter(Boolean).length) {
//       alert("Please fill required fields");
//       return;
//     }
//     setLoading(true);
//     try {
//       // prepare FormData like backend expects
//       const data = new FormData();
//       data.append("sectionTitle", form.sectionTitle);
//       data.append("heading", form.heading);
//       data.append("descriptionPoints", form.descriptionPoints.filter(Boolean).join("|"));
//       data.append("showMore", form.showMore ? "true" : "false");
//       if (form.image instanceof File) data.append("image", form.image);
//       await onSave(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

//         <motion.div
//           className="relative z-50 w-[95%] md:w-3/4 lg:w-2/3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-6 m-4"
//           initial={{ scale: 0.95, y: 20, opacity: 0 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.95, y: 20, opacity: 0 }}
//         >
//           <div className="flex justify-between items-start mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">{initial ? "Edit Root" : "Add Root Section"}</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Image Upload */}
//               <div>
//                 <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
//                   <img src={preview || PLACEHOLDER} alt="Preview" className="w-full h-full object-cover" />
//                 </div>

//                 <div className="mt-3 flex gap-3">
//                   <AnimatedButton
//                     text={preview ? "Change Image" : "Choose Image"}
//                     onClick={() => document.getElementById("root-image-upload").click()}
//                     type="button"
//                   />
//                   <input id="root-image-upload" type="file" accept="image/*" onChange={handleImage} className="hidden" />
//                   <button
//                     type="button"
//                     onClick={() => { setPreview(""); setForm(prev => ({ ...prev, image: null })); }}
//                     className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>

//               {/* Form fields */}
//               <div className="space-y-3">
//                 <input
//                   type="text"
//                   name="sectionTitle"
//                   value={form.sectionTitle}
//                   onChange={handleChange}
//                   placeholder="Section Title"
//                   className="w-full p-3 rounded-lg bg-white/70 border focus:ring-2 focus:ring-orange-500"
//                 />

//                 <input
//                   type="text"
//                   name="heading"
//                   value={form.heading}
//                   onChange={handleChange}
//                   placeholder="Heading"
//                   className="w-full p-3 rounded-lg bg-white/70 border focus:ring-2 focus:ring-orange-500"
//                 />

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">Description Points</label>
//                   {form.descriptionPoints.map((point, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <textarea
//                         rows={3}
//                         value={point}
//                         onChange={(e) => handlePointChange(idx, e.target.value)}
//                         placeholder={`Point ${idx + 1}`}
//                         className="flex-1 p-3 rounded-lg bg-white/70 border focus:ring-2 focus:ring-orange-500"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removePoint(idx)}
//                         className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}

//                   <div className="flex gap-3 items-center">
//                     <button
//                       type="button"
//                       onClick={addPoint}
//                       className="text-sm px-3 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 font-medium"
//                     >
//                       + Add Point
//                     </button>
//                     <span className="text-xs text-gray-500">Add longer descriptive points — each can be multi-line.</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <AnimatedButton text="Save Section" loading={loading} type="submit" />
//               <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Common/Loader";
import AnimatedButton from "../Common/button";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = "http://31.97.231.85:2700";

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

  // Reset form when modal opens/closes or gets new initial data
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
      // Reset form when modal closes
      setForm(initialFormState);
      setPreview("");
    }
  }, [initial, open]);

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

  // Modify close handler to reset form
  const handleClose = () => {
    setForm(initialFormState);
    setPreview("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={handleClose} // Use handleClose instead of onClose
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
                {initial ? "Edit Root Section" : "Add Root Section"}
              </h2>
              <button
                onClick={handleClose} // Use handleClose instead of onClose
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Section */}
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

                {/* Form Fields */}
                <div className="col-span-2 space-y-4">
                  <input
                    type="text"
                    value={form.sectionTitle}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, sectionTitle: e.target.value }))
                    }
                    placeholder="Section Title"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />

                  <input
                    type="text"
                    value={form.heading}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, heading: e.target.value }))
                    }
                    placeholder="Heading"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                  />

                  {form.descriptionPoints.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...form.descriptionPoints];
                          newPoints[index] = e.target.value;
                          setForm((prev) => ({ ...prev, descriptionPoints: newPoints }));
                        }}
                        placeholder={`Description Point ${index + 1}`}
                        rows={2}
                        className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            descriptionPoints: prev.descriptionPoints.filter((_, i) => i !== index),
                          }));
                        }}
                        className="px-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        descriptionPoints: [...prev.descriptionPoints, ""]
                      }));
                    }}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    + Add Description Point
                  </button>
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
                onClick={handleClose} // Use handleClose instead of onClose
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
