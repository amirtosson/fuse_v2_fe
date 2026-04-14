"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';

// 30 minutes = 30 * 60 * 1000 ms
const ACTIVITY_TIMEOUT = 30 * 60 * 1000;

export default function ActivityManager() {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const logout = useUserStore((state) => state.logout);
    const router = useRouter();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        // Clear existing timer
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Only set new timer if user is authenticated
        if (isAuthenticated) {
            timeoutRef.current = setTimeout(() => {
                handleLogout();
            }, ACTIVITY_TIMEOUT);
        }
    };

    const handleLogout = () => {
        console.warn("Session expired due to inactivity. Redirecting to login...");
        logout();
        router.push('/fuse/login');
    };

    useEffect(() => {
        // Events that indicate user activity
        const activityEvents = [
            'mousedown',
            'mousemove',
            'keydown',
            'scroll',
            'touchstart',
            'click'
        ];

        const handleActivity = () => {
            resetTimer();
        };

        // If authenticated, start monitoring
        if (isAuthenticated) {
            resetTimer();
            activityEvents.forEach(event => {
                window.addEventListener(event, handleActivity, { passive: true });
            });
        }

        // Cleanup: remove listeners and clear timeout
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            activityEvents.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [isAuthenticated]);

    return null; // This component doesn't render any UI
}
