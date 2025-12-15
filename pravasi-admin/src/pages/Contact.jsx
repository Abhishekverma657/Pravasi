import { useEffect, useState } from "react";
import ContactTable from "../components/contacts/ContactTable";
import ContactModal from "../components/contacts/ContactModal";
import { getContacts, deleteContact, toggleReadStatus } from "../api/contactApi";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../components/Common/ConfirmDailog"; // <-- Add this import
import NoData from "../components/Common/NoData";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // <-- Add this state

  // Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      // Map isRead to read for compatibility
      const mapped = data.map((c) => ({
        ...c,
        read: typeof c.read !== "undefined" ? c.read : c.isRead,
      }));
      setContacts(mapped);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete Contact (with dialog)
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully!");
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  // Toggle Read/Unread
  const handleToggleRead = async (id, currentRead) => {
    try {
      await toggleReadStatus(id, !currentRead);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, read: !currentRead } : c))
      );
      toast.success(`Marked as ${!currentRead ? "read" : "unread"}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📩 Contact Messages
      </h1>

      {loading ? (
        <div className="flex justify-center py-20 text-gray-500">Loading...</div>
      ) : contacts.length === 0 ? (
        <NoData text="No Contacts Found" subtext="No one has contacted you yet!" />
      ) : (
        <ContactTable
          contacts={contacts}
          onView={setSelected}
          onDelete={(id) => setConfirmDelete(id)} // <-- Open dialog instead of direct delete
          onToggleRead={handleToggleRead}
          deleting={deleting}
        />
      )}

      {selected && (
        <ContactModal contact={selected} onClose={() => setSelected(null)} />
      )}

      {/* ConfirmDialog for delete */}
      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </motion.div>
  );
}
