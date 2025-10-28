 
import { useState, useEffect } from "react";
import { getRoots, addRoot, updateRoot, deleteRoot } from "../api/rootsApi";
import RootCard from "../components/roots/RootCard";
import RootModal from "../components/roots/RootModal";
import AnimatedButton from "../components/Common/button";
import Loader from "../components/Common/Loader";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "../components/Common/ConfirmDailog";

export default function OurRootPage() {
  const [roots, setRoots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoot, setEditingRoot] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null); // ✅ only one expanded card

  useEffect(() => {
    fetchRoots();
  }, []);

  const fetchRoots = async () => {
    try {
      setLoading(true);
      const data = await getRoots();
      setRoots(data);
    } catch (err) {
      toast.error("Failed to load roots data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (rootData) => {
    try {
      setModalLoading(true);
      if (editingRoot?._id) {
        await updateRoot(editingRoot._id, rootData);
        toast.success("Root section updated successfully");
      } else {
        await addRoot(rootData);
        toast.success("Root section added successfully");
      }
      await fetchRoots();
      setModalOpen(false);
      setEditingRoot(null);
    } catch (err) {
      toast.error(
        editingRoot ? "Failed to update root section" : "Failed to add root section"
      );
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = (root) => {
    setEditingRoot(root);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteRoot(id);
      toast.success("Root section deleted successfully");
      await fetchRoots();
    } catch (err) {
      toast.error("Failed to delete root section");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  if (loading) return <Loader text="Loading..." />;

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Roots</h1>
        <AnimatedButton
          text="Add Root Section"
          onClick={() => {
            setEditingRoot(null);
            setModalOpen(true);
          }}
        />
      </div>

      {/* ✅ Pass expandedId and toggle logic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {roots.map((root) => (
          <RootCard
            key={root._id}
            root={root}
            expanded={expandedId === root._id}
            onToggleExpand={() =>
              setExpandedId(expandedId === root._id ? null : root._id)
            }
            onEdit={handleEdit}
            onDelete={(id) => setConfirmDelete(id)}
          />
        ))}
      </div>

      {/* Modal for add/edit */}
      <RootModal
        open={modalOpen}
        initial={editingRoot}
        loading={modalLoading}
        onClose={() => {
          setModalOpen(false);
          setEditingRoot(null);
        }}
        onSave={handleSave}
      />

      {/* Delete confirm dialog */}
      {confirmDelete && (
        <ConfirmDialog
          open={true}
          title="Delete Root Section"
          message="Are you sure you want to delete this root section? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete)}
          onClose={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
