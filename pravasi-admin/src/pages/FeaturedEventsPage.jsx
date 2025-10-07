// import { useState } from "react";
// import EventList from "../components/events/EventList";
// import EventModal from "../components/events/EventModal";
// import AnimatedButton from "../components/Common/button";

// export default function FeaturedEventsPage() {
//   const [events, setEvents] = useState([]);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSave = (event) => {
//     if (event.id && events.some((e) => e.id === event.id)) {
//       setEvents((prev) =>
//         prev.map((e) => (e.id === event.id ? event : e))
//       );
//     } else {
//       setEvents((prev) => [...prev, event]);
//     }
//   };

//   const handleEdit = (event) => {
//     setEditingEvent(event);
//     setIsOpen(true);
//   };

//   const handleDelete = (id) => {
//     setEvents((prev) => prev.filter((e) => e.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Featured Events</h1>
//         <AnimatedButton
//           text="+ Add Event"
//           onClick={() => {
//             setEditingEvent(null);
//             setIsOpen(true);
//           }}
//         />
//         {/* <button
//           onClick={() => {
//             setEditingEvent(null);
//             setIsOpen(true);
//           }}
//           className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
//         >
//           + Add Event
//         </button> */}
//       </div>

//       <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />

//       {isOpen && (
//         <EventModal
//           initial={editingEvent}
//           onSave={handleSave}
//           onClose={() => setIsOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import EventList from "../components/events/EventList";
import EventModal from "../components/events/EventModal";
import AnimatedButton from "../components/Common/button";
import { getEvents, addEvent, updateEvent, deleteEvent } from "../api/eventApi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Common/Loader";
import ConfirmDialog from "../components/Common/ConfirmDailog";

export default function FeaturedEventsPage() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (eventData) => {
    try {
      setLoading(true);
      if (editingEvent?._id) {
        await updateEvent(editingEvent._id, eventData);
        toast.success("Event updated successfully");
      } else {
        await addEvent(eventData);
        toast.success("Event added successfully");
      }
      await fetchEvents();
      setIsOpen(false);
      setEditingEvent(null);
    } catch {
      toast.error("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(null); // Modal turant band ho
    try {
      setLoading(true);
      await deleteEvent(id);
      toast.success("Event deleted");
      await fetchEvents();
    } catch {
      toast.error("Error deleting event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#D90165]">Featured Events</h1>
        <AnimatedButton
          text="+ Add Event"
          loading={loading}
          onClick={() => {
            setEditingEvent(null);
            setIsOpen(true);
          }}
        />
      </div>

      {loading ? (
        <Loader text="Loading Events..." />
      ) : events && events.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No events found.</p>
      ) : (
        <EventList
          events={events}
          onEdit={(event) => {
            setEditingEvent(event);
            setIsOpen(true);
          }}
          onDelete={(id) => setConfirmDelete(id)}
        />
      )}

      {isOpen && (
        <EventModal
          initial={editingEvent}
          onSave={handleSave}
          onClose={() => setIsOpen(false)}
        />
      )}

      {confirmDelete !== null && (
        <ConfirmDialog
          open={true}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}
