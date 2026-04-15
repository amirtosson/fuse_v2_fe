import Image from 'next/image';
import Link from 'next/link';

export default function SiegenXrayPlatform() {
    return (
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 selection:bg-cyan-500 selection:text-white">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-lg text-gray-900">
                            UoS
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">University of Siegen <span className="text-cyan-400">X-Ray Science</span></h1>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
                        Next-Generation X-Ray Physics Platform
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Explore our world-class synchrotron and laser facilities. We are pioneering the cutting-edge of materials science, photonics, and large-scale federated data architectures.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* FASTER */}
                    <Link href="/faster" className="group rounded-3xl overflow-hidden border border-gray-800 bg-gray-900 hover:border-purple-500/50 transition-all cursor-pointer shadow-2xl hover:shadow-purple-900/20 flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                            <Image 
                                src="/images/faster.png" 
                                alt="FASTER Project" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">FASTER</h3>
                            <p className="text-gray-400 flex-1">Autonomous and unsupervised experiments accelerating materials discovery and data analysis.</p>
                            <div className="mt-6 flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                                Explore Project &rarr;
                            </div>
                        </div>
                    </Link>

                    {/* Photonics */}
                    <div className="group rounded-3xl overflow-hidden border border-gray-800 bg-gray-900 hover:border-gray-600 transition-all cursor-pointer shadow-2xl hover:shadow-red-900/20 flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                            <Image 
                                src="/images/photonics.png" 
                                alt="Photonics Lab" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-3 text-white">Photonics</h3>
                            <p className="text-gray-400 flex-1">Exploring the fundamental nature of light, lasers, and quantum optical phenomena.</p>
                            <div className="mt-6 flex items-center text-red-400 font-medium group-hover:text-red-300 transition-colors">
                                Explore Project &rarr;
                            </div>
                        </div>
                    </div>

                    {/* DAPHNE4NFDI / FUSE */}
                    <Link href="/fuse" className="group rounded-3xl overflow-hidden border border-gray-700 bg-gray-800/80 hover:border-cyan-500 transition-all cursor-pointer shadow-2xl hover:shadow-cyan-900/40 relative flex flex-col ring-1 ring-cyan-500/20">
                        <div className="absolute top-4 right-4 bg-cyan-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full z-20 shadow-lg">Featured</div>
                        <div className="aspect-video relative overflow-hidden">
                            <Image 
                                src="/images/daphne.png" 
                                alt="DAPHNE4NFDI Platform" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
                        </div>
                        <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">DAPHNE4NFDI (FUSE)</h3>
                            <p className="text-gray-400 flex-1">Massive federated data portal for managing X-Ray physics experiments seamlessly.</p>
                            <div className="mt-6 flex items-center text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors">
                                Access Portal &rarr;
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
