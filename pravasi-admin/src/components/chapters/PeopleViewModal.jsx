import { motion, AnimatePresence } from "framer-motion";

export default function PeopleViewModal({ open, onClose, city }) {
  const people = city?.people || [];

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 10, opacity: 0 }}
          className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 bg-white rounded-2xl p-6 shadow-xl max-h-[85vh] overflow-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">People — {city?.name}</h2>
            <button onClick={onClose} className="text-2xl font-bold">&times;</button>
          </div>

          {/* Table */}
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Designation</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Phone</th>
                <th className="py-2 px-3 text-left">About</th>
              </tr>
            </thead>
            <tbody>
              {people.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">No people added</td>
                </tr>
              ) : (
                people.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{p.name}</td>
                    <td className="py-2 px-3">{p.designation}</td>
                    <td className="py-2 px-3">{p.email}</td>
                    <td className="py-2 px-3">{p.phone}</td>
                    <td className="py-2 px-3 text-xs text-gray-600">{p.about}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex justify-end mt-5">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
