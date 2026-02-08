import { usePreferencesStore } from '../stores/preferencesStore';

export function PreferencesPanel() {
  const theme = usePreferencesStore((s) => s.theme);
  const fontSize = usePreferencesStore((s) => s.fontSize);
  const setTheme = usePreferencesStore((s) => s.setTheme);
  const setFontSize = usePreferencesStore((s) => s.setFontSize);

  return (
    <div className="preferences-panel">
      <h2>Preferences</h2>
      
      <div className="preference-item">
        <label>Theme:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <span className="current-value">{theme}</span>
      </div>

      <div className="preference-item">
        <label>Font Size:</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
        <span className="current-value">{fontSize}px</span>
      </div>
    </div>
  );
}
