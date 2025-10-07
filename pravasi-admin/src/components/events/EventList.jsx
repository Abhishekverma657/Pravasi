//  import EventCard from "./EventCard";

// export default function EventList({ events, onEdit, onDelete }) {
//   return (
//     <div className="grid md:grid-cols-3 gap-6">
//       {events.map((event) => (
//         <EventCard
//           key={event.id}
//           event={event}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// }

import EventCard from "./EventCard";

export default function EventList({ events, onEdit, onDelete }) {
  if (!events?.length)
    return (
      <div className="text-center text-gray-500 mt-6 text-sm">
        No events found.
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
