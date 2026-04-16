"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/lib/store';

const StatusIndicator = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { history, theme, setTheme } = useUserStore();
  const env = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'DEVELOPMENT' : 'PRODUCTION';

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  const navMap: Record<string, string> = {
    '/': 'Landing',
    '/fuse': 'FUSE Portal',
    '/fuse/login': 'Authentication',
    '/fuse/dashboard': 'Dashboard',
    '/fuse/public-datasets': 'Registry',
    '/fuse/deposit': 'Deposit',
    '/fuse/faster': 'FASTER',
    '/fuse/photonics': 'Photonics',
    '/fuse/daphne': 'Daphne',
    '/fuse/reference-datasets': 'Reference Data',

  };

  const getNavLabel = (path: string) => {
    if (navMap[path]) return navMap[path];
    if (path.startsWith('/fuse/public-datasets/')) return 'Data Detail';
    return path;
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 transition-colors duration-300">
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-2 w-72 bg-white/90 dark:bg-gray-900/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-[10px] font-black text-gray-400 dark:text-white/40 tracking-[0.3em] uppercase">Control Center</h4>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">SECURE</span>
            </div>
          </div>

          {/* Navigation History */}
          <div className="mb-8">
            <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">Session History</p>
            <div className="flex flex-wrap gap-2">
              {history.length > 0 ? history.slice(0, 5).map((path, i) => (
                <Link
                  key={i}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-gray-600 dark:text-gray-300 transition-all hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  {getNavLabel(path)}
                </Link>
              )) : (
                <span className="text-[10px] text-gray-400 italic">No history yet...</span>
              )}
            </div>
          </div>

          {/* Appearance */}
          <div className="mb-8">
            <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-widest">Appearance</p>
            <div className="grid grid-cols-3 gap-2">
              {(['dark', 'light', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-2 py-2 rounded-xl text-[10px] font-black capitalize transition-all border ${theme === t
                      ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-gray-950 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-white/5 hover:border-cyan-500/30'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full px-5 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Return to Landing Page
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-4 px-5 py-3 bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl transition-all hover:bg-white/90 dark:hover:bg-gray-800/60 hover:scale-105 active:scale-95 overflow-hidden"
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Animated Status Dot */}
        <div className="relative flex items-center justify-center w-3 h-3">
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-40" />
          <div className="relative w-full h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>

        {/* Labels */}
        <div className="flex flex-col items-start leading-none gap-1">
          <span className="text-[10px] font-black text-gray-400 dark:text-white/40 tracking-[0.2em] uppercase">System</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-gray-900 dark:text-white tracking-[0.05em] uppercase">{isOpen ? 'SETTINGS' : 'SECURED'}</span>
            <span className="text-[9px] font-black text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 px-2 py-0.5 rounded-lg border border-cyan-100 dark:border-cyan-500/20">
              {env}
            </span>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute -left-full top-0 w-1/2 h-full skew-x-[30deg] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
      </button>
    </div>
  );
};

export default StatusIndicator;
