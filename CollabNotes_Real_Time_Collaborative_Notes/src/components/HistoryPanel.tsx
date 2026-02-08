import { useHistoryStore } from '../stores/historyStore';

export function HistoryPanel() {
  const history = useHistoryStore((s) => s.history);
  const clearHistory = useHistoryStore((s) => s.clearHistory);

  return (
    <div className="history-panel">
      <h2>Action History</h2>
      <button onClick={clearHistory} className="clear-btn">Clear History</button>
      
      <ul className="history-list">
        {history.length === 0 ? (
          <li>No history yet</li>
        ) : (
          history.map((entry, index) => (
            <li key={index} className="history-item">
              <strong>{entry.action.toUpperCase()}</strong>
              <span>Note ID: {entry.noteId}</span>
              <small>{new Date(entry.timestamp).toLocaleString()}</small>
              {entry.details && <p>{entry.details}</p>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
