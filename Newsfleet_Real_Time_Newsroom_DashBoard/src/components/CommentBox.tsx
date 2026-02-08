import React, { useState } from 'react';

export interface CommentBoxProps {
  onPost: (comment: string) => void;
  placeholder?: string;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  onPost,
  placeholder = 'Add a comment...',
}) => {
  const [input, setInput] = useState('');

  const handlePost = () => {
    if (input.trim()) {
      onPost(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  return (
    <div className="comment-box">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="comment-input"
      />
      <button onClick={handlePost} className="post-btn">
        Post
      </button>
    </div>
  );
};
