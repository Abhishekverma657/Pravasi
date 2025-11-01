import { motion } from "framer-motion";
import { useState } from "react";
import { notificationApi } from "../../api/notificationApi";
import ConfirmDialog from "../Common/ConfirmDailog";
import AnimatedButton from "../Common/button";

export default function NotificationList({ 
  notifications,
  currentPage,
  totalPages,
  onPageChange,
  onRefresh 
}) {
  const [loading, setLoading] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await notificationApi.deleteNotification(deleteId);
      setDeleteId(null); // Close dialog
      onRefresh?.(); // Refresh list
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (notification) => {
    setEditingNotification(notification);
  };

  return (
    <div className="space-y-4">
      {/* Confirm Dialog */}
      <ConfirmDialog 
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      {notifications.map((notification, index) => (
        <motion.div
          key={notification._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{notification.title}</h3>
              <p className="text-gray-600 mt-1">{notification.body}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          {/* <div className="mt-2 flex gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
              {notification.data.type}
            </span>
            {notification.isRead && (
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                Read
              </span>
            )}
          </div> */}

          {/* Action Buttons */}
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => handleUpdate(notification)}
              disabled={loading}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setDeleteId(notification._id)}
              disabled={loading}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}

      {/* Edit Modal */}
      {editingNotification && (
        <EditNotificationModal
          notification={editingNotification}
          onClose={() => setEditingNotification(null)}
          onSuccess={() => {
            setEditingNotification(null);
            onRefresh?.();
          }}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-[#EBA832] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Update EditNotificationModal component
function EditNotificationModal({ notification, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: notification.title,
    body: notification.body,
    data: notification.data
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await notificationApi.updateNotification(notification._id, {
        title: form.title,
        body: form.body,
        data: form.data,
      });
      onSuccess?.(); // This will trigger refresh
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Notification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832] outline-none"
            placeholder="Title"
          />
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EBA832] outline-none"
            rows={4}
            placeholder="Message"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <AnimatedButton
              text={loading ? "Updating..." : "Update"}
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}