"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store';

export default function HistoryManager() {
    const pathname = usePathname();
    const addHistoryPath = useUserStore((state) => state.addHistoryPath);

    useEffect(() => {
        if (pathname) {
            addHistoryPath(pathname);
        }
    }, [pathname, addHistoryPath]);

    return null; // This component doesn't render anything
}
