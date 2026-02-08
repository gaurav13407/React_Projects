import { useState } from 'react';

interface ForumPost {
  id: number;
  author: string;
  title: string;
  content: string;
  replies: number;
  views: number;
}

export default function Forum() {
  const [posts] = useState<ForumPost[]>([
    {
      id: 1,
      author: 'Alice Johnson',
      title: 'Best practices for React performance optimization',
      content: 'I have been working with React for 3 years now and would like to share...',
      replies: 12,
      views: 487,
    },
    {
      id: 2,
      author: 'Bob Smith',
      title: 'Questions about lazy loading implementation',
      content: 'Can someone explain how lazy loading works in detail?',
      replies: 8,
      views: 234,
    },
    {
      id: 3,
      author: 'Carol White',
      title: 'Looking for code review on my TypeScript project',
      content: 'I have completed a project and would appreciate feedback...',
      replies: 15,
      views: 612,
    },
    {
      id: 4,
      author: 'David Brown',
      title: 'New feature request: Dark mode theme',
      content: 'It would be great to have a dark mode option for the platform',
      replies: 5,
      views: 189,
    },
  ]);

  return (
    <div className="page-container">
      <h1>Community Forum</h1>
      <button className="primary-btn">Create New Post</button>

      <div className="forum-posts">
        {posts.map((post) => (
          <div key={post.id} className="forum-post">
            <div className="post-header">
              <h3>{post.title}</h3>
              <p className="post-meta">by {post.author}</p>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-stats">
              <span>{post.replies} Replies</span>
              <span>{post.views} Views</span>
            </div>
            <button className="secondary-btn">View Thread</button>
          </div>
        ))}
      </div>
    </div>
  );
}
