import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Building2, Circle } from 'lucide-react';
import { useTenant } from '../../procesamiento/tenant/TenantContext';

const statusColors = {
  active: 'text-emerald-500',
  onboarding: 'text-amber-500',
  paused: 'text-surface-400',
  churned: 'text-red-500',
};

export const TenantSwitcher = () => {
  const { tenants, activeTenant, setActiveTenantById } = useTenant();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = tenants.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  if (tenants.length <= 1) {
    // Single tenant — just show the name
    return activeTenant ? (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <span className="text-lg">{activeTenant.branding.logo}</span>
        <span className="font-extrabold text-sm text-surface-900 dark:text-white tracking-tight">
          {activeTenant.name}
        </span>
      </div>
    ) : null;
  }

  return (
    <div className="relative" ref={dropRef}>
      <button
        id="tenant-switcher"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-surface-50 dark:bg-surface-800 
          border border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600 
          transition-all hover:shadow-ambient-1"
      >
        {activeTenant && (
          <>
            <span className="text-lg">{activeTenant.branding.logo}</span>
            <span className="font-extrabold text-sm text-surface-900 dark:text-white tracking-tight max-w-[140px] truncate">
              {activeTenant.name}
            </span>
          </>
        )}
        <ChevronDown size={14} className={`text-surface-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-2xl z-50 overflow-hidden animate-fade-in">
          {/* Search */}
          <div className="p-3 border-b border-surface-100 dark:border-surface-700">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar cliente..."
                className="w-full bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-600 rounded-xl py-2 pl-9 pr-3 text-xs font-bold text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                autoFocus
              />
            </div>
          </div>

          {/* Tenant list */}
          <div className="max-h-64 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-surface-400 font-bold">
                Sin resultados
              </div>
            ) : (
              filtered.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => {
                    setActiveTenantById(tenant.id);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors text-left ${
                    activeTenant?.id === tenant.id ? 'bg-surface-50 dark:bg-surface-700/30' : ''
                  }`}
                >
                  <span className="text-xl shrink-0">{tenant.branding.logo}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-surface-900 dark:text-white truncate">
                        {tenant.name}
                      </span>
                      <Circle size={7} className={`shrink-0 fill-current ${statusColors[tenant.status]}`} />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">
                        {tenant.plan}
                      </span>
                      {tenant.lastSyncAt && (
                        <span className="text-[9px] font-bold text-surface-400">
                          • Sync: {new Date(tenant.lastSyncAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  {activeTenant?.id === tenant.id && (
                    <Check size={16} className="text-brand-600 dark:text-brand-400 shrink-0" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-surface-100 dark:border-surface-700">
            <div className="flex items-center gap-2 text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">
              <Building2 size={12} /> {tenants.length} clientes activos
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
