 
import { IMAGE_BASE_URL } from "../../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f9fafb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-size="28" font-family="Arial, sans-serif">No Image</text></svg>';

function formatDateTime(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PravasiDrawer({ open, onClose, pravasi }) {
  let imgSrc = PLACEHOLDER;
  if (pravasi?.photo) {
    imgSrc = pravasi.photo.startsWith("http")
      ? pravasi.photo
      : `${IMAGE_BASE_URL}${pravasi.photo}`;
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white/90 backdrop-blur-md shadow-2xl z-50 rounded-l-3xl overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            {/* Header Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <motion.img
                key={imgSrc}
                src={imgSrc}
                alt="Profile"
                className="object-cover w-full h-full"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <motion.button
                className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center text-lg"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              {/* Bottom Info Overlay */}
              <motion.div
                className="absolute bottom-4 left-0 w-full px-6 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold">{pravasi?.name}</h2>
                <p className="text-sm opacity-90">{pravasi?.occupation}</p>
                <span className="mt-1 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-mono backdrop-blur-sm">
                  ID: {pravasi?.publicId}
                </span>
              </motion.div>
            </div>

            {/* Content Section */}
            <motion.div
              className="flex-1 px-6 py-6 overflow-y-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.2 },
                },
              }}
            >
              {pravasi && (
                <div className="space-y-4">
                  {[
                    ["Phone", pravasi.phone],
                    ["Blood Group", pravasi.bloodGroup],
                    ["Current City", pravasi.currentCity],
                    ["Permanent City", pravasi.permanentCity],
                    ["Verified", pravasi.isVerified ? "Yes" : "No"],
                    ["Paid Member", pravasi.isPaid ? "Yes" : "No"],
                    ["Online", pravasi.isOnline ? "Yes" : "No"],
                    ["Joined Date", formatDateTime(pravasi.joinedDate)],
                    ["Last Seen", formatDateTime(pravasi.lastSeen)],
                    ["PravasiBoy ID", pravasi.pravasiBoyId],
                  ].map(([label, value], i) => (
                    <motion.div
                      key={label}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex justify-between border-b border-gray-100 pb-2"
                    >
                      <span className="font-medium text-gray-600">{label}:</span>
                      {["Yes", "No"].includes(value) ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            value === "Yes"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {value}
                        </span>
                      ) : (
                        <span className="text-gray-800">{value || "—"}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
