import React from 'react';

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

export interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <p className="comment-author">{comment.author}</p>
            <p className="comment-text">{comment.text}</p>
            <span className="comment-time">{comment.timestamp.toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
};
