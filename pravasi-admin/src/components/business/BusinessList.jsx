import BusinessCard from "./BusinessCard";

export default function BusinessList({ businesses, onEdit, onDelete }) {
  if (!businesses?.length)
    return (
      <div className="text-center text-gray-500 mt-6 text-sm">
        No businesses found.
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <BusinessCard
          key={business._id}
          business={business}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}