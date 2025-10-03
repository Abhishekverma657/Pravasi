import { useState } from "react";
import FAQTable from "../components/FAQ/FAQTable";
import FAQModal from "../components/FAQ/FAQModal";

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase with valid receipt.",
      active: true,
    },
    {
      id: 2,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide with additional charges.",
      active: false,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = (faq) => {
    if (editing) {
      setFaqs(faqs.map((f) => (f.id === faq.id ? faq : f)));
    } else {
      setFaqs([...faqs, { ...faq, id: Date.now(), active: true }]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const toggleActive = (id) => {
    setFaqs(
      faqs.map((f) =>
        f.id === id ? { ...f, active: !f.active } : f
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">❓ FAQ Management</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add FAQ
        </button>
      </div>

      <FAQTable
        faqs={faqs}
        onEdit={(f) => {
          setEditing(f);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        onToggleActive={toggleActive}
      />

      {modalOpen && (
        <FAQModal
          open={modalOpen}
          faq={editing}
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
