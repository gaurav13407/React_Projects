// store/slices/userSlice.ts
export interface UserSlice {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string }) => void;
  clearUser: () => void;
}

export const createUserSlice = (set: any, _get: any): UserSlice => ({
  user: null,
  setUser: (user: { id: string; name: string }) => set({ user }),
  clearUser: () => set({ user: null }),
});
