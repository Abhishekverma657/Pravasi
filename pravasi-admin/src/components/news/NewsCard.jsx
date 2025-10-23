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

  // normalize category from backend (enum: CRIME|DONATION|GENERAL)
  const cat = (data.category || "GENERAL").toUpperCase();
  const displayCategory =
    cat === "CRIME"
      ? "Crime"
      : cat === "DONATION"
      ? "Donation"
      : "General";

  const categoryClass =
    cat === "CRIME"
      ? "bg-red-100 text-red-600"
      : cat === "DONATION"
      ? "bg-blue-100 text-blue-600"
      : "bg-green-100 text-green-600";

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
        <span className={`px-3 py-2 ${categoryClass} text-center text-sm rounded-full uppercase font-medium`}>
          {displayCategory}
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
