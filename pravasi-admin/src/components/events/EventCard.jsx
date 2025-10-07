// export default function EventCard({ event, onEdit, onDelete }) {
//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
//       <img
//         src={event.image}
//         alt={event.title}
//         className="h-40 w-full object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-lg font-bold">{event.title}</h2>
//         <p className="text-sm text-gray-600">{event.subtitle}</p>
//         <p className="mt-2 text-gray-700 text-sm line-clamp-3">{event.about}</p>
//         <p className="mt-2 text-sm text-[#D90165] font-medium">
//           📍 {event.place}
//         </p>

//         <div className="flex justify-between mt-4">
//           <button
//             onClick={() => onEdit(event)}
//             className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete(event.id)}
//             className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={event.image?.startsWith("http") ? event.image : `http://31.97.231.85:2700${event.image}`}
        alt={event.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-600">{event.subtitle}</p>
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
