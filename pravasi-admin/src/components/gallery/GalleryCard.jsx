// import { motion } from "framer-motion";

// export default function GalleryCard({ data }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//       className="bg-[#FBF6F0] shadow-md rounded-tl-2xl rounded-tr-[2.5rem] 
//                  rounded-bl-[2.5rem] rounded-br-2xl overflow-hidden 
//                  flex flex-col items-center justify-between w-full 
//                  max-w-sm transition-all duration-300"
//     >
//       {/* Image Section */}
//       <div className="w-full h-44 overflow-hidden rounded-tl-2xl rounded-tr-[2.5rem] 
//                       rounded-bl-[2.5rem] rounded-br-2xl mt-4 px-4">
//         <motion.img
//           src={data.image}
//           alt={data.title}
//           className="w-full h-full object-cover rounded-tl-2xl rounded-tr-[2.5rem] 
//                      rounded-bl-[2.5rem] rounded-br-2xl"
//           whileHover={{ scale: 1.06 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//         />
//       </div>

//       {/* Title */}
//       <div className="py-4 text-center">
//         <h3 className="text-[#1F2A44] font-semibold text-lg uppercase tracking-wide">
//           {data.title}
//         </h3>
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

export default function GalleryCard({ data, onEdit, onDelete }) {
  // Image preview logic
  const imgSrc = data.image
    ? data.image.startsWith("http")
      ? data.image
      : `${IMAGE_BASE_URL}${data.image}`
    : "https://via.placeholder.com/300x180?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      className="relative bg-[#FBF6F0] rounded-tl-xl rounded-tr-[2rem]
                 rounded-bl-[2rem] rounded-br-xl shadow-md overflow-hidden 
                 flex flex-col items-center justify-between w-full max-w-sm"
    >
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => onEdit(data)}
          className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm font-medium text-red-600"
        >
          Delete
        </button>
      </div>

      {/* Image Preview */}
      <div className="relative w-full h-56 overflow-hidden flex items-center justify-center">
        <motion.img
          src={imgSrc}
          alt={data.title}
          className="object-cover w-full h-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </div>

      {/* Title */}
      <div className="w-full flex flex-col items-center justify-center py-4 px-3 bg-white">
        <h3 className="text-[#1F2A44] font-semibold text-lg uppercase text-center tracking-wide">
          {data.title}
        </h3>
      </div>
    </motion.div>
  );
}
