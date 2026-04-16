import Link from 'next/link';

export default function AnalyticsHubPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 sticky top-0 z-50 backdrop-blur-md">
                <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/fuse/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-bold">&larr; Dashboard</Link>
                        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700"></div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white tracking-widest"><span className="text-indigo-500">FUSE</span> / ANALYTICS HUB</h1>
                    </div>
                </div>
            </header>
            
            <main className="flex-1 max-w-[90rem] mx-auto px-6 py-12 w-full">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Beamtime Insights</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl">Real-time data visualization of facility resource utilization, dataset growth, and experimental computational jobs.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Data Volume', value: '42.8 PB', trend: '+12%', color: 'indigo' },
                        { label: 'Active Compute Jobs', value: '1,204', trend: 'Live', color: 'emerald' },
                        { label: 'Researchers Online', value: '842', trend: '+5%', color: 'cyan' },
                        { label: 'Beamtime Availability', value: '98.2%', trend: 'Optimum', color: 'amber' },
                    ].map((kpi, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className={`absolute -right-4 -bottom-4 w-20 h-20 bg-${kpi.color}-500/5 blur-2xl rounded-full`}></div>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-2">{kpi.label}</p>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-black text-white">{kpi.value}</p>
                                <span className={`text-xs font-bold ${kpi.trend === 'Live' || kpi.trend === 'Optimum' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                                    {kpi.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Data Throughput Chart Mock */}
                    <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                            Data Acquisition Throughput (24h)
                        </h3>
                        <div className="h-64 flex items-end justify-between gap-2 px-2 border-l border-b border-gray-200 dark:border-gray-800 relative">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 50, 75].map((h, i) => (
                                <div key={i} className="w-full relative group">
                                    <div 
                                        style={{ height: `${h}%` }} 
                                        className="bg-indigo-500/20 group-hover:bg-indigo-500/40 border-t-2 border-indigo-500 transition-all rounded-t-sm"
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap z-10 shadow-lg">
                                        {h} GB/s
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                            <span>00:00</span>
                            <span>06:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>23:59</span>
                        </div>
                    </div>

                    {/* Facility Distribution Chart Mock */}
                    <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                            Utilization by Instrument Node
                        </h3>
                        <div className="space-y-6">
                            {[
                                { name: 'DAPHNE (XRR/XRD)', value: 85, color: 'emerald' },
                                { name: 'FRED (Magnetic X-Ray)', value: 62, color: 'indigo' },
                                { name: 'SAXS-Hub (Small Angle)', value: 48, color: 'cyan' },
                                { name: 'Photonics-MX (Imaging)', value: 34, color: 'amber' },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                                        <span className={`text-${item.color}-600 dark:text-${item.color}-400`}>{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-950 h-3 rounded-full overflow-hidden border border-gray-200 dark:border-gray-800">
                                        <div 
                                            style={{ width: `${item.value}%` }} 
                                            className={`h-full bg-${item.color}-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-1000`}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Active Jobs Monitor */}
                <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                            Computational Job Monitor
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Live Syncing</span>
                        </div>
                     </div>
                     <div className="overflow-x-auto">
                         <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                                    <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Job ID</th>
                                    <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Process Name</th>
                                    <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Assigned PI</th>
                                    <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status</th>
                                    <th className="pb-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Execution Progress</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                {[
                                    { id: 'JOB-9021', name: 'Reflectivity Denoising (KWW)', pi: 'Chen Shen', status: 'Running', progress: 68 },
                                    { id: 'JOB-9022', name: 'Peak Fitting Convergence', pi: 'Honghu Zhang', status: 'Running', progress: 42 },
                                    { id: 'JOB-9023', name: 'TTC Map Generation', pi: 'Beate Klösgen', status: 'Pending', progress: 0 },
                                    { id: 'JOB-9024', name: 'Residual Normalization', pi: 'Benjamin Ocko', status: 'Running', progress: 91 },
                                ].map((job, i) => (
                                    <tr key={i} className="hover:bg-gray-100/50 dark:hover:bg-gray-800/20 transition-colors group">
                                        <td className="py-4 font-mono text-xs text-indigo-600 dark:text-indigo-400">{job.id}</td>
                                        <td className="py-4 text-sm font-bold text-gray-900 dark:text-gray-100">{job.name}</td>
                                        <td className="py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">{job.pi}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${job.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-500'}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="py-4 w-48">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-100 dark:bg-gray-950 h-1.5 rounded-full overflow-hidden">
                                                    <div style={{ width: `${job.progress}%` }} className="h-full bg-indigo-500"></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{job.progress}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                </div>
            </main>
        </div>
    );
}
