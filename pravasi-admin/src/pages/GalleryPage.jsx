// import { useState } from "react";
// import GalleryCard from "../components/gallery/GalleryCard";
// import GalleryModal from "../components/gallery/GalleryModal";
// import AnimatedButton from "../components/Common/button";

// export default function GalleryPage() {
//   const [gallery, setGallery] = useState([
//     {
//       id: 1,
//       title: "Event Opening",
//       image: "https://picsum.photos/400/300?random=1",
//     },
//     {
//       id: 2,
//       title: "Charity Drive",
//       image: "https://picsum.photos/400/300?random=2",
//     },
//   ]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [form, setForm] = useState({ id: null, title: "", image: "" });

//   const handleSave = () => {
//     if (form.id) {
//       setGallery((prev) =>
//         prev.map((item) => (item.id === form.id ? form : item))
//       );
//     } else {
//       setGallery((prev) => [...prev, { ...form, id: Date.now() }]);
//     }
//     setModalOpen(false);
//   };

//   const handleEdit = (item) => {
//     setForm(item);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     setGallery((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
//         <AnimatedButton
//           text="Add Image"
//           onClick={() => {
//             setForm({ id: null, title: "", image: "" });
//             setModalOpen(true);
//           }}
//         />
//         {/* <button
//           onClick={() => {
//             setForm({ id: null, title: "", image: "" });
//             setModalOpen(true);
//           }}
//           className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
//         >
//           + Add Image
//         </button> */}
//       </div>

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {gallery.map((item) => (
//           <GalleryCard
//             key={item.id}
//             data={item}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>

//       {/* Modal */}
//       <GalleryModal
//         open={modalOpen}
//         form={form}
//         setForm={setForm}
//         onSave={handleSave}
//         onClose={() => setModalOpen(false)}
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import GalleryCard from "../components/gallery/GalleryCard";
import GalleryModal from "../components/gallery/GalleryModal";
import AnimatedButton from "../components/Common/button";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import {
  getGallery,
  addGallery,
  updateGallery,
  deleteGallery,
} from "../api/galleryApi";
import toast, { Toaster } from "react-hot-toast";
import NoData from "../components/Common/NoData";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getGallery();
      if (res.success) setGallery(res.data);
    } catch {
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!form.title.trim() || !form.image)
      return toast.error("All fields required");
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("image", form.image);

      if (form._id) await updateGallery(form._id, formData);
      else await addGallery(formData);

      toast.success("Saved successfully!");
      setModalOpen(false);
      setForm({ title: "", image: "" });
      fetchData();
    } catch {
      toast.error("Error saving gallery");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGallery(id);
      toast.success("Deleted successfully!");
      fetchData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#EBA832]">Gallery</h1>
        <AnimatedButton
          text="Add Image"
          onClick={() => {
            setForm({ title: "", image: "" }); // <-- blank form set karo
            setModalOpen(true);
          }}
        />
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <NoData text="No Images Found" subtext="Start by adding your first image!" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {gallery.map((item) => (
            <GalleryCard
              key={item._id}
              data={item}
              onEdit={(item) => {
                setForm(item);
                setModalOpen(true);
              }}
              onDelete={() => setConfirmDelete(item._id)}
            />
          ))}
        </div>
      )}

      <GalleryModal
        open={modalOpen}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
        saving={saving}
      />

      {/* ConfirmDialog for delete */}
      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}
