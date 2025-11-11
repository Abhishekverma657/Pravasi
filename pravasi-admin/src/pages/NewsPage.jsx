 
import { useEffect, useState } from "react";
import { getNews, addNews, updateNews, deleteNews } from "../api/newsApi";
import NewsCard from "../components/news/NewsCard";
import NewsModal from "../components/news/NewsModal";
import NewsDrawer from "../components/news/NewsDrawer";
import AnimatedButton from "../components/Common/button";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Common/Loader";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import NoData from "../components/Common/NoData";

export default function NewsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    _id: "",
    title: "",
    about: "",
    date: "",
    category: "GENERAL",   // <-- default to backend enum
    image: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch News
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getNews();
        setList(data);
      } catch {
        toast.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("about", form.about);
      formData.append("date", form.date);
      // send category exactly as stored (uppercase enum)
      formData.append("category", (form.category || "GENERAL").toUpperCase());
      if (form.image instanceof File) formData.append("image", form.image);

      if (form._id) {
        await updateNews(form._id, formData);
        toast.success("News updated");
      } else {
        await addNews(formData);
        toast.success("News added");
      }

      setModalOpen(false);
      const updated = await getNews();
      setList(updated);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      toast.success("Deleted successfully");
      setList((p) => p.filter((x) => x._id !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-600">News & Updates</h2>
        <AnimatedButton
          text="Add News"
          onClick={() => {
            setForm({ _id: "", title: "", about: "", date: "", category: "GENERAL", image: "" }); // <-- set default enum
            setModalOpen(true);
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={30} color="#EBA832" />
        </div>
      ) : list.length === 0 ? (
        <NoData text="No News Found" subtext="Start by adding your first news!" />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((item, index) => (
            <NewsCard
              key={item._id}
              data={item}
              onEdit={() => {
                setForm(item);
                setModalOpen(true);
              }}
              onDelete={(id) => setConfirmDelete(id)}
              onView={(x) => {
                setDrawerData(x);
                setDrawerOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <NewsModal
        open={modalOpen}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={() => {
          setModalOpen(false);
          setForm({ _id: "", title: "", about: "", date: "", category: "GENERAL", image: "" });
        }}
        loading={saving} // <-- pass loading prop expected by NewsModal
      />

      <NewsDrawer
        open={drawerOpen}
        data={drawerData}
        onClose={() => setDrawerOpen(false)}
      />

      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}
