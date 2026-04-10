import Link from 'next/link';
import Image from 'next/image';

export default function FuseLandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-950 dark:text-gray-100 flex flex-col transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
                    <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">&larr; Main Portal</Link>
                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700"></div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white tracking-widest"><span className="text-cyan-500">DAPHNE4NFDI</span> / FUSE</h1>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-sm font-bold tracking-widest mb-6 uppercase">F.U.S.E. ENVIRONMENT</div>
                    <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter text-gray-900 dark:text-white">
                        Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">Beamline Data.</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                        FUSE provides secure, federated access to metadata, large-scale X-Ray datasets, and analytics pipelines. Authenticate below to access your workspace.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/fuse/login" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all text-center">
                            Sign In Securely
                        </Link>
                        <Link href="/fuse/signup" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-xl active:scale-95 transition-all text-center">
                            Request Access
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/20 blur-[100px] rounded-full"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl shadow-cyan-900/10 dark:shadow-cyan-900/50 aspect-square">
                        <Image src="/images/daphne.png" alt="FUSE Interface" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/80 dark:from-gray-900/80 via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
