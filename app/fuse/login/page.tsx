"use client";

import { useState } from 'react';
import { api } from '@/lib/api';
import { encryptPassword } from '@/lib/crypto';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, error: '', success: false });
    
    const router = useRouter();
    const login = useUserStore((state) => state.login);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setStatus({ loading: true, error: '', success: false });

        try {
            // 1. Fetch Session Key & Session ID
            const sessionRes = await api.get('/session-key');
            if (sessionRes.data.code !== 10000) {
                throw new Error("Failed to retrieve secure session.");
            }
            
            const { session_id, session_key } = sessionRes.data.data;

            // 2. Encrypt Password
            const encryptedPasswordBase64 = encryptPassword(password, session_key);

            // 3. Login
            const loginRes = await api.post('/login', {
                login_name: username,
                user_password: encryptedPasswordBase64,
                session_id: session_id
            });

            if (loginRes.data && loginRes.data.user_id) {
                setStatus({ loading: false, error: '', success: true });
                login(loginRes.data);
                // Dynamically route to dashboard
                router.push('/fuse/dashboard');
            } else {
                throw new Error("Invalid response received from server");
            }
        } catch (err: any) {
            console.error(err);
            setStatus({ 
                loading: false, 
                error: err.response?.data?.message || err.message || 'Login failed',
                success: false
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 font-sans relative transition-colors duration-300">
            <Link href="/fuse" className="absolute top-8 left-8 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors hidden sm:block">
                &larr; Back to FUSE Portal
            </Link>

            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900/80 rounded-3xl shadow-2xl dark:shadow-cyan-900/20 border border-gray-200 dark:border-gray-800 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">FUSE <span className="text-cyan-500">V2</span></h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 tracking-wide">Sign in to your beamline space</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
                        <input 
                            type="text" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-600"
                            placeholder="••••••••"
                        />
                    </div>

                    {status.error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/50 rounded-xl text-red-600 dark:text-red-300 text-sm text-center">
                            {status.error}
                        </div>
                    )}
                    {status.success && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/50 rounded-xl text-emerald-600 dark:text-emerald-300 text-sm text-center font-medium">
                            Successfully Authenticated! Redirecting...
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={status.loading || status.success}
                        className="w-full py-4 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold tracking-wide rounded-xl shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center"
                    >
                        {status.loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : 'Sign In Securely'}
                    </button>
                </form>
            </div>
        </div>
    );
}
