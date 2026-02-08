import React from 'react';

export interface ArticleCardProps {
  title: string;
  author: string;
  content?: string;
  onApprove: () => void;
  onReject?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  author,
  content,
  onApprove,
  onReject,
}) => (
  <div className="article-card">
    <h2>{title}</h2>
    <p className="author">By {author}</p>
    {content && <p className="content">{content}</p>}
    <div className="actions">
      <button onClick={onApprove} className="approve-btn">
        Approve
      </button>
      {onReject && (
        <button onClick={onReject} className="reject-btn">
          Reject
        </button>
      )}
    </div>
  </div>
);
