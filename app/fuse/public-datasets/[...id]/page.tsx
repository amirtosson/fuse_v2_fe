import Link from 'next/link';

async function getDataset(pid: string) {
    // Note: pid already contains slashes like 'public-data/...'
    // We encode it to pass as a single path segment in the URL
    const encodedPid = encodeURIComponent(pid);
    const url = `https://public-data.desy.de/api/v3/datasets/${encodedPid}`;
    
    const res = await fetch(url, { 
        method: 'GET',
        headers: { 
            'accept': 'application/json' 
        },
        cache: 'no-store' 
    });
    
    if (!res.ok) {
        throw new Error(`Failed to fetch dataset: ${res.statusText}`);
    }
    
    return await res.json();
}

// Next.js 15 requires params to be Promise
export default async function DatasetDetail({ params }: { params: Promise<{ id: string[] }> }) {
    
    const resolvedParams = await params;
    // Decode the catch-all ID which might be split by slashes like ['undefined', '3350eb5e...']
    const fullId = resolvedParams.id.map(decodeURIComponent).join('/');
    
    let dataset = null;
    let error = null;
    try {
        dataset = await getDataset(fullId);
        if (!dataset) {
            error = "Dataset payload dynamically requested from /fullquery did not return a valid match.";
        }
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-100 font-sans flex flex-col transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
                    <Link href="/fuse/public-datasets" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-bold">&larr; Published Data Registry</Link>
                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700"></div>
                    <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white tracking-widest truncate max-w-md hidden sm:block uppercase">
                        <span className="text-cyan-500">FULLQUERY</span> / VIEW
                    </h1>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
                {error ? (
                    <div className="p-12 text-center border border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 rounded-[3rem] shadow-xl">
                        <h2 className="text-3xl text-red-600 dark:text-red-400 font-black mb-4 uppercase tracking-tighter">Error Retrieving Payload</h2>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">{error}</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Title Hero */}
                        <div>
                            <div className="inline-flex px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-black tracking-widest mb-8 rounded-full uppercase shadow-sm animate-pulse">
                                SCHEMA: {dataset.type || 'RAW'}
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 leading-[1.1] mb-10 tracking-tighter">
                                {dataset.datasetName}
                            </h2>
                            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-inner">
                                <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div> P.I. : <span className="text-gray-900 dark:text-white">{dataset.principalInvestigator || dataset.owner}</span></span>
                                
                                <span>Created: <span className="text-gray-900 dark:text-white ml-2">{new Date(dataset.creationTime).toLocaleDateString()}</span></span>
                                
                                <span className="bg-white dark:bg-gray-950 px-4 py-2 rounded-xl font-mono text-cyan-600 dark:text-cyan-500 border border-gray-200 dark:border-cyan-900/50 shadow-sm">{dataset.pid}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="p-10 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                            <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent left-0"></div>
                            <h3 className="text-xs font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.3em] mb-6">Sample Description Overview</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium tracking-tight italic">
                                "{dataset.scientificMetadata?.Sample?.description || dataset.description || 'No detailed sample abstract or description explicitly stated in the payload structure.'}"
                            </p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Equipment Card */}
                            <div className="p-8 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl space-y-5">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-8 border-b border-gray-100 dark:border-gray-800 pb-5">Equipment & Environment</h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Target Instrument</span>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold tracking-widest text-sm">{dataset.scientificMetadata?.Experiment?.instrument || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Probe Entity</span>
                                    <span className="text-gray-900 dark:text-gray-200 font-black uppercase text-sm">{dataset.scientificMetadata?.Experiment?.probe || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest shrink-0">Processing Facility</span>
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-black truncate max-w-full sm:max-w-[70%] sm:text-right uppercase tracking-tight">{dataset.scientificMetadata?.Experiment?.facility || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest shrink-0">Location Node</span>
                                    <span className="text-gray-400 text-[10px] font-bold truncate max-w-full sm:max-w-[70%] sm:text-right font-mono italic">{dataset.creationLocation || 'N/A'}</span>
                                </div>
                            </div>
                            
                            {/* Sample Card */}
                            <div className="p-8 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl space-y-5">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-8 border-b border-gray-100 dark:border-gray-800 pb-5">Scientific Sample Struct.</h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest shrink-0">Sample Exact Name</span>
                                    <span className="text-cyan-600 dark:text-cyan-400 font-black truncate max-w-full sm:max-w-[70%] sm:text-right uppercase tracking-tight">{dataset.scientificMetadata?.Sample?.name || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Taxonomy Category</span>
                                    <span className="text-gray-900 dark:text-gray-200 font-black uppercase tracking-widest text-sm">{dataset.scientificMetadata?.Sample?.category || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-start text-right bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-4 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest shrink-0 text-left">Composition Breakdown</span>
                                    <span className="text-gray-600 dark:text-gray-300 font-mono text-[11px] max-w-full break-words italic">{dataset.scientificMetadata?.Sample?.composition || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner">
                                    <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest">Total Associated Files</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 font-black text-3xl italic">{dataset.numberOfFiles || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 rounded-[2rem] gap-6 shadow-xl">
                            <div className="text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-4">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                                Registry Lifecycle: {dataset.isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                Technical Contact Email Node: <span className="text-cyan-600 dark:text-cyan-300 italic lowercase font-bold ml-2 underline decoration-cyan-500/30">{dataset.contactEmail || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
