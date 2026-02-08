import { ArticleCard } from './ArticleCard';

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
}

export interface ArticleApprovalProps {
  article: Article;
  status?: 'approved' | 'rejected' | 'pending';
  onApprovalChange?: (status: 'approved' | 'rejected' | 'reset') => void;
}

export function ArticleApproval({
  article,
  status = 'pending',
  onApprovalChange,
}: ArticleApprovalProps) {
  const handleApprove = () => {
    onApprovalChange?.('approved');
  };

  const handleReject = () => {
    onApprovalChange?.('rejected');
  };

  const handleReset = () => {
    onApprovalChange?.('reset');
  };

  return (
    <div className="article-approval">
      <ArticleCard
        title={article.title}
        author={article.author}
        content={article.content}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      {status === 'approved' && <span className="status approved">✓ Approved!</span>}
      {status === 'rejected' && <span className="status rejected">✗ Rejected!</span>}
      {status !== 'pending' && (
        <button onClick={handleReset} className="reset-btn">
          Reset Status
        </button>
      )}
    </div>
  );
}
