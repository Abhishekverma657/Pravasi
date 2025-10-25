import React from "react";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23fef3f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23d1d5db" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

import { IMAGE_BASE_URL as BASE } from "../../utils/constants";

export default function MemberCard({ member, onEdit, onDelete }) {
  const imgSrc = member.image
    ? member.image.startsWith("http")
      ? member.image
      : `${BASE}${member.image}`
    : PLACEHOLDER;

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={imgSrc}
          alt={member.name}
          className="w-full h-48 object-cover"
        />
        {/* Edit/Delete buttons overlay */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onEdit(member)}
            className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(member)}
            className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm  text-red-600"
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
        <div className="inline-block mt-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#fff1ef] text-[#d9480f] text-xs font-semibold uppercase">
            {member.role || "MEMBER"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-2">{member.about}</p>
      </div>
    </div>
  );
}
