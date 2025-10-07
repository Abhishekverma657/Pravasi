// src/pages/FAQPage.jsx
import { useEffect, useState } from "react";
import { FAQ_API } from "../api/faqApi";
import FAQAccordion from "../components/FAQ/FAQAccordion";
import FAQModal from "../components/FAQ/FAQModal";
import AnimatedButton from "../components/Common/button";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import Loader from "../components/Common/Loader";
import toast, { Toaster } from "react-hot-toast";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // For confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 🔹 Fetch all FAQs
  const loadFAQs = async () => {
    try {
      setLoading(true);
      const data = await FAQ_API.getAll();
      setFaqs(data);
    } catch (err) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  // 🔹 Save (Add / Update)
  const handleSave = async (faq) => {
    try {
      setLoading(true);
      if (editing) {
        await FAQ_API.update(editing._id, faq);
        toast.success("FAQ updated successfully!");
      } else {
        await FAQ_API.add(faq);
        toast.success("FAQ added successfully!");
      }
      setModalOpen(false);
      setEditing(null);
      await loadFAQs();
    } catch (err) {
      toast.error("Error saving FAQ");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete (with confirm dialog)
  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await FAQ_API.remove(deleteId);
      toast.success("FAQ deleted successfully!");
      await loadFAQs();
    } catch (err) {
      toast.error("Error deleting FAQ");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">❓ FAQ Management</h1>
        <AnimatedButton
          text="+ Add FAQ"
          loading={loading}
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        />
      </div>

      {loading ? (
        <Loader text="Loading FAQs..." />
      ) : faqs.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No FAQs found.</p>
      ) : (
        <FAQAccordion
          faqs={faqs}
          onEdit={(faq) => {
            setEditing(faq);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <FAQModal
        open={modalOpen}
        faq={editing}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
