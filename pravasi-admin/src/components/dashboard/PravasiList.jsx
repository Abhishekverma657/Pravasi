import PravasiCard from "./PravasiCard";

export default function PravasiList({ list, onView }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">List Of Pravasi</h3>
      <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
        {list?.length > 0 ? (
          list.map((pravasi) => (
            <PravasiCard key={pravasi.id} pravasi={pravasi} onView={onView} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No Pravasi Found</p>
        )}
      </div>
    </div>
  );
}
