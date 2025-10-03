export default function HeroSliderRow({ slide, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3">
        <img
          src={slide.image}
          alt={slide.title}
          className="h-16 w-28 object-cover rounded border"
        />
      </td>
      <td className="p-3 font-medium">{slide.title}</td>
      <td className="p-3 text-gray-600">{slide.subtitle}</td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(slide)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(slide.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
