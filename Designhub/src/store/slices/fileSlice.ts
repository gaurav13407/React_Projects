// store/slices/fileSlice.ts
export interface File {
  id: string;
  name: string;
  content: string;
}

export interface FileSlice {
  files: File[];
  addFile: (file: File) => void;
  updateFile: (id: string, content: string) => void;
  deleteFile: (id: string) => void;
}

export const createFileSlice = (set: any, _get: any): FileSlice => ({
  files: [],
  addFile: (file: File) => set((state: FileSlice) => ({ files: [...state.files, file] })),
  updateFile: (id: string, content: string) =>
    set((state: FileSlice) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, content } : f
      ),
    })),
  deleteFile: (id: string) =>
    set((state: FileSlice) => ({
      files: state.files.filter((f) => f.id !== id),
    })),
});
