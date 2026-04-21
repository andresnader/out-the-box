import React from 'react';
import { Calendar } from 'lucide-react';

export const ActivitiesView = ({ activities }: any) => {
    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black text-slate-900">Bitácora de Gestión</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total: {activities.length} Acciones registradas</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-slate-200">Mes: Mayo</span>
                </div>
            </div>
            <div className="divide-y divide-slate-100">
                {activities.map((act: any, index: number) => (
                    <div key={act.id} className="p-8 hover:bg-slate-50 transition-all flex gap-6 group">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all">
                                <Calendar size={20} />
                            </div>
                            {index !== activities.length - 1 && <div className="w-0.5 h-full bg-slate-100 mt-2"></div>}
                        </div>
                        <div className="pb-4">
                            <div className="flex items-center gap-4 mb-2">
                                <h4 className="font-black text-slate-900 text-lg leading-none">{act.title}</h4>
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-black uppercase tracking-tighter">{act.date}</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">{act.description}</p>
                            <div className="flex gap-2 mt-4">
                                {act.tags?.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:border-rose-100 group-hover:text-rose-500 transition-colors">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
