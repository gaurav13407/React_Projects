import BudgetTracker from './components/BudgetTracker'
import './App.css'

/**
 * App Component
 * Main entry point for the Secure Banking Dashboard
 * Demonstrates type-safe React development with TypeScript
 */
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏦 Secure Banking Dashboard</h1>
        <p>Type-Safe Financial Management with React & TypeScript</p>
      </header>
      
      <main className="app-main">
        <BudgetTracker />
      </main>

      <footer className="app-footer">
        <p>
          This project demonstrates type safety in React components including functional components,
          class components, hooks (useState, useReducer), and strict TypeScript typing.
        </p>
      </footer>
    </div>
  )
}

export default App
