import { Globe, RefreshCw, Plus, Share2, User, Settings, Shield } from 'lucide-react';
import { useState } from 'react';
import type { ClientConfig } from '../../ingesta/mockData';

interface AdminViewProps {
  syncing: boolean;
  handleMetricoolSync: () => void;
  client: ClientConfig;
  showNotification: (msg: string) => void;
}

export const AdminView = ({ syncing, handleMetricoolSync, client, showNotification }: AdminViewProps) => {
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDesc, setActivityDesc] = useState('');

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle.trim()) return;
    showNotification('Actividad publicada en el portal del cliente.');
    setActivityTitle('');
    setActivityDesc('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metricool MCP Panel */}
      <div className="bg-surface-900 dark:bg-surface-800 p-8 sm:p-10 rounded-4xl text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 text-surface-800 dark:text-surface-700 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Globe size={200} />
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-600/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4">
              <RefreshCw size={12} /> MCP Integration Active
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tighter">
              Conexión Directa Metricool
            </h2>
            <p className="text-surface-400 text-base sm:text-lg font-medium leading-relaxed">
              Automatiza la carga de datos. El sistema mapea gasto de Ads, engagement 
              y crecimiento de comunidad al presionar sincronizar.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-auto shrink-0">
            <button
              id="admin-sync"
              onClick={handleMetricoolSync}
              disabled={syncing}
              className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-surface-900 
                font-extrabold rounded-pill hover:scale-[1.02] active:scale-[0.98] 
                transition-all shadow-xl shadow-surface-900/50 min-w-[240px] text-sm tracking-wider uppercase"
            >
              <RefreshCw size={22} className={syncing ? 'animate-spin' : ''} />
              {syncing ? 'PROCESANDO MCP...' : 'SINCRONIZAR DATOS'}
            </button>
            <p className="text-[10px] text-center text-surface-500 font-extrabold tracking-widest uppercase">
              Última sync: Hace 2 horas
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Activity Form */}
        <div className="card p-8">
          <h3 className="font-extrabold text-xl mb-6 flex items-center gap-2 text-surface-900 dark:text-white">
            <Plus size={24} className="text-brand-600 dark:text-brand-400" /> Añadir Actividad Manual
          </h3>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">
                Título del Log
              </label>
              <input
                id="activity-title-input"
                value={activityTitle}
                onChange={(e) => setActivityTitle(e.target.value)}
                className="input-field"
                placeholder="Ej: Rediseño de Creativos Meta"
              />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">
                Descripción Detallada
              </label>
              <textarea
                id="activity-desc-input"
                value={activityDesc}
                onChange={(e) => setActivityDesc(e.target.value)}
                className="input-field h-32 resize-none"
                placeholder="Explica qué se hizo este mes..."
              />
            </div>
            <button
              id="publish-activity"
              type="submit"
              className="btn-primary w-full py-4"
            >
              Publicar en Portal del Cliente
            </button>
          </form>
        </div>

        {/* Report Automation */}
        <div className="card p-8">
          <h3 className="font-extrabold text-xl mb-6 flex items-center gap-2 text-surface-900 dark:text-white">
            <Share2 size={24} className="text-emerald-600 dark:text-emerald-400" /> Automatización de Reportes
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Notificación WhatsApp', desc: 'Envío de resumen linkeado el día 1', active: true, icon: '💬' },
              { label: 'Generación de PDF', desc: 'Sube resumen a la nube automáticamente', active: true, icon: '📄' },
              { label: 'Email Semanal', desc: 'Recordatorio de hitos alcanzados', active: false, icon: '📧' },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-surface-100 dark:border-surface-700 rounded-3xl flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <div>
                    <p className="font-extrabold text-surface-900 dark:text-white tracking-tight">{item.label}</p>
                    <p className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
                <div className={`w-14 h-7 rounded-full relative transition-colors cursor-pointer ${item.active ? 'bg-emerald-500' : 'bg-surface-200 dark:bg-surface-600'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-surface-50 dark:bg-surface-900/50 rounded-2xl border border-dashed border-surface-200 dark:border-surface-700">
            <p className="text-xs font-bold text-surface-500 dark:text-surface-400 leading-relaxed italic text-center">
              "Configura las credenciales de la API de WhatsApp en los ajustes globales para habilitar los envíos reales."
            </p>
          </div>
        </div>
      </div>

      {/* Client Profile Card */}
      <div className="card p-8">
        <h3 className="font-extrabold text-xl mb-6 flex items-center gap-2 text-surface-900 dark:text-white">
          <Settings size={24} className="text-surface-400" /> Perfil del Cliente
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
            <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-2">Cliente</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{client.logo}</span>
              <span className="font-extrabold text-surface-900 dark:text-white">{client.name}</span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
            <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-2">Account Manager</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-900 dark:bg-brand-600 text-white flex items-center justify-center font-extrabold text-sm">
                {client.accountManagerAvatar}
              </div>
              <span className="font-extrabold text-surface-900 dark:text-white">{client.accountManager}</span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
            <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-2">Plan Activo</p>
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-brand-600 dark:text-brand-400" />
              <span className="font-extrabold text-surface-900 dark:text-white">{client.plan}</span>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
            <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-2">Fuentes Conectadas</p>
            <div className="flex gap-2">
              {['Metricool', 'Asana', 'Firebase'].map(src => (
                <span key={src} className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase">
                  {src}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
