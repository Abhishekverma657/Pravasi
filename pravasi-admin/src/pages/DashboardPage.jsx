import { useEffect, useState, useCallback } from "react";
import { getDashboardData, verifyPravasi } from "../api/dashboardApi";
import DashboardStats from "../components/dashboard/DashboardStats";
import PravasiTable from "../components/dashboard/PravasiTable";
import PravasiDrawer from "../components/dashboard/PravasiDrawer";
import Loader from "../components/Common/Loader";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const load = useCallback(async () => {
    setLoadingDashboard(true);
    const d = await getDashboardData();
    setData(d);
    setLoadingDashboard(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // handler passed to PravasiTable. returns a promise.
  const handleVerify = async (item) => {
    // item expected to have `id` or `_id`. try both.
    const id = item?.id ?? item?._id ?? item?.publicId;
    if (!id) throw new Error("Pravasi id not found");

    // perform API call
    await verifyPravasi(id);

    // refresh dashboard data after successful verify
    await load();

    // optionally: return something for caller
    return true;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {loadingDashboard ? (
        <Loader text="Loading Dashboard..." />
      ) : (
        <>
          <DashboardStats stats={data.statistics} />
          <PravasiTable list={data.pravasiList} onView={setSelected} onVerify={handleVerify} />
          <PravasiDrawer open={!!selected} pravasi={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </div>
  );
}
