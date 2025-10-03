import { useState } from "react";
import ContactTable from "../components/contacts/ContactTable";
import ContactModal from "../components/contacts/ContactModal";

export default function Contact() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      message: "Hello! I want to know more about your services.",
      read: false,
    },
    {
      id: 2,
      name: "Anjali Verma",
      email: "anjali@example.com",
      phone: "9123456789",
      message: "Can you send me pricing details?",
      read: true,
    },
  ]);

  const [selected, setSelected] = useState(null);

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const toggleRead = (id) => {
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, read: !c.read } : c
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📩 Contact Messages</h1>
      <ContactTable
        contacts={contacts}
        onView={setSelected}
        onDelete={handleDelete}
        onToggleRead={toggleRead}
      />
      {selected && (
        <ContactModal contact={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
