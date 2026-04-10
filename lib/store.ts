import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    user: any | null;
    isAuthenticated: boolean;
    history: string[];
    theme: 'dark' | 'light' | 'system';
    login: (userData: any) => void;
    logout: () => void;
    addHistoryPath: (path: string) => void;
    setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            history: [],
            theme: 'dark',
            login: (userData) => set({ user: userData, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            addHistoryPath: (path) => set((state) => {
                // Ignore identical consecutive paths or root
                if (state.history[0] === path) return state;
                const newHistory = [path, ...state.history.filter(p => p !== path)].slice(0, 5);
                return { history: newHistory };
            }),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'fuse-auth-storage', // Persistent key in localStorage
        }
    )
);
