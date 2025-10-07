import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

const BASE = IMAGE_BASE_URL;

export default function MediaBlogDrawer({ open, data, onClose }) {
  if (!data) return null;

  // Image src logic (same as card)
  let imgSrc = PLACEHOLDER;
  if (data.image) {
    imgSrc = data.image.startsWith("http")
      ? data.image
      : `${BASE}${data.image}`;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
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
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] md:w-[480px] bg-white shadow-2xl 
                       z-50 flex flex-col rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">Blog Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <img
                src={imgSrc}
                alt={data.title}
                className="w-full h-52 object-cover rounded-xl"
              />

              <div>
                <h3 className="text-xl font-semibold text-gray-900">{data.title}</h3>
                <p className="text-sm text-gray-500">{data.subtitle}</p>
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.about}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
