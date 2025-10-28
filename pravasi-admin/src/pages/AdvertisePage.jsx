import { useState, useEffect } from "react";
import { getYoutubeVideos, addYoutubeVideo, updateYoutubeVideo, deleteYoutubeVideo } from "../api/AdvertiseApi";
import YoutubeModal from "../components/advertise/YoutubeModal";
import YoutubeCard from "../components/advertise/YoutubeCard";
import AnimatedButton from "../components/Common/button";
import Loader from "../components/Common/Loader";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "../components/Common/ConfirmDailog";

export default function AdvertisePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getYoutubeVideos();
      // Ensure we're handling the array response correctly
      setVideos(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      toast.error("Failed to load videos");
      setVideos([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (videoData) => {
    try {
      setLoading(true);
      if (editingVideo?._id) {
        await updateYoutubeVideo(editingVideo._id, videoData);
        toast.success("Video updated successfully");
      } else {
        await addYoutubeVideo(videoData);
        toast.success("Video added successfully");
      }
      await fetchVideos();
      setModalOpen(false);
      setEditingVideo(null);
    } catch (err) {
      toast.error(editingVideo ? "Failed to update video" : "Failed to add video");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteYoutubeVideo(id);
      toast.success("Video deleted successfully");
      await fetchVideos();
    } catch (err) {
      toast.error("Failed to delete video");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  if (loading) return <Loader text="Loading videos..." />;

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">YouTube Videos</h1>
        <AnimatedButton
          text="Add Video"
          onClick={() => {
            setEditingVideo(null);
            setModalOpen(true);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <YoutubeCard
            key={video._id}
            video={video}
            onEdit={(video) => {
              setEditingVideo(video);
              setModalOpen(true);
            }}
            onDelete={(id) => setConfirmDelete(id)}
          />
        ))}
      </div>

      {modalOpen && (
        <YoutubeModal
          open={modalOpen}
          initial={editingVideo}
          loading={loading}
          onClose={() => {
            setModalOpen(false);
            setEditingVideo(null);
          }}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          open={true}
          title="Delete Video"
          message="Are you sure you want to delete this video? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete)}
          onClose={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}