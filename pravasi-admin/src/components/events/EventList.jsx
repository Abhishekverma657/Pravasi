 import EventCard from "./EventCard";

export default function EventList({ events, onEdit, onDelete }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
