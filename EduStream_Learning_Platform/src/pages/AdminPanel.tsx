import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
}

export default function AdminPanel() {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', joinDate: '2023-12-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', joinDate: '2024-02-01' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Admin', joinDate: '2023-11-20' },
  ]);

  const stats = {
    totalUsers: 1250,
    activeUsers: 842,
    totalCourses: 45,
    completionRate: 78,
  };

  return (
    <div className="page-container admin-panel">
      <h1>Admin Dashboard</h1>
      
      <div className="admin-stats">
        <div className="admin-stat-card">
          <h4>Total Users</h4>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="admin-stat-card">
          <h4>Active Users</h4>
          <p className="stat-number">{stats.activeUsers}</p>
        </div>
        <div className="admin-stat-card">
          <h4>Total Courses</h4>
          <p className="stat-number">{stats.totalCourses}</p>
        </div>
        <div className="admin-stat-card">
          <h4>Completion Rate</h4>
          <p className="stat-number">{stats.completionRate}%</p>
        </div>
      </div>

      <div className="admin-section">
        <h2>User Management</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.joinDate}</td>
                <td>
                  <button className="small-btn">Edit</button>
                  <button className="small-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h2>Platform Settings</h2>
        <div className="settings-form">
          <label>
            <input type="checkbox" defaultChecked /> Enable User Registration
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Enable Forum
          </label>
          <label>
            <input type="checkbox" /> Maintenance Mode
          </label>
          <button className="primary-btn">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
