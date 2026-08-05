import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: number;
}

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: () => number;
  addNotification: (n: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      unreadCount: () => get().notifications.filter((n) => !n.read).length,

      addNotification: (n) =>
        set((state) => ({
          notifications: [
            {
              ...n,
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              read: false,
              createdAt: Date.now(),
            },
            ...state.notifications,
          ].slice(0, 50), // on garde les 50 dernières seulement
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: 'paymarket-notifications',
    }
  )
);
