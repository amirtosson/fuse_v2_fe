import Link from 'next/link';
import { api } from '@/lib/api';

async function getDatasets(searchParams: any) {
    const page = parseInt(searchParams.page || '1');
    const facilities = searchParams.facilities || 'DESY,ESS,MAXIV';
    
    // Construct request parameters for our aggregator
    const params: any = {
        page,
        facilities,
        instrument: searchParams.instrument,
        probe: searchParams.probe,
        category: searchParams.category,
        type: searchParams.type,
        pi: searchParams.pi,
        location: searchParams.location
    };

    try {
        const res = await api.get('/datasets/public', { params });
        return res.data?.data || [];
    } catch (e: any) {
        throw new Error(e.response?.data?.message || e.message);
    }
}

export default async function PublicDatasetsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
    const resolvedParams = await searchParams;
    const currentView = resolvedParams?.view || 'thumbnail';
    const isList = currentView === 'list';
    const currentPage = parseInt(resolvedParams.page || '1');
    const selectedFacilities = resolvedParams.facilities ? resolvedParams.facilities.split(',') : ['DESY', 'ESS', 'MAXIV'];

    let datasets = [];
    let error = null;
    try {
        datasets = await getDatasets(resolvedParams);
    } catch (e: any) {
        error = e.message;
    }

    const constructUrl = (updates: any) => {
        const query = new URLSearchParams(resolvedParams as any);
        for (const key in updates) {
            if (updates[key] === null) {
                query.delete(key);
            } else {
                query.set(key, updates[key]);
            }
        }
        return `?${query.toString()}`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-950 dark:text-gray-100 font-sans flex flex-col transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/fuse/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-bold tracking-tight">&larr; Dashboard</Link>
                        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700"></div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white tracking-widest uppercase"><span className="text-cyan-500">FUSE</span> / PUBLIC DATA</h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-[90rem] mx-auto px-6 py-12 w-full flex flex-col md:flex-row gap-8">

                {/* 1. FILTER SIDEBAR */}
                <aside className="w-full md:w-80 shrink-0">
                    <form className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sticky top-28 shadow-xl">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Data Filters</h3>
                            <Link href="/fuse/public-datasets" className="text-[10px] font-black uppercase text-red-500 hover:text-red-400 bg-red-500/10 px-3 py-1.5 rounded-md transition-colors">Clear All</Link>
                        </div>

                                                {/* Facility Multi-Select Switches */}
                        <div className="mb-8 space-y-3">
                            <label className="block text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-3">Target Facilities</label>
                            <div className="space-y-2">
                                {['DESY', 'ESS', 'MAXIV'].map((fac) => {
                                    const isActive = selectedFacilities.includes(fac);
                                    const nextFacilities = isActive 
                                        ? selectedFacilities.filter(f => f !== fac).join(',')
                                        : [...selectedFacilities, fac].join(',');
                                    
                                    const getColor = (f: string) => {
                                        if (f === 'DESY') return 'cyan';
                                        if (f === 'ESS') return 'indigo';
                                        return 'orange';
                                    };
                                    const color = getColor(fac);
                                    
                                    return (
                                        <Link 
                                            key={fac}
                                            href={constructUrl({ facilities: nextFacilities || null })}
                                            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                                                isActive 
                                                ? `bg-${color}-500/10 border-${color}-500/50 text-${color}-700 dark:text-${color}-400 shadow-[inset_0_0_10px_rgba(var(--${color}-rgb),0.1)]` 
                                                : 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-500'
                                            }`}
                                        >
                                            <span className="text-sm font-bold tracking-tight uppercase">{fac} NODE</span>
                                            <div className={`w-4 h-4 rounded-full border-2 ${isActive ? `bg-${color}-500 border-${color}-500 ring-4 ring-${color}-500/20` : 'border-gray-300 dark:border-gray-700'}`}></div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <input type="hidden" name="view" value={currentView} />
                        <input type="hidden" name="facilities" value={selectedFacilities.join(',')} />

                        <div className="space-y-5">
                            {[
                                { label: 'Instrument', name: 'instrument', placeholder: 'e.g. FRED' },
                                { label: 'Probe Type', name: 'probe', placeholder: 'e.g. x-ray' },
                                { label: 'Sample Category', name: 'category', placeholder: 'e.g. Solid' },
                                { label: 'Data Type', name: 'type', placeholder: 'e.g. raw' },
                                { label: 'P. Investigator', name: 'pi', placeholder: 'e.g. Philipp Jordt' },
                                { label: 'Location Node', name: 'location', placeholder: 'Partial URL Context' },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-[10px] font-black text-cyan-500 dark:text-cyan-400 uppercase tracking-widest mb-2">{field.label}</label>
                                    <input 
                                        type="text" 
                                        name={field.name} 
                                        defaultValue={(resolvedParams as any)[field.name] || ""} 
                                        placeholder={field.placeholder} 
                                        className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-all font-mono" 
                                    />
                                </div>
                            ))}
                        </div>

                        <button type="submit" className="w-full mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
                            Execute Aggregate Query
                        </button>
                    </form>
                </aside>

                {/* 2. MAIN DATA REPOSITORY */}
                <div className="flex-1 w-full min-w-0">
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter uppercase">Aggregated Registry</h2>
                            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg font-medium tracking-tight">Mixed facility results from DESY and ESS nodes.</p>
                        </div>
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 shrink-0 h-fit">
                            <Link href={constructUrl({ view: 'thumbnail' })} className={`px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${!isList ? 'bg-cyan-500 text-gray-950 shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>Cards</Link>
                            <Link href={constructUrl({ view: 'list' })} className={`px-5 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${isList ? 'bg-cyan-500 text-gray-950 shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>List</Link>
                        </div>
                    </div>

                    {error ? (
                        <div className="p-6 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-500 rounded-2xl text-red-600 dark:text-red-300 shadow-xl font-bold">{error}</div>
                    ) : datasets.length === 0 ? (
                        <div className="p-16 text-center shadow-xl shadow-cyan-900/5 text-cyan-700 bg-gray-50 dark:bg-gray-900/40 border border-cyan-100 dark:border-cyan-900/50 border-dashed rounded-[3rem] text-lg font-black tracking-widest uppercase">
                            No datasets matched your filters at these facilities.
                        </div>
                    ) : (
                        <>
                            <div className={isList ? "flex flex-col space-y-4" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                                {datasets.map((ds: any) => (
                                    <Link href={`/fuse/public-datasets/${encodeURIComponent(ds.pid)}?facility=${ds.facilitySource}`} key={ds.id} className={`group flex bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-cyan-500/50 rounded-[2rem] transition-all shadow-xl hover:shadow-cyan-500/10 active:scale-[0.98] ${isList ? 'flex-col sm:flex-row items-start sm:items-center gap-6 p-4 px-6' : 'flex-col p-8'}`}>

                                        <div className={isList ? "flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 w-full min-w-0" : "flex flex-col h-full w-full"}>
                                            <div className={isList ? "flex-1 min-w-0" : ""}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={`text-[10px] font-black text-cyan-600 dark:text-cyan-500 tracking-widest uppercase flex items-center gap-2`}>
                                                        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></div>
                                                        TYPE: {ds.type || 'RAW'}
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter shadow-sm border ${
                                                        ds.facilitySource === 'ESS' 
                                                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500 shadow-indigo-500/10' 
                                                        : ds.facilitySource === 'MAXIV'
                                                        ? 'bg-orange-500/10 border-orange-500/20 text-orange-500 shadow-orange-500/10'
                                                        : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 shadow-cyan-500/10'
                                                    }`}>
                                                        {ds.facilitySource} SOURCE
                                                    </span>
                                                </div>
                                                <h3 className={`font-black text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight tracking-tight ${isList ? 'text-2xl mb-1 truncate' : 'text-2xl mb-6 line-clamp-2'}`}>{ds.datasetName}</h3>

                                                {!isList && (
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-3 mb-8 flex-1 bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                                        {(() => {
                                                            const meta = ds.scientificMetadata || {};
                                                            
                                                            // Helper to extract value from ESS (nested) or DESY (flat)
                                                            // Updated to handle null values as 'Not Defined'
                                                            const resolveValue = (v: any): string => {
                                                                if (v === undefined || v === null || v === "" || v === "-") return 'Not Defined';
                                                                if (typeof v === 'object') {
                                                                    if (v.value !== undefined) return `${v.value} ${v.unit || ''}`.trim();
                                                                    // For complex objects, try to find a title or name, or stringify
                                                                    return v.title || v.name || v.instrument || JSON.stringify(v).substring(0, 40) + '...';
                                                                }
                                                                return String(v);
                                                            };

                                                            const resolveLabel = (key: string, val: any) => {
                                                                if (val && typeof val === 'object' && val.human_name) return val.human_name;
                                                                return key.replace(/_/g, ' ').replace(/\./g, ' ').toUpperCase();
                                                            };

                                                            // 1. Define Priority Slots
                                                            const priorityKeys = [
                                                                'Experiment.instrument', 'instrument', 'detectors_configuration',
                                                                'Experiment.probe', 'probe', 'beam_stop',
                                                                'Sample.category', 'sample_material', 'sample_state', 'sample_name'
                                                            ];

                                                            const displaySlots: { label: string, value: string }[] = [];
                                                            const seenKeys = new Set();

                                                            // First, try picking from priority list
                                                            for (const pKey of priorityKeys) {
                                                                const val = pKey.split('.').reduce((o, i) => o?.[i], meta);
                                                                if (val !== undefined && val !== null && val !== "" && val !== "-") {
                                                                    const label = pKey.includes('instrument') ? 'Instrument' : 
                                                                                  pKey.includes('probe') || pKey.includes('beam') ? 'Probe/Equipment' :
                                                                                  'Sample/State';
                                                                    displaySlots.push({ label, value: resolveValue(val) });
                                                                    seenKeys.add(pKey);
                                                                    if (displaySlots.length >= 3) break;
                                                                }
                                                            }

                                                            // 2. If we have less than 3, fill with remaining keys from scientificMetadata
                                                            if (displaySlots.length < 3) {
                                                                Object.entries(meta).forEach(([key, val]) => {
                                                                    if (displaySlots.length < 3 && !seenKeys.has(key) && val) {
                                                                        displaySlots.push({ 
                                                                            label: resolveLabel(key, val), 
                                                                            value: resolveValue(val) 
                                                                        });
                                                                    }
                                                                });
                                                            }

                                                            // 3. Fallback to generic info if still empty
                                                            if (displaySlots.length === 0) {
                                                                displaySlots.push({ label: 'Data Node', value: ds.id.substring(0, 8) + '...' });
                                                                displaySlots.push({ label: 'Source', value: ds.facilitySource });
                                                                displaySlots.push({ label: 'Lifecycle', value: ds.type || 'RAW' });
                                                            }

                                                            return displaySlots.slice(0, 3).map((slot, idx) => (
                                                                <div key={idx} className="flex justify-between items-center gap-4">
                                                                    <span className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-[9px] shrink-0 truncate max-w-[100px]">{slot.label}</span> 
                                                                    <span className="text-gray-900 dark:text-white truncate font-bold italic text-right flex-1">
                                                                        {slot.value}
                                                                    </span>
                                                                </div>
                                                            ));
                                                        })()}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`flex flex-wrap items-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ${isList ? 'border-none shrink-0 sm:min-w-[200px] justify-start sm:justify-end gap-6 w-full sm:w-auto' : 'pt-5 border-t border-gray-100 dark:border-gray-800 justify-between mt-auto'}`}>
                                                <span className="truncate max-w-xs">{ds.principalInvestigator || ds.owner}</span>
                                                <span className="border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-950/50 shadow-inner text-cyan-600 dark:text-cyan-500">{new Date(ds.creationTime).getFullYear() || ds.datasetlifecycle?.publishedOn?.substring(0, 4)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="mt-12 flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-xl">
                                <Link
                                    href={constructUrl({ page: Math.max(1, currentPage - 1) })}
                                    className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${currentPage <= 1 ? 'pointer-events-none opacity-30 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border border-transparent' : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm'}`}
                                >
                                    &larr; Previous Page
                                </Link>
                                <span className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-[10px] hidden sm:block">Aggregated Page <span className="text-cyan-600 dark:text-cyan-400 font-black text-xl ml-2">{currentPage}</span></span>
                                <Link
                                    href={constructUrl({ page: currentPage + 1 })}
                                    className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-cyan-200 dark:border-cyan-800 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] hover:bg-cyan-500 dark:hover:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 hover:text-white ${datasets.length < 10 ? 'pointer-events-none opacity-30' : ''}`}
                                >
                                    Load Integrated Data &rarr;
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
