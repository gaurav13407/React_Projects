import { useSessionStore } from '../stores/sessionStore';
import { useState } from 'react';

export function SessionPanel() {
  const userId = useSessionStore((s) => s.userId);
  const role = useSessionStore((s) => s.role);
  const setSession = useSessionStore((s) => s.setSession);
  const logout = useSessionStore((s) => s.logout);

  const [isLoggedIn, setIsLoggedIn] = useState(!!userId);
  const [inputUserId, setInputUserId] = useState('');

  const handleLogin = () => {
    if (!inputUserId.trim()) return;
    const token = Math.random().toString(36).substring(7);
    setSession(inputUserId, token, Date.now() + 3600000);
    setIsLoggedIn(true);
    setInputUserId('');
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="session-panel">
      <h2>Session</h2>
      
      {isLoggedIn ? (
        <div className="session-info">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Role:</strong> {role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-form">
          <input
            type="text"
            value={inputUserId}
            onChange={(e) => setInputUserId(e.target.value)}
            placeholder="Enter your user ID"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
