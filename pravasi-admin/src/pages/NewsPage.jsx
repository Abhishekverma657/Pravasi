import { useState } from "react";
import NewsCard from "../components/news/NewsCard";
import NewsModal from "../components/news/NewsModal";

export default function NewsPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    about: "",
    date: "",
    category: "",
    image: "",
  });
  const [list, setList] = useState([
    {
      id: 1,
      title: "Rajasthan High Court...",
      about:
        "Color theory influences user emotions and brand perception. Data visualization helps users understand complex information.",
      date: "2025-07-12",
      category: "Crime",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    },
  ]);

  const handleSave = () => {
    if (form.id) {
      setList(list.map((item) => (item.id === form.id ? form : item)));
    } else {
      setList([...list, { ...form, id: Date.now() }]);
    }
    setOpen(false);
    setForm({ title: "", about: "", date: "", category: "", image: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600">News & Updates</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#EBA832] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add News
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((item) => (
          <NewsCard
            key={item.id}
            data={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Modal */}
      <NewsModal
        open={open}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}