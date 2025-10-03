import HeroSliderRow from "./HeroSliderRow";

export default function HeroSliderTable({ slides, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Subtitle</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slides.length > 0 ? (
            slides.map((slide) => (
              <HeroSliderRow
                key={slide.id}
                slide={slide}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-6 text-gray-500">
                No slides added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
