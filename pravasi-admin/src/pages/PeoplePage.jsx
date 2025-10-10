import { useEffect, useState } from "react";
import {
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
} from "../api/peopleApi";
import MemberCard from "../components/People/MemberCard";
import MemberForm from "../components/People/MemberForm";
import FounderForm from "../components/People/FounderForm";
import Loader from "../components/Common/Loader";
import ConfirmDialog from "../components/Common/ConfirmDailog";
import AnimatedButton from "../components/Common/button";
import { toast } from "react-hot-toast";
import { IMAGE_BASE_URL } from "../utils/constants";
import NoData from "../components/Common/NoData";

export default function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [founder, setFounder] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFounderForm, setShowFounderForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople();
      const founderData = data.find((p) => p.role?.toLowerCase() === "founder");
      const memberData = data.filter(
        (p) => p.role?.toLowerCase() !== "founder"
      );
      setFounder(founderData || null);
      setMembers(memberData || []);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSave = async (formData, isFounder) => {
    try {
      setLoading(true);
      if (formData.get("_id")) {
        await updatePerson(formData.get("_id"), formData);
        toast.success("Updated successfully");
      } else {
        await addPerson(formData);
        toast.success("Added successfully");
      }
      fetchPeople();
      setShowFounderForm(false);
      setShowMemberForm(false);
    } catch (err) {
      toast.error("Error saving person");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deletePerson(id);
      toast.success("Deleted successfully");
      fetchPeople();
    } catch (err) {
      toast.error("Error deleting person");
    } finally {
      setConfirmDelete(null);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {loading && <Loader text="Please wait..." />}

      {/* Founder Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Founder</h2>
          <AnimatedButton
            text={founder ? "Edit Founder" : "Add Founder"}
            onClick={() => setShowFounderForm(true)}
          />
        </div>
        {founder ? (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                founder.image
                  ? `${IMAGE_BASE_URL}${founder.image}`
                  : "https://via.placeholder.com/150?text=No+Image"
              }
              alt={founder.name}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {founder.name}
              </h3>
              <p className="text-gray-600 mt-2">{founder.about}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No founder added yet.</p>
        )}
      </div>

      {/* Members Section */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Board Members</h2>
          <AnimatedButton text="+ Add Member" onClick={() => setShowMemberForm(true)} />
        </div>

        {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader size={30} color="#EBA832" />
        </div>
      ) : members.length === 0 ? (
        <NoData text="No Members Found" subtext="Start by adding your first member!" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((m) => (
            <MemberCard
              key={m._id}
              member={m}
              onEdit={() => {
                setEditingMember(m);
                setShowMemberForm(true);
              }}
              onDelete={() => setConfirmDelete(m)}
            />
          ))}
        </div>
      )}
      </div>

      {/* Modals */}
      {showFounderForm && (
        <FounderForm
          initial={founder}
          onSave={(updatedFounder) => setFounder(updatedFounder)}
          onClose={() => setShowFounderForm(false)}
        />
      )}

      {showMemberForm && (
        <MemberForm
          initial={editingMember}
          onSaved={() => {
            setShowMemberForm(false);
            setEditingMember(null);
            fetchPeople(); // refresh list after add/edit
          }}
          onClose={() => {
            setShowMemberForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete._id)}
        />
      )}
    </div>
  );
}
