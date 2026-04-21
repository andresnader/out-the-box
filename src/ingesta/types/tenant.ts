// ============================================================
// TENANT TYPES — Multitenant data model
// ============================================================

export type TenantStatus = 'active' | 'onboarding' | 'paused' | 'churned';
export type PlanTier = 'Starter' | 'Growth Pro' | 'Enterprise';

export interface TenantBranding {
  primaryColor: string;     // hex
  logo: string;             // emoji o URL
  logoUrl?: string;         // URL a imagen real
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;             // URL-safe identifier (e.g. "urbanfit-studio")
  status: TenantStatus;
  plan: PlanTier;
  branding: TenantBranding;
  accountManagers: string[];  // UIDs de AMs asignados
  createdAt: string;
  lastSyncAt?: string;
}

export type ApiProvider = 'metricool' | 'asana';
export type ApiConnectionStatus = 'active' | 'error' | 'pending' | 'disconnected';

export interface ApiConnection {
  id: string;
  tenantId: string;
  provider: ApiProvider;
  status: ApiConnectionStatus;
  label: string;               // Nombre descriptivo (e.g. "Metricool — UrbanFit")
  workspaceId?: string;        // Asana workspace ID
  lastSync?: string;
  errorMessage?: string;
  // API keys NEVER stored in frontend — managed via Cloud Functions
}

export interface SyncLog {
  id: string;
  tenantId: string;
  provider: ApiProvider;
  status: 'success' | 'error' | 'running';
  recordsImported: number;
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
}
