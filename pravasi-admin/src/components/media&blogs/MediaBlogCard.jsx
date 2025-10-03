import { motion } from "framer-motion";

export default function MediaBlogCard({ data, onEdit, onDelete }) {
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

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-lg text-gray-800">{data.title}</h3>
        <p className="text-sm text-gray-500">{data.subtitle}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{data.about}</p>
      </div>

      {/* Edit/Delete Buttons */}
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
