"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function FasterProjectPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-purple-500 selection:text-white pb-20 transition-colors duration-300">
            {/* Navigation / Header */}
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-50 transition-colors">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all">
                                &larr;
                            </div>
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Back to Home</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-4 w-px bg-gray-800"></div>
                        <h1 className="text-sm font-bold tracking-widest text-purple-400">FASTER PROJECT</h1>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold mb-8 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        ERUM-DATA PROGRAM
                    </div>
                    
                    <h2 className="text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-gray-100 dark:to-gray-500 transition-all">
                        Autonomous Experiments & <br/>
                        <span className="text-purple-600 dark:text-purple-400 italic">Fast Data Pipelines</span>
                    </h2>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12">
                        Unlocking the potential of synchrotron radiation and neutron science through autonomous control systems, intelligent decision-making, and FPGA-based hardware acceleration.
                    </p>

                    <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 relative aspect-[21/9] shadow-2xl">
                        <Image 
                            src="/images/faster.png" 
                            alt="FASTER Closed Loop Architecture"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <span className="text-gray-900 dark:text-white font-bold bg-white/80 dark:bg-gray-900/80 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700">Closed-Loop Autonomous Experimentation</span>
                            <span className="text-gray-400 dark:text-gray-500 text-sm italic">Inspired by [Noack2019]</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 font-bold text-xl">01</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Autonomous Workflows</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Self-adjusting parameters based on rapid, automated data analysis. Overcoming the limits of traditional manual control systems for complex phase diagram exploration.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 font-bold text-xl">02</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Fast Feedback Loop</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Real-time data pipelines for automatic background subtraction, noise reduction, and beam damage detection linked directly to end-station control systems.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 font-bold text-xl">03</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Intelligent Optimization</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Implementing Bayesian optimization and reinforcement learning to navigate multi-dimensional experimental landscapes and maximize data quality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Technical Implementation */}
            <section className="bg-gray-50 dark:bg-gray-900/30 border-y border-gray-200 dark:border-gray-800 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-5xl font-extrabold mb-8 tracking-tighter">Hardware-Accelerated <br/><span className="text-purple-400">Computational Pipelines</span></h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0 mt-1">
                                        &check;
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">FPGA Hardware Acceleration</h4>
                                        <p className="text-gray-400 leading-relaxed">Meeting real-time feedback demands where conventional CPU or ML algorithms are too slow. AI accelerators integrated directly into hardware.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0 mt-1">
                                        &check;
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">Multi-Tau Correlation</h4>
                                        <p className="text-gray-400 leading-relaxed">Running computationally intensive analyses directly on chip to enable low-latency inference for XPCS and other high-volume use cases.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold shrink-0 mt-1">
                                        &check;
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">Unified Control Frameworks</h4>
                                        <p className="text-gray-400 leading-relaxed">Integration into established beamline environments like BLISS and Sardana to ensure modularity and transferability across research facilities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4">
                                <span className="text-indigo-600 dark:text-indigo-400 font-black text-3xl">P08</span>
                                <h5 className="font-bold text-gray-900 dark:text-white">PETRA III, DESY</h5>
                                <p className="text-sm text-gray-500">X-ray Photon Correlation Spectroscopy focus.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4 translate-y-8">
                                <span className="text-purple-600 dark:text-purple-400 font-black text-3xl">P10</span>
                                <h5 className="font-bold text-gray-900 dark:text-white">PETRA III, DESY</h5>
                                <p className="text-sm text-gray-500">X-ray and Neutron reflectivity exploration.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4">
                                <span className="text-cyan-600 dark:text-cyan-400 font-black text-3xl">RS</span>
                                <h5 className="font-bold text-gray-900 dark:text-white">REFSANS, MLZ</h5>
                                <p className="text-sm text-gray-500">Time-resolved Reciprocal Space Mapping (TR-RSM).</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4 translate-y-8">
                                <span className="text-orange-600 dark:text-orange-400 font-black text-3xl">+</span>
                                <h5 className="font-bold text-gray-900 dark:text-white">Transferability</h5>
                                <p className="text-sm text-gray-500">Designing solutions for global synchrotron applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Alignment */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-extrabold tracking-tighter mb-4">Strategic Impact & <span className="text-purple-400 italic">Funding Goals</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Our project aligns with the key funding policy goals for large-scale research infrastructures.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "Accelerating materials discovery via high-throughput screening.",
                        "Optimizing beamtime efficiency at large-scale infrastructures.",
                        "Enhancing data quality through reduced bias and real-time noise reduction.",
                        "Building cross-disciplinary bridges between Physics, Electrical Engineering, and AI.",
                        "Enabling non-expert and industrial user access through standardized workflows.",
                        "Continuous refinement via curated Machine Learning datasets and the ErUM-Data Hub."
                    ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-gray-100 dark:bg-gray-900/20 p-6 rounded-2xl border border-gray-200 dark:border-gray-800/50">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Collaboration Section */}
            <section className="max-w-4xl mx-auto px-6 py-20 bg-gradient-to-br from-indigo-100 dark:from-indigo-900/10 to-transparent rounded-[4rem] border border-gray-200 dark:border-gray-800 mb-20">
                <div className="text-center">
                    <h3 className="text-3xl font-bold mb-6">Interdisciplinary Consortium</h3>
                    <p className="text-gray-400 leading-relaxed mb-10">
                        Our consortium brings together world-class experts from synchrotron and neutron science, accelerator technology, electrical engineering, and industry leaders to pioneer a new era of autonomous experimentation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Placeholders for partner logos */}
                        <div className="font-black text-2xl tracking-tighter">UoS</div>
                        <div className="font-black text-2xl tracking-tighter">DESY</div>
                        <div className="font-black text-2xl tracking-tighter">MLZ</div>
                        <div className="font-black text-2xl tracking-tighter">DAPHNE</div>
                        <div className="font-black text-2xl tracking-tighter">DIG-UM</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
