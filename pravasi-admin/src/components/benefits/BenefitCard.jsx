 
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BenefitCard({ data, onEdit, onDelete }) {
  return (
    <motion.div
      className="p-5 rounded-2xl relative flex flex-col justify-between 
                 min-h-[240px] shadow-sm bg-gradient-to-br from-gray-50 to-gray-100
                 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
                 transition-all duration-300 ease-out"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
    >
      {/* Title + Content */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {data.subtitle}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => onEdit(data)}
          className="flex items-center gap-1 bg-blue-50 text-blue-600 
                     px-3 py-1.5 rounded-lg text-sm hover:bg-blue-100 transition"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          onClick={() => onDelete(data.id)}
          className="flex items-center gap-1 bg-red-50 text-red-600 
                     px-3 py-1.5 rounded-lg text-sm hover:bg-red-100 transition"
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </motion.div>
  );
}
