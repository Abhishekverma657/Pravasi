import { motion } from "framer-motion";

export default function GalleryCard({ data, onEdit, onDelete }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden relative 
                 hover:shadow-2xl hover:-translate-y-1 transition-all 
                 duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <div className="p-4 flex-1 flex items-center justify-center">
        <h3 className="font-semibold text-gray-800 text-center">{data.title}</h3>
      </div>

      {/* Edit/Delete */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="bg-white text-blue-600 px-2 py-1 rounded shadow text-xs hover:bg-blue-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data.id)}
          className="bg-white text-red-600 px-2 py-1 rounded shadow text-xs hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
