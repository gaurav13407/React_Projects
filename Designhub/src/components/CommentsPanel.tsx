// components/CommentsPanel.tsx
import { useState, useMemo } from 'react';
import { useDesignHubStore } from '../store';
import type { Comment } from '../store/slices/commentSlice';

function CommentsPanel({ fileId }: { fileId: string | null }) {
  const allComments = useDesignHubStore((s) => s.comments);
  const addComment = useDesignHubStore((s) => s.addComment);
  const deleteComment = useDesignHubStore((s) => s.deleteComment);
  const user = useDesignHubStore((s) => s.user);
  const addNotification = useDesignHubStore((s) => s.addNotification);
  
  const comments = useMemo(() => 
    fileId ? allComments.filter(c => c.fileId === fileId) : [],
    [allComments, fileId]
  );
  
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!fileId) {
      alert('Please select a file first!');
      return;
    }
    
    if (!user) {
      alert('Please login to comment!');
      return;
    }

    if (commentText.trim()) {
      const newComment: Comment = {
        id: 'c' + Date.now(),
        fileId,
        author: user.name,
        text: commentText,
      };
      addComment(newComment);
      setCommentText('');
      addNotification({
        id: 'n' + Date.now(),
        message: `New comment added by ${user.name}`,
        read: false,
      });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
    addNotification({
      id: 'n' + Date.now(),
      message: 'Comment deleted!',
      read: false,
    });
  };

  if (!fileId) {
    return (
      <div className="comments-panel">
        <h2>💬 Comments</h2>
        <p className="empty-state">Select a file to view comments</p>
      </div>
    );
  }

  return (
    <div className="comments-panel">
      <h2>💬 Comments</h2>
      
      <ul className="comments-list">
        {comments.length === 0 ? (
          <p className="empty-state">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-header">
                <strong>{c.author}</strong>
                <button
                  onClick={() => handleDeleteComment(c.id)}
                  className="delete-comment-btn"
                  title="Delete comment"
                >
                  ×
                </button>
              </div>
              <p className="comment-text">{c.text}</p>
            </li>
          ))
        )}
      </ul>

      <div className="comment-input">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
        />
        <button onClick={handleAddComment} className="add-comment-btn">
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default CommentsPanel;
