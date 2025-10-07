 

import { motion } from "framer-motion";

export default function GalleryCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-[#FBF6F0] shadow-md rounded-tl-2xl rounded-tr-[2.5rem] 
                 rounded-bl-[2.5rem] rounded-br-2xl overflow-hidden 
                 flex flex-col items-center justify-between w-full 
                 max-w-sm transition-all duration-300"
    >
      {/* Image Section */}
      <div className="w-full h-44 overflow-hidden rounded-tl-2xl rounded-tr-[2.5rem] 
                      rounded-bl-[2.5rem] rounded-br-2xl mt-4 px-4">
        <motion.img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover rounded-tl-2xl rounded-tr-[2.5rem] 
                     rounded-bl-[2.5rem] rounded-br-2xl"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>

      {/* Title */}
      <div className="py-4 text-center">
        <h3 className="text-[#1F2A44] font-semibold text-lg uppercase tracking-wide">
          {data.title}
        </h3>
      </div>
    </motion.div>
  );
}
