import { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import ActivityEdit from "./ActivityEdit";
import {
  getRajasthanGovtInitiatives,
  updateRajasthanGovtInitiatives,
  getInvestmentSectors,
  updateInvestmentSectors,
  getActivitiesRPF,
  updateActivitiesRPF,
} from "../../api/activityApi";

const TABS = [
  {
    label: "Rajasthan Govt Initiatives",
    get: getRajasthanGovtInitiatives,
    update: updateRajasthanGovtInitiatives,
    key: "rajasthan",
  },
  {
    label: "Investment Sectors",
    get: getInvestmentSectors,
    update: updateInvestmentSectors,
    key: "investment",
  },
  {
    label: "Activities RPF",
    get: getActivitiesRPF,
    update: updateActivitiesRPF,
    key: "rpf",
  },
];

export default function ActivityList() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await TABS[tab].get();
      setData(res.data.data || []);
    } catch (e) {
      setError("Failed to load data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [tab]);

  const handleEdit = (item) => {
    setEditItem(item);
    setEditOpen(true);
  };

  const handleSave = async (updated) => {
    setLoading(true);
    setError("");
    try {
      await TABS[tab].update(updated._id, updated);
      setEditOpen(false);
      fetchData();
    } catch (e) {
      setError("Failed to update");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Activity Management</h1>
      <div className="flex gap-2 mb-6">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded ${
              tab === i ? "bg-[#EBA832] text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {loading && <Loader />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-500">{item.subtitle}</div>
              <ul className="list-disc ml-6 text-sm mt-1">
                {item.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-3 md:mt-0 px-4 py-2 rounded bg-[#97479D] text-white"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <ActivityEdit
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
        initial={editItem || { title: "", subtitle: "", items: [] }}
      />
    </div>
  );
}