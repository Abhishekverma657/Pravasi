 

import { motion } from "framer-motion";

const StatCard = ({ title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`rounded-2xl text-white shadow-lg p-5 flex flex-col justify-center items-center ${color}`}
  >
    <h3 className="text-base font-medium mb-1">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </motion.div>
);

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <StatCard title="Total Pravasi" value={stats?.totalPravasi || 0} color="bg-blue-500" />
      <StatCard title="Verified Pravasi " value={stats?.verifiedPravasi || 0} color="bg-green-500" />
      <StatCard title="Unverified Pravasi " value={stats?.unverifiedPravasi || 0} color="bg-orange-500" />
    </div>
  );
}
