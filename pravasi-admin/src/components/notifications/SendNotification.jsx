import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notificationApi } from "../../api/notificationApi";
import AnimatedButton from "../Common/button";

export default function SendNotification({ onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
    data: { type: "update", screen: "news" }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await notificationApi.sendToAll(form);
      setIsOpen(false);
      setForm({ title: "", body: "", data: { type: "update", screen: "news" } });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedButton
        text="Send New Notification"
        onClick={() => setIsOpen(true)}
        loading={false}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 
                bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200
                max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Send New Notification
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Notification Title"
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                    required
                  />
                  
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    placeholder="Notification Message"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EBA832]"
                    required
                  />
                </form>
              </div>

              {/* Footer */}
              <div className="p-6 border-t flex items-center gap-3 justify-end">
                <AnimatedButton
                  text={loading ? "Sending..." : "Send"}
                  onClick={handleSubmit}
                  loading={loading}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}