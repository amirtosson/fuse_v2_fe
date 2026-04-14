import Link from 'next/link';

const referenceDatasets = [
    {
        id: "REF-SI-2024",
        name: "Standard Silicon Calibration (111)",
        pi: "Dr. K. Schmidt",
        instrument: "Daphne Diffractometer",
        quality: "Gold Standard",
        type: "Reflectivity",
        date: "2024-03-15",
        description: "High-precision reflectivity data for Silicon wafer calibration. Used as the primary benchmark for all X-Ray beamline optics alignment."
    },
    {
        id: "REF-AU-12",
        name: "Gold Nanoparticle Dispersion 12nm",
        pi: "Prof. M. Weber",
        instrument: "SAXS-Hub",
        quality: "Silver Standard",
        type: "SAXS",
        date: "2023-11-20",
        description: "Monodisperse gold nanoparticles in aqueous solution. Ideal for verifying detector linearity and resolution in Small-Angle X-Ray Scattering."
    },
    {
        id: "REF-LYZ-P",
        name: "Lysozyme Protein Crystal Reference",
        pi: "Dr. L. Chen",
        instrument: "Photonics-MX",
        quality: "Research Grade",
        type: "Crystallography",
        date: "2024-01-10",
        description: "Tetragonal Lysozyme crystals used for testing automated crystal centering and diffraction data collection protocols."
    },
    {
        id: "REF-FE-FILM",
        name: "Iron-Cobalt Thin Film (2nm)",
        pi: "Dr. A. Fischer",
        instrument: "FRED",
        quality: "Gold Standard",
        type: "Magnetic XRR",
        date: "2024-02-05",
        description: "Ultra-precise magnetic X-Ray reflectivity measurements for multilayer structure verification. Specifically tuned for spintronics research benchmarks."
    }
];

export default function ReferenceDatasetsPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
            <header className="border-b border-gray-800 bg-gray-900/80 sticky top-0 z-50">
                <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/fuse/dashboard" className="text-gray-400 hover:text-white transition-colors">&larr; Dashboard</Link>
                        <div className="w-[1px] h-6 bg-gray-700"></div>
                        <h1 className="text-xl font-bold tracking-tight text-white tracking-widest"><span className="text-emerald-400">FUSE</span> / REFERENCE DATASETS</h1>
                    </div>
                </div>
            </header>
            
            <main className="flex-1 max-w-[90rem] mx-auto px-6 py-12 w-full">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-white mb-4">Benchmark Library</h2>
                    <p className="text-gray-400 text-lg max-w-3xl">Curated calibration sets and "Gold Standard" datasets used for instrument verification and comparative scientific analysis within the FUSE platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {referenceDatasets.map((ds) => (
                        <div key={ds.id} className="group relative bg-gray-900/40 border border-gray-800 hover:border-emerald-500/50 rounded-3xl p-8 transition-all shadow-2xl hover:shadow-emerald-900/20 active:scale-[0.99] overflow-hidden">
                            {/* Accent Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
                            
                            <div className="flex items-start justify-between mb-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                    ds.quality === 'Gold Standard' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 
                                    ds.quality === 'Silver Standard' ? 'bg-slate-400/10 border-slate-400 text-slate-300' : 
                                    'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                                }`}>
                                    {ds.quality}
                                </span>
                                <span className="text-gray-600 font-mono text-xs">{ds.id}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{ds.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">{ds.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Instrument</p>
                                    <p className="text-sm text-emerald-100 font-bold truncate">{ds.instrument}</p>
                                </div>
                                <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Technique</p>
                                    <p className="text-sm text-cyan-100 font-bold truncate">{ds.type}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                                        {ds.pi.split(' ').pop()?.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-gray-200">{ds.pi}</p>
                                        <p className="text-[10px] text-gray-500 font-medium">Principal Investigator</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                     <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-gray-950 rounded-lg text-xs font-bold transition-all border border-emerald-500/20">
                                         Preview
                                     </button>
                                     <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-bold transition-all">
                                         Download
                                     </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
