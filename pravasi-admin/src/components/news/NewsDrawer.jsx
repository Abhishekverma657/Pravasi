import { motion, AnimatePresence } from "framer-motion";

import { IMAGE_BASE_URL } from "../../utils/constants";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NewsDrawer({ open, data, onClose }) {
  if (!data) return null;

  const imgSrc =
    data.image && typeof data.image === "string" && data.image.trim() !== ""
      ? data.image.startsWith("http")
        ? data.image
        : `${IMAGE_BASE_URL}${data.image}`
      : "https://via.placeholder.com/400x200?text=No+Image";

  const badgeClass = `inline-block mt-3 px-4 py-1 rounded-full text-xs font-semibold ${
    data.category === "Crime"
      ? "bg-red-100 text-red-600"
      : data.category === "Donation"
      ? "bg-blue-100 text-blue-600"
      : "bg-green-100 text-green-600"
  }`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 w-full sm:w-[420px] md:w-[480px] h-full bg-white 
                       shadow-2xl z-50 flex flex-col rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">News Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <img
                src={imgSrc}
                alt={data.title}
                className="w-full h-52 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{data.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(data.date)}</p>
                <p className="mt-4 text-gray-700 leading-relaxed">{data.about}</p>
              </div>

              {/* Category Badge (same as card) */}
              <div className="px-4 pb-4 mt-auto">
                <span className="px-3 py-2 bg-orange-400 text-white  text-center  text-sm rounded-full uppercase font-medium">
                  {data.category}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
