import { create } from 'zustand';

export interface HistoryEntry {
  noteId: string;
  action: 'create' | 'update' | 'delete';
  timestamp: number;
  details?: string;
}

interface HistoryState {
  history: HistoryEntry[];
  addHistoryEntry: (entry: Omit<HistoryEntry, 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addHistoryEntry: (entry: Omit<HistoryEntry, 'timestamp'>) =>
    set((state: HistoryState) => {
      const newEntry: HistoryEntry = {
        ...entry,
        timestamp: Date.now(),
      };
      console.log('[HISTORY STORE] Added entry:', newEntry);
      return {
        history: [...state.history, newEntry],
      };
    }),
  clearHistory: () => {
    console.log('[HISTORY STORE] Cleared history');
    return set({ history: [] });
  },
}));
