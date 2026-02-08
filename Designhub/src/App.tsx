import { useState } from 'react'
import './App.css'
import UserProfile from './components/UserProfile'
import FileList from './components/FileList'
import CommentsPanel from './components/CommentsPanel'
import NotificationsPanel from './components/NotificationsPanel'

function App() {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>🎨 DesignHub</h1>
          <p className="tagline">Real-Time Collaborative Design Platform</p>
        </div>
        <UserProfile />
      </header>

      <div className="app-content">
        <div className="main-section">
          <FileList onSelectFile={setSelectedFileId} />
          <CommentsPanel fileId={selectedFileId} />
        </div>
        
        <aside className="sidebar">
          <NotificationsPanel />
        </aside>
      </div>

      <footer className="app-footer">
        <p>Built with Zustand Slices & Modular State Architecture</p>
      </footer>
    </div>
  )
}

export default App
