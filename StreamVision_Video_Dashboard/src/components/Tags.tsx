import React, { useCallback, useMemo, useState, memo } from 'react';

interface Tag {
  id: number;
  label: string;
}

interface TagListProps {
  tags: Tag[];
  filter: string;
}

/**
 * TagList Component
 * Wrapped in React.memo to prevent unnecessary re-renders
 * Only re-renders when tags or filter props actually change
 * Interactive Challenge: TagList with useMemo and React.memo
 */
const TagList = memo<TagListProps>(({ tags, filter }) => {
  console.log('Rendering TagList');
  
  // Use useMemo to compute filtered tags
  const filteredTags = useMemo(() => {
    console.log('Computing filtered tags...');
    return tags.filter((tag) =>
      tag.label.toLowerCase().includes(filter.toLowerCase())
    );
  }, [tags, filter]);

  return (
    <div className="tag-list">
      <h4>Tags ({filteredTags.length})</h4>
      <div className="tags">
        {filteredTags.length === 0 ? (
          <p className="no-tags">No tags match your search</p>
        ) : (
          filteredTags.map((tag) => (
            <span key={tag.id} className="tag-badge">
              #{tag.label}
            </span>
          ))
        )}
      </div>
    </div>
  );
});

TagList.displayName = 'TagList';

interface TagInputProps {
  onAddTag: (label: string) => void;
}

/**
 * TagInput Component
 * Wrapped in React.memo to prevent unnecessary re-renders
 * Accepts memoized onAddTag callback via useCallback
 * Only re-renders when the callback or input value changes
 * Interactive Challenge: TagInput with useCallback and React.memo
 */
const TagInput = memo<TagInputProps>(({ onAddTag }) => {
  const [inputValue, setInputValue] = useState('');

  console.log('Rendering TagInput');

  const handleAddTag = useCallback(() => {
    if (inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  }, [inputValue, onAddTag]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddTag();
      }
    },
    [handleAddTag]
  );

  return (
    <div className="tag-input">
      <h4>Add New Tag</h4>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a tag and press Enter..."
          className="tag-input-field"
        />
        <button onClick={handleAddTag} className="add-tag-btn">
          Add Tag
        </button>
      </div>
    </div>
  );
});

TagInput.displayName = 'TagInput';

export { TagList, TagInput };
