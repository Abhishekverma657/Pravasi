import MissionCard from "./MissionCard";

const MissionList = ({ missions, onEdit, onDelete }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {missions.map((m) => (
        <MissionCard
          key={m.id}
          mission={m}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MissionList;
