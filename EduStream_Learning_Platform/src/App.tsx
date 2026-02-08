import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

// Lazy-loaded pages for route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const VideoLecture = lazy(() => import('./pages/VideoLecture'));
const Forum = lazy(() => import('./pages/Forum'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function LoadingFallback() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading page...</p>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📚</span>
          EduStream
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">Courses</Link>
          </li>
          <li className="nav-item">
            <Link to="/lecture/1" className="nav-link">Lectures</Link>
          </li>
          <li className="nav-item">
            <Link to="/forum" className="nav-link">Forum</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/lecture/:id" element={<VideoLecture />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route 
                  path="*" 
                  element={
                    <div className="page-container">
                      <h1>Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                      <Link to="/" className="primary-btn">Go to Dashboard</Link>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App
