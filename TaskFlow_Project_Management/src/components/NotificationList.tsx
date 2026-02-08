import useNotificationStore from '../store/notificationStore';
import { useTheme } from '../context/ThemeContext';

function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const clearNotifications = useNotificationStore((state) => state.clearNotifications);
  const { theme } = useTheme();

  const unreadNotifications = notifications.filter(n => !n.read);
  const isDark = theme === 'dark';

  const getTypeColor = (type: 'info' | 'error' | 'success') => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#f44336';
      case 'info':
        return '#2196F3';
    }
  };

  const getTypeEmoji = (type: 'info' | 'error' | 'success') => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
    }
  };

  return (
    <div style={{
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: isDark ? '#fff' : '#333', margin: 0 }}>
          Notifications {unreadNotifications.length > 0 && (
            <span style={{
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '14px',
              marginLeft: '8px',
            }}>
              {unreadNotifications.length}
            </span>
          )}
        </h2>
        {notifications.length > 0 && (
          <button
            onClick={clearNotifications}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#f44336',
              color: 'white',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p style={{ color: isDark ? '#aaa' : '#666' }}>No notifications yet.</p>
      ) : (
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: notif.read 
                  ? (isDark ? '#3d3d3d' : '#f9f9f9')
                  : (isDark ? '#4d4d4d' : '#fff3e0'),
                border: notif.read ? 'none' : `2px solid ${getTypeColor(notif.type)}`,
                opacity: notif.read ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    backgroundColor: getTypeColor(notif.type),
                    color: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {getTypeEmoji(notif.type)}
                </span>
                <span style={{ color: isDark ? '#fff' : '#333' }}>
                  {notif.message}
                </span>
              </div>
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationList;
