// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const PLACEHOLDER =
//   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">Mission</text></svg>';

// const MissionForm = ({ onSubmit, editData, onCancel }) => {
//   const [form, setForm] = useState({
//     title: "",
//     subtitle: "",
//     image: "",
//   });
//   const [imgPreview, setImgPreview] = useState("");

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         title: editData.title || "",
//         subtitle: editData.subtitle || "",
//         image: editData.image || "",
//       });
//       setImgPreview(editData.image || "");
//     } else {
//       setForm({ title: "", subtitle: "", image: "" });
//       setImgPreview("");
//     }
//   }, [editData]);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImgPreview(reader.result);
//       setForm((p) => ({ ...p, image: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setImgPreview("");
//     setForm((p) => ({ ...p, image: "" }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (!form.title.trim() || !form.subtitle.trim()) {
//       alert("Please fill all fields");
//       return;
//     }
//     onSubmit({
//       ...form,
//       image: form.image,
//     });
//     // Reset handled by parent
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         {/* Backdrop */}
//         <motion.div
//           className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
//           onClick={onCancel}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//         />

//         {/* Modal */}
//         <motion.form
//           onSubmit={handleSave}
//           initial={{ opacity: 0, scale: 0.9, y: 30 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 30 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
//           bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
//           p-6"
//         >
//           <div className="flex items-start justify-between gap-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//               {editData ? "Edit Mission" : "Add Mission"}
//             </h3>
//             <button
//               type="button"
//               onClick={onCancel}
//               className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
//             >
//               ×
//             </button>
//           </div>

//           <div className="mt-4  ">
//             {/* Image/Icon Section */}
//             {/* <div className="col-span-1 flex flex-col items-center">
//               <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
//                 <img
//                   src={imgPreview || PLACEHOLDER}
//                   alt="preview"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               <div className="mt-3 flex gap-2">
//                 <label
//                   htmlFor="mission-image-upload"
//                   className="cursor-pointer px-3 py-2 bg-[#EBA832] text-white rounded-lg text-sm hover:opacity-90 transition"
//                 >
//                   Choose Icon
//                 </label>
//                 <input
//                   id="mission-image-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div> */}

//             {/* Form Inputs */}
//             <div className="col-span-2 space-y-3">
//               <input
//                 type="text"
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 placeholder="Mission Title"
//                 className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
//               />
//               <textarea
//                 name="subtitle"
//                 value={form.subtitle}
//                 onChange={handleChange}
//                 placeholder="Mission Subtitle"
//                 rows={4}
//                 className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
//               />

//               <div className="flex items-center justify-end gap-3 mt-2">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
//                 >
//                   {editData ? "Update" : "Add"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onCancel}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </motion.form>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default MissionForm;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";

const MissionForm = ({ onSubmit, editData, onCancel }) => {
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setForm({ title: editData.title, subtitle: editData.subtitle });
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.subtitle.trim()) return alert("All fields required");
    setLoading(true);
    await onSubmit(form);
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
