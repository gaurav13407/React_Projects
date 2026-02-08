// store/slices/commentSlice.ts
export interface Comment {
  id: string;
  fileId: string;
  author: string;
  text: string;
}

export interface CommentSlice {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

export const createCommentSlice = (set: any, _get: any): CommentSlice => ({
  comments: [],
  addComment: (comment: Comment) => 
    set((state: CommentSlice) => ({ comments: [...state.comments, comment] })),
  deleteComment: (id: string) =>
    set((state: CommentSlice) => ({
      comments: state.comments.filter((c) => c.id !== id),
    })),
});
