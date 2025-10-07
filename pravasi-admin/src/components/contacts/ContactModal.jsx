 

import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ contact, onClose }) {
  return (
    <AnimatePresence>
      {contact && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="relative z-50 bg-white rounded-2xl shadow-2xl w-[95%] max-w-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Message Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {contact.name}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone || "N/A"}
              </p>
              <div className="mt-3">
                <p className="font-semibold mb-1">Message:</p>
                <div className="bg-gray-100 p-3 rounded-md shadow-inner text-gray-700">
                  {contact.message}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
