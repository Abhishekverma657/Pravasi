import { useState } from "react";
import GalleryCard from "../components/gallery/GalleryCard";
import GalleryModal from "../components/gallery/GalleryModal";
import AnimatedButton from "../components/Common/button";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "Event Opening",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      id: 2,
      title: "Charity Drive",
      image: "https://picsum.photos/400/300?random=2",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ id: null, title: "", image: "" });

  const handleSave = () => {
    if (form.id) {
      setGallery((prev) =>
        prev.map((item) => (item.id === form.id ? form : item))
      );
    } else {
      setGallery((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
        <AnimatedButton
          text="Add Image"
          onClick={() => {
            setForm({ id: null, title: "", image: "" });
            setModalOpen(true);
          }}
        />
        {/* <button
          onClick={() => {
            setForm({ id: null, title: "", image: "" });
            setModalOpen(true);
          }}
          className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Image
        </button> */}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <GalleryCard
            key={item.id}
            data={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal */}
      <GalleryModal
        open={modalOpen}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
