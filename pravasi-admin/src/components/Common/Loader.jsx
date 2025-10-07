import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
      <motion.div
        className="w-12 h-12 border-4 border-[#EBA832] border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <p className="mt-4 text-gray-700 font-medium text-sm">{text}</p>
    </div>
  );
}
