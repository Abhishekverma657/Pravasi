import { useState } from "react";
import useAbout from "../hooks/useAbout";
import AboutModal from "../components/about/AboutModal";
import AnimatedButton from "../components/Common/button";
import Loader from "../components/Common/Loader";
import { IMAGE_BASE_URL } from "../utils/constants";

export default function About() {
  const { about, loading, updateAbout } = useAbout();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    whoWeAre: "",
    whyChooseUs: [],
    ourObjective: [],
    chapters: [],
    engagementWithDiaspora: [],
    engagementImages: [],
  });
  const [saving, setSaving] = useState(false);

  const openModal = () => {
    setForm({
      whoWeAre: about?.whoWeAre || "",
      whyChooseUs: about?.whyChooseUs || [],
      ourObjective: about?.ourObjective || [],
      chapters: about?.chapters || [],
      engagementWithDiaspora: about?.engagementWithDiaspora || [],
      engagementImages: about?.engagementImages || [],
    });
    setShowModal(true);
  };

  const handleSave = async (fd) => {
    setSaving(true);
    await updateAbout(fd);
    setSaving(false);
    setShowModal(false);
  };

  if (loading) return <Loader text="Loading About..." />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#E74C3C]">About Us</h1>
        <AnimatedButton text="Edit" onClick={openModal} />
      </div>

      {/* Who We Are */}
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-[#E74C3C] mb-4">Who We Are</h2>
        <p className="text-lg text-gray-800 max-w-3xl mx-auto">{about?.whoWeAre}</p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-[#E74C3C] mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(about?.whyChooseUs || []).map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 text-center">
              <span className="text-lg text-gray-900">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Objectives */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-[#E74C3C] mb-8 text-center">Our Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(about?.ourObjective || []).map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 flex items-center">
              <span className="text-lg text-gray-900">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement With Diaspora */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-[#E74C3C] mb-8 text-center">Engagement With Diaspora</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4 md:w-1/2">
            {(about?.engagementImages || []).map((img, idx) => (
              <img
                key={idx}
                src={typeof img === "string" && img.startsWith("http") ? img : `${IMAGE_BASE_URL}${img}`}
                alt={`engagement-${idx}`}
                className="rounded-2xl border-4 border-[#E74C3C] object-cover w-full h-40"
              />
            ))}
          </div>
          {/* Diaspora Info */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {(about?.engagementWithDiaspora || []).map((item, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-[#E67E22] mb-2">{item.title}</h3>
                <p className="text-gray-800">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters (optional) */}
      {about?.chapters?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#E74C3C] mb-6 text-center">Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.chapters.map((ch, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4">
                <h4 className="font-bold text-[#E67E22]">{ch.title}</h4>
                <p className="text-gray-700">{ch.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <AboutModal
        open={showModal}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
        saving={saving}
      />
    </div>
  );
}