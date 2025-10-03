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
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-50 bg-white rounded-2xl shadow-lg w-[95%] max-w-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Message Details</h2>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone || "N/A"}</p>
            <p className="mt-2"><strong>Message:</strong></p>
            <p className="bg-gray-100 p-3 rounded mt-1">{contact.message}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
