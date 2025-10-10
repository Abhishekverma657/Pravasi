import { motion } from "framer-motion";

export default function NoData({ text = "No Data Found", subtext = "Start by adding your first item!" }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-72 text-gray-400 select-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <svg
        className="w-20 h-20 mb-4 animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 48 48"
      >
        <rect x="8" y="16" width="32" height="20" rx="4" fill="#f9fafb" />
        <path d="M8 36l8-10 8 8 8-12 8 14" stroke="#EBA832" strokeWidth="2.5" fill="none" />
        <circle cx="16" cy="24" r="2" fill="#EBA832" />
      </svg>
      <div className="text-xl font-semibold mb-1">{text}</div>
      <div className="text-sm text-gray-500">{subtext}</div>
    </motion.div>
  );
}