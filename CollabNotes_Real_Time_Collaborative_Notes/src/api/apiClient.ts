import type { Note } from '../stores/noteStore';
import type { Collaborator } from '../stores/collaboratorStore';

// Mock data
const mockNotes: Note[] = [
  {
    id: '1',
    text: 'Welcome to CollabNotes',
    createdAt: Date.now() - 100000,
    updatedAt: Date.now() - 100000,
  },
  {
    id: '2',
    text: 'Real-time collaboration feature',
    createdAt: Date.now() - 50000,
    updatedAt: Date.now() - 50000,
  },
];

const mockCollaborators: Collaborator[] = [
  {
    id: 'user1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    lastSeen: Date.now(),
  },
  {
    id: 'user2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    lastSeen: Date.now() - 5000,
  },
  {
    id: 'user3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    lastSeen: Date.now() - 15000,
  },
];

export const fetchNotesFromAPI = async (): Promise<Note[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched notes from API');
      resolve(mockNotes);
    }, 500);
  });
};

export const fetchCollaboratorsFromAPI = async (): Promise<Collaborator[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched collaborators from API');
      resolve(mockCollaborators);
    }, 500);
  });
};

export const addNoteToAPI = async (note: Note): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Added note to API:', note);
      resolve(note);
    }, 300);
  });
};

export const updateNoteInAPI = async (
  id: string,
  text: string
): Promise<Note> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const note: Note = {
        id,
        text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      console.log('Updated note in API:', note);
      resolve(note);
    }, 300);
  });
};

export const deleteNoteFromAPI = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Deleted note from API:', id);
      resolve();
    }, 300);
  });
};
