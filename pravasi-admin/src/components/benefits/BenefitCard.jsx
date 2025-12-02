 

import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

export default function BenefitCard({ data, onEdit, onDelete, index }) {
  // Image URL logic (adjust if needed)
  const imageUrl = data.image
    ? data.image.startsWith("http")
      ? data.image
      : `${IMAGE_BASE_URL}${data.image}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className={`relative mt-6 pt-6 w-[270px] h-[340px] flex flex-col shadow-lg 
        bg-gradient-to-br from-[#F6A82D] to-[#F5C667] text-white 
        rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-sm overflow-hidden`}
    >
      {/* Action Buttons (Top Right) */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        <button
          onClick={() => onEdit(data)}
          className="bg-white/80 hover:bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-md shadow"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md shadow"
        >
          Delete
        </button>
      </div>

      {/* Center Image (replaces icon) */}
      <div className="flex justify-start pl-3 items-center mt-2 mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={data.title}
            className="w-24 h-24 object-cover rounded-xl shadow-md border-2 border-white"
          />
        ) : (
          <div className="w-24 h-24 bg-white/60 rounded-xl flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col px-3">
        <h3 className="font-bold text-lg uppercase tracking-wide leading-tight text-gray-900">
          {data.title || "Benefit Title"}
        </h3>
        <p className="text-sm text-gray-700 mt-2 leading-relaxed line-clamp-6 flex-1 overflow-auto">
          {data.subtitle || "Benefit description goes here."}
        </p>
      </div>
    </motion.div>
  );
}
