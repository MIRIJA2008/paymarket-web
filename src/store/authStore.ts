import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'merchant' | 'customer';

export interface AuthUser {
  phone: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<AuthUser, 'name' | 'phone'>>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (updates) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...updates } } : state
        ),
    }),
    {
      name: 'paymarket-auth',
    }
  )
);
