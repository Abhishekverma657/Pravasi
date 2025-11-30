// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import AnimatedButton from "../Common/button";
// import Loader from "../Common/Loader";

// const PLACEHOLDER =
//   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

// export default function HeroSliderModal({ open, slide, onSave, onClose, loading = false }) {
//   const [form, setForm] = useState({ title: "", subtitle: "", image: "" });
//   const [imgPreview, setImgPreview] = useState("");

//   useEffect(() => {
//     if (slide) {
//       setForm({
//         title: slide.title || "",
//         subtitle: slide.subtitle || "",
//         image: slide.image || "",
//       });
//       setImgPreview(slide.image ? `http://31.97.231.85:2700${slide.image}` : "");
//     } else {
//       setForm({ title: "", subtitle: "", image: "" });
//       setImgPreview("");
//     }
//   }, [slide, open]);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImgPreview(reader.result);
//       setForm((p) => ({ ...p, image: file }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleRemoveImage = () => {
//     setImgPreview("");
//     setForm((p) => ({ ...p, image: "" }));
//   };

//   const handleSubmit = () => {
//     if (!form.title.trim() || !form.subtitle.trim() || !form.image) {
//       return toast.error("All fields are required!");
//     }
//     const data = new FormData();
//     data.append("title", form.title);
//     data.append("subtitle", form.subtitle);
//     if (form.image instanceof File) data.append("image", form.image);
//     onSave(data);
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
//           <motion.div
//             className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             className="relative z-50 w-[95%] sm:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-xl border p-6"
//           >
//             {/* Modal loader overlay */}
//             {loading && <Loader text="Please wait..." />}

//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">
//                 {slide ? "Edit Slide" : "Add New Slide"}
//               </h2>
//               <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
//                 disabled={loading}
//               >
//                 ×
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               <div className="flex flex-col items-center">
//                 <div className="w-40 h-40 rounded-lg overflow-hidden border bg-gray-100">
//                   <img
//                     src={imgPreview || PLACEHOLDER}
//                     alt="preview"
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   <AnimatedButton
//                     text="Upload"
//                     onClick={() => document.getElementById("hero-image").click()}
//                     type="button"
//                     loading={false}
//                     className="px-4 py-2"
//                     disabled={loading}
//                   />
//                   <input
//                     type="file"
//                     id="hero-image"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileChange}
//                     disabled={loading}
//                   />
//                   {imgPreview && (
//                     <button
//                       onClick={handleRemoveImage}
//                       className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
//                       disabled={loading}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="col-span-2 space-y-3">
//                 <input
//                   type="text"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   placeholder="Enter Title"
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
//                   disabled={loading}
//                 />
//                 <input
//                   type="text"
//                   value={form.subtitle}
//                   onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
//                   placeholder="Enter Subtitle"
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
//                   disabled={loading}
//                 />

//                 <div className="flex gap-3 mt-2">
//                   <AnimatedButton
//                     text={slide ? "Update Slide" : "Add Slide"}
//                     onClick={handleSubmit}
//                     loading={loading}
//                     disabled={loading}
//                   />
//                   <button
//                     onClick={onClose}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//                     disabled={loading}
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
// }


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";
import Loader from "../Common/Loader";
import { toast } from "react-hot-toast";
import { IMAGE_BASE_URL } from "../../utils/constants";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function HeroSliderModal({ open, slide, onSave, onClose, loading = false }) {
  const [form, setForm] = useState({ title: "", subtitle: "", image: "" });
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (slide) {
      setForm({
        title: slide.title || "",
        subtitle: slide.subtitle || "",
        image: slide.image || "",
      });
      setImgPreview(slide.image ? `${IMAGE_BASE_URL}${slide.image}` : "");
    } else {
      setForm({ title: "", subtitle: "", image: "" });
      setImgPreview("");
    }
  }, [slide, open]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Maximum allowed is 5MB");
      return;
    }

    // Just preview the image
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
            {loading && <Loader text="Please wait..." />}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {slide ? "Edit Slide" : "Add New Slide"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                disabled={loading}
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

                {/* ⭐ Instruction Only */}
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: Upload 16:9 ratio image (e.g., 1920×1080)
                </p>

                <div className="mt-3 flex gap-2">
                  <AnimatedButton
                    text="Upload"
                    onClick={() => document.getElementById("hero-image").click()}
                    type="button"
                    className="px-4 py-2"
                    disabled={loading}
                  />

                  <input
                    type="file"
                    id="hero-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />

                  {imgPreview && (
                    <button
                      onClick={handleRemoveImage}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                      disabled={loading}
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
                  disabled={loading}
                />

                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Enter Subtitle"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
                  disabled={loading}
                />

                <div className="flex gap-3 mt-2">
                  <AnimatedButton
                    text={slide ? "Update Slide" : "Add Slide"}
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                  />

                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    disabled={loading}
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
