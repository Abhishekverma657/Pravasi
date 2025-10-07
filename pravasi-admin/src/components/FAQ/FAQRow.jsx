export default function FAQRow({ faq, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 font-medium text-gray-800">{faq.question}</td>
      <td className="p-3 text-gray-600 line-clamp-2">{faq.answer}</td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(faq)}
          className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(faq.id)}
          className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
