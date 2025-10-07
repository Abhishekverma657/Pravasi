import { useState } from "react";
import NewsCard from "../components/news/NewsCard";
import NewsModal from "../components/news/NewsModal";
import AnimatedButton from "../components/Common/button";
import NewsDrawer from "../components/news/NewsDrawer"; // <-- ADD THIS

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

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);

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

  // Drawer open handler
  const handleView = (item) => {
    setDrawerData(item);
    setDrawerOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600">News & Updates</h2>
        <AnimatedButton
          text="Add News"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.map((item) => (
          <NewsCard
            key={item.id}
            data={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView} // <-- Pass view handler
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

      {/* Drawer */}
      <NewsDrawer
        open={drawerOpen}
        data={drawerData}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}