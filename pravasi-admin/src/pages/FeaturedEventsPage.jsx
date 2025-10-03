import { useState } from "react";
import EventList from "../components/events/EventList";
import EventModal from "../components/events/EventModal";

export default function FeaturedEventsPage() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (event) => {
    if (event.id && events.some((e) => e.id === event.id)) {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? event : e))
      );
    } else {
      setEvents((prev) => [...prev, event]);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Featured Events</h1>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsOpen(true);
          }}
          className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Event
        </button>
      </div>

      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />

      {isOpen && (
        <EventModal
          initial={editingEvent}
          onSave={handleSave}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
