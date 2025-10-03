import { useState } from "react";
import HeroSliderTable from "../components/hero/HeroSliderTable";
import HeroSliderModal from "../components/hero/HeroSliderModal";

export default function HeroSlider() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Welcome to Pravasi",
      subtitle: "Empowering communities",
      image: "https://via.placeholder.com/300x150",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = (slide) => {
    if (editing) {
      setSlides(slides.map((s) => (s.id === slide.id ? slide : s)));
    } else {
      setSlides([...slides, { ...slide, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setSlides(slides.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"> Hero Slider</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Slide
        </button>
      </div>

      {/* Table */}
      <HeroSliderTable
        slides={slides}
        onEdit={(slide) => {
          setEditing(slide);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {modalOpen && (
        <HeroSliderModal
          open={modalOpen}
          slide={editing}
          onSave={handleSave}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
