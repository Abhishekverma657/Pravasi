import { BASE_URL, IMAGE_BASE_URL } from "../../utils/constants";

export default function EventCard({ event, onEdit, onDelete }) {
  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    const day = dt.getDate();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[dt.getMonth()];
    const year = dt.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={event.image?.startsWith("http") ? event.image : `${IMAGE_BASE_URL}${event.image}`}
        alt={event.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
        <p className="mt-2 text-gray-700 text-sm line-clamp-3">{event.about}</p>
        <p className="mt-2 text-sm text-[#D90165] font-medium">
          📍 {event.place}
        </p>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(event)}
            className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
