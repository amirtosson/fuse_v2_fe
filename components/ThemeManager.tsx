"use client";

import { useEffect } from 'react';
import { useUserStore } from '@/lib/store';

export default function ThemeManager() {
    const theme = useUserStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.remove('light', 'dark');
            root.classList.add(systemTheme);
        } else {
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
        }
    }, [theme]);

    return null;
}
