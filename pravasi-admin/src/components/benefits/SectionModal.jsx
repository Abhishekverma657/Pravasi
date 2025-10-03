import { motion, AnimatePresence } from "framer-motion";

export default function SectionModal({ open, section, setSection, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
            bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Edit Section</h2>

            <input
              type="text"
              value={section.heading}
              onChange={(e) => setSection({ ...section, heading: e.target.value })}
              placeholder="Section Heading"
              className="w-full border rounded p-2 mb-3"
            />
            <textarea
              value={section.subtitle}
              onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
              placeholder="Section Subtitle"
              rows={3}
              className="w-full border rounded p-2 mb-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="bg-[#EBA832] text-white px-4 py-2 rounded hover:bg-[#d99b28]"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
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
