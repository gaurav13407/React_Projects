import React, { useCallback, useState, useMemo } from 'react';
import AnalyticsChart from './AnalyticsChart';
import CommentsPanel from './CommentsPanel';
import VideoOverlay from './VideoOverlay';
import { TagList, TagInput } from './Tags';

interface DataItem {
  id: number;
  value: number;
  label: string;
}

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface Overlay {
  id: number;
  label: string;
  color: string;
}

interface Tag {
  id: number;
  label: string;
}

/**
 * StreamVision Dashboard Component
 * A comprehensive demonstration of React memoization best practices:
 * 
 * - useMemo: For expensive computations (analytics, filtering)
 * - useCallback: For stable function references passed to memoized components
 * - React.memo: For preventing unnecessary re-renders of child components
 * 
 * This dashboard shows how unrelated state changes don't trigger
 * unnecessary re-renders of memoized components.
 */
const Dashboard: React.FC = () => {
  // Sample data for analytics
  const [analyticsData] = useState<DataItem[]>([
    { id: 1, value: 120, label: 'Stream 1' },
    { id: 2, value: 240, label: 'Stream 2' },
    { id: 3, value: 180, label: 'Stream 3' },
    { id: 4, value: 320, label: 'Stream 4' },
    { id: 5, value: 150, label: 'Stream 5' },
  ]);

  // Sample comments data
  const [comments] = useState<Comment[]>([
    { id: 1, text: 'Great video quality!', author: 'John' },
    { id: 2, text: 'Stream is lagging', author: 'Alice' },
    { id: 3, text: 'Thanks for streaming!', author: 'Bob' },
    { id: 4, text: 'Love the analytics dashboard', author: 'Carol' },
    { id: 5, text: 'Can we get 4K support?', author: 'Dave' },
  ]);

  // Sample overlays data
  const [overlays, setOverlays] = useState<Overlay[]>([
    { id: 1, label: 'Face Detection', color: '#FF6B6B' },
    { id: 2, label: 'Heat Map', color: '#4ECDC4' },
  ]);

  // Tags state for the interactive challenge
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, label: 'livestream' },
    { id: 2, label: 'analytics' },
    { id: 3, label: 'video' },
    { id: 4, label: 'dashboard' },
    { id: 5, label: 'performance' },
  ]);

  const [tagFilter, setTagFilter] = useState('');

  // Unrelated state to demonstrate that memoized components don't re-render
  const [renderCount, setRenderCount] = useState(0);

  /**
   * Memoized callback for toggling overlays
   * Prevents VideoOverlay from re-rendering due to function reference changes
   */
  const handleToggleOverlay = useCallback((id: number) => {
    setOverlays((prev) =>
      prev.filter((overlay) => overlay.id !== id)
    );
  }, []);

  /**
   * Memoized callback for adding tags
   * Ensures TagInput component doesn't re-render unnecessarily
   */
  const handleAddTag = useCallback((label: string) => {
    setTags((prev) => [
      ...prev,
      { id: Math.max(...prev.map((t) => t.id), 0) + 1, label },
    ]);
  }, []);

  /**
   * Memoized callback for filtering tags
   * This is separate from state to show how useCallback works
   */
  const handleTagFilterChange = useCallback((filter: string) => {
    setTagFilter(filter);
  }, []);

  // Get next tag ID using useMemo to avoid recalculation
  const nextTagId = useMemo(() => {
    return Math.max(...tags.map((t) => t.id), 0) + 1;
  }, [tags]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>StreamVision Video Dashboard</h1>
        <p className="subtitle">React Memoization Performance Optimization</p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-box">
          <span>Dashboard Renders:</span>
          <strong>{renderCount}</strong>
          <button 
            onClick={() => setRenderCount(renderCount + 1)}
            className="stat-btn"
          >
            Trigger Unrelated State Change
          </button>
          <p className="stat-note">
            ℹ️ Click to increase this counter. Notice that memoized child 
            components (AnalyticsChart, VideoOverlay, etc.) do NOT re-render.
          </p>
        </div>
      </div>

      <div className="dashboard-container">
        <section className="dashboard-section">
          <h2>📊 Analytics & Charts</h2>
          <AnalyticsChart data={analyticsData} />
        </section>

        <section className="dashboard-section">
          <h2>📹 Video Overlays</h2>
          <VideoOverlay 
            overlays={overlays} 
            onToggleOverlay={handleToggleOverlay}
          />
        </section>

        <section className="dashboard-section">
          <h2>💬 Comments & Feedback</h2>
          <CommentsPanel comments={comments} />
        </section>

        <section className="dashboard-section interactive-challenge">
          <h2>🏷️ Tag Management (Interactive Challenge)</h2>
          <p className="challenge-note">
            This section demonstrates the mini-project requirements:
            React.memo + useMemo for TagList, useCallback for TagInput
          </p>
          
          <TagInput onAddTag={handleAddTag} />
          
          <div className="tag-filter-section">
            <input
              type="text"
              value={tagFilter}
              onChange={(e) => handleTagFilterChange(e.target.value)}
              placeholder="Filter tags..."
              className="filter-input"
            />
          </div>

          <TagList tags={tags} filter={tagFilter} />
          
          <p className="challenge-info">
            ℹ️ Next Tag ID: {nextTagId} (computed with useMemo)
          </p>
        </section>
      </div>

      <footer className="dashboard-footer">
        <p>
          💡 Open the browser console to see which components are being rendered.
          Try clicking "Trigger Unrelated State Change" to see memoization in action!
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
