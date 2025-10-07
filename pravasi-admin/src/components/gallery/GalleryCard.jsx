// import { motion } from "framer-motion";

// export default function GalleryCard({ data, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="bg-white rounded-2xl shadow-md overflow-hidden relative 
//                  hover:shadow-2xl hover:-translate-y-1 transition-all 
//                  duration-300 flex flex-col"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       {/* Image */}
//       <div className="w-full h-48 overflow-hidden">
//         <img
//           src={data.image}
//           alt={data.title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//         />
//       </div>

//       {/* Title */}
//       <div className="p-4 flex-1 flex items-center justify-center">
//         <h3 className="font-semibold text-gray-800 text-center">{data.title}</h3>
//       </div>

//       {/* Edit/Delete */}
//       <div className="absolute top-3 right-3 flex gap-2">
//         <button
//           onClick={() => onEdit(data)}
//           className=" bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(data.id)}
//           className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm  text-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </motion.div>
//   );
// }

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
