import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQModal({ open, faq, onSave, onClose }) {
  const [form, setForm] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (faq) setForm(faq);
  }, [faq]);

  const handleSave = () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert("Both fields are required");
      return;
    }
    onSave({ ...form, id: faq?.id ?? Date.now() });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-50 w-[95%] sm:w-2/3 lg:w-1/2 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {faq ? "Edit FAQ" : "Add FAQ"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                placeholder="Enter question"
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                placeholder="Enter answer"
                rows={4}
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:opacity-95 transition"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
