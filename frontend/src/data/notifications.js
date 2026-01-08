// Notifications system for file uploads
const NOTIFICATIONS_KEY = 'notifications';

export let notifications = [];

// Initialize notifications from localStorage
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const raw = window.localStorage.getItem(NOTIFICATIONS_KEY);
    if (raw) notifications = JSON.parse(raw);
  }
} catch (err) {
  notifications = [];
}

const persistNotifications = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
  } catch (err) {
    // ignore
  }
};

export const addNotification = (notification) => {
  const newNotification = {
    id: Date.now(),
    type: notification.type || 'file_upload', // file_upload, professor_request, etc
    title: notification.title,
    message: notification.message,
    fileName: notification.fileName || null,
    uploaderName: notification.uploaderName || null,
    uploaderRole: notification.uploaderRole || null,
    collegeId: notification.collegeId,
    targetRoles: notification.targetRoles || [], // who should see this (admin, professor, student)
    read: false,
    timestamp: new Date().toISOString(),
    relatedId: notification.relatedId || null // fileId, userId, etc
  };
  
  notifications.unshift(newNotification);
  persistNotifications();
  return newNotification;
};

export const getNotificationsForUser = (userRole, collegeId) => {
  return notifications.filter(n => 
    n.collegeId === collegeId && 
    n.targetRoles.includes(userRole)
  );
};

export const markNotificationAsRead = (notificationId) => {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    persistNotifications();
  }
};

export const markAllAsRead = (userRole, collegeId) => {
  notifications.forEach(n => {
    if (n.collegeId === collegeId && n.targetRoles.includes(userRole) && !n.read) {
      n.read = true;
    }
  });
  persistNotifications();
};

export const getUnreadCount = (userRole, collegeId) => {
  return notifications.filter(n => 
    n.collegeId === collegeId && 
    n.targetRoles.includes(userRole) && 
    !n.read
  ).length;
};

export const deleteNotification = (notificationId) => {
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications.splice(index, 1);
    persistNotifications();
  }
};

export const clearOldNotifications = (daysOld = 30) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  notifications = notifications.filter(n => 
    new Date(n.timestamp) > cutoffDate
  );
  persistNotifications();
};
