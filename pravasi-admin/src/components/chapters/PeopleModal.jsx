// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import AnimatedButton from "../../components/Common/button";
// import chapterApi from "../../api/chapterApi";

// export default function PeopleModal({ open, onClose, onSaved, city }) {
//   const [people, setPeople] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (city) {
//       setPeople((city.people || []).map((p) => ({ ...p })));
//     } else {
//       setPeople([]);
//     }
//   }, [city, open]);

//   const handleAdd = () => setPeople((s) => [...s, { name: "", designation: "", about: "", email: "", phone: "" }]);
//   const handleChange = (idx, field, value) => {
//     setPeople((s) => {
//       const arr = [...s];
//       arr[idx] = { ...arr[idx], [field]: value };
//       return arr;
//     });
//   };
//   const handleRemove = (idx) => setPeople((s) => { const arr = [...s]; arr.splice(idx, 1); return arr; });

//   const handleSave = async (e) => {
//     e?.preventDefault?.();
//     if (!city?._id) return;
//     try {
//       setLoading(true);
//       // clean up people (trim)
//       const clean = (people || []).map((p) => ({
//         name: (p.name || "").trim(),
//         designation: (p.designation || "").trim(),
//         about: (p.about || "").trim(),
//         email: (p.email || "").trim(),
//         phone: (p.phone || "").trim(),
//       })).filter((p) => p.name || p.email || p.phone);
//       await chapterApi.updatePeople(city._id, clean);
//       onSaved?.();
//     } catch (err) {
//       console.error("Update people error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;
//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//         <motion.div className="absolute inset-0 bg-black/30" onClick={onClose} />
//         <motion.div initial={{ scale: 0.98, y: 8, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.98, y: 8, opacity: 0 }} className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 bg-white rounded-2xl shadow-xl p-5 max-h-[85vh] overflow-auto">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="text-lg font-semibold">Manage People — {city?.name}</h3>
//             <button onClick={onClose} className="text-2xl">×</button>
//           </div>

//           <form onSubmit={handleSave} className="space-y-4">
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <div className="text-sm font-medium">People</div>
//                 <button type="button" onClick={handleAdd} className="text-sm text-[#D90165]">+ Add</button>
//               </div>

//               <div className="space-y-3">
//                 {people.map((p, idx) => (
//                   <div key={idx} className="p-3 border rounded-lg">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="text-sm font-medium">Person {idx + 1}</div>
//                       <button type="button" onClick={() => handleRemove(idx)} className="text-sm text-red-500">Remove</button>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <input value={p.name} onChange={(e) => handleChange(idx, "name", e.target.value)} placeholder="Name" className="p-2 rounded" />
//                       <input value={p.designation} onChange={(e) => handleChange(idx, "designation", e.target.value)} placeholder="Designation" className="p-2 rounded" />
//                       <input value={p.email} onChange={(e) => handleChange(idx, "email", e.target.value)} placeholder="Email" className="p-2 rounded" />
//                       <input value={p.phone} onChange={(e) => handleChange(idx, "phone", e.target.value)} placeholder="Phone" className="p-2 rounded" />
//                       <textarea value={p.about} onChange={(e) => handleChange(idx, "about", e.target.value)} placeholder="About" className="col-span-1 sm:col-span-2 p-2 rounded" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
//               <AnimatedButton text={loading ? "Saving..." : "Save"} loading={loading} onClick={handleSave} />
//             </div>
//           </form>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../../components/Common/button";
import chapterApi from "../../api/chapterApi";

export default function PeopleModal({ open, onClose, onSaved, city }) {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({
    name: "",
    designation: "",
    about: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setPerson({
      name: "",
      designation: "",
      about: "",
      email: "",
      phone: "",
    });
  }, [open]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!city?._id) return;

    const clean = {
      name: person.name.trim(),
      designation: person.designation.trim(),
      about: person.about.trim(),
      email: person.email.trim(),
      phone: person.phone.trim(),
    };

    try {
      setLoading(true);
      await chapterApi.updatePeople(city._id, [clean]);
      onSaved?.();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

        <motion.div
          initial={{ scale: 0.95, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 10, opacity: 0 }}
          className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 bg-white rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Person — {city?.name}</h2>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>

          {/* Add Person Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                value={person.name}
                onChange={(e) => setPerson({ ...person, name: e.target.value })}
                placeholder="Full Name"
                className="p-2 rounded border"
                required
              />
              <input
                value={person.designation}
                onChange={(e) => setPerson({ ...person, designation: e.target.value })}
                placeholder="Designation"
                className="p-2 rounded border"
              />
              <input
                value={person.email}
                onChange={(e) => setPerson({ ...person, email: e.target.value })}
                placeholder="Email"
                className="p-2 rounded border"
              />
              <input
                value={person.phone}
                onChange={(e) => setPerson({ ...person, phone: e.target.value })}
                placeholder="Phone"
                className="p-2 rounded border"
              />
            </div>

            <textarea
              value={person.about}
              onChange={(e) => setPerson({ ...person, about: e.target.value })}
              placeholder="About"
              className="p-2 rounded border w-full h-20"
            />

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
                Cancel
              </button>
              <AnimatedButton text={loading ? "Saving..." : "Save"} loading={loading} />
            </div>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
