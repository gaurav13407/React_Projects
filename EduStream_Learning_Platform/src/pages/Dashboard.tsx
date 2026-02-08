import { Suspense, useState } from 'react';
import { lazy } from 'react';

const ProfileSettings = lazy(() => import('../components/ProfileSettings'));

export default function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="stat-card">
          <h3>Courses Enrolled</h3>
          <p className="stat-number">5</p>
        </div>
        <div className="stat-card">
          <h3>Completed Courses</h3>
          <p className="stat-number">2</p>
        </div>
        <div className="stat-card">
          <h3>Learning Hours</h3>
          <p className="stat-number">24</p>
        </div>
        <div className="stat-card">
          <h3>Quiz Average</h3>
          <p className="stat-number">85%</p>
        </div>
      </div>

      <button 
        className="primary-btn"
        onClick={() => setShowSettings(true)}
      >
        Open Settings
      </button>

      {showSettings && (
        <Suspense fallback={<div className="loading">Loading settings...</div>}>
          <ProfileSettings onClose={() => setShowSettings(false)} />
        </Suspense>
      )}
    </div>
  );
}
