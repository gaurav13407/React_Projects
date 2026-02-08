// store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createUserSlice } from './slices/userSlice';
import { createFileSlice } from './slices/fileSlice';
import { createCommentSlice } from './slices/commentSlice';
import { createNotificationsSlice } from './slices/notificationsSlice';
import type { UserSlice } from './slices/userSlice';
import type { FileSlice } from './slices/fileSlice';
import type { CommentSlice } from './slices/commentSlice';
import type { NotificationsSlice } from './slices/notificationsSlice';

type DesignHubStore = UserSlice & FileSlice & CommentSlice & NotificationsSlice;

export const useDesignHubStore = create<DesignHubStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...createUserSlice(set, get),
        ...createFileSlice(set, get),
        ...createCommentSlice(set, get),
        ...createNotificationsSlice(set, get),
      }),
      { name: 'designhub-store' }
    )
  )
);
