// import { motion } from "framer-motion";
// import { Pencil, Trash2 } from "lucide-react";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function BenefitCard({ data, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="p-5 rounded-2xl relative flex flex-col justify-between 
//                  min-h-[240px] shadow-sm bg-gradient-to-br from-gray-50 to-gray-100
//                  hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
//                  transition-all duration-300 ease-out"
//       variants={fadeInUp}
//       initial="hidden"
//       animate="visible"
//       transition={{ duration: 0.4 }}
//     >
//       {/* Title + Content */}
//       <div>
//         <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
//           {data.title}
//         </h3>
//         <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
//           {data.subtitle}
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 mt-5">
//         <button
//           onClick={() => onEdit(data)}
//           className=" bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm "
//         >
//             Edit
//         </button>
//         <button
//           onClick={() => onDelete(data.id)}
//           className=" bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm  text-red-600"
//         >
//             Delete
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// import { motion } from "framer-motion";

// export default function BenefitCard({ data, onEdit, onDelete }) {
//   return (
//     <motion.div
//       className="relative p-5 rounded-2xl shadow-md bg-white overflow-hidden
//                  flex flex-col justify-between h-[240px] hover:shadow-xl transition-all duration-300"
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="absolute top-3 right-3 flex gap-2">
//         <button
//           onClick={() => onEdit(data)}
//           className="bg-white/90 px-2 py-1 rounded-md shadow hover:bg-white text-sm"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(data._id)}
//           className="bg-red-50 px-2 py-1 rounded-md shadow hover:bg-red-100 text-sm text-red-600"
//         >
//           Delete
//         </button>
//       </div>

//       <div className="flex-1 flex flex-col items-center justify-center text-center">
//         <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
//         <p className="text-sm text-gray-600 mt-2">{data.subtitle}</p>
//       </div>
//     </motion.div>
//   );
// }

// import { motion } from "framer-motion";
// import { Shield, Gift, TrendingUp, FileText } from "lucide-react";

// const topIcons = [Shield, Gift, TrendingUp];

// export default function BenefitCard({ data, onEdit, onDelete, index }) {
//   const TopIcon = topIcons[index % topIcons.length];
//   const CenterIcon = FileText;

//   const colors = [
//     "from-[#F6A82D] to-[#F5C667]",
//     "from-[#C957B8] to-[#E18ADB]",
//     "from-[#4CC276] to-[#85E8A5]",
//   ];
//   const bgColor = colors[index % colors.length];

//   return (
//     <motion.div
//       whileHover={{ scale: 1.04, rotate: 0.3 }}
//       transition={{ type: "spring", stiffness: 300, damping: 15 }}
//       className={`relative p-5 w-[260px] h-[300px] flex flex-col justify-center items-start text-left shadow-lg 
//         bg-gradient-to-br ${bgColor} text-white 
//         rounded-tl-xl rounded-tr-3xl rounded-bl-3xl rounded-br-xl overflow-hidden`}
//     >
//       {/* Action Buttons (Top Right) */}
//       <div className="absolute top-3 right-3 flex gap-2 z-20">
//         <button
//           onClick={() => onEdit(data)}
//           className="bg-white/80 hover:bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-md shadow"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(data._id)}
//           className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md shadow"
//         >
//           Delete
//         </button>
//       </div>

//       {/* Top Small Icon (Top Left) */}
//       <motion.div
//         className="absolute top-4 left-4 bg-white/25 backdrop-blur-md rounded-2xl p-2 shadow-md"
//         whileHover={{ rotate: 360 }}
//         transition={{ duration: 1.2, ease: "easeInOut" }}
//       >
//         <TopIcon size={35} className="text-white" />
//       </motion.div>

      
//       <div className="  bg-white/80 p-3 rounded-xl shadow-md mb-3 w-fit">
//         <CenterIcon size={26} className="text-gray-800" />
//       </div>

//       {/* Text Content */}
//       <div className="pl-0">
//         <h3 className="font-bold text-lg uppercase tracking-wide">
//           {data.title || "CLAIM YOUR POLICY OF INR 5 LAKHS"}
//         </h3>
//         <p className="text-sm text-white/90 mt-2 leading-relaxed">
//           {data.subtitle ||
//             "Color theory influences user emotions and brand perception. Design thinking fosters innovation through..."}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { Shield, Gift, TrendingUp, FileText } from "lucide-react";

const topIcons = [Shield, Gift, TrendingUp];

export default function BenefitCard({ data, onEdit, onDelete, index }) {
  const TopIcon = topIcons[index % topIcons.length];
  const CenterIcon = FileText;

  const colors = [
    "from-[#F6A82D] to-[#F5C667]",
    "from-[#C957B8] to-[#E18ADB]",
    "from-[#4CC276] to-[#85E8A5]",
  ];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className={`relative mt-6 pt-6 w-[270px] h-[340px] flex flex-col shadow-lg 
        bg-gradient-to-br ${bgColor} text-white 
        rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-sm overflow-hidden`}
    >
      {/* Action Buttons (Top Right) */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        <button
          onClick={() => onEdit(data)}
          className="bg-white/80 hover:bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-md shadow"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-md shadow"
        >
          Delete
        </button>
      </div>

      {/* Top Small Icon */}
      <motion.div
        className="absolute top-3 left-1/6 -translate-x-1/2 bg-white/25 backdrop-blur-md rounded-2xl p-3 shadow-md"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <TopIcon size={28} className="text-white" />
      </motion.div>

      {/* Center Common Icon (fixed middle layer) */}
      <div className="absolute top-[80px] left-1/6 -translate-x-1/2 bg-white/80 p-4 rounded-xl shadow-md">
        <CenterIcon size={32} className="text-gray-800" />
      </div>

      {/* Text Section — fixed space for icons */}
      <div className="mt-[140px] flex flex-col  ml-0  px-3">
        <h3 className="font-bold text-lg uppercase tracking-wide leading-tight">
          {data.title || "CLAIM YOUR POLICY OF INR 5 LAKHS"}
        </h3>
        <p className="text-sm text-white/90  leading-relaxed line-clamp-6 flex-1 overflow-auto "   style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {data.subtitle ||
            "Color theory influences user emotions and brand perception. Design thinking fosters innovation through..."}
        </p>
      </div>
    </motion.div>
  );
}
