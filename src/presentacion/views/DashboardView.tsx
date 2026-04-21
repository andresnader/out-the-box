import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, MessageSquare, RefreshCw, DollarSign, TrendingUp, Instagram, Users, Globe } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const DashboardView = ({ monthlyStats, isAdmin, syncing, handleMetricoolSync, showNotification }: any) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Action Bar */}
            <div className="flex flex-wrap gap-3">
                <button onClick={() => showNotification("Generando PDF de resumen mensual...")} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all shadow-sm">
                    <Download size={16} /> Descargar PDF
                </button>
                <button onClick={() => showNotification("Enlace de WhatsApp generado y enviado.")} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    <MessageSquare size={16} /> Reporte WhatsApp
                </button>
                {isAdmin && (
                    <button
                        onClick={handleMetricoolSync}
                        disabled={syncing}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={syncing ? "animate-spin" : ""} /> {syncing ? "Sincronizando..." : "Sync Metricool"}
                    </button>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Inversión Ads" value={`$${monthlyStats[monthlyStats.length - 1]?.invested.toLocaleString()}`} change="+15%" icon={DollarSign} color="rose" />
                <StatCard title="Retorno Venta" value={`$${monthlyStats[monthlyStats.length - 1]?.return.toLocaleString()}`} change="+28%" icon={TrendingUp} color="emerald" />
                <StatCard title="Engagement Social" value={`${monthlyStats[monthlyStats.length - 1]?.engagement}%`} change="+0.4%" icon={Instagram} color="amber" />
                <StatCard title="Comunidad Total" value={monthlyStats[monthlyStats.length - 1]?.followers.toLocaleString()} change="+122" icon={Users} color="blue" />
            </div>

            {/* Main Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-black text-lg tracking-tight">Crecimiento Inversión vs Retorno</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <div className="w-3 h-3 rounded-full bg-rose-500"></div> Inversión
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Retorno
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyStats}>
                                <defs>
                                    <linearGradient id="gradInv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradRet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="invested" stroke="#f43f5e" fillOpacity={1} fill="url(#gradInv)" strokeWidth={4} />
                                <Area type="monotone" dataKey="return" stroke="#10b981" fillOpacity={1} fill="url(#gradRet)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="font-black text-lg tracking-tight mb-2">Composición Ads</h3>
                        <p className="text-slate-400 text-xs font-medium mb-8">Basado en datos de Metricool.</p>

                        <div className="space-y-6">
                            {[
                                { name: 'Meta Ads', value: 65, color: 'bg-rose-500' },
                                { name: 'Google Search', value: 25, color: 'bg-slate-900' },
                                { name: 'TikTok Ads', value: 10, color: 'bg-emerald-500' }
                            ].map(platform => (
                                <div key={platform.name}>
                                    <div className="flex justify-between text-xs font-black mb-2">
                                        <span>{platform.name}</span>
                                        <span className="text-slate-400">{platform.value}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className={`${platform.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${platform.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-rose-600"><Globe size={18} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Dato Clave</p>
                                <p className="text-xs font-bold text-slate-700">El CPA bajó un 12% este mes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
