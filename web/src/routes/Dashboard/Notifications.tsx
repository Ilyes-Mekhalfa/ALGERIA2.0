import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  icon: React.ReactNode;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Order",
      message: "You have received a new order #12345 from a customer",
      type: "info",
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      read: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      id: "2",
      title: "Shipment Delivered",
      message: "Order #12340 has been successfully delivered to the customer",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "3",
      title: "Low Stock Alert",
      message: "Product SKU-001 (Tomato Seeds) is running low on stock. Current stock: 5 units",
      type: "warning",
      timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "4",
      title: "System Error",
      message: "Failed to sync inventory with warehouse system. Retrying...",
      type: "error",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "5",
      title: "Payment Received",
      message: "Payment of $1,250 received for order #12338",
      type: "success",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60000), // 5 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "6",
      title: "New Customer Registration",
      message: "New customer 'Ahmed Boucher' has registered from Algeria",
      type: "info",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60000), // 6 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      id: "7",
      title: "Inventory Update Complete",
      message: "Inventory sync completed successfully. 150 items updated",
      type: "success",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60000), // 7 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: "8",
      title: "High Sales Activity",
      message: "Sales increased by 45% this week compared to last week",
      type: "success",
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60000), // 8 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: "9",
      title: "Restock Required",
      message: "Product SKU-045 (Fertilizer Pack) needs restock. Only 2 units left",
      type: "warning",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60000), // 10 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 5v1M7.08 6.47A9.002 9.002 0 1016.92 17.53M12 12.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      ),
    },
    {
      id: "10",
      title: "Return Request",
      message: "Customer 'Karim Medel' requested return for order #12335",
      type: "warning",
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60000), // 12 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
      ),
    },
    {
      id: "11",
      title: "New Review Posted",
      message: "Customer gave 5-star review for 'Organic Seeds Collection'",
      type: "success",
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60000), // 14 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      id: "12",
      title: "Maintenance Scheduled",
      message: "System maintenance scheduled for tomorrow at 2:00 AM UTC",
      type: "info",
      timestamp: new Date(Date.now() - 16 * 24 * 60 * 60000), // 16 days ago
      read: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getIconStyles = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "info":
      default:
        return "text-blue-600";
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "All notifications read"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No notifications
          </h3>
          <p className="text-gray-600">
            You're all caught up! Check back later for new updates.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 transition cursor-pointer ${
                notification.read
                  ? "bg-white border-gray-200 hover:bg-gray-50"
                  : `${getTypeStyles(notification.type)} border-current hover:shadow-md`
              }`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`mt-1 shrink-0 ${getIconStyles(
                    notification.type
                  )}`}
                >
                  {notification.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </h3>
                      <p className="text-sm mt-1 text-gray-700 wrap-break-word">
                        {notification.message}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      {formatTime(notification.timestamp)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-xs text-gray-500 hover:text-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
