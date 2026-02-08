import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { NotesList } from './components/NotesList';
import { CollaboratorsList } from './components/CollaboratorsList';
import { PreferencesPanel } from './components/PreferencesPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { SessionPanel } from './components/SessionPanel';
import { usePreferencesStore } from './stores/preferencesStore';

const queryClient = new QueryClient();

function AppContent() {
  const theme = usePreferencesStore((s) => s.theme);
  const fontSize = usePreferencesStore((s) => s.fontSize);

  return (
    <div className={`app-container theme-${theme}`} style={{ fontSize: `${fontSize}px` }}>
      <header className="app-header">
        <h1>CollabNotes - Real-Time Collaborative Notes</h1>
        <p>Advanced State Management with Zustand</p>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <SessionPanel />
          <PreferencesPanel />
        </aside>

        <main className="main-content">
          <div className="content-grid">
            <section className="notes-section">
              <NotesList />
            </section>
            <aside className="right-sidebar">
              <CollaboratorsList />
              <HistoryPanel />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
