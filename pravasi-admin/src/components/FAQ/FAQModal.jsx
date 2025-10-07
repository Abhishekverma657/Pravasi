// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";

// // export default function FAQModal({ open, faq, onSave, onClose }) {
// //   const [form, setForm] = useState({ question: "", answer: "" });

// //   useEffect(() => {
// //     if (faq) setForm(faq);
// //   }, [faq]);

// //   const handleSave = () => {
// //     if (!form.question.trim() || !form.answer.trim()) {
// //       alert("Both fields are required");
// //       return;
// //     }
// //     onSave({ ...form, id: faq?.id ?? Date.now() });
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
// //             className="absolute inset-0 bg-black/30 backdrop-blur-sm"
// //             onClick={onClose}
// //           />

// //           {/* Modal */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //             animate={{ opacity: 1, scale: 1, y: 0 }}
// //             exit={{ opacity: 0, scale: 0.9, y: 30 }}
// //             transition={{ duration: 0.3, ease: "easeOut" }}
// //             className="relative z-50 w-[95%] sm:w-2/3 lg:w-1/2 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-6"
// //           >
// //             <div className="flex justify-between items-start mb-4">
// //               <h2 className="text-lg font-semibold text-gray-800">
// //                 {faq ? "Edit FAQ" : "Add FAQ"}
// //               </h2>
// //               <button
// //                 onClick={onClose}
// //                 className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             <div className="space-y-4">
// //               <input
// //                 type="text"
// //                 value={form.question}
// //                 onChange={(e) => setForm({ ...form, question: e.target.value })}
// //                 placeholder="Enter question"
// //                 className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
// //               />
// //               <textarea
// //                 value={form.answer}
// //                 onChange={(e) => setForm({ ...form, answer: e.target.value })}
// //                 placeholder="Enter answer"
// //                 rows={4}
// //                 className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
// //               />
// //             </div>

// //             <div className="flex justify-end gap-3 mt-6">
// //               <button
// //                 onClick={handleSave}
// //                 className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
// //               >
// //                 Save
// //               </button>
// //               <button
// //                 onClick={onClose}
// //                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
// //               >
// //                 Cancel
// //               </button>
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

// export default function FAQModal({ open, faq, onSave, onClose }) {
//   const [form, setForm] = useState({ question: "", answer: "" });

//   useEffect(() => {
//     if (faq) setForm(faq);
//   }, [faq]);

//   const handleSubmit = () => {
//     if (!form.question.trim() || !form.answer.trim()) return;
//     onSave(form);
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
//             className="absolute inset-0 bg-black/30 backdrop-blur-sm"
//             onClick={onClose}
//           />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 30 }}
//             className="relative bg-white rounded-2xl shadow-xl w-[90%] sm:w-[500px] p-6"
//           >
//             <h2 className="text-lg font-semibold mb-4 text-gray-800">
//               {faq ? "Edit FAQ" : "Add FAQ"}
//             </h2>

//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 placeholder="Enter question"
//                 value={form.question}
//                 onChange={(e) =>
//                   setForm({ ...form, question: e.target.value })
//                 }
//                 className="border rounded-lg p-3  "
//               />

//               <textarea
//                 placeholder="Enter answer"
//                 rows="4"
//                 value={form.answer}
//                 onChange={(e) =>
//                   setForm({ ...form, answer: e.target.value })
//                 }
//                 className="border rounded-lg p-3 "
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={onClose}
//                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <AnimatedButton
//                 text="Save"
//                 onClick={handleSubmit}
//               />
//               {/* <button
//                 onClick={handleSubmit}
//                 className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:bg-[#d29424]"
//               >
//                 Save
//               </button> */}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// src/components/FAQ/FAQModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";

export default function FAQModal({ open, faq, onSave, onClose }) {
  const [form, setForm] = useState({ question: "", answer: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (faq) setForm(faq);
    else setForm({ question: "", answer: "" });
  }, [faq]);

  const validate = () => {
    const newErrors = {};
    if (!form.question.trim()) newErrors.question = "Question is required";
    if (!form.answer.trim()) newErrors.answer = "Answer is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    setForm({ question: "", answer: "" });
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
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative bg-white rounded-2xl shadow-xl w-[90%] sm:w-[500px] p-6"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {faq ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter question"
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                  className={`border rounded-lg p-3 w-full ${
                    errors.question ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Enter answer"
                  rows="4"
                  value={form.answer}
                  onChange={(e) =>
                    setForm({ ...form, answer: e.target.value })
                  }
                  className={`border rounded-lg p-3 w-full ${
                    errors.answer ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <AnimatedButton text="Save" onClick={handleSubmit} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
