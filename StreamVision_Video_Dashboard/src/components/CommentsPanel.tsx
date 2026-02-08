import React, { useCallback, useMemo, useState, memo } from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
}

interface FilterInputProps {
  onFilter: (filter: string) => void;
}

/**
 * FilterInput Component
 * Wrapped in React.memo to prevent unnecessary re-renders
 * Only re-renders when the onFilter callback or input value changes
 */
const FilterInput = memo<FilterInputProps>(({ onFilter }) => {
  console.log('Rendering FilterInput');
  return (
    <input
      type="text"
      onChange={(e) => onFilter(e.target.value)}
      placeholder="Filter comments..."
      className="filter-input"
    />
  );
});

FilterInput.displayName = 'FilterInput';

interface CommentListProps {
  comments: Comment[];
}

/**
 * CommentList Component
 * Wrapped in React.memo to prevent unnecessary re-renders
 * Only re-renders when comments prop actually changes
 */
const CommentList = memo<CommentListProps>(({ comments }) => {
  console.log('Rendering CommentList');
  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment-item">
          <strong>{c.author}:</strong> {c.text}
        </li>
      ))}
    </ul>
  );
});

CommentList.displayName = 'CommentList';

interface CommentsPanelProps {
  comments: Comment[];
}

/**
 * CommentsPanel Component
 * Demonstrates:
 * - useMemo for filtering expensive operations
 * - useCallback to memoize event handlers for child components
 * - React.memo on child components to prevent unnecessary re-renders
 */
const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments }) => {
  const [filter, setFilter] = useState('');

  // Memoize filtered comments to avoid recomputation
  const filtered = useMemo(() => {
    console.log('Filtering comments...');
    return comments.filter((c) =>
      c.text.toLowerCase().includes(filter.toLowerCase())
    );
  }, [comments, filter]);

  // Memoize the filter handler to pass to child component
  // This prevents FilterInput from re-rendering unnecessarily
  const handleFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="comments-panel">
      <h3>User Comments</h3>
      <FilterInput onFilter={handleFilter} />
      <p className="comment-count">Showing {filtered.length} comments</p>
      <CommentList comments={filtered} />
    </div>
  );
};

export default CommentsPanel;
