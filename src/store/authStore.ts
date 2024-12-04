import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      login: (email: string, password: string) => {
        const users = get().users;
        const userExists = users.find(
          (u) => u.email === email && localStorage.getItem(`password_${email}`) === password
        );
        
        if (userExists) {
          set({ user: userExists });
          return true;
        }
        return false;
      },
      signup: (email: string, password: string, name: string) => {
        const users = get().users;
        if (users.some((u) => u.email === email)) {
          return false;
        }
        
        const newUser = { email, name };
        localStorage.setItem(`password_${email}`, password);
        set({ users: [...users, newUser], user: newUser });
        return true;
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);