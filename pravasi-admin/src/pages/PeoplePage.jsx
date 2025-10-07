// import React, { useState } from "react";
// import MemberCard from "../components/People/MemberCard";
// import MemberForm from "../components/People/MemberForm";
// import FounderForm from "../components/People/FounderForm";
// import { founder as initialFounder, members as initialMembers } from "../data/peopleData";
// import { motion } from "framer-motion";  
// import AnimatedButton from "../components/Common/button";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// export default function PeoplePage() {
//   // founder state
//   const [founderData, setFounderData] = useState(initialFounder);
//   const [showFounderForm, setShowFounderForm] = useState(false);

//   // members state
//   const [members, setMembers] = useState(initialMembers || []);
//   const [showForm, setShowForm] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);

//   // member handlers
//   const handleAddClick = () => {
//     setEditingMember(null);
//     setShowForm(true);
//   };

//   const handleEdit = (member) => {
//     setEditingMember(member);
//     setShowForm(true);
//   };
//    const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const handleDelete = (id) => {
//     setMembers((prev) => prev.filter((m) => m.id !== id));
//   };

//   const handleSave = (member) => {
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
//     <div className="space-y-10">
//       {/* Founder Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.6 }}
//         className="p-6 bg-white shadow-md rounded-lg"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Founder</h2>
//           <AnimatedButton
//             text="Edit Founder"
//             onClick={() => setShowFounderForm(true)}
//           />
//           {/* <button
//             onClick={() => setShowFounderForm(true)}
//             className="px-4 py-2 bg-[#EBA832] text-white rounded-lg hover:bg-pink-700 transition"
//           >
//             Edit Founder
//           </button> */}
//         </div>

//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <img
//             src={
//               founderData.image ||
//               "https://via.placeholder.com/150?text=No+Image"
//             }
//             alt={founderData.name}
//             className="w-32 h-32 object-cover rounded-lg shadow"
//           />
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               {founderData.name}
//             </h3>
//             <p className="text-gray-600 mt-2">{founderData.about}</p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Members Section */}
//       <motion.div
//         variants={fadeInUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ delay: 0.3, duration: 0.6 }}
//         className="p-6 bg-white shadow-md rounded-lg"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Board Members</h2>
//           <AnimatedButton
//             text="Add Member"
//             onClick={handleAddClick}
//           />
//           {/* <button
//             onClick={handleAddClick}
//             className="px-4 py-2 bg-[#EBA832] text-white rounded-lg shadow hover:opacity-95 transition"
//           >
//             + Add Member
//           </button> */}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {members.map((m) => (
//             <MemberCard
//               key={m.id}
//               member={m}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ))}
//         </div>
//       </motion.div>

//       {/* Founder modal */}
//       {showFounderForm && (
//         <FounderForm
//           initial={founderData}
//           onSave={(data) => setFounderData(data)}
//           onClose={() => setShowFounderForm(false)}
//         />
//       )}

//       {/* Member modal */}
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

import { useEffect, useState } from "react";
import {
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
} from "../api/peopleApi";
import MemberCard from "../components/People/MemberCard";
import MemberForm from "../components/People/MemberForm";
import FounderForm from "../components/People/FounderForm";
import Loader from "../components/Common/Loader";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import AnimatedButton from "../components/Common/button";
import { toast } from "react-hot-toast";
import { IMAGE_BASE_URL } from "../utils/constants";

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [founder, setFounder] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFounderForm, setShowFounderForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople();
      const founderData = data.find((p) => p.role?.toLowerCase() === "founder");
      const memberData = data.filter(
        (p) => p.role?.toLowerCase() !== "founder"
      );
      setFounder(founderData || null);
      setMembers(memberData || []);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSave = async (formData, isFounder) => {
    try {
      setLoading(true);
      if (formData.get("_id")) {
        await updatePerson(formData.get("_id"), formData);
        toast.success("Updated successfully");
      } else {
        await addPerson(formData);
        toast.success("Added successfully");
      }
      fetchPeople();
      setShowFounderForm(false);
      setShowMemberForm(false);
    } catch (err) {
      toast.error("Error saving person");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deletePerson(id);
      toast.success("Deleted successfully");
      fetchPeople();
    } catch (err) {
      toast.error("Error deleting person");
    } finally {
      setConfirmDelete(null);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {loading && <Loader text="Please wait..." />}

      {/* Founder Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Founder</h2>
          <AnimatedButton
            text={founder ? "Edit Founder" : "Add Founder"}
            onClick={() => setShowFounderForm(true)}
          />
        </div>
        {founder ? (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                founder.image
                  ? `${IMAGE_BASE_URL}${founder.image}`
                  : "https://via.placeholder.com/150?text=No+Image"
              }
              alt={founder.name}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {founder.name}
              </h3>
              <p className="text-gray-600 mt-2">{founder.about}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No founder added yet.</p>
        )}
      </div>

      {/* Members Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Board Members</h2>
          <AnimatedButton text="+ Add Member" onClick={() => setShowMemberForm(true)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <MemberCard
              key={m._id}
              member={m}
              onEdit={() => {
                setEditingMember(m);
                setShowMemberForm(true);
              }}
              onDelete={() => setConfirmDelete(m)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showFounderForm && (
        <FounderForm
          initial={founder}
          onSave={(updatedFounder) => setFounder(updatedFounder)}
          onClose={() => setShowFounderForm(false)}
        />
      )}

      {showMemberForm && (
        <MemberForm
          initial={editingMember}
          onSaved={() => {
            setShowMemberForm(false);
            setEditingMember(null);
            fetchPeople(); // refresh list after add/edit
          }}
          onClose={() => {
            setShowMemberForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete._id)}
        />
      )}
    </div>
  );
}
