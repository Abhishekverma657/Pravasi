// import { motion } from "framer-motion";

// export default function MediaBlogCard({ data, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="bg-white rounded-2xl shadow-md overflow-hidden relative 
//                  hover:shadow-2xl hover:-translate-y-1 transition-all 
//                  duration-300 flex flex-col"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       {/* Image */}
//       <div className="w-full h-48 overflow-hidden">
//         <img
//           src={data.image}
//           alt={data.title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col flex-1 p-4">
//         <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
//         <p className="text-sm text-gray-500">{data.subtitle}</p>
//         <p className="text-sm text-gray-600 mt-2 line-clamp-3">{data.about}</p>
//       </div>

//       {/* Edit/Delete Buttons */}
//       <div className="absolute top-3 right-3 flex gap-2">
//         <button
//           onClick={() => onEdit(data)}
//           className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(data.id)}
//           className=" bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = IMAGE_BASE_URL;

export default function MediaBlogCard({ data, onRead, onEdit, onDelete }) {
  // If image is a relative path, prepend BASE
  let imgSrc = PLACEHOLDER;
  if (data.image) {
    imgSrc = data.image.startsWith("http")
      ? data.image
      : `${BASE}${data.image}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-[#FEF6EF] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative h-[430px]"
    >
      {/* Image */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
            {data.title || "Untitled Blog"}
          </h3>
          <p className="text-sm text-gray-600 uppercase mt-1 font-medium">
            {data.subtitle || "Real Estate Agents"}
          </p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">
            {data.about ||
              "No description available. Add some details about this blog or article."}
          </p>
        </div>

        {/* Read Button */}
        <div className="mt-4">
          <button
            onClick={() => onRead(data)}
            className="bg-[#E8661A] text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-[#d55a12] transition"
          >
            READ
          </button>
        </div>
      </div>

      {/* Edit/Delete (Top-right corner) */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id || data.id)}
          className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
