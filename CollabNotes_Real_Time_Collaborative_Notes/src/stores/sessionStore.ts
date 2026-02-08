import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SessionState {
  userId: string;
  token: string;
  role: 'admin' | 'user';
  expiresAt: number;
  setSession: (userId: string, token: string, expiresAt: number) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: '',
      token: '',
      role: 'user',
      expiresAt: 0,
      setSession: (userId: string, token: string, expiresAt: number) =>
        set({
          userId,
          token,
          expiresAt,
        }),
      logout: () =>
        set({
          userId: '',
          token: '',
          role: 'user',
          expiresAt: 0,
        }),
    }),
    {
      name: 'collabnotes-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        userId: state.userId,
        token: state.token,
        role: state.role,
      }),
      version: 2,
      migrate: (persisted: any, version: number) => {
        if (version < 2) {
          return { ...persisted, role: 'user' };
        }
        return persisted as SessionState;
      },
    }
  )
);
