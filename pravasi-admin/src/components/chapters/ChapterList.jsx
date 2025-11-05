import { useState } from "react";
import ChapterCard from "./ChapterCard";
import ConfirmDialog from "../../components/Common/ConfirmDailog";
import chapterApi from "../../api/chapterApi";
import PeopleViewModal from "./PeopleViewModal";

export default function ChapterList({ cities = [], onEdit, onDelete, onManagePeople }) {
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewCity, setViewCity] = useState(null);


  const confirmDelete = (id) => setDeletingId(id);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      setLoading(true);
      await chapterApi.delete(deletingId);
      setDeletingId(null);
      onDelete?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ConfirmDialog open={!!deletingId} onClose={() => setDeletingId(null)} onConfirm={handleDelete} />

      {cities.map((c) => (
        <div key={c._id} className="relative">
          <ChapterCard
  city={c}
  onEdit={() => onEdit?.(c)}
  onManagePeople={() => onManagePeople?.(c)}
  onDelete={() => confirmDelete(c._id)}
  onPeopleView={()=>setViewCity(c)}
/>
<PeopleViewModal open={!!viewCity} city={viewCity} onClose={() => setViewCity(null)} />

  

         
        </div>
      ))}
    </div>
  );
}