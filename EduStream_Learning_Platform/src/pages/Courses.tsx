export default function Courses() {
  const courses = [
    { id: 1, name: 'React Fundamentals', instructor: 'John Doe', progress: 75 },
    { id: 2, name: 'Advanced TypeScript', instructor: 'Jane Smith', progress: 60 },
    { id: 3, name: 'Web Performance', instructor: 'Mike Johnson', progress: 45 },
    { id: 4, name: 'Cloud Deployment', instructor: 'Sarah Williams', progress: 30 },
    { id: 5, name: 'Database Design', instructor: 'Tom Brown', progress: 50 },
  ];

  return (
    <div className="page-container">
      <h1>My Courses</h1>
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.name}</h3>
            <p className="instructor">by {course.instructor}</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{course.progress}% Complete</p>
            <button className="secondary-btn">Continue Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
}
