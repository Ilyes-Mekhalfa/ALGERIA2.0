import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import useAuthStore from "../../store/authStore";
import notification from "../../assets/notification.svg";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "New Order",
      message: "You have received a new order #12345",
      type: "info",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
    },
    {
      id: "2",
      title: "Shipment Delivered",
      message: "Order #12340 has been successfully delivered",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      read: false,
    },
    {
      id: "3",
      title: "Low Stock Alert",
      message: "Product SKU-001 is running low on stock",
      type: "warning",
      timestamp: new Date(Date.now() - 24 * 60 * 60000),
      read: true,
    },
  ]);

  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logoutStore = useAuthStore((s) => s.logout);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className="w-full bg-none px-6 py-3 flex items-center justify-between relative">
      <h2 className="text-xl font-semibold">AgroConnect Admin</h2>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-sm text-gray-700 mr-4">Hello, {user.name || user.fullName || user.email}</div>
        )}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 relative"
          >
            <img src={notification} alt="Notifications" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Notifications List */}
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                        !notif.read ? "bg-blue-50" : ""
                      }`}
                      onClick={() => !notif.read && markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                            notif.type === "success"
                              ? "bg-green-600"
                              : notif.type === "warning"
                              ? "bg-yellow-600"
                              : notif.type === "error"
                              ? "bg-red-600"
                              : "bg-blue-600"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-gray-900 text-sm">
                              {notif.title}
                            </p>
                            {!notif.read && (
                              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full shrink-0"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(notif.timestamp)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          className="text-gray-400 hover:text-red-600 shrink-0"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-gray-200 p-3">
                  <button
                    onClick={() => {
                      navigate("/admin/notifications");
                      setShowNotifications(false);
                    }}
                    className="w-full text-center text-sm text-primary hover:bg-primary/5 font-medium py-2 rounded transition"
                  >
                    View all notifications
                  </button>

          {/* Simple logout button */}
          <button
            onClick={async () => {
              try {
                await api.logout();
              } catch (e) {
                // ignore network errors - still clear local state
                // eslint-disable-next-line no-console
                console.error("logout error", e);
              }
              logoutStore();
              navigate("/login");
            }}
            className="ml-4 text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
}
