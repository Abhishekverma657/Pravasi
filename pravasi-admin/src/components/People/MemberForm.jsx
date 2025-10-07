// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-hot-toast";
// import Loader from "../Common/Loader";
// import ConfirmDialog from "../Common/ConfirmDailog";
// import { addPerson, updatePerson } from "../../api/peopleApi";
// import AnimatedButton from "../Common/button";
// import { IMAGE_BASE_URL } from "../../utils/constants";

// const PLACEHOLDER =
//   'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

// export default function MemberForm({ initial, onClose, onSaved }) {
//   const [form, setForm] = useState({
//     _id: "",
//     name: "",
//     role: "Member",
//     about: "",
//     image: "",
//   });
//   const [imgPreview, setImgPreview] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [confirmOpen, setConfirmOpen] = useState(false);

//   useEffect(() => {
//     if (initial) {
//       setForm(initial);
//       setImgPreview(
//         initial.image?.startsWith("http")
//           ? initial.image
//           : `${IMAGE_BASE_URL}${initial.image}`
//       );
//       setImageFile(null);
//     } else {
//       setForm({ _id: "", name: "", role: "Member", about: "", image: "" });
//       setImgPreview("");
//       setImageFile(null);
//     }
//   }, [initial]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     setImgPreview(URL.createObjectURL(file));
//   };

//   const handleSave = async () => {
//     if (!form.name.trim() || !form.about.trim()) {
//       toast.error("All fields required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append("name", form.name);
//       data.append("role", "Member");
//       data.append("about", form.about);
//       if (imageFile) data.append("image", imageFile);

//       if (form._id) {
//         await updatePerson(form._id, data);
//       } else {
//         await addPerson(data);
//       }
//       if (onSaved) onSaved(); // Yeh zaroori hai!
//     } catch (err) {
//       toast.error("Error saving member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {loading ? (
//         <Loader />
//       ) : (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
//           <motion.div
//             className="relative bg-white rounded-2xl p-6 w-[90%] sm:w-2/3 lg:w-1/2 shadow-xl"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//           >
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-semibold">
//                 {form._id ? "Edit Member" : "Add Member"}
//               </h2>
//               <button onClick={onClose} className="text-gray-500 text-2xl">×</button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//               <div className="flex flex-col items-center">
//                 <img src={imgPreview || PLACEHOLDER} alt="Preview" className="w-40 h-40 rounded-lg object-cover border" />
//                 <div className="mt-3 flex gap-2">
//                   <AnimatedButton
//                     text="Choose"
//                     onClick={() => document.getElementById("member-img").click()}
//                     type="button"
//                     loading={false}
//                     className="px-3 py-2"
//                   />
//                   <input
//                     type="file"
//                     id="member-img"
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                   {imgPreview && (
//                     <button
//                       onClick={() => {
//                         setImgPreview("");
//                         setImageFile(null);
//                         setForm((p) => ({ ...p, image: "" }));
//                       }}
//                       className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
//                       type="button"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="col-span-2 space-y-3">
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 <textarea
//                   name="about"
//                   rows="4"
//                   value={form.about}
//                   onChange={handleChange}
//                   placeholder="About Member"
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 <div className="flex gap-3 mt-2">
//                   <AnimatedButton
//                     text={form._id ? "Update" : "Add"}
//                     onClick={handleSave}
//                     loading={loading}
//                     type="button"
//                   />
//                   <button
//                     onClick={onClose}
//                     className="px-4 py-2 bg-gray-200 rounded-lg"
//                     type="button"
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
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Loader from "../Common/Loader";
import ConfirmDialog from "../Common/ConfirmDailog";
import { addPerson, updatePerson } from "../../api/peopleApi";
import AnimatedButton from "../Common/button";
import { IMAGE_BASE_URL } from "../../utils/constants"

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

export default function MemberForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    _id: "",
    name: "",
    role: "Member",
    about: "",
    image: "",
  });
  const [imgPreview, setImgPreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm(initial);
      setImgPreview(
        initial.image?.startsWith("http")
          ? initial.image
          : `${IMAGE_BASE_URL}${initial.image}`
      );
      setImageFile(null);
    } else {
      setForm({ _id: "", name: "", role: "Member", about: "", image: "" });
      setImgPreview("");
      setImageFile(null);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.about.trim()) {
      toast.error("All fields required");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("role", "Member");
      data.append("about", form.about);
      if (imageFile) data.append("image", imageFile);

      if (form._id) {
        await updatePerson(form._id, data);
      } else {
        await addPerson(data);
      }
      if (onSaved) onSaved(); // Yeh zaroori hai!
    } catch (err) {
      toast.error("Error saving member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-white rounded-2xl p-6 w-[90%] sm:w-2/3 lg:w-1/2 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {form._id ? "Edit Member" : "Add Member"}
              </h2>
              <button onClick={onClose} className="text-gray-500 text-2xl">×</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col items-center">
                <img src={imgPreview || PLACEHOLDER} alt="Preview" className="w-40 h-40 rounded-lg object-cover border" />
                <div className="mt-3 flex gap-2">
                  <AnimatedButton
                    text="Choose"
                    onClick={() => document.getElementById("member-img").click()}
                    type="button"
                    loading={false}
                    className="px-3 py-2"
                  />
                  <input
                    type="file"
                    id="member-img"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {imgPreview && (
                    <button
                      onClick={() => {
                        setImgPreview("");
                        setImageFile(null);
                        setForm((p) => ({ ...p, image: "" }));
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="col-span-2 space-y-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  name="about"
                  rows="4"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="About Member"
                  className="w-full p-3 border rounded-lg"
                />
                <div className="flex gap-3 mt-2">
                  <AnimatedButton
                    text={form._id ? "Update" : "Add"}
                    onClick={handleSave}
                    loading={loading}
                    type="button"
                  />
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                    type="button"
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
