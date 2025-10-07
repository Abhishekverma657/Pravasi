 

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../Common/button";

const MissionForm = ({ onSubmit, editData, onCancel }) => {
  const [form, setForm] = useState({ title: "", subtitle: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setForm({ title: editData.title, subtitle: editData.subtitle });
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.subtitle.trim()) return alert("All fields required");
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={onCancel}
        />
        <motion.form
          onSubmit={handleSave}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative z-50 bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editData ? "Edit Mission" : "Add Mission"}
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
          />
          <textarea
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={handleChange}
            rows={4}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832]"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <AnimatedButton
              text={editData ? "Update" : "Add"}
              loading={loading}
              type="submit"
            />
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default MissionForm;
