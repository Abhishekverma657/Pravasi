const MissionCard = ({ mission, onEdit, onDelete }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div>
        <h3 className="text-orange-600 font-semibold text-lg">
          {mission.title}
        </h3>
        <p className="text-gray-700 mt-2">{mission.subtitle}</p>
      </div>
      <div className="flex justify-end mt-3 gap-2">
        <button
          onClick={() => onEdit(mission)}
          className="bg-[#EBA832] px-3 py-1 text-sm rounded-md hover:opacity-90"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(mission.id)}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MissionCard;
