import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import styles from './NotificationBell.module.css';

export const NotificationBell = () => {
  const { currentUser, currentCollege } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (currentUser && currentCollege) {
      // Placeholder: hook into real notification source when available
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [currentUser, currentCollege]);

  const updateNotifications = () => {
    // Backend notifications not yet implemented
  };

  const handleMarkAsRead = (notificationId) => {
    // No-op until backend notifications are available
  };

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
  };

  const handleDelete = (notificationId, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'file_upload':
        return '📤';
      case 'professor_request':
        return '👨‍🏫';
      default:
        return '📢';
    }
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className={styles.notificationContainer}>
      <button
        className={styles.bellBtn}
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            <div className={styles.headerActions}>
              {unreadCount > 0 && (
                <button
                  className={styles.markAllBtn}
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className={styles.notificationsList}>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`${styles.notification} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <h4 className={styles.notificationTitle}>{notification.title}</h4>
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    <span className={styles.timestamp}>
                      {getTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => handleDelete(notification.id, e)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
