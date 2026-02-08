// store/slices/notificationsSlice.ts
export interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export interface NotificationsSlice {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const createNotificationsSlice = (set: any, _get: any): NotificationsSlice => ({
  notifications: [],
  addNotification: (notification: Notification) =>
    set((state: NotificationsSlice) => ({
      notifications: [...state.notifications, notification],
    })),
  markAsRead: (id: string) =>
    set((state: NotificationsSlice) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
});
