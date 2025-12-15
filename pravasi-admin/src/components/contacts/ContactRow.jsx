import { motion } from "framer-motion";

export default function ContactRow({ contact, onView, onDelete, onToggleRead, deleting }) {
  const isDeleting = deleting === contact._id;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.01 }}
      className="border-t hover:bg-gray-50 transition cursor-pointer"
    >
      <td className="p-3 font-medium text-gray-800">{contact.name}</td>
      <td className="p-3 text-gray-600">{contact.email}</td>
      <td className="p-3 text-gray-600">{contact.phone}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-sm font-semibold shadow-sm ${
            contact.read
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {contact.read ? "Read" : "Unread"}
        </span>
      </td>
      <td className="p-3 flex gap-2 justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onView(contact)}
          className="bg-white/90 px-3 py-1 rounded-md shadow hover:bg-white text-sm border border-gray-200"
        >
          View
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleRead(contact._id, contact.read)}
          className={`px-3 py-1 rounded-md shadow-sm text-white ${
            !contact.read
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {contact.read ? "Mark Unread" : "Mark Read"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={isDeleting}
          onClick={() => onDelete(contact._id)}
          className="bg-red-50 px-3 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600 flex items-center justify-center"
        >
          {isDeleting ? (
            <span className="animate-spin border-2 border-red-600 border-t-transparent rounded-full w-4 h-4"></span>
          ) : (
            "Delete"
          )}
        </motion.button>
      </td>
    </motion.tr>
  );
}
