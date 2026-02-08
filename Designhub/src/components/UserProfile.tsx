// components/UserProfile.tsx
import { useDesignHubStore } from '../store';

function UserProfile() {
  const user = useDesignHubStore((s) => s.user);
  const setUser = useDesignHubStore((s) => s.setUser);
  const clearUser = useDesignHubStore((s) => s.clearUser);
  const addNotification = useDesignHubStore((s) => s.addNotification);

  const handleLogin = () => {
    const newUser = { id: 'u' + Date.now(), name: 'Alex Designer' };
    setUser(newUser);
    addNotification({
      id: 'n' + Date.now(),
      message: `Welcome back, ${newUser.name}!`,
      read: false,
    });
  };

  const handleLogout = () => {
    clearUser();
    addNotification({
      id: 'n' + Date.now(),
      message: 'You have been logged out.',
      read: false,
    });
  };

  if (!user) {
    return (
      <div className="user-profile">
        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        <span className="user-icon">👤</span>
        <span className="user-name">{user.name}</span>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
