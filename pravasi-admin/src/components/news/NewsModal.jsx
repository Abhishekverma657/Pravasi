// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function NewsModal({ open, form, setForm, onSave, onClose }) {
//   const [preview, setPreview] = useState(form.image || "");

//   // Update preview when editing existing news
//   useEffect(() => {
//     setPreview(form.image || "");
//   }, [form.image, open]);

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setPreview(url);
//       setForm({ ...form, image: url });
//     }
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Backdrop */}
//           <motion.div
//             className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
//             bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200
//             p-6 space-y-4"
//           >
//             <h2 className="text-xl font-semibold text-gray-800">
//               {form.id ? "Edit News" : "Add News"}
//             </h2>

//             {/* Image Upload */}
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImage}
//                 className="mb-2"
//               />
//               {preview && (
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="h-32 w-full object-cover rounded-lg"
//                 />
//               )}
//             </div>

//             <input
//               type="text"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="Title"
//               className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
//             />
//             <input
//               type="date"
//               value={form.date}
//               onChange={(e) => setForm({ ...form, date: e.target.value })}
//               className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
//             />
//             <textarea
//               value={form.about}
//               onChange={(e) => setForm({ ...form, about: e.target.value })}
//               placeholder="Description"
//               rows={3}
//               className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
//             />

//             {/* Category */}
//             <select
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//               className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-orange-400"
//             >
//               <option value="Crime">Crime</option>
//               <option value="Donation">Donation</option>
//               <option value="General">General</option>
//             </select>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onSave}
//                 className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={onClose}
//                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function NewsModal({ open, form, setForm, onSave, onClose }) {
  const [preview, setPreview] = useState(form.image || "");

  // update preview jab edit kare
  useEffect(() => {
    setPreview(form.image || "");
  }, [form.image, open]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm((p) => ({ ...p, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview("");
    setForm((p) => ({ ...p, image: "" }));
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
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {form.id ? "Edit News" : "Add News"}
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
                    <label
                      htmlFor="news-image-upload"
                      className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
                    >
                      Choose Image
                    </label>
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
                    value={form.date}
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
                    <option value="Crime">Crime</option>
                    <option value="Donation">Donation</option>
                    <option value="General">General</option>
                    <option value="News & Updates">News & Updates</option>
                  </select>
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
