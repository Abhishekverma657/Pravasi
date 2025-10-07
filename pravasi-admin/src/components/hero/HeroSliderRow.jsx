import { IMAGE_BASE_URL } from "../../utils/constants";
const BASE = IMAGE_BASE_URL;

export default function HeroSliderRow({ slide, index, total, onEdit, onDelete, onMove }) {
  const imgSrc = slide.image
    ? slide.image.startsWith("http")
      ? slide.image
      : `${BASE}${slide.image}`
    : "https://via.placeholder.com/200x80?text=No+Image";

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 flex flex-col items-center gap-1">
        <button
          onClick={() => onMove(index, "up")}
          disabled={index === 0}
          className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200
            ${index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 hover:scale-105"}`}
          title="Move Up"
          style={{ fontSize: "18px", padding: 0 }}
        >
          {/* Up Arrow SVG */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 6l-4 4h8l-4-4z" fill="currentColor"/>
          </svg>
        </button>
        <span className="text-xs text-gray-500">{index + 1}</span>
        <button
          onClick={() => onMove(index, "down")}
          disabled={index === total - 1}
          className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200
            ${index === total - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 hover:scale-105"}`}
          title="Move Down"
          style={{ fontSize: "18px", padding: 0 }}
        >
          {/* Down Arrow SVG */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 14l4-4H6l4 4z" fill="currentColor"/>
          </svg>
        </button>
      </td>
      <td className="p-3">
        <img
          src={imgSrc}
          alt={slide.title}
          className="h-16 w-28 object-cover rounded border"
        />
      </td>
      <td className="p-3 font-medium">{slide.title}</td>
      <td className="p-3 text-gray-600">{slide.subtitle}</td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(slide)}
          className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(slide)}
          className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm font-medium text-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
