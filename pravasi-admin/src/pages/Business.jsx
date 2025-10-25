import { useEffect, useState } from "react";
import BusinessList from "../components/business/BusinessList";
import BusinessModal from "../components/business/BusinessModal";
import AnimatedButton from "../components/Common/button";
import { getBusinesses, addBusiness, updateBusiness, deleteBusiness } from "../api/businessApi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Common/Loader";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import NoData from "../components/Common/NoData";

export default function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const data = await getBusinesses();
      setBusinesses(data);
    } catch {
      toast.error("Failed to load businesses");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (businessData) => {
    try {
      setLoading(true);
      if (editingBusiness?._id) {
        await updateBusiness(editingBusiness._id, businessData);
        toast.success("Business updated successfully");
      } else {
        await addBusiness(businessData);
        toast.success("Business added successfully");
      }
      await fetchBusinesses();
      setIsOpen(false);
      setEditingBusiness(null);
    } catch {
      toast.error("Failed to save business");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(null);
    try {
      setLoading(true);
      await deleteBusiness(id);
      toast.success("Business deleted");
      await fetchBusinesses();
    } catch {
      toast.error("Error deleting business");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#D90165]">Business Directory</h1>
        <AnimatedButton
          text="+ Add Business"
          loading={loading}
          onClick={() => {
            setEditingBusiness(null);
            setIsOpen(true);
          }}
        />
      </div>

      {loading ? (
        <Loader text="Loading Businesses..." />
      ) : businesses && businesses.length === 0 ? (
        <NoData text="No Businesses Found" subtext="Start by adding your first business!" />
      ) : (
        <BusinessList
          businesses={businesses}
          onEdit={(business) => {
            setEditingBusiness(business);
            setIsOpen(true);
          }}
          onDelete={(id) => setConfirmDelete(id)}
        />
      )}

      {isOpen && (
        <BusinessModal
          initial={editingBusiness}
          onSave={handleSave}
          onClose={() => setIsOpen(false)}
        />
      )}

      {confirmDelete !== null && (
        <ConfirmDialog
          open={true}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}