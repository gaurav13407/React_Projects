// components/FileList.tsx
import { useState } from 'react';
import { useDesignHubStore } from '../store';
import type { File } from '../store/slices/fileSlice';

function FileList({ onSelectFile }: { onSelectFile: (fileId: string) => void }) {
  const files = useDesignHubStore((s) => s.files);
  const addFile = useDesignHubStore((s) => s.addFile);
  const deleteFile = useDesignHubStore((s) => s.deleteFile);
  const updateFile = useDesignHubStore((s) => s.updateFile);
  const addNotification = useDesignHubStore((s) => s.addNotification);
  
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  const handleAddFile = () => {
    const newFile: File = {
      id: 'f' + Date.now(),
      name: `Design ${files.length + 1}`,
      content: '',
    };
    addFile(newFile);
    addNotification({
      id: 'n' + Date.now(),
      message: `New file "${newFile.name}" created!`,
      read: false,
    });
  };

  const handleSelectFile = (file: File) => {
    setSelectedFileId(file.id);
    setEditingContent(file.content);
    onSelectFile(file.id);
  };

  const handleUpdateFile = () => {
    if (selectedFileId) {
      updateFile(selectedFileId, editingContent);
      addNotification({
        id: 'n' + Date.now(),
        message: 'File updated successfully!',
        read: false,
      });
    }
  };

  const handleDeleteFile = (fileId: string) => {
    deleteFile(fileId);
    if (selectedFileId === fileId) {
      setSelectedFileId(null);
      setEditingContent('');
    }
    addNotification({
      id: 'n' + Date.now(),
      message: 'File deleted!',
      read: false,
    });
  };

  return (
    <div className="file-list">
      <div className="file-list-header">
        <h2>📁 Design Files</h2>
        <button onClick={handleAddFile} className="add-file-btn">
          + New File
        </button>
      </div>
      
      <div className="files-container">
        <ul className="files">
          {files.map((f) => (
            <li
              key={f.id}
              className={`file-item ${selectedFileId === f.id ? 'active' : ''}`}
            >
              <span onClick={() => handleSelectFile(f)} className="file-name">
                📄 {f.name}
              </span>
              <button
                onClick={() => handleDeleteFile(f.id)}
                className="delete-btn"
                title="Delete file"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        {selectedFileId && (
          <div className="file-editor">
            <h3>Edit Content</h3>
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              placeholder="Enter design content..."
              rows={6}
            />
            <button onClick={handleUpdateFile} className="update-btn">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileList;
