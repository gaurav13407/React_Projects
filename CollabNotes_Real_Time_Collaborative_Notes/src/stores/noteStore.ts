import { create } from 'zustand';

export interface Note {
  id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

interface NoteState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  addNote: (note: Note) =>
    set((state: NoteState) => {
      console.log('[NOTE STORE] Adding note:', note);
      return {
        notes: [...state.notes, note],
      };
    }),
  updateNote: (id: string, text: string) =>
    set((state: NoteState) => {
      console.log('[NOTE STORE] Updating note:', id, text);
      return {
        notes: state.notes.map((n) =>
          n.id === id ? { ...n, text, updatedAt: Date.now() } : n
        ),
      };
    }),
  deleteNote: (id: string) =>
    set((state: NoteState) => {
      console.log('[NOTE STORE] Deleting note:', id);
      return {
        notes: state.notes.filter((n) => n.id !== id),
      };
    }),
  setNotes: (notes: Note[]) =>
    set({ notes }),
}));
