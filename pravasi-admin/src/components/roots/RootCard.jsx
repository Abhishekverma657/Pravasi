 
 
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IMAGE_BASE_URL } from "../../utils/constants";

export default function RootCard({ root, expanded, onToggleExpand, onEdit, onDelete }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const MAX_HEIGHT = 150;

  const imgSrc = root.image?.startsWith("http")
    ? root.image
    : `${IMAGE_BASE_URL}${root.image}`;

  const points = Array.isArray(root.descriptionPoints)
    ? root.descriptionPoints
    : [];

  // measure height
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [points, expanded]);

  return (
    <motion.article
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br from-white to-orange-50/40 rounded-2xl border border-orange-100 shadow-lg overflow-hidden transition-all duration-300 ${
        expanded ? "shadow-xl scale-[1.02]" : "shadow-md"
      }`}
    >
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => onEdit(root)}
          className="bg-white/90 hover:bg-white text-gray-800 px-2 py-1 rounded-md shadow text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(root._id)}
          className="bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-md shadow text-xs"
        >
          Delete
        </button>
      </div>

      {/* Image */}
      <div className="flex justify-center mt-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
          <img
            src={imgSrc}
            alt={root.sectionTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 pt-4">
        <div className="text-center">
          <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
            {root.sectionTitle}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[#1F2A44]">
            {root.heading}
          </h3>
        </div>

        {/* Expandable Content */}
        <motion.div
          ref={contentRef}
          className="mt-4 text-gray-700 relative"
          animate={{
            height: expanded
              ? contentHeight
              : Math.min(contentHeight, MAX_HEIGHT),
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
        >
          <ul className="space-y-3">
            {points.length === 0 && (
              <li className="text-sm text-gray-500">
                No description available.
              </li>
            )}
            {points.map((pt, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-orange-500 mt-1">•</span>
                <p className="text-sm leading-7">{pt}</p>
              </li>
            ))}
          </ul>

          {!expanded && contentHeight > MAX_HEIGHT && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
          )}
        </motion.div>

        {contentHeight > MAX_HEIGHT && (
          <motion.div initial={false} className="mt-4 text-center">
            <button
              onClick={onToggleExpand}
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
            >
              <span>{expanded ? "Show less" : "Learn more"}</span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                ↓
              </motion.span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
