// import { useState } from "react";
// import MissionList from "../components/Mission/MissionList";
// import MissionForm from "../components/Mission/MissionForm";

// const MissionPage = () => {
//   const [missions, setMissions] = useState([
//     { id: 1, title: "Connecting NRRs to their Roots", subtitle: "Strengthening cultural and heritage ties." },
//     { id: 2, title: "A Continuous Engagement", subtitle: "Building communication bridge with government." },
//     { id: 3, title: "Socio-Economic Integration", subtitle: "Encouraging participation in development." },
//     { id: 4, title: "Support & Welfare", subtitle: "Helping NRRs during crises and concerns." },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const handleAddMission = (newMission) => {
//     if (editData) {
//       setMissions(
//         missions.map((m) =>
//           m.id === editData.id ? { ...m, ...newMission } : m
//         )
//       );
//       setEditData(null);
//     } else {
//       setMissions([
//         ...missions,
//         { id: Date.now(), ...newMission },
//       ]);
//     }
//     setShowForm(false);
//   };

//   const handleEdit = (mission) => {
//     setEditData(mission);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     setMissions(missions.filter((m) => m.id !== id));
//   };

//   return (
//     <div className="p-6 flex flex-col gap-6 w-full">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Mission</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-[#EBA832] px-4 py-2 rounded-md hover:opacity-90"
//         >
//           Add Mission
//         </button>
//       </div>

//       {showForm && (
//         <MissionForm
//           onSubmit={handleAddMission}
//           editData={editData}
//           onCancel={() => {
//             setShowForm(false);
//             setEditData(null);
//           }}
//         />
//       )}

//       <MissionList
//         missions={missions}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default MissionPage;

import { useState } from "react";
import MissionList from "../components/Mission/MissionList";
import MissionForm from "../components/Mission/MissionForm";
import { motion } from "framer-motion";  

const MissionPage = () => {
  // ------------------------------
  // Default foundation description
  // ------------------------------
  const [foundationDesc, setFoundationDesc] = useState(
    "The Rajasthan Pravasi Foundation strengthens ties with its diaspora, preserving and promoting the essence of Rajasthani heritage while encouraging their active involvement in the state's economic, social and cultural development."
  );

  const [editingDesc, setEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState(foundationDesc);

  // ------------------------------
  // Missions data
  // ------------------------------
  const [missions, setMissions] = useState([
    { id: 1, title: "Connecting NRRs to their Roots", subtitle: "Strengthening cultural and heritage ties." },
    { id: 2, title: "A Continuous Engagement", subtitle: "Building communication bridge with government." },
    { id: 3, title: "Socio-Economic Integration", subtitle: "Encouraging participation in development." },
    { id: 4, title: "Support & Welfare", subtitle: "Helping NRRs during crises and concerns." },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleAddMission = (newMission) => {
    if (editData) {
      setMissions(
        missions.map((m) =>
          m.id === editData.id ? { ...m, ...newMission } : m
        )
      );
      setEditData(null);
    } else {
      setMissions([
        ...missions,
        { id: Date.now(), ...newMission },
      ]);
    }
    setShowForm(false);
  };

  const handleEdit = (mission) => {
    setEditData(mission);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setMissions(missions.filter((m) => m.id !== id));
  };

  // ------------------------------
  // Animations Variants
  // ------------------------------
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 flex flex-col gap-8 w-full bg-gray-50 min-h-screen">

      {/* ------------------------------ */}
      {/* ABOUT FOUNDATION SECTION       */}
      {/* ------------------------------ */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-[#D90165] tracking-wide">
            About Foundation
          </h2>

          {!editingDesc ? (
            <button
              onClick={() => setEditingDesc(true)}
              className="bg-[#EBA832] text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-[#cf9026] transition-all duration-300 hover:scale-105"
            >
               Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFoundationDesc(tempDesc);
                  setEditingDesc(false);
                }}
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 shadow hover:scale-105 transition"
              >
                 Save
              </button>
              <button
                onClick={() => {
                  setTempDesc(foundationDesc);
                  setEditingDesc(false);
                }}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 shadow hover:scale-105 transition"
              >
                 Cancel
              </button>
            </div>
          )}
        </div>

        {!editingDesc ? (
          <motion.p
            key="descText"
            className="mt-4 text-gray-700 leading-relaxed text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {foundationDesc}
          </motion.p>
        ) : (
          <motion.textarea
            key="descEdit"
            className="w-full mt-4 p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#D90165] shadow-inner"
            value={tempDesc}
            onChange={(e) => setTempDesc(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </motion.div>

      {/* ------------------------------ */}
      {/* MISSIONS LIST SECTION          */}
      {/* ------------------------------ */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-extrabold text-[#D90165]">
            Our Missions
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#EBA832] text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-[#cf9026] transition-all duration-300 hover:scale-105"
          >
             Add Mission
          </button>
        </div>

        {showForm && (
          <MissionForm
            onSubmit={handleAddMission}
            editData={editData}
            onCancel={() => {
              setShowForm(false);
              setEditData(null);
            }}
          />
        )}

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <MissionList
            missions={missions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MissionPage;
