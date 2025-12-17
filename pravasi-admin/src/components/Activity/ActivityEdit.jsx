import { useState, useEffect } from "react";

export default function ActivityEdit({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial);
  const [itemsText, setItemsText] = useState("");

  useEffect(() => {
    setForm(initial);
    setItemsText(initial?.items?.join(", ") || "");
  }, [initial, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({
      ...form,
      items: itemsText
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Activity</h2>

        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <input
            className="w-full border p-2 rounded"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
          />

          <textarea
            className="w-full border p-2 rounded"
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            placeholder="Items (comma separated)"
            rows={4}
          />
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[#EBA832] text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
