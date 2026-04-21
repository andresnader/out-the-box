import { useState } from 'react';
import { CheckCircle, Link2, AlertCircle, RefreshCw, ExternalLink, Trash2 } from 'lucide-react';
import { useTenant } from '../../../procesamiento/tenant/TenantContext';

export const ApiConnectionsPanel = () => {
  const { activeTenant, tenantConnections, syncing, syncTenant } = useTenant();
  const [notif, setNotif] = useState<string | null>(null);

  const flash = (msg: string) => { setNotif(msg); setTimeout(() => setNotif(null), 3000); };

  if (!activeTenant) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <Link2 size={32} className="text-surface-300 mx-auto mb-4" />
        <p className="text-surface-400 font-bold text-sm">Selecciona un cliente para ver sus conexiones.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">Conexiones API</h1>
          <p className="text-surface-500 font-medium mt-1">
            Integraciones de <span className="font-extrabold text-surface-700 dark:text-surface-300">{activeTenant.name}</span>.
          </p>
        </div>
        <button onClick={() => { syncTenant(activeTenant.id); flash('Sincronización iniciada.'); }} disabled={syncing} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} /> {syncing ? 'Sincronizando...' : 'Sincronizar Todo'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenantConnections.length === 0 ? (
          <div className="lg:col-span-2 card p-12 text-center">
            <Link2 size={40} className="text-surface-200 dark:text-surface-600 mx-auto mb-4" />
            <h3 className="font-extrabold text-lg text-surface-900 dark:text-white mb-2">Sin Conexiones</h3>
            <p className="text-surface-400 text-sm mb-6">Este cliente aún no tiene APIs conectadas.</p>
            <button className="btn-primary">+ Agregar Conexión</button>
          </div>
        ) : tenantConnections.map((conn) => {
          const isOk = conn.status === 'active';
          const isErr = conn.status === 'error';
          return (
            <div key={conn.id} className={`card p-6 border-l-4 hover:shadow-ambient-2 transition-all ${isOk ? 'border-l-emerald-500' : isErr ? 'border-l-red-500' : 'border-l-amber-500'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${conn.provider === 'metricool' ? 'bg-brand-50 dark:bg-brand-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                  {conn.provider === 'metricool' ? '📊' : '📋'}
                </div>
                <div>
                  <h3 className="font-extrabold text-surface-900 dark:text-white">{conn.label}</h3>
                  <span className={`flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest ${isOk ? 'text-emerald-500' : isErr ? 'text-red-500' : 'text-amber-500'}`}>
                    {isOk ? <><CheckCircle size={10} /> Conectado</> : isErr ? <><AlertCircle size={10} /> Error</> : '⏳ Pendiente'}
                  </span>
                </div>
              </div>
              {isErr && conn.errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-xl mb-4">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">{conn.errorMessage}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-1">Proveedor</p><p className="text-sm font-extrabold text-surface-900 dark:text-white capitalize">{conn.provider}</p></div>
                <div><p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest mb-1">Última Sync</p><p className="text-sm font-extrabold text-surface-900 dark:text-white">{conn.lastSync ? new Date(conn.lastSync).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : 'Nunca'}</p></div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-surface-100 dark:border-surface-700">
                <button onClick={() => flash(`Re-sync ${conn.provider}...`)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-xs font-extrabold hover:bg-surface-100 dark:hover:bg-surface-700 transition-all"><RefreshCw size={14} /> Re-Sync</button>
                {isErr && <button onClick={() => flash('Abriendo re-autorización...')} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-extrabold hover:bg-brand-700 transition-all"><ExternalLink size={14} /> Re-Autorizar</button>}
                <button className="p-2.5 rounded-xl text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" onClick={() => flash('Conexión eliminada.')}><Trash2 size={14} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {notif && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-slide-up">
          <div className="bg-surface-900 dark:bg-white text-white dark:text-surface-900 px-8 py-4 rounded-pill shadow-2xl flex items-center gap-3">
            <CheckCircle size={16} className="text-emerald-500" />
            <span className="font-extrabold text-xs uppercase tracking-widest">{notif}</span>
          </div>
        </div>
      )}
    </div>
  );
};
