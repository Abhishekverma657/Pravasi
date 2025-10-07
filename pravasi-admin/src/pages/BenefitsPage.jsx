import { useState } from "react";
import { motion } from "framer-motion";
import BenefitCard from "../components/benefits/BenefitCard";
import BenefitModal from "../components/benefits/BenefitModal";
import SectionModal from "../components/benefits/SectionModal";
import AnimatedButton from "../components/Common/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BenefitsSection() {
  const [section, setSection] = useState({
    heading: "Benefits of paid user",
    subtitle:
      "Color theory influences user emotions and brand perception. Data visualization helps users understand complex information...",
  });

  const [benefits, setBenefits] = useState([
    { id: 1, title: "CLAIM YOUR POLICY OF INR 5 LAKHS", subtitle: "Color theory influences user emotions and brand perception.", color: "#EBA832" },
    { id: 2, title: "CLAIM YOUR POLICY OF INR 5 LAKHS", subtitle: "Data visualization helps users understand complex information.", color: "#B4559D" },
    { id: 3, title: "CLAIM YOUR POLICY OF INR 5 LAKHS", subtitle: "Design thinking fosters innovation.", color: "#34C759" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [form, setForm] = useState({ id: null, title: "", subtitle: "", color: "#EBA832" });

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (form.id) {
      setBenefits((prev) => prev.map((b) => (b.id === form.id ? form : b)));
    } else {
      setBenefits((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, title: "", subtitle: "", color: "#EBA832" });
    setOpenModal(false);
  };

  const handleEdit = (card) => {
    setForm(card);
    setOpenModal(true);
  };

  const handleDelete = (id) => setBenefits((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-6">
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ duration: 0.6 }}>
        
        {/* Section Heading */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#EBA832]">{section.heading}</h1>
            <AnimatedButton
              text="Edit Section"
              onClick={() => setEditSection(true)}
            />
            {/* <button
              onClick={() => setEditSection(true)}
              className="bg-[#EBA832] text-white px-4 py-2 rounded hover:bg-[#d99b28]"
            >
              Edit Section
            </button> */}
          </div>
          <p className="text-gray-600 mt-2">{section.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Benefits List</h2>
            <AnimatedButton
              text="Add Benefit"
              onClick={() => setOpenModal(true)}
            />
            {/* <button
              onClick={() => setOpenModal(true)}
              className="bg-[#EBA832] text-white px-4 py-2 rounded hover:bg-[#d99b28]"
            >
              + Add Benefit
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <BenefitCard key={b.id} data={b} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <BenefitModal open={openModal} form={form} setForm={setForm} onSave={handleSave} onClose={() => setOpenModal(false)} />
      <SectionModal open={editSection} section={section} setSection={setSection} onClose={() => setEditSection(false)} />
    </div>
  );
}
