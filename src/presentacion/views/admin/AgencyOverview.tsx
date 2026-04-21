import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from 'lucide-react';
import { useTenant } from '../../../procesamiento/tenant/TenantContext';
import { MOCK_TENANT_STATS } from '../../../ingesta/mockMultitenant';

export const AgencyOverview = () => {
  const { tenants } = useTenant();

  // Aggregate metrics across all tenants
  const totals = tenants.reduce(
    (acc, tenant) => {
      const stats = MOCK_TENANT_STATS[tenant.id] ?? [];
      const latest = stats[stats.length - 1];
      if (latest) {
        acc.totalInvested += latest.invested;
        acc.totalReturn += latest.return;
        acc.totalFollowers += latest.followers;
      }
      return acc;
    },
    { totalInvested: 0, totalReturn: 0, totalFollowers: 0 }
  );

  const avgRoas = totals.totalInvested > 0
    ? (totals.totalReturn / totals.totalInvested).toFixed(1)
    : '0';

  const statusCounts = {
    active: tenants.filter(t => t.status === 'active').length,
    onboarding: tenants.filter(t => t.status === 'onboarding').length,
    paused: tenants.filter(t => t.status === 'paused').length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
          Panel General
        </h1>
        <p className="text-surface-500 font-medium mt-1">
          Resumen consolidado de todos los clientes de Box Studio.
        </p>
      </div>

      {/* Aggregate KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Clientes Activos', value: statusCounts.active.toString(), icon: Users, color: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-50 dark:bg-brand-900/20' },
          { label: 'Inversión Total', value: `$${totals.totalInvested.toLocaleString()}`, icon: DollarSign, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Retorno Total', value: `$${totals.totalReturn.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'ROAS Promedio', value: `${avgRoas}x`, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="card p-6 hover:shadow-ambient-2 transition-all animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'backwards' }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest">{kpi.label}</p>
                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                  <Icon size={18} className={kpi.color} />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
                {kpi.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tenants Quick Grid */}
      <div>
        <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-6">
          Tus Clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant, i) => {
            const stats = MOCK_TENANT_STATS[tenant.id] ?? [];
            const latest = stats[stats.length - 1];
            const roas = latest?.roas?.toFixed(1) ?? '—';

            return (
              <div
                key={tenant.id}
                className="card p-6 group hover:shadow-ambient-2 transition-all cursor-pointer animate-slide-up"
                style={{ animationDelay: `${(i + 4) * 80}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{tenant.branding.logo}</span>
                    <div>
                      <h3 className="font-extrabold text-surface-900 dark:text-white tracking-tight">{tenant.name}</h3>
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest ${
                        tenant.status === 'active' ? 'text-emerald-500' :
                        tenant.status === 'onboarding' ? 'text-amber-500' :
                        'text-surface-400'
                      }`}>
                        {tenant.status === 'active' ? '● Activo' :
                         tenant.status === 'onboarding' ? '● Onboarding' :
                         '● Pausado'}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-surface-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-100 dark:border-surface-700">
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">Plan</p>
                    <p className="text-sm font-extrabold text-surface-900 dark:text-white mt-1">{tenant.plan}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">ROAS</p>
                    <p className="text-sm font-extrabold text-emerald-500 mt-1">{roas}x</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">Inversión</p>
                    <p className="text-sm font-extrabold text-surface-900 dark:text-white mt-1">
                      ${latest?.invested?.toLocaleString() ?? '0'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status breakdown */}
      <div className="card p-8">
        <h3 className="font-extrabold text-lg text-surface-900 dark:text-white tracking-tight mb-6">Estado del Portafolio</h3>
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'Activos', count: statusCounts.active, color: 'bg-emerald-500' },
            { label: 'En Onboarding', count: statusCounts.onboarding, color: 'bg-amber-500' },
            { label: 'Pausados', count: statusCounts.paused, color: 'bg-surface-400' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-lg ${s.color}`} />
              <div>
                <span className="font-extrabold text-2xl text-surface-900 dark:text-white">{s.count}</span>
                <span className="text-xs font-bold text-surface-400 ml-2 uppercase tracking-widest">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
