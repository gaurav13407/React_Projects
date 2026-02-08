import { create } from 'zustand';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastSeen?: number;
}

interface CollaboratorState {
  collaborators: Collaborator[];
  setCollaborators: (collaborators: Collaborator[]) => void;
  addCollaborator: (collaborator: Collaborator) => void;
  removeCollaborator: (id: string) => void;
}

export const useCollaboratorStore = create<CollaboratorState>((set) => ({
  collaborators: [],
  setCollaborators: (collaborators) => set({ collaborators }),
  addCollaborator: (collaborator) =>
    set((state) => ({
      collaborators: [...state.collaborators, collaborator],
    })),
  removeCollaborator: (id) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.id !== id),
    })),
}));
