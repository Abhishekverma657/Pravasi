import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import chapterApi from "../api/chapterApi";
import ChapterList from "../components/chapters/ChapterList";
import ChapterModal from "../components/chapters/ChapterModal";
import PeopleModal from "../components/chapters/PeopleModal";
import AnimatedButton from "../components/Common/button";
import Loader from "../components/Common/Loader";
import NoData from "../components/Common/NoData";

export default function ChaptersPage() {
  const [type, setType] = useState("india"); // or 'abroad'
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // NEW: people modal
  const [openPeople, setOpenPeople] = useState(false);
  const [peopleCity, setPeopleCity] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await chapterApi.getAll(type);
      setCities(data.cities || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [type]);

  return (
    <motion.div className="p-6 max-w-6xl mx-auto" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chapters / Cities</h1>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/80 backdrop-blur-sm border px-2 py-1">
            <button onClick={() => setType("india")} className={`px-3 py-1 rounded-md ${type === "india" ? "bg-[#EBA832] text-white" : "text-gray-700"}`}>India</button>
            <button onClick={() => setType("abroad")} className={`px-3 py-1 rounded-md ml-2 ${type === "abroad" ? "bg-[#EBA832] text-white" : "text-gray-700"}`}>Abroad</button>
          </div>

          <AnimatedButton text="Add New" onClick={() => { setEditing(null); setOpenModal(true); }} />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : cities.length === 0 ? (
        <NoData text="No chapters found" subtext="Click Add New to create one." />
      ) : (
        <ChapterList
          cities={cities}
          onEdit={(c) => { setEditing(c); setOpenModal(true); }}
          onDelete={fetch}
          onManagePeople={(c) => { setPeopleCity(c); setOpenPeople(true); }}
        />
      )}

      <ChapterModal open={openModal} onClose={() => setOpenModal(false)} onSaved={() => { setOpenModal(false); fetch(); }} initialData={editing} type={type} />

      <PeopleModal open={openPeople} onClose={() => setOpenPeople(false)} onSaved={() => { setOpenPeople(false); fetch(); }} city={peopleCity} />
    </motion.div>
  );
}