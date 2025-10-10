import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getBenefits, addBenefit, updateBenefit, deleteBenefit } from "../api/benefitsApi";
import BenefitCard from "../components/benefits/BenefitCard";
import BenefitModal from "../components/benefits/BenefitModal";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import Loader from "../components/Common/Loader";
import toast, { Toaster } from "react-hot-toast";
import AnimatedButton from "../components/Common/button";

export default function BenefitsSection() {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch benefits
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBenefits();
        setBenefits(data);
      } catch (err) {
        toast.error("Failed to load benefits");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error("Title is required");
    try {
      setSaving(true);
      if (form._id) {
        await updateBenefit(form._id, form);
        toast.success("Benefit updated");
      } else {
        await addBenefit(form);
        toast.success("Benefit added");
      }
      setModalOpen(false);
      setForm({ title: "", subtitle: "" });
      const updated = await getBenefits();
      setBenefits(updated);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteBenefit(selectedId);
      toast.success("Deleted successfully");
      setBenefits((prev) => prev.filter((b) => b._id !== selectedId));
      setConfirmOpen(false);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 overflow-hidden">
      <Toaster position="top-right" />
      {/* Header */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-3xl font-bold text-[#EBA832] tracking-wide">
          Benefits
        </h2>
        <AnimatedButton text="Add Benefit" onClick={() => setModalOpen(true)} />
      </motion.div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={30} color="#EBA832" />
        </div>
      ) : benefits.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-72 text-gray-400 select-none">
          <svg
            className="w-20 h-20 mb-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 48 48"
          >
            <rect x="8" y="16" width="32" height="20" rx="4" fill="#f9fafb" />
            <path d="M8 36l8-10 8 8 8-12 8 14" stroke="#EBA832" strokeWidth="2.5" fill="none" />
            <circle cx="16" cy="24" r="2" fill="#EBA832" />
          </svg>
          <div className="text-xl font-semibold mb-1">No Benefits Found</div>
          <div className="text-sm text-gray-500">Start by adding your first benefit!</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, index) => (
                <motion.div
                  key={b._id}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <BenefitCard
                    data={b}
                    onEdit={(benefit) => {
                      setForm(benefit);
                      setModalOpen(true);
                    }}
                    onDelete={handleDelete}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modals */}
      <BenefitModal
        open={modalOpen}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
        saving={saving}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}
