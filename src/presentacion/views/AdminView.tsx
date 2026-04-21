import React from 'react';
import { Globe, RefreshCw, Plus, Share2 } from 'lucide-react';

export const AdminView = ({ syncing, handleMetricoolSync }: any) => {
    return (
        <div className="space-y-8 animate-in zoom-in-95 duration-300">
            {/* Metricool MCP Panel */}
            <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 text-slate-800 opacity-20 group-hover:scale-110 transition-transform"><Globe size={200} /></div>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <RefreshCw size={12} /> MCP Integration Active
                        </div>
                        <h2 className="text-4xl font-black mb-4 tracking-tighter">
                            Conexión Directa Metricool
                        </h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">
                            Usa esta sección para automatizar la carga de datos. El sistema mapeará el gasto de Ads, el engagement de redes sociales y el crecimiento de comunidad automáticamente al presionar sincronizar.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <button
                            onClick={handleMetricoolSync}
                            disabled={syncing}
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-slate-900 font-black rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/50 min-w-[240px]"
                        >
                            <RefreshCw size={24} className={syncing ? "animate-spin" : ""} />
                            {syncing ? "PROCESANDO MCP..." : "SINCRONIZAR DATOS"}
                        </button>
                        <p className="text-[10px] text-center text-slate-500 font-bold tracking-widest uppercase">Última sync: Hace 2 horas</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Plus size={24} className="text-rose-600" /> Añadir Actividad Manual</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Título del Log</label>
                            <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 ring-rose-500/10 outline-none font-bold transition-all" placeholder="Ej: Rediseño de Creativos Meta" />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Descripción Detallada</label>
                            <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl h-32 focus:ring-4 ring-rose-500/10 outline-none font-medium transition-all" placeholder="Explica qué se hizo este mes..." />
                        </div>
                        <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg text-xs tracking-widest uppercase">Publicar en Portal del Cliente</button>
                    </form>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Share2 size={24} className="text-emerald-600" /> Automatización de Reportes</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Notificación WhatsApp', desc: 'Envío de resumen linkeado el día 1', active: true },
                            { label: 'Generación de PDF', desc: 'Sube resumen a la nube automáticamente', active: true },
                            { label: 'Email Semanal', desc: 'Recordatorio de hitos alcanzados', active: false },
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-slate-100 rounded-[24px] flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                                <div>
                                    <p className="font-black text-slate-900 tracking-tight">{item.label}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{item.desc}</p>
                                </div>
                                <div className={`w-14 h-7 rounded-full relative transition-colors ${item.active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic text-center">
                            "Configura las credenciales de la API de WhatsApp en los ajustes globales para habilitar los envíos reales."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
