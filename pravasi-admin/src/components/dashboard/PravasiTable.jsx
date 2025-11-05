import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PravasiTable({ list, onView, onVerify = () => {} }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // new state for verify modal
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [verifying, setVerifying] = useState(false); // local spinner state

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setVerifyModalOpen(false);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openVerify = (item) => {
    setSelected(item);
    setVerifyModalOpen(true);
  };

  const closeVerify = () => {
    if (verifying) return; // avoid closing while in-progress
    setVerifyModalOpen(false);
    setSelected(null);
  };

  const confirmVerify = async () => {
    if (!selected) return;
    setVerifying(true);
    try {
      // call parent handler (should perform server update)
      await onVerify(selected);
    } catch (err) {
      // show a simple alert on error (you can replace with toast)
      console.error("Verify error:", err);
      alert("Verification failed. See console for details.");
    } finally {
      setVerifying(false);
      closeVerify();
    }
  };

  const filtered = list?.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.publicId.toLowerCase().includes(search.toLowerCase()) ||
      item.occupation.toLowerCase().includes(search.toLowerCase()) ||
      item.currentCity.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all"
        ? true
        : filter === "verified"
        ? item.isVerified
        : filter === "unverified"
        ? !item.isVerified
     
        : true;
    return matchSearch && matchFilter;
  });

  // modal JSX extracted so it can be portaled to document.body
  const verifyModal = verifyModalOpen && selected && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={closeVerify}
      />

      {/* modal box */}
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-50 max-w-md w-full bg-white rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl font-bold">
              !
            </div>
          </div>
          <div className="flex-1  ">

            <h3 className="text-lg font-semibold   text-gray-900 mb-1">
              Confirm Verification
            </h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to mark{" "}
              <span className="font-semibold text-gray-800">{selected.name}</span>{" "}
              (ID: {selected.publicId}) as verified? This action can be reverted from the profile later.
            </p>

            <div className="mt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="flex-1 px-4 py-2 rounded-4xl bg-blue-600 text-white font-medium inline-flex items-center justify-center gap-2"
                onClick={confirmVerify}
                disabled={verifying}
              >
                {verifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Yes, Verify"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                className="flex-1 px-4 py-2 rounded-4xl bg-gray-100 text-gray-700 font-medium"
                onClick={closeVerify}
                disabled={verifying}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] 
                 border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
        <h3 className="text-xl font-bold text-gray-800"> Pravasi List</h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Name, ID, Occupation, City"
            className="flex-1 border border-gray-300/60 rounded-xl px-4 py-2 
                       focus:ring-2 focus:ring-indigo-400 outline-none text-sm 
                       bg-white/70 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300/60 rounded-xl px-4 py-2 
                       focus:ring-2 focus:ring-indigo-400 outline-none text-sm 
                       bg-white/70"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
 
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-inner">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-w-full border-collapse"
        >
          {/* Table Head */}
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100 sticky top-0 z-10">
              {["Unique ID", "Name", "Occupation", "Blood Group", "Current City", "View", "Verify"].map((head, i) => (
                <th
                  key={i}
                  className="p-3 text-[13px] font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filtered?.length > 0 ? (
              filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-100 hover:bg-indigo-50/40 transition-all duration-300 cursor-pointer group"
                >
                  <td className="p-3 text-sm text-gray-700 font-mono">
                    {p.publicId}
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{p.occupation}</td>
                  <td className="p-3 text-sm text-gray-700">{p.bloodGroup}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {p.currentCity}
                  </td>
                  <td className="p-3 text-center">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onView(p)}
                      className="relative inline-flex items-center justify-center 
                                 px-4 py-1.5 text-sm font-medium text-white 
                                 bg-gradient-to-r from-indigo-500 to-blue-500 
                                 rounded-full shadow-sm overflow-hidden group"
                    >
                      <span className="relative z-10">View</span>
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </motion.button>
                  </td>

                  {/* Verify column */}
                  <td className="p-3 text-center">
                    {p.isVerified ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                        ✓ Verified
                      </span>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openVerify(p);
                        }}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-full shadow"
                      >
                        Verify
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500 text-sm italic"
                >
                  No Pravasi Found 🙁
                </td>
              </motion.tr>
            )}
          </tbody>
        </motion.table>
      </div>

      {/* Portal the modal to document.body to ensure it's always centered on viewport */}
      {createPortal(verifyModal, document.body)}
    </motion.div>
  );
}
