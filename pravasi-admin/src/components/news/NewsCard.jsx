import { motion } from "framer-motion";

export default function NewsCard({ data, onEdit, onDelete }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden relative 
                 hover:shadow-2xl hover:-translate-y-1 transition-all 
                 duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 truncate">
            {data.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{data.date}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {data.about}
          </p>
        </div>

        {/* Category always at bottom */}
        <div className="mt-3">
          <span
            className={`w-full block text-center px-3 py-1 rounded-full text-xs font-semibold 
              ${
                data.category === "Crime"
                  ? "bg-red-100 text-red-600"
                  : data.category === "Donation"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
          >
            {data.category}
          </span>
        </div>
      </div>

      {/* Edit/Delete buttons */}
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
