import { useQuery } from '@tanstack/react-query';
import { useNoteStore } from '../stores/noteStore';
import { useHistoryStore } from '../stores/historyStore';
import { fetchNotesFromAPI, addNoteToAPI } from '../api/apiClient';
import { useState } from 'react';
import * as React from 'react';

export function NotesList() {
  const setNotes = useNoteStore((s) => s.setNotes);
  const notes = useNoteStore((s) => s.notes);
  const addNote = useNoteStore((s) => s.addNote);
  const updateNote = useNoteStore((s) => s.updateNote);
  const deleteNote = useNoteStore((s) => s.deleteNote);
  const addHistoryEntry = useHistoryStore((s) => s.addHistoryEntry);

  const [newNoteText, setNewNoteText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const { isLoading, data: fetchedNotes } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotesFromAPI,
    refetchInterval: 5000,
  });

  React.useEffect(() => {
    if (fetchedNotes) {
      setNotes(fetchedNotes);
    }
  }, [fetchedNotes, setNotes]);

  const handleAddNote = async () => {
    if (!newNoteText.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      text: newNoteText,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addNote(newNote);
    addHistoryEntry({
      noteId: newNote.id,
      action: 'create',
      details: 'Note created',
    });
    await addNoteToAPI(newNote);
    setNewNoteText('');
  };

  const handleUpdateNote = async (id: string) => {
    updateNote(id, editText);
    addHistoryEntry({
      noteId: id,
      action: 'update',
      details: `Updated to: ${editText}`,
    });
    setEditingId(null);
    setEditText('');
  };

  const handleDeleteNote = async (id: string) => {
    deleteNote(id);
    addHistoryEntry({
      noteId: id,
      action: 'delete',
      details: 'Note deleted',
    });
  };

  if (isLoading) return <div>Loading notes...</div>;

  return (
    <div className="notes-container">
      <h2>Notes</h2>
      
      <div className="add-note">
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Add a new note..."
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => handleUpdateNote(note.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{note.text}</span>
                <button onClick={() => {
                  setEditingId(note.id);
                  setEditText(note.text);
                }}>Edit</button>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
