import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../../components/Common/button";
import chapterApi from "../../api/chapterApi";

export default function ChapterModal({ open, onClose, onSaved, initialData = null, type = "india" }) {
  const [form, setForm] = useState({
    name: "",
    contact: { address: "", phone: "", email: "", website: "" },
    imageFile: null,
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        contact: initialData.contact || { address: "", phone: "", email: "", website: "" },
        imageFile: null,
      });
      setPreview(initialData.image ? (initialData.image.startsWith("http") ? initialData.image : `http://31.97.231.85:2700/${initialData.image}`) : "");
    } else {
      setForm({
        name: "",
        contact: { address: "", phone: "", email: "", website: "" },
        imageFile: null,
      });
      setPreview("");
    }
  }, [initialData, open]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((s) => ({ ...s, imageFile: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    try {
      setLoading(true);

      const contactObj = { ...(form.contact || {}) };

      const fd = new FormData();
      fd.append("name", form.name || "");
      if (form.imageFile) fd.append("image", form.imageFile);

      // append contact fields as nested form keys (for curl parity)
      fd.append("contact[address]", contactObj.address || "");
      fd.append("contact[phone]", contactObj.phone || "");
      fd.append("contact[email]", contactObj.email || "");
      fd.append("contact[website]", contactObj.website || "");

      // fallback JSON for servers expecting single contact field
      fd.append("contact", JSON.stringify(contactObj));

      // debug (optional)
      for (const pair of fd.entries()) console.log("FD:", pair[0], pair[1]);

      if (initialData && initialData._id) {
        await chapterApi.update(initialData._id, fd);
      } else {
        await chapterApi.create(type, fd);
      }

      onSaved?.();
    } catch (err) {
      console.error("Create/Update city error:", err?.response?.data || err.message);
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
        <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="relative z-50 w-[95%] sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 max-h-[90vh] overflow-auto"
        >
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-lg font-semibold">{initialData ? "Edit Chapter" : "Create Chapter"}</h3>
            <button onClick={onClose} className="text-2xl text-gray-600">×</button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full p-3 rounded-lg bg-white/70 focus:ring-2 focus:ring-[#EBA832] outline-none"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    value={form.contact.address}
                    onChange={(e) => setForm((s) => ({ ...s, contact: { ...s.contact, address: e.target.value } }))}
                    placeholder="Address"
                    className="p-3 rounded-lg bg-white/70"
                  />
                  <input
                    value={form.contact.phone}
                    onChange={(e) => setForm((s) => ({ ...s, contact: { ...s.contact, phone: e.target.value } }))}
                    placeholder="Phone"
                    className="p-3 rounded-lg bg-white/70"
                  />
                  <input
                    value={form.contact.email}
                    onChange={(e) => setForm((s) => ({ ...s, contact: { ...s.contact, email: e.target.value } }))}
                    placeholder="Email"
                    className="p-3 rounded-lg bg-white/70"
                  />
                  <input
                    value={form.contact.website}
                    onChange={(e) => setForm((s) => ({ ...s, contact: { ...s.contact, website: e.target.value } }))}
                    placeholder="Website"
                    className="p-3 rounded-lg bg-white/70"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {preview ? <img src={preview} alt="preview" className="w-full h-full object-cover" /> : <div className="text-gray-400">No Image</div>}
                </div>
                <label className="block">
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  <div className="px-3 py-2 bg-white/70 rounded-lg text-center border cursor-pointer">Choose Image</div>
                </label>
                {initialData && !form.imageFile && (
                  <div className="text-sm text-gray-500">Uploading a new image will replace the existing one.</div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              <AnimatedButton text={loading ? (initialData ? "Updating..." : "Creating...") : (initialData ? "Update" : "Create")} onClick={handleSubmit} loading={loading} />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}