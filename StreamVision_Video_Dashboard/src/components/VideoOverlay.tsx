import { memo } from 'react';

interface Overlay {
  id: number;
  label: string;
  color: string;
}

interface VideoOverlayProps {
  overlays: Overlay[];
  onToggleOverlay?: (id: number) => void;
}

/**
 * VideoOverlay Component
 * Wrapped in React.memo to prevent unnecessary re-renders
 * Only re-renders when overlays prop actually changes
 * Demonstrates how memoization helps with expensive UI components
 */
const VideoOverlay = memo<VideoOverlayProps>(({ overlays, onToggleOverlay }) => {
  console.log('Rendering VideoOverlay');
  
  return (
    <div className="video-overlay">
      <h3>Active Overlays</h3>
      <div className="overlay-tags">
        {overlays.length === 0 ? (
          <p className="no-overlays">No overlays active</p>
        ) : (
          overlays.map((o) => (
            <span 
              key={o.id} 
              className="overlay-tag"
              style={{ backgroundColor: o.color }}
              onClick={() => onToggleOverlay?.(o.id)}
            >
              {o.label} ✕
            </span>
          ))
        )}
      </div>
    </div>
  );
});

VideoOverlay.displayName = 'VideoOverlay';

export default VideoOverlay;
