 

import { motion } from "framer-motion";
import { useState } from "react";

export default function PravasiTable({ list, onView }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
        : filter === "phoneVerified"
        ? item.phoneVerified
        : filter === "phoneUnverified"
        ? !item.phoneVerified
        : filter === "emailVerified"
        ? item.emailVerified
        : filter === "emailUnverified"
        ? !item.emailVerified
        : true;
    return matchSearch && matchFilter;
  });

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
            <option value="phoneVerified">Phone Verified</option>
            <option value="phoneUnverified">Phone Unverified</option>
            <option value="emailVerified">Email Verified</option>
            <option value="emailUnverified">Email Unverified</option>
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
              {[
                "Unique ID",
                "Name",
                "Occupation",
                "Blood Group",
                "Current City",
                "View",
              ].map((head, i) => (
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
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500 text-sm italic"
                >
                  No Pravasi Found 🙁
                </td>
              </motion.tr>
            )}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}
