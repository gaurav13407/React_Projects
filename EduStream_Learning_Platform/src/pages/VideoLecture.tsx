import { useParams } from 'react-router-dom';

export default function VideoLecture() {
  const { id } = useParams<{ id: string }>();

  const lectures = {
    '1': { title: 'React Fundamentals: Getting Started', duration: '45:30', views: 1240 },
    '2': { title: 'Understanding Hooks and State Management', duration: '52:15', views: 980 },
    '3': { title: 'Performance Optimization Techniques', duration: '38:45', views: 756 },
  };

  const lecture = lectures[id as keyof typeof lectures];

  if (!lecture) {
    return (
      <div className="page-container">
        <h1>Lecture Not Found</h1>
        <p>The requested lecture does not exist.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>{lecture.title}</h1>
      <div className="video-player">
        <div className="video-placeholder">
          <span>▶</span>
          <p>Video Player</p>
        </div>
      </div>
      <div className="lecture-info">
        <div className="info-item">
          <strong>Duration:</strong> {lecture.duration}
        </div>
        <div className="info-item">
          <strong>Views:</strong> {lecture.views.toLocaleString()}
        </div>
      </div>
      <div className="lecture-description">
        <h3>Description</h3>
        <p>
          This lecture covers the fundamental concepts and best practices. You'll learn how to build 
          efficient and scalable applications with modern techniques.
        </p>
      </div>
      <button className="primary-btn">Mark as Complete</button>
    </div>
  );
}
