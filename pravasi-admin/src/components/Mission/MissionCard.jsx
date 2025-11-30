 

import React from "react";
import camelIcon from "../../../public/camel.png"; // 🐪 Common camel icon

const MissionCard = ({ mission, onEdit, onDelete }) => {
  return (
    <div
      className="relative bg-gradient-to-b from-orange-100 to-white rounded-2xl shadow-md 
                 flex flex-col items-center text-center 
                 p-6 h-72 w-full transition-transform duration-300 ease-out 
                 hover:scale-[1.04] hover:shadow-lg"
    >
      {/* Top-right action buttons */}
      <div className="absolute top-2 right-3 flex gap-2">
        <button
          onClick={() => onEdit(mission)}
          className="bg-white border border-gray-200 px-2 py-1 rounded-md text-xs hover:bg-gray-50 shadow-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(mission._id)}
          className="bg-red-50 border border-red-200 px-2 py-1 rounded-md text-xs text-red-600 hover:bg-red-100 shadow-sm"
        >
          Delete
        </button>
      </div>

      {/* Camel icon (animated float) */}
      <div className="  w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center mt-4 overflow-hidden">
        <img
          src={camelIcon}
          alt="Camel"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      {/* Title */}
      <h3 className="text-[#B44500] font-bold text-lg mt-3 leading-snug px-2">
        {mission.title}
      </h3>

      {/* Subtitle */}
      <p className="text-gray-700 text-sm mt-2 px-3 leading-relaxed text-center line-clamp-3 break-words">
        {mission.subtitle}
      </p>
    </div>
  );
};

export default MissionCard;
