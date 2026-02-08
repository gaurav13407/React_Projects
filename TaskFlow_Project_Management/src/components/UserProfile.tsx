import { useState } from 'react';
import useUserStore from '../store/userStore';
import useNotificationStore from '../store/notificationStore';
import { useTheme } from '../context/ThemeContext';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { theme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
      };
      setUser(newUser);
      addNotification(`Welcome, ${name}!`, 'success');
      setName('');
      setEmail('');
    }
  };

  const handleLogout = () => {
    if (user) {
      addNotification(`Goodbye, ${user.name}!`, 'info');
      clearUser();
    }
  };

  const isDark = theme === 'dark';

  if (user) {
    return (
      <div style={{
        backgroundColor: isDark ? '#2d2d2d' : '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>User Profile</h2>
        <div style={{
          padding: '15px',
          backgroundColor: isDark ? '#3d3d3d' : '#f9f9f9',
          borderRadius: '4px',
          marginBottom: '15px',
        }}>
          <div style={{ marginBottom: '10px' }}>
            <strong style={{ color: isDark ? '#aaa' : '#666' }}>Name:</strong>
            <span style={{ color: isDark ? '#fff' : '#333', marginLeft: '10px' }}>
              {user.name}
            </span>
          </div>
          <div>
            <strong style={{ color: isDark ? '#aaa' : '#666' }}>Email:</strong>
            <span style={{ color: isDark ? '#fff' : '#333', marginLeft: '10px' }}>
              {user.email}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#f44336',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            width: '100%',
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>User Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${isDark ? '#555' : '#ddd'}`,
              backgroundColor: isDark ? '#3d3d3d' : '#fff',
              color: isDark ? '#fff' : '#333',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: `1px solid ${isDark ? '#555' : '#ddd'}`,
              backgroundColor: isDark ? '#3d3d3d' : '#fff',
              color: isDark ? '#fff' : '#333',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
