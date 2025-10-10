import { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardApi";
import DashboardStats from "../components/dashboard/DashboardStats";
import PravasiTable from "../components/dashboard/PravasiTable";
import PravasiDrawer from "../components/dashboard/PravasiDrawer";
import Loader from "../components/Common/Loader";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {data ? (
        <>
          <DashboardStats stats={data.statistics} />
          <PravasiTable list={data.pravasiList} onView={setSelected} />
          <PravasiDrawer open={!!selected} pravasi={selected} onClose={() => setSelected(null)} />
        </>
      ) : (
        <Loader text="Loading Dashboard..." />
      )}
    </div>
  );
}
