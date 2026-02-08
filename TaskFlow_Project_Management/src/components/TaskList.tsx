import { useState } from 'react';
import useTaskStore from '../store/taskStore';
import useNotificationStore from '../store/notificationStore';
import { useTheme } from '../context/ThemeContext';

function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const { theme } = useTheme();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      addNotification(`Task "${newTaskTitle}" added successfully!`, 'success');
      setNewTaskTitle('');
    }
  };

  const handleToggleTask = (id: string, title: string, completed: boolean) => {
    toggleTask(id);
    addNotification(
      `Task "${title}" marked as ${completed ? 'incomplete' : 'complete'}`,
      'info'
    );
  };

  const handleDeleteTask = (id: string, title: string) => {
    deleteTask(id);
    addNotification(`Task "${title}" deleted`, 'error');
  };

  const isDark = theme === 'dark';

  return (
    <div style={{
      backgroundColor: isDark ? '#2d2d2d' : '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{ color: isDark ? '#fff' : '#333', marginTop: 0 }}>Task List</h2>
      
      <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${isDark ? '#555' : '#ddd'}`,
            backgroundColor: isDark ? '#3d3d3d' : '#fff',
            color: isDark ? '#fff' : '#333',
            marginRight: '10px',
            width: '300px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Add Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: isDark ? '#aaa' : '#666' }}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: isDark ? '#3d3d3d' : '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', flex: 1, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.title, task.completed)}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                <span
                  style={{
                    color: isDark ? '#fff' : '#333',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => handleDeleteTask(task.id, task.title)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#f44336',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '20px', color: isDark ? '#aaa' : '#666' }}>
        <strong>Total:</strong> {tasks.length} tasks | 
        <strong> Completed:</strong> {tasks.filter(t => t.completed).length} | 
        <strong> Pending:</strong> {tasks.filter(t => !t.completed).length}
      </div>
    </div>
  );
}

export default TaskList;
