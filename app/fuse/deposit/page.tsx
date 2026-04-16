"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function DepositPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        pi: '',
        instrument: '',
        technique: '',
        abstract: '',
        doi: '',
        quality: 'Research Grade'
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const isStep1Valid = formData.title && formData.pi && formData.instrument;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50 backdrop-blur-md">
                <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/fuse/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-bold">&larr; Dashboard</Link>
                        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700"></div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white tracking-widest"><span className="text-emerald-500">FUSE</span> / DEPOSIT PORTAL</h1>
                    </div>
                </div>
            </header>
            
            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Submit Reference Data</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Contribute high-quality experimental benchmarks to the FUSE Reference Library. Your submission will undergo peer validation before being tagged as a "Gold Standard".</p>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-4 flex-1 last:flex-none">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                                step === s ? 'bg-emerald-500 border-emerald-500 text-gray-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 
                                step > s ? 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400' : 
                                'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600'
                            }`}>
                                {s}
                            </div>
                            {s < 3 && <div className={`h-[2px] flex-1 rounded-full ${step > s ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'}`}></div>}
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none rounded-full"></div>
                    
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                Step 1: Core Metadata
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Dataset Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                                        placeholder="e.g. Silicon Calibration Standard 2024"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Principal Investigator</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                                        placeholder="Full Name"
                                        value={formData.pi}
                                        onChange={(e) => setFormData({...formData, pi: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Target Instrument</label>
                                    <select 
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all"
                                        value={formData.instrument}
                                        onChange={(e) => setFormData({...formData, instrument: e.target.value})}
                                    >
                                        <option value="">Select Instrument...</option>
                                        <option value="DAPHNE">DAPHNE (XRR/XRD)</option>
                                        <option value="FRED">FRED (Magnetic X-Ray)</option>
                                        <option value="SAXS-HUB">SAXS-Hub</option>
                                        <option value="PHOTONICS">Photonics-MX</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Scientific Technique</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                                        placeholder="e.g. Grazing Incidence Scattering"
                                        value={formData.technique}
                                        onChange={(e) => setFormData({...formData, technique: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="pt-8 flex justify-end">
                                <button 
                                    disabled={!isStep1Valid}
                                    onClick={handleNext}
                                    className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-gray-950 font-black rounded-xl transition-all shadow-xl shadow-emerald-500/20 dark:shadow-emerald-950/20 active:scale-95 uppercase tracking-widest text-xs"
                                >
                                    Continue to Details
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                Step 2: Technical Description
                            </h3>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Abstract / Description</label>
                                <textarea 
                                    rows={5}
                                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                                    placeholder="Provide detailed information about the sample, environment, and collection parameters..."
                                    value={formData.abstract}
                                    onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Optional DOI</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600" 
                                        placeholder="10.xxxx/xxxxx"
                                        value={formData.doi}
                                        onChange={(e) => setFormData({...formData, doi: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Claimed Quality</label>
                                    <select 
                                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        value={formData.quality}
                                        onChange={(e) => setFormData({...formData, quality: e.target.value})}
                                    >
                                        <option value="Research Grade">Research Grade (Standard Verification)</option>
                                        <option value="Silver Standard">Silver Standard (Peer Reviewed)</option>
                                        <option value="Gold Standard">Gold Standard (Absolute Benchmark)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-8 flex justify-between">
                                <button onClick={handleBack} className="px-10 py-4 text-gray-500 dark:text-gray-400 font-bold hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest text-xs">
                                    Go Back
                                </button>
                                <button 
                                    onClick={handleNext}
                                    className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black rounded-xl transition-all shadow-xl shadow-emerald-950/20 active:scale-95 uppercase tracking-widest text-xs"
                                >
                                    Proceed to Upload
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                             <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                             </div>
                             <h3 className="text-2xl font-black text-gray-900 dark:text-white">Initializing Secure Transfer...</h3>
                             <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Please wait while we establish an encrypted bridge to the primary DAPHNE data cluster for your files.</p>
                             
                             <div className="pt-12 flex justify-center">
                                <button 
                                    onClick={() => alert('Secure Upload Initiated - FUSE Core Bridge connected.')}
                                    className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-gray-950 font-black rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95 uppercase tracking-widest text-sm"
                                >
                                    Authorize File Picker
                                </button>
                             </div>
                             <button onClick={handleBack} className="mt-8 px-10 py-4 text-gray-600 text-xs font-bold hover:text-gray-400">Cancel & Return</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
