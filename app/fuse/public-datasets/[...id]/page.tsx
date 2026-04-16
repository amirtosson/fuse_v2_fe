import Link from 'next/link';
import { api } from '@/lib/api';

async function getDataset(pid: string, facility: string) {
    if (!facility) throw new Error("Missing facility information for PID resolution.");

    try {
        const res = await api.get(`/datasets/public/${encodeURIComponent(pid)}`, {
            params: { facility }
        });
        return res.data?.data || null;
    } catch (e: any) {
        throw new Error(e.response?.data?.message || e.message);
    }
}

// Next.js 15 requires params & searchParams to be Promise
export default async function DatasetDetail({ 
    params, 
    searchParams 
}: { 
    params: Promise<{ id: string[] }>,
    searchParams: Promise<{ [key: string]: string }>
}) {
    
    const resolvedParams = await params;
    const resolvedSearch = await searchParams;
    const facility = resolvedSearch.facility;

    // Decode the catch-all ID which might be split by slashes
    const fullId = resolvedParams.id.map(decodeURIComponent).join('/');
    
    let dataset = null;
    let error = null;
    try {
        dataset = await getDataset(fullId, facility);
        if (!dataset) {
            error = "Dataset payload dynamically requested from integrated aggregator did not return a valid match.";
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
                        <span className="text-cyan-500">{facility || 'N/A'}</span> / DETAIL VIEW
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
                            <div className="inline-flex px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-black tracking-widest mb-8 rounded-full uppercase shadow-sm">
                                SOURCE: {facility} Node &bull; {dataset.type || 'RAW'}
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-gray-700 to-gray-500 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 leading-[1.1] mb-6 tracking-tighter">
                                {dataset.datasetName}
                            </h2>

                            {/* Keywords Support */}
                            {dataset.keywords && dataset.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {dataset.keywords.map((kw: string, i: number) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                                            #{kw.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-inner">
                                <span className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div> 
                                    P.I. : <span className="text-gray-900 dark:text-white">
                                        {Array.isArray(dataset.principalInvestigators) ? dataset.principalInvestigators.join(', ') : (dataset.principalInvestigator || dataset.owner)}
                                    </span>
                                </span>
                                
                                <span>Created: <span className="text-gray-900 dark:text-white ml-2">{new Date(dataset.creationTime).toLocaleDateString()}</span></span>
                                
                                <span className="bg-white dark:bg-gray-950 px-4 py-2 rounded-xl font-mono text-cyan-600 dark:text-cyan-500 border border-gray-200 dark:border-cyan-900/50 shadow-sm">{dataset.pid}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="p-10 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                            <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent left-0"></div>
                            <h3 className="text-xs font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.3em] mb-6">Scientific Description Overview</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl font-medium tracking-tight italic">
                                "{dataset.description || dataset.scientificMetadata?.Sample?.description || dataset.scientificMetadata?.sample_description || 'No detailed scientific abstract or description explicitly stated in the source payload.'}"
                            </p>
                        </div>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Smart Metadata Renderered (ESS or General) */}
                            <div className="p-8 bg-white dark:bg-gray-900/50 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl space-y-5 md:col-span-2">
                                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-8 border-b border-gray-100 dark:border-gray-800 pb-5">Scientific Metadata Breakdown</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(dataset.scientificMetadata || {}).map(([key, val]: [string, any]) => {
                                        const resolveDetailVal = (v: any) => {
                                            if (v === undefined || v === null || v === "" || v === "-") return 'Not Defined';
                                            if (typeof v === 'object') {
                                                if (v.value !== undefined) return `${v.value} ${v.unit || ''}`.trim();
                                                // Handle complex objects gracefully
                                                return v.title || v.name || v.instrument || JSON.stringify(v).substring(0, 80) + '...';
                                            }
                                            return String(v);
                                        };

                                        // Detect ESS style nested metadata
                                        const isNested = val && typeof val === 'object' && val.value !== undefined;
                                        const label = isNested ? (val.human_name || key) : key;
                                        const displayVal = resolveDetailVal(val);

                                        return (
                                            <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 gap-2 shadow-inner group hover:border-cyan-500/20 transition-all">
                                                <span className="text-gray-500 dark:text-gray-400 font-black text-[10px] uppercase tracking-widest shrink-0">{label}</span>
                                                <span className="text-gray-950 dark:text-gray-200 font-bold truncate max-w-full sm:max-w-[70%] sm:text-right text-sm">
                                                    {displayVal}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {(!dataset.scientificMetadata || Object.keys(dataset.scientificMetadata).length === 0) && (
                                        <div className="col-span-2 py-8 text-center text-gray-500 font-black uppercase text-[10px] tracking-widest opacity-50">
                                            No additional scientific metadata fields found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 rounded-[2rem] gap-6 shadow-xl">
                            <div className="text-emerald-700 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-4">
                                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                                Facility Source: {facility} Node (Status: Verified)
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                Data Contact Node: <span className="text-cyan-600 dark:text-cyan-300 italic lowercase font-bold ml-2 underline decoration-cyan-500/30">{dataset.contactEmail || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
