import React from "react";

export default function SambalYojnaGet({ data, onEdit }) {
  if (!data) return <div className="text-gray-500">No data found.</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#97479D]">संबल योजना</h2>
        <button
          className="px-4 py-2 bg-[#EBA832] text-white rounded hover:bg-[#d49c2b] transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold">उद्देश्य (Aim):</h3>
        <p className="whitespace-pre-line">{data.aim}</p>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold">लाभ (Benefit):</h3>
        <p className="whitespace-pre-line">{data.benefit}</p>
      </div>
      <div>
        <h3 className="font-semibold">Details:</h3>
        {data.details?.map((d, i) => (
          <div key={i} className="mb-2">
            <div className="font-medium">{d.title}</div>
            <div className="whitespace-pre-line">{d.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}