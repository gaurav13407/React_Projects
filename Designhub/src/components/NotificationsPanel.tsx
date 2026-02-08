// components/NotificationsPanel.tsx
import { useMemo } from 'react';
import { useDesignHubStore } from '../store';

function NotificationsPanel() {
  const notifications = useDesignHubStore((s) => s.notifications);
  const markAsRead = useDesignHubStore((s) => s.markAsRead);
  const clearNotifications = useDesignHubStore((s) => s.clearNotifications);

  const unreadNotifications = useMemo(() => 
    notifications.filter(n => !n.read),
    [notifications]
  );
  const unreadCount = unreadNotifications.length;

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      clearNotifications();
    }
  };

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h2>
          🔔 Notifications
          {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
        </h2>
        {notifications.length > 0 && (
          <button onClick={handleClearAll} className="clear-all-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty-state">No notifications yet!</p>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`notification-item ${n.read ? 'read' : 'unread'}`}
              >
                <div className="notification-content">
                  <span className={`notification-dot ${n.read ? '' : 'active'}`}>
                    {n.read ? '✓' : '●'}
                  </span>
                  <span className="notification-message">{n.message}</span>
                </div>
                {!n.read && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="mark-read-btn"
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
