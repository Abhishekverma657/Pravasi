// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";

// export default function FAQAccordion({ faqs, onEdit, onDelete }) {
//   const [activeId, setActiveId] = useState(null);

//   return (
//     <div className="bg-white rounded-2xl shadow-lg divide-y">
//       {faqs.map((faq) => {
//         const isOpen = activeId === faq.id;
//         return (
//           <div
//             key={faq.id}
//             className="p-4 hover:bg-gray-50 transition relative"
//           >
//             {/* Question Row */}
//             <div
//               className="flex justify-between items-center cursor-pointer"
//               onClick={() =>
//                 setActiveId(isOpen ? null : faq.id)
//               }
//             >
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {faq.question}
//               </h3>

//               <div className="flex items-center gap-3">
//                 {/* Action buttons */}

//                  <span
//                   className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
//                     isOpen
//                       ? "border-[#EBA832] text-[#EBA832]"
//                       : "border-gray-400 text-gray-500"
//                   }`}
//                 >
//                   {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
//                 </span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onEdit(faq);
//                   }}
//                   className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
//                   title="Edit"
//                 >
//                    Edit 
//                 </button>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete(faq.id);
//                   }}
//                   className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
                   
//                 >
//                    Delete
//                 </button>

               
                
//               </div>
//             </div>

//             {/* Answer Section */}
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="mt-3 text-gray-600"
//                 >
//                   {faq.answer}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// src/components/FAQ/FAQAccordion.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQAccordion({ faqs, onEdit, onDelete }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg divide-y">
      {faqs.map((faq) => {
        const isOpen = activeId === faq._id;
        return (
          <div
            key={faq._id}
            className="p-4 hover:bg-gray-50 transition relative"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setActiveId(isOpen ? null : faq._id)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>

              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isOpen
                      ? "border-[#EBA832] text-[#EBA832]"
                      : "border-gray-400 text-gray-500"
                  }`}
                >
                  {isOpen ? (
                    <ChevronUp size={15} />
                  ) : (
                    <ChevronDown size={15} />
                  )}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(faq);
                  }}
                  className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(faq._id);
                  }}
                  className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
