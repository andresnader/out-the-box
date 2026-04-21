import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Tenant } from '../../ingesta/types/tenant';
import type { MonthStat, Activity } from '../../ingesta/mockData';
import type { ApiConnection } from '../../ingesta/types/tenant';
import { useAuth } from '../auth/AuthContext';
import {
  MOCK_TENANTS,
  MOCK_API_CONNECTIONS,
  MOCK_TENANT_STATS,
  MOCK_TENANT_ACTIVITIES,
} from '../../ingesta/mockMultitenant';

// ── Types ───────────────────────────────────────────────────

interface TenantContextType {
  // All tenants (for admin/AM views)
  tenants: Tenant[];
  
  // Active tenant (the one currently being viewed)
  activeTenant: Tenant | null;
  setActiveTenantById: (id: string) => void;
  
  // Tenant-scoped data
  tenantStats: MonthStat[];
  tenantActivities: Activity[];
  tenantConnections: ApiConnection[];
  
  // Actions
  syncing: boolean;
  syncTenant: (tenantId: string) => Promise<void>;
}

const TenantContext = createContext<TenantContextType>({
  tenants: [],
  activeTenant: null,
  setActiveTenantById: () => {},
  tenantStats: [],
  tenantActivities: [],
  tenantConnections: [],
  syncing: false,
  syncTenant: async () => {},
});

export const useTenant = () => useContext(TenantContext);

// ── Provider ────────────────────────────────────────────────

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Load tenants based on user role
  useEffect(() => {
    if (!user) {
      setTenants([]);
      setActiveTenant(null);
      return;
    }

    let accessible: Tenant[];
    
    switch (user.role) {
      case 'super_admin':
        // Super admin sees ALL tenants
        accessible = MOCK_TENANTS;
        break;
      case 'account_manager':
        // AM sees only assigned tenants
        accessible = MOCK_TENANTS.filter(t => 
          user.managedTenants?.includes(t.id)
        );
        break;
      case 'client':
        // Client sees only their tenant
        accessible = MOCK_TENANTS.filter(t => t.id === user.tenantId);
        break;
      default:
        accessible = [];
    }

    setTenants(accessible);

    // Auto-select first tenant, or the client's own tenant
    if (user.role === 'client' && user.tenantId) {
      const clientTenant = accessible.find(t => t.id === user.tenantId);
      setActiveTenant(clientTenant ?? null);
    } else if (accessible.length > 0 && !activeTenant) {
      setActiveTenant(accessible[0]);
    }
  }, [user]);

  const setActiveTenantById = useCallback((id: string) => {
    const found = MOCK_TENANTS.find(t => t.id === id);
    if (found) setActiveTenant(found);
  }, []);

  const syncTenant = useCallback(async (tenantId: string) => {
    setSyncing(true);
    // In production: trigger Cloud Function to sync Metricool + Asana
    await new Promise(res => setTimeout(res, 1800));
    
    // Update last sync
    setTenants(prev => prev.map(t => 
      t.id === tenantId ? { ...t, lastSyncAt: new Date().toISOString() } : t
    ));
    if (activeTenant?.id === tenantId) {
      setActiveTenant(prev => prev ? { ...prev, lastSyncAt: new Date().toISOString() } : null);
    }
    
    setSyncing(false);
  }, [activeTenant]);

  // Derived data scoped to active tenant
  const tenantStats = activeTenant ? (MOCK_TENANT_STATS[activeTenant.id] ?? []) : [];
  const tenantActivities = activeTenant ? (MOCK_TENANT_ACTIVITIES[activeTenant.id] ?? []) : [];
  const tenantConnections = activeTenant 
    ? MOCK_API_CONNECTIONS.filter(c => c.tenantId === activeTenant.id) 
    : [];

  return (
    <TenantContext.Provider value={{
      tenants,
      activeTenant,
      setActiveTenantById,
      tenantStats,
      tenantActivities,
      tenantConnections,
      syncing,
      syncTenant,
    }}>
      {children}
    </TenantContext.Provider>
  );
};
