import { motion, AnimatePresence } from "framer-motion";

export default function BenefitModal({ open, form, setForm, onSave, onClose }) {
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
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
            bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
            p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                {form.id ? "Edit Benefit" : "Add Benefit"}
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
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Benefit Title"
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />
              <textarea
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Benefit Subtitle"
                rows={3}
                className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={onSave}
                  className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-95 transition"
                >
                  Save
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
