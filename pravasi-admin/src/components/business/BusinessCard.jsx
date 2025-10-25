

import { IMAGE_BASE_URL } from "../../utils/constants";
export default function BusinessCard({ business, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={business.image?.startsWith("http") ? business.image : `${IMAGE_BASE_URL}${business.image}`}
        alt={business.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{business.title}</h2>
        <p className="text-sm text-gray-600">{business.subtitle}</p>
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">{business.about}</p>
        <p className="mt-2 text-sm text-[#D90165] font-medium">
          📍 {business.place}
        </p>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(business)}
            className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(business._id)}
            className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}