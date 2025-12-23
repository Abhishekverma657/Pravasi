import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { notificationApi } from "../api/notificationApi";
import NotificationList from "../components/notifications/NotificationList";
import SendNotification from "../components/notifications/SendNotification";
import Loader from "../components/Common/Loader";
import NoData from "../components/Common/NoData";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationApi.getAll(currentPage);
      setNotifications(data.notifications);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]); // Refresh when page changes

  // Handler to reset to page 1 and fetch notifications (for after sending new notification)
  const handleSendSuccess = () => {
    setCurrentPage(1);
    // fetchNotifications will run due to useEffect when currentPage changes
  };

  return (
    <motion.div 
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <SendNotification onSuccess={handleSendSuccess} />
      </div>

      {loading ? (
        <Loader />
      ) : notifications.length === 0 ? (
        <NoData 
          text="No notifications yet" 
          subtext="Send your first notification to all users!"
        />
      ) : (
        <NotificationList 
          notifications={notifications}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onRefresh={fetchNotifications} // Pass refresh function
        />
      )}
    </motion.div>
  );
}