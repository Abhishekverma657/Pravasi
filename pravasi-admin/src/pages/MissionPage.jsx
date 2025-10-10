import { useEffect, useState } from "react";
import MissionList from "../components/Mission/MissionList";
import MissionForm from "../components/Mission/MissionForm";
import { getMissions, addMission, updateMission, deleteMission } from "../api/missionApi";
import AnimatedButton from "../components/Common/button";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "../components/Common/ConfirmDailog"; // <-- import
import NoData from "../components/Common/NoData";

const MissionPage = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // ConfirmDialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch missions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMissions();
        setMissions(data);
      } catch (err) {
        toast.error("Failed to fetch missions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add or update mission
  const handleSubmit = async (mission) => {
    try {
      setLoading(true);
      if (editData) {
        await updateMission(editData._id, mission);
        toast.success("Mission updated successfully");
      } else {
        await addMission(mission);
        toast.success("Mission added successfully");
      }
      const data = await getMissions();
      setMissions(data);
      setShowForm(false);
      setEditData(null);
    } catch (err) {
      toast.error("Error saving mission");
    } finally {
      setLoading(false);
    }
  };

  // Delete mission (open confirm dialog)
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // ConfirmDialog confirm handler
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteMission(deleteId);
      setMissions((prev) => prev.filter((m) => m._id !== deleteId));
      toast.success("Mission deleted successfully");
    } catch (err) {
      toast.error("Error deleting mission");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 flex flex-col gap-8 w-full bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-[#D90165]">Our Missions</h1>
          <AnimatedButton text="+ Add Mission" onClick={() => setShowForm(true)} />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader size={30} color="#EBA832" />
          </div>
        )}
        {showForm && (
          <MissionForm
            onSubmit={handleSubmit}
            editData={editData}
            onCancel={() => {
              setShowForm(false);
              setEditData(null);
            }}
          />
        )}
        <div className="mt-6">
          {missions.length === 0 ? (
            <NoData text="No Missions Found" subtext="Start by adding your first mission!" />
          ) : (
            <MissionList
              missions={missions}
              onEdit={(m) => {
                setEditData(m);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </motion.div>
      {/* ConfirmDialog ek hi jagah yahan */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MissionPage;
