import { useState } from 'react';
import { ArticleApproval, type Article } from '../components/ArticleApproval';
import { CommentBox } from '../components/CommentBox';
import { CommentList, type Comment } from '../components/CommentList';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Tech Giants Announce New AI Initiative',
    author: 'Sarah Johnson',
    content:
      'Leading technology companies have unveiled a collaborative effort to develop ethical AI standards. The initiative aims to ensure responsible development and deployment of artificial intelligence systems across industries.',
  },
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement',
    author: 'Michael Chen',
    content:
      'Nations around the world have reached an unprecedented agreement on climate action. The new accord commits signatories to aggressive carbon reduction targets and renewable energy investments.',
  },
  {
    id: '3',
    title: 'Space Mission Discovers Water on Mars',
    author: 'Dr. Emily Rodriguez',
    content:
      'A groundbreaking space mission has confirmed the presence of subsurface water on Mars, significantly advancing our understanding of the planet and its potential for future exploration.',
  },
];

export const DashboardPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    mockArticles[0]
  );
  const [articleComments, setArticleComments] = useState<
    Record<string, Comment[]>
  >({
    1: [],
    2: [],
    3: [],
  });
  const [approvalStatus, setApprovalStatus] = useState<
    Record<string, 'approved' | 'rejected' | 'pending'>
  >({
    1: 'pending',
    2: 'pending',
    3: 'pending',
  });

  const handleAddComment = (text: string) => {
    if (!selectedArticle) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Anonymous',
      text,
      timestamp: new Date(),
    };
    setArticleComments((prev) => ({
      ...prev,
      [selectedArticle.id]: [newComment, ...(prev[selectedArticle.id] || [])],
    }));
  };

  const handleApprovalChange = (status: 'approved' | 'rejected' | 'reset') => {
    if (!selectedArticle) return;
    setApprovalStatus((prev) => ({
      ...prev,
      [selectedArticle.id]:
        status === 'reset' ? 'pending' : (status as 'approved' | 'rejected'),
    }));
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>NewsFleet Dashboard</h1>
        <p>Real-Time Newsroom Management</p>
      </header>

      <div className="dashboard-container">
        <aside className="articles-sidebar">
          <h2>Articles Queue</h2>
          <div className="articles-list">
            {mockArticles.map((article) => (
              <button
                key={article.id}
                className={`article-item ${selectedArticle?.id === article.id ? 'active' : ''}`}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-preview">
                  <h3>{article.title}</h3>
                  <p>{article.author}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="dashboard-main">
          {selectedArticle ? (
            <div className="article-section">
              <ArticleApproval
                article={selectedArticle}
                status={approvalStatus[selectedArticle.id] || 'pending'}
                onApprovalChange={handleApprovalChange}
              />

              <section className="comments-section">
                <h2>Live Comments</h2>
                <CommentBox onPost={handleAddComment} />
                <CommentList comments={articleComments[selectedArticle.id] || []} />
              </section>
            </div>
          ) : (
            <div className="no-article">
              <p>Select an article to view and manage</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
