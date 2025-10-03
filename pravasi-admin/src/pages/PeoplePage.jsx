// import { useState } from "react";
// import { founder, members as initialMembers } from "../data/peopleData.jsx";
// import FounderForm from "../components/People/FounderForm";
// import MemberCard from "../components/People/MemberCard";
// import MemberForm from "../components/People/MemberForm";

// export default function PeoplePage() {
//   const [founderData, setFounderData] = useState(founder);
//   const [members, setMembers] = useState(initialMembers);
//   const [showForm, setShowForm] = useState(false);


//   const addMember = (member) => {
//     setMembers([...members, { id: Date.now(), ...member }]);
//     setShowForm(false);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Founder Section */}
//       <div className="p-6 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
//           Founder
//         </h2>
//         <FounderForm founder={founderData} setFounder={setFounderData} />
//       </div>

//       {/* Members Section */}
//       <div className="p-6 bg-white shadow-md rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Board Members</h2>
//           <button
//             className="px-4 py-2 bg-[#D90165] text-white rounded-lg hover:bg-pink-700 transition"
//             onClick={() => setShowForm(true)}
//           >
//             + Add Member
//           </button>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {members.map((m) => (
//             <MemberCard key={m.id} member={m} />
//           ))}
//         </div>

//         {showForm && (
//           <div className="mt-4">
//             <MemberForm onSave={addMember} onCancel={() => setShowForm(false)} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import MemberCard from "../components/People/MemberCard";
// import MemberForm from "../components/People/MemberForm";
// import { members as initialMembers } from "../data/peopleData";

// export default function PeoplePage() {
//   const [members, setMembers] = useState(initialMembers || []);
//   const [showForm, setShowForm] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);

//   const handleAddClick = () => {
//     setEditingMember(null);
//     setShowForm(true);
//   };

//   const handleEdit = (member) => {
//     setEditingMember(member);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     setMembers((prev) => prev.filter((m) => m.id !== id));
//   };

//   const handleSave = (member) => {
//     // if exists update else add
//     setMembers((prev) => {
//       const exists = prev.some((m) => m.id === member.id);
//       if (exists) {
//         return prev.map((m) => (m.id === member.id ? member : m));
//       } else {
//         return [member, ...prev];
//       }
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">People List</h1>
//         <button
//           onClick={handleAddClick}
//           className="px-4 py-2 bg-[#D90165] text-white rounded-lg shadow hover:opacity-95 transition"
//         >
//           + Add Member
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {members.map((m) => (
//           <MemberCard
//             key={m.id}
//             member={m}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ))}
//       </div>

//       {showForm && (
//         <MemberForm
//           initial={editingMember}
//           onSave={handleSave}
//           onClose={() => setShowForm(false)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import MemberCard from "../components/People/MemberCard";
import MemberForm from "../components/People/MemberForm";
import FounderForm from "../components/People/FounderForm";
import { founder as initialFounder, members as initialMembers } from "../data/peopleData";
import { motion } from "framer-motion";  

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PeoplePage() {
  // founder state
  const [founderData, setFounderData] = useState(initialFounder);
  const [showFounderForm, setShowFounderForm] = useState(false);

  // members state
  const [members, setMembers] = useState(initialMembers || []);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // member handlers
  const handleAddClick = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };
   const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSave = (member) => {
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === member.id);
      if (exists) {
        return prev.map((m) => (m.id === member.id ? member : m));
      } else {
        return [member, ...prev];
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* Founder Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="p-6 bg-white shadow-md rounded-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Founder</h2>
          <button
            onClick={() => setShowFounderForm(true)}
            className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:bg-pink-700 transition"
          >
            Edit Founder
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={
              founderData.image ||
              "https://via.placeholder.com/150?text=No+Image"
            }
            alt={founderData.name}
            className="w-32 h-32 object-cover rounded-lg shadow"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {founderData.name}
            </h3>
            <p className="text-gray-600 mt-2">{founderData.about}</p>
          </div>
        </div>
      </motion.div>

      {/* Members Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 0.6 }}
        className="p-6 bg-white shadow-md rounded-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Board Members</h2>
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-[#EBA832] text-white rounded-lg shadow hover:opacity-95 transition"
          >
            + Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </motion.div>

      {/* Founder modal */}
      {showFounderForm && (
        <FounderForm
          initial={founderData}
          onSave={(data) => setFounderData(data)}
          onClose={() => setShowFounderForm(false)}
        />
      )}

      {/* Member modal */}
      {showForm && (
        <MemberForm
          initial={editingMember}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
