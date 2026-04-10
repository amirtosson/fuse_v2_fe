"use client";

import { useUserStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const logout = useUserStore((state) => state.logout);
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (isMounted && !isAuthenticated) {
            router.push('/fuse/login');
        }
    }, [isAuthenticated, isMounted, router]);

    if (!isMounted || !isAuthenticated || !user) {
        return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-cyan-500 font-bold tracking-widest text-sm">LOADING WORKSPACE SECURELY...</div>;
    }

    const handleLogout = () => {
        logout();
        router.push('/fuse');
    }

    const firstName = user.first_name || (user.user && user.user.first_name) || '';
    const lastName = user.last_name || (user.user && user.user.last_name) || '';
    const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'FUSE User';
    const initLeft = firstName ? firstName.charAt(0).toUpperCase() : 'U';
    const initRight = lastName ? lastName.charAt(0).toUpperCase() : '';

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-100 font-sans flex overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex-col hidden md:flex shrink-0">
                <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-widest"><span className="text-cyan-500">FUSE</span> / PORTAL</h1>
                </div>
                <nav className="flex-1 px-4 py-8 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 font-bold border border-cyan-200 dark:border-cyan-500/20 shadow-sm">
                        Overview
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">
                        Reference Datasets
                    </a>
                    <Link href="/fuse/public-datasets" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">
                        Public Data
                    </Link>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">
                        Analytics Hub
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold">
                        Deposit Reference Dataset
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button onClick={handleLogout} className="w-full px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold text-left">
                        Secure Logout (Exit)
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
                <header className="h-20 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
                    <h2 className="text-xl font-bold tracking-wide hidden sm:block text-gray-900 dark:text-white">Workspace Dashboard</h2>
                    <button onClick={handleLogout} className="sm:hidden px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold">Logout</button>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="font-bold text-gray-900 dark:text-white">{displayName}</p>
                            <p className="text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-black">{user.role_name || 'RESEARCHER'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-gray-950 shadow-lg shadow-cyan-500/20 italic">
                            {initLeft}{initRight}
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
                    <div className="mb-10 mt-4">
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 underline decoration-cyan-500/30 decoration-4 underline-offset-8">Welcome back, {firstName || 'User'}!</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mt-4">Here's the latest data aggregation for your working group: <span className="text-cyan-600 dark:text-cyan-400 font-black">{user.working_group || 'General FUSE Platform'}</span></p>
                    </div>

                    {/* Metadata Overview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="p-6 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/50 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                            <h4 className="text-gray-400 dark:text-gray-500 text-xs font-black mb-1 uppercase tracking-widest">Organization</h4>
                            <p className="text-xl font-black text-gray-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{user.user?.organization || 'University of Siegen'}</p>
                        </div>
                        <div className="p-6 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/50 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                            <h4 className="text-gray-400 dark:text-gray-500 text-xs font-black mb-1 uppercase tracking-widest">Department</h4>
                            <p className="text-xl font-black text-gray-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">{user.user?.department || 'Physics & X-Ray Science'}</p>
                        </div>
                        <div className="p-6 bg-cyan-50 dark:bg-gray-900/80 rounded-2xl border border-cyan-200 dark:border-cyan-900/50 shadow-xl shadow-cyan-500/10 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/20 dark:bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                            <h4 className="text-cyan-700 dark:text-cyan-600 text-xs font-black mb-1 uppercase tracking-widest">Authentication Status</h4>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse"></div>
                                <p className="text-xl font-black text-emerald-700 dark:text-emerald-100 truncate">Secure Context</p>
                            </div>
                        </div>
                    </div>

                    {/* Widgets Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                        <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 h-80 flex flex-col relative overflow-hidden group">
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/10 transition-colors"></div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-none">Recent Beamtime Data</h4>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 font-bold text-xs uppercase tracking-wider">Synced from DAPHNE4NFDI primary cluster</p>

                            <div className="flex-1 bg-white/80 dark:bg-gray-950/50 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center relative overflow-hidden shadow-inner">
                                <div className="text-center relative z-10">
                                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-2">14.8 PB</div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">Total Processed Volume</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 h-80 flex flex-col relative overflow-hidden group">
                            <div className="absolute -left-20 top-20 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 blur-[80px] rounded-full group-hover:bg-cyan-500/20 dark:group-hover:bg-cyan-500/10 transition-colors"></div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-none">X-Ray Diffraction Jobs</h4>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 font-bold text-xs uppercase tracking-wider">Live computational node execution</p>

                            <div className="flex-1 bg-white/80 dark:bg-gray-950/50 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-6 pb-2 shadow-inner">
                                {/* Mock UI Chart Effect */}
                                <div className="w-full h-full flex items-end gap-2 px-2 shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
                                    <div className="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-sm h-[30%] relative"><div className="absolute top-0 w-full h-[2px] bg-cyan-400 dark:bg-cyan-600"></div></div>
                                    <div className="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-sm h-[60%] relative animate-[pulse_3s_ease-in-out_infinite]"><div className="absolute top-0 w-full h-[2px] bg-cyan-400 dark:bg-cyan-600"></div></div>
                                    <div className="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-sm h-[40%] relative"><div className="absolute top-0 w-full h-[2px] bg-cyan-400 dark:bg-cyan-600"></div></div>
                                    <div className="w-full bg-cyan-200 dark:bg-cyan-900/50 rounded-t-sm h-[90%] relative"><div className="absolute top-0 w-full h-[2px] bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] dark:shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div></div>
                                    <div className="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-sm h-[75%] relative animate-[pulse_4s_ease-in-out_infinite]"><div className="absolute top-0 w-full h-[2px] bg-cyan-400 dark:bg-cyan-600"></div></div>
                                    <div className="w-full bg-cyan-100 dark:bg-cyan-900/30 rounded-t-sm h-[50%] relative"><div className="absolute top-0 w-full h-[2px] bg-cyan-400 dark:bg-cyan-600"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
