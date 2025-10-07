// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import ImageUploader from "../ImageUploader";

// // const PLACEHOLDER =
// //   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

// // export default function HeroSliderModal({ open, slide, onSave, onClose }) {
// //   const [form, setForm] = useState({
// //     id: null,
// //     title: "",
// //     subtitle: "",
// //     image: "",
// //   });
// //   const [imgPreview, setImgPreview] = useState("");

// //   useEffect(() => {
// //     if (slide) {
// //       setForm(slide);
// //       setImgPreview(slide.image || "");
// //     } else {
// //       setForm({ id: null, title: "", subtitle: "", image: "" });
// //       setImgPreview("");
// //     }
// //   }, [slide, open]);

// //   const handleImageUpload = (file) => {
// //     const url = URL.createObjectURL(file);
// //     setForm((p) => ({ ...p, image: url }));
// //     setImgPreview(url);
// //   };

// //   const handleRemoveImage = () => {
// //     setForm((p) => ({ ...p, image: "" }));
// //     setImgPreview("");
// //   };

// //   const handleSave = () => {
// //     if (!form.title || !form.subtitle || !form.image) {
// //       alert("All fields required");
// //       return;
// //     }
// //     onSave({ ...form, id: slide?.id ?? Date.now() });
// //   };

// //   return (
// //     <AnimatePresence>
// //       {open && (
// //         <motion.div
// //           className="fixed inset-0 z-50 flex items-center justify-center"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //         >
// //           {/* Backdrop */}
// //           <motion.div
// //             className="absolute inset-0 bg-black/40 backdrop-blur-sm"
// //             onClick={onClose}
// //           />

// //           {/* Modal */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //             animate={{ opacity: 1, scale: 1, y: 0 }}
// //             exit={{ opacity: 0, scale: 0.9, y: 30 }}
// //             transition={{ duration: 0.3, ease: "easeOut" }}
// //             className="relative z-50 w-[95%] sm:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-xl border p-6"
// //           >
// //             <div className="flex items-start justify-between gap-4 mb-2">
// //               <h2 className="text-lg font-semibold">
// //                 {slide ? "Edit Slide" : "Add New Slide"}
// //               </h2>
// //               <button
// //                 onClick={onClose}
// //                 className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
// //               {/* Image Preview/Upload */}
// //               <div className="col-span-1 flex flex-col items-center">
// //                 <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
// //                   <img
// //                     src={imgPreview || PLACEHOLDER}
// //                     alt="preview"
// //                     className="object-cover w-full h-full"
// //                   />
// //                 </div>
// //                 <div className="mt-3 flex gap-2">
// //                   <ImageUploader onImageUpload={handleImageUpload} />
// //                   {imgPreview && (
// //                     <button
// //                       type="button"
// //                       onClick={handleRemoveImage}
// //                       className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
// //                     >
// //                       Remove
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Form Inputs */}
// //               <div className="col-span-2 space-y-3">
// //                 <input
// //                   type="text"
// //                   placeholder="Enter title"
// //                   value={form.title}
// //                   onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
// //                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
// //                 />

// //                 <input
// //                   type="text"
// //                   placeholder="Enter subtitle"
// //                   value={form.subtitle}
// //                   onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
// //                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
// //                 />

// //                 <div className="flex justify-end gap-3 mt-2">
// //                   <button
// //                     onClick={handleSave}
// //                     className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
// //                   >
// //                     {slide ? "Update Slide" : "Add Slide"}
// //                   </button>
// //                   <button
// //                     onClick={onClose}
// //                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import AnimatedButton from "../Common/button";

// const PLACEHOLDER =
//   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

// export default function HeroSliderModal({ open, slide, onSave, onClose }) {
//   const [form, setForm] = useState({
//     id: null,
//     title: "",
//     subtitle: "",
//     image: "",
//   });
//   const [imgPreview, setImgPreview] = useState("");

//   useEffect(() => {
//     if (slide) {
//       setForm(slide);
//       setImgPreview(slide.image || "");
//     } else {
//       setForm({ id: null, title: "", subtitle: "", image: "" });
//       setImgPreview("");
//     }
//   }, [slide, open]);

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

//   const handleSave = () => {
//     if (!form.title.trim() || !form.subtitle.trim() || !form.image) {
//       alert("Please fill all fields");
//       return;
//     }
//     onSave({ ...form, id: form.id ?? Date.now() });
//     onClose();
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
//             transition={{ duration: 0.3 }}
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
//             bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
//             p-6"
//           >
//             <div className="flex items-start justify-between gap-4">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {slide ? "Edit Slide" : "Add New Slide"}
//               </h3>
//               <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
//               {/* Image Preview */}
//               <div className="col-span-1 flex flex-col items-center">
//                 <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
//                   <img
//                     src={imgPreview || PLACEHOLDER}
//                     alt="preview"
//                     className="object-cover w-full h-full"
//                   />
//                 </div>

//                 <div className="mt-3 flex gap-2">
//                   <label
//                     htmlFor="hero-image-upload"
//                     className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
//                   >
//                     Choose Image
//                   </label>
//                   <input
//                     id="hero-image-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   {imgPreview && (
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Form Inputs */}
//               <div className="col-span-2 space-y-3">
//                 <input
//                   type="text"
//                   name="title"
//                   value={form.title}
//                   onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
//                   placeholder="Enter Title"
//                   className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
//                 />

//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={form.subtitle}
//                   onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
//                   placeholder="Enter Subtitle"
//                   className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
//                 />

//                 <div className="flex items-center gap-3 mt-2">
//                   <AnimatedButton



//                     text={slide ? "Update Slide" : "Add Slide"}
//                     onClick={handleSave}
//                   />
//                   {/* <button
//                     onClick={handleSave}
//                     className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
//                   >
//                     {slide ? "Update Slide" : "Add Slide"}
//                   </button> */}
//                   <button
//                     onClick={onClose}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function HeroSliderModal({ open, slide, onSave, onClose }) {
  const [form, setForm] = useState({ title: "", subtitle: "", image: "" });
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (slide) {
      setForm({
        title: slide.title || "",
        subtitle: slide.subtitle || "",
        image: slide.image || "",
      });
      setImgPreview(slide.image ? `http://31.97.231.85:2700${slide.image}` : "");
    } else {
      setForm({ title: "", subtitle: "", image: "" });
      setImgPreview("");
    }
  }, [slide, open]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
      setForm((p) => ({ ...p, image: file }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImgPreview("");
    setForm((p) => ({ ...p, image: "" }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.subtitle.trim() || !form.image) {
      return toast.error("All fields are required!");
    }
    const data = new FormData();
    data.append("title", form.title);
    data.append("subtitle", form.subtitle);
    if (form.image instanceof File) data.append("image", form.image);
    onSave(data);
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
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-50 w-[95%] sm:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-xl border p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {slide ? "Edit Slide" : "Add New Slide"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-lg overflow-hidden border bg-gray-100">
                  <img
                    src={imgPreview || PLACEHOLDER}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <AnimatedButton
                    text="Upload"
                    onClick={() => document.getElementById("hero-image").click()}
                    type="button"
                    loading={false}
                    className="px-4 py-2"
                  />
                  <input
                    type="file"
                    id="hero-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {imgPreview && (
                    <button
                      onClick={handleRemoveImage}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="col-span-2 space-y-3">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter Title"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
                />
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Enter Subtitle"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
                />

                <div className="flex gap-3 mt-2">
                  <AnimatedButton
                    text={slide ? "Update Slide" : "Add Slide"}
                    onClick={handleSubmit}
                  />
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

