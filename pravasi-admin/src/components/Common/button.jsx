// export default function AnimatedButton({ text = "Click Me", onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="relative px-5 py-2 rounded-lg font-semibold text-white 
//                  bg-[#D90165] shadow-md transition-all duration-300 ease-in-out
//                  hover:bg-[#b80054] hover:shadow-lg active:scale-[0.97]"
//     >
//       {text}
//     </button>
//   );
// }

// src/components/Common/button.jsx
import { motion } from "framer-motion";

export default function AnimatedButton({ text, onClick, loading = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg shadow-md bg-[#D90165]  text-white font-semibold transition-all 
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b80054]"}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      ) : (
        text
      )}
    </motion.button>
  );
}
