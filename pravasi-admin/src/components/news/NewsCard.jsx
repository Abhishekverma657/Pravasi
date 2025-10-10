// import { motion } from "framer-motion";

// export default function NewsCard({ data, onEdit, onDelete, onView }) {
//   return (
//     <motion.div
//       className="bg-white rounded-2xl shadow-md overflow-hidden relative 
//                  hover:shadow-2xl hover:-translate-y-1 transition-all 
//                  duration-300 flex flex-col"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       {/* Image */}
//       <div className="w-full h-44 overflow-hidden">
//         <img
//           src={data.image}
//           alt={data.title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col flex-1 p-4">
//         <div className="flex-1">
//           <h3 className="font-bold text-lg text-gray-800 truncate">
//             {data.title}
//           </h3>
//           <p className="text-xs text-gray-500 mt-1">{data.date}</p>
//           <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//             {data.about}
//           </p>
//         </div>

//         {/* Category always at bottom */}
//         <div className="mt-3">
//           <span
//             className={`w-full block text-center px-3 py-1 rounded-full text-xs font-semibold 
//               ${
//                 data.category === "Crime"
//                   ? "bg-red-100 text-red-600"
//                   : data.category === "Donation"
//                   ? "bg-blue-100 text-blue-600"
//                   : "bg-green-100 text-green-600"
//               }`}
//           >
//             {data.category}
//           </span>
//         </div>
//       </div>

//       {/* Edit/Delete/View buttons */}
//       <div className="absolute top-3 right-3 flex gap-2">
//         <button
//           onClick={() => onEdit(data)}
//           className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(data.id)}
//           className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm  text-red-600"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => onView && onView(data)}
//           className="bg-blue-50 px-2 py-1 rounded-md shadow hover:bg-blue-100 text-sm text-blue-600"
//         >
//           View
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

// Helper function for date formatting
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NewsCard({ data, onEdit, onDelete, onView }) {
  const imgSrc = data.image
    ? data.image.startsWith("http")
      ? data.image
      : `${IMAGE_BASE_URL}${data.image}`
    : "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="bg-[#FBF6F0] shadow-lg rounded-tl-2xl rounded-tr-2xl 
                 rounded-bl-2xl rounded-br-2xl overflow-hidden 
                 flex flex-col relative transition-all duration-300"
      style={{ minHeight: "400px" }}
    >
      {/* Image */}
      <img
        src={imgSrc}
        alt={data.title}
        className="w-full h-44 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#1F2A44] truncate">
          {data.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatDate(data.date)}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-4">{data.about}</p>
      </div>

      {/* Bottom Category */}
      <div className="px-4 pb-6 mt-auto">
        <span className="px-3 py-2 bg-orange-400 text-white text-center text-sm rounded-full uppercase font-medium">
          {data.category}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="bg-white/90 hover:bg-white text-gray-800 px-2 py-1 rounded-md shadow text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-md shadow text-xs"
        >
          Delete
        </button>
        <button
          onClick={() => onView(data)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded-md shadow text-xs"
        >
          View
        </button>
      </div>
    </motion.div>
  );
}
