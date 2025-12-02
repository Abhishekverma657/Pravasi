import React, { useState } from "react";
import AnimatedButton from "../Common/button";
import toast from "react-hot-toast";

export default function SambalYojnaPut({ data, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    aim: data?.aim || "",
    benefit: data?.benefit || "",
    details: data?.details?.length
      ? data.details.map((d) => ({ ...d }))
      : [{ title: "", body: "" }],
  });

  // Handle change for details array
  const handleDetailChange = (idx, key, value) => {
    setForm((prev) => {
      const details = [...prev.details];
      details[idx][key] = value;
      return { ...prev, details };
    });
  };

  // Add new detail object
  const handleAddDetail = () => {
    setForm((prev) => ({
      ...prev,
      details: [...prev.details, { title: "", body: "" }],
    }));
  };

  // Remove detail object
  const handleRemoveDetail = (idx) => {
    setForm((prev) => {
      const details = prev.details.filter((_, i) => i !== idx);
      return { ...prev, details: details.length ? details : [{ title: "", body: "" }] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.aim.trim() ||
      !form.benefit.trim() ||
      !form.details.length ||
      form.details.some((d) => !d.title.trim() || !d.body.trim())
    ) {
      toast.error("Please fill all fields correctly.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 font-bold z-10"
          onClick={onCancel}
          type="button"
          aria-label="Close"
        >
          ×
        </button>
        {/* Modal Content */}
        <form
          className="flex-1 overflow-y-auto p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-[#97479D] mb-6 text-center">Update संबल योजना</h2>
          <div className="mb-6">
            <label className="block font-medium mb-1">उद्देश्य (Aim):</label>
            <textarea
              className="w-full p-3 border rounded"
              rows={2}
              value={form.aim}
              onChange={(e) => setForm({ ...form, aim: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-1">लाभ (Benefit):</label>
            <textarea
              className="w-full p-3 border rounded"
              rows={2}
              value={form.benefit}
              onChange={(e) => setForm({ ...form, benefit: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-2">Details:</label>
            {form.details.map((d, idx) => (
              <div key={idx} className="mb-4 flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    className="w-full p-2 border rounded mb-2"
                    value={d.title}
                    onChange={(e) => handleDetailChange(idx, "title", e.target.value)}
                    placeholder="Title"
                  />
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={2}
                    value={d.body}
                    onChange={(e) => handleDetailChange(idx, "body", e.target.value)}
                    placeholder="Body"
                  />
                </div>
                {form.details.length > 1 && (
                  <button
                    type="button"
                    className="mt-1 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={() => handleRemoveDetail(idx)}
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-1 bg-[#EBA832] text-white rounded hover:bg-[#d49c2b] text-sm"
              onClick={handleAddDetail}
            >
              + Add Detail
            </button>
          </div>
          <div className="flex gap-4 justify-end mt-8">
            <AnimatedButton text="Save" type="submit" loading={loading} />
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}