export default function FAQRow({ faq, onEdit, onDelete, onToggleActive }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 font-medium text-gray-800">{faq.question}</td>
      <td className="p-3 text-gray-600 line-clamp-2">{faq.answer}</td>
      <td className="p-3 text-center">
        <span
          className={`px-2 py-1 rounded text-sm ${
            faq.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {faq.active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(faq)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleActive(faq.id)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          {faq.active ? "Deactivate" : "Activate"}
        </button>
        <button
          onClick={() => onDelete(faq.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
