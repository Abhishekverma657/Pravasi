import React, { useEffect, useState } from "react";
import { getSambalYojna, updateSambalYojna } from "../api/sambalYojnaApi";
import SambalYojnaGet from "../components/sambalYojna/SambalYojnaGet";
import SambalYojnaPut from "../components/sambalYojna/SambalYojnaPut";
import Loader from "../components/Common/Loader";
import { toast } from "react-hot-toast";

export default function SambalYojna() {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getSambalYojna();
      setData(res);
    } catch {
      toast.error("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (form) => {
    setLoading(true);
    try {
      await updateSambalYojna(data._id, form);
      toast.success("Updated successfully");
      setEdit(false);
      fetchData();
    } catch {
      toast.error("Update failed");
    }
    setLoading(false);
  };

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="p-4">
      {edit ? (
        <SambalYojnaPut
          data={data}
          onSave={handleSave}
          onCancel={() => setEdit(false)}
          loading={loading}
        />
      ) : (
        <SambalYojnaGet data={data} onEdit={() => setEdit(true)} />
      )}
    </div>
  );
}