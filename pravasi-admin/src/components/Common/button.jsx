import { motion } from "framer-motion";

export default function AnimatedButton({ text, onClick, loading, type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      {...props}
      className={`px-4 py-2 rounded-lg shadow-md bg-[#D90165]  text-white font-semibold transition-all 
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#b80054]"}`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
