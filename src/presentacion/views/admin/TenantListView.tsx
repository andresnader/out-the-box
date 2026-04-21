import { useState } from 'react';
import { Search, Plus, Circle, Link2, Calendar, ArrowUpRight, Filter } from 'lucide-react';
import { useTenant } from '../../../procesamiento/tenant/TenantContext';
import { MOCK_API_CONNECTIONS, MOCK_TENANT_STATS } from '../../../ingesta/mockMultitenant';
import type { TenantStatus } from '../../../ingesta/types/tenant';

const statusConfig: Record<TenantStatus, { label: string; color: string; dot: string }> = {
  active:     { label: 'Activo',     color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800', dot: 'text-emerald-500' },
  onboarding: { label: 'Onboarding', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800', dot: 'text-amber-500' },
  paused:     { label: 'Pausado',    color: 'bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 border-surface-200 dark:border-surface-600', dot: 'text-surface-400' },
  churned:    { label: 'Baja',       color: 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-100 dark:border-red-800', dot: 'text-red-500' },
};

interface TenantListViewProps {
  onSelectTenant: (tenantId: string) => void;
  onCreateNew: () => void;
}

export const TenantListView = ({ onSelectTenant, onCreateNew }: TenantListViewProps) => {
  const { tenants, setActiveTenantById } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TenantStatus | 'all'>('all');

  const filtered = tenants.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSelect = (tenantId: string) => {
    setActiveTenantById(tenantId);
    onSelectTenant(tenantId);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">Clientes</h1>
          <p className="text-surface-500 font-medium mt-1">{tenants.length} clientes en el portafolio de Box Studio.</p>
        </div>
        <button onClick={onCreateNew} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar cliente..."
              className="input-field pl-11 py-2.5 text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-surface-400" />
            {(['all', 'active', 'onboarding', 'paused'] as const).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                  statusFilter === status
                    ? 'bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-sm'
                    : 'bg-surface-50 dark:bg-surface-800 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                {status === 'all' ? 'Todos' : statusConfig[status].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant Table */}
      <div className="card overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-8 py-4 bg-surface-50 dark:bg-surface-900/50 border-b border-surface-100 dark:border-surface-700">
          {['Cliente', 'Plan', 'APIs', 'ROAS', 'Último Sync', ''].map(h => (
            <span key={h} className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-surface-100 dark:divide-surface-700">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-surface-400 text-sm font-bold">
              No se encontraron clientes para esta búsqueda.
            </div>
          ) : (
            filtered.map((tenant, i) => {
              const connections = MOCK_API_CONNECTIONS.filter(c => c.tenantId === tenant.id);
              const stats = MOCK_TENANT_STATS[tenant.id] ?? [];
              const latest = stats[stats.length - 1];
              const status = statusConfig[tenant.status];
              const apiOk = connections.filter(c => c.status === 'active').length;
              const apiTotal = connections.length;

              return (
                <div
                  key={tenant.id}
                  onClick={() => handleSelect(tenant.id)}
                  className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 lg:px-8 py-5 
                    hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-all cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
                >
                  {/* Client info */}
                  <div className="flex items-center gap-4">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{tenant.branding.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-surface-900 dark:text-white">{tenant.name}</h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-extrabold uppercase ${status.color}`}>
                          <Circle size={6} className={`fill-current ${status.dot}`} /> {status.label}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-surface-400 mt-0.5">{tenant.slug}</p>
                    </div>
                  </div>

                  {/* Plan */}
                  <div className="flex items-center">
                    <span className="text-sm font-extrabold text-surface-900 dark:text-white">{tenant.plan}</span>
                  </div>

                  {/* APIs */}
                  <div className="flex items-center gap-2">
                    <Link2 size={14} className={apiOk === apiTotal && apiTotal > 0 ? 'text-emerald-500' : 'text-amber-500'} />
                    <span className="text-sm font-extrabold text-surface-700 dark:text-surface-300">
                      {apiOk}/{apiTotal}
                    </span>
                    <span className="text-[9px] font-bold text-surface-400">conectadas</span>
                  </div>

                  {/* ROAS */}
                  <div className="flex items-center">
                    <span className={`text-sm font-extrabold ${latest?.roas ? 'text-emerald-500' : 'text-surface-400'}`}>
                      {latest?.roas ? `${latest.roas.toFixed(1)}x` : '—'}
                    </span>
                  </div>

                  {/* Last Sync */}
                  <div className="flex items-center gap-1.5 text-surface-400">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold">
                      {tenant.lastSyncAt
                        ? new Date(tenant.lastSyncAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
                        : 'Nunca'}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-end">
                    <ArrowUpRight size={18} className="text-surface-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
