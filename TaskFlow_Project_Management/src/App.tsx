import { ThemeProvider, useTheme } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
import TaskList from './components/TaskList'
import NotificationList from './components/NotificationList'
import UserProfile from './components/UserProfile'
import './App.css'

function AppContent() {
  const { theme } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#1a1a1a',
      padding: '20px',
      transition: 'background-color 0.3s ease',
    }}>
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{
          color: theme === 'light' ? '#333' : '#fff',
          fontSize: '32px',
          margin: 0,
        }}>
          TaskFlow Project Management
        </h1>
        <ThemeSwitcher />
      </header>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
      }}>
        <TaskList />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UserProfile />
          <NotificationList />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
