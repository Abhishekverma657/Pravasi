export default function ContactRow({ contact, onView, onDelete, onToggleRead }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3">{contact.name}</td>
      <td className="p-3">{contact.email}</td>
      <td className="p-3">{contact.phone}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-sm ${
            contact.read ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {contact.read ? "Read" : "Unread"}
        </span>
      </td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onView(contact)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View
        </button>
        <button
          onClick={() => onToggleRead(contact.id)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          {contact.read ? "Mark Unread" : "Mark Read"}
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
