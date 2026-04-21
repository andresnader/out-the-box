// ============================================================
// MOCK DATA — Multitenant simulation
// ============================================================

import type { Tenant, ApiConnection } from './types/tenant';
import type { AppUser } from './types/user';
import type { MonthStat, Activity } from './mockData';

// ── TENANTS ─────────────────────────────────────────────────
export const MOCK_TENANTS: Tenant[] = [
  {
    id: 'tenant_urbanfit',
    name: 'UrbanFit Studio',
    slug: 'urbanfit-studio',
    status: 'active',
    plan: 'Growth Pro',
    branding: { primaryColor: '#e11d48', logo: '🏋️' },
    accountManagers: ['user_andres'],
    createdAt: '2024-01-15T00:00:00Z',
    lastSyncAt: '2024-06-15T14:30:00Z',
  },
  {
    id: 'tenant_cafemax',
    name: 'CaféMax Colombia',
    slug: 'cafemax-colombia',
    status: 'active',
    plan: 'Starter',
    branding: { primaryColor: '#d97706', logo: '☕' },
    accountManagers: ['user_andres'],
    createdAt: '2024-03-01T00:00:00Z',
    lastSyncAt: '2024-06-14T10:00:00Z',
  },
  {
    id: 'tenant_technova',
    name: 'TechNova Labs',
    slug: 'technova-labs',
    status: 'onboarding',
    plan: 'Enterprise',
    branding: { primaryColor: '#6366f1', logo: '🚀' },
    accountManagers: ['user_laura'],
    createdAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'tenant_petlife',
    name: 'PetLife Store',
    slug: 'petlife-store',
    status: 'paused',
    plan: 'Starter',
    branding: { primaryColor: '#10b981', logo: '🐾' },
    accountManagers: ['user_laura'],
    createdAt: '2024-02-20T00:00:00Z',
    lastSyncAt: '2024-05-01T09:00:00Z',
  },
];

// ── USERS ───────────────────────────────────────────────────
export const MOCK_USERS: AppUser[] = [
  {
    uid: 'user_andres',
    email: 'andres@boxstudio.co',
    displayName: 'Andrés Nader',
    avatarInitials: 'AN',
    role: 'super_admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    uid: 'user_laura',
    email: 'laura@boxstudio.co',
    displayName: 'Laura Gómez',
    avatarInitials: 'LG',
    role: 'account_manager',
    managedTenants: ['tenant_technova', 'tenant_petlife'],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    uid: 'user_client_urbanfit',
    email: 'marketing@urbanfit.co',
    displayName: 'Carlos Herrera',
    avatarInitials: 'CH',
    role: 'client',
    tenantId: 'tenant_urbanfit',
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    uid: 'user_client_cafemax',
    email: 'gerencia@cafemax.com.co',
    displayName: 'Valentina Rojas',
    avatarInitials: 'VR',
    role: 'client',
    tenantId: 'tenant_cafemax',
    createdAt: '2024-03-05T00:00:00Z',
  },
];

// ── API CONNECTIONS ─────────────────────────────────────────
export const MOCK_API_CONNECTIONS: ApiConnection[] = [
  {
    id: 'conn_uf_metricool',
    tenantId: 'tenant_urbanfit',
    provider: 'metricool',
    status: 'active',
    label: 'Metricool — UrbanFit',
    lastSync: '2024-06-15T14:30:00Z',
  },
  {
    id: 'conn_uf_asana',
    tenantId: 'tenant_urbanfit',
    provider: 'asana',
    status: 'active',
    label: 'Asana — UrbanFit Workspace',
    workspaceId: 'ws_123456',
    lastSync: '2024-06-15T14:30:00Z',
  },
  {
    id: 'conn_cm_metricool',
    tenantId: 'tenant_cafemax',
    provider: 'metricool',
    status: 'active',
    label: 'Metricool — CaféMax',
    lastSync: '2024-06-14T10:00:00Z',
  },
  {
    id: 'conn_cm_asana',
    tenantId: 'tenant_cafemax',
    provider: 'asana',
    status: 'error',
    label: 'Asana — CaféMax Workspace',
    workspaceId: 'ws_789012',
    lastSync: '2024-06-10T08:00:00Z',
    errorMessage: 'Token expirado — requiere re-autorización',
  },
  {
    id: 'conn_tn_metricool',
    tenantId: 'tenant_technova',
    provider: 'metricool',
    status: 'pending',
    label: 'Metricool — TechNova (pendiente)',
  },
];

// ── TENANT-SCOPED STATS ─────────────────────────────────────
export const MOCK_TENANT_STATS: Record<string, MonthStat[]> = {
  tenant_urbanfit: [
    { month: 'Ene', invested: 2500, return: 8000,  engagement: 4.2, followers: 1200, reach: 45000,  cpa: 12.5, roas: 3.2,  order: 1 },
    { month: 'Feb', invested: 3000, return: 12000, engagement: 5.1, followers: 1550, reach: 62000,  cpa: 10.8, roas: 4.0,  order: 2 },
    { month: 'Mar', invested: 2800, return: 11000, engagement: 4.8, followers: 1900, reach: 58000,  cpa: 11.2, roas: 3.93, order: 3 },
    { month: 'Abr', invested: 4200, return: 18500, engagement: 6.5, followers: 2450, reach: 89000,  cpa: 8.7,  roas: 4.4,  order: 4 },
    { month: 'May', invested: 4800, return: 22000, engagement: 7.1, followers: 2850, reach: 105000, cpa: 7.9,  roas: 4.58, order: 5 },
    { month: 'Jun', invested: 5100, return: 26500, engagement: 7.8, followers: 3200, reach: 128000, cpa: 7.2,  roas: 5.2,  order: 6 },
  ],
  tenant_cafemax: [
    { month: 'Ene', invested: 800,  return: 2200,  engagement: 3.1, followers: 420,  reach: 12000, cpa: 18.5, roas: 2.75, order: 1 },
    { month: 'Feb', invested: 900,  return: 2800,  engagement: 3.5, followers: 510,  reach: 15000, cpa: 16.2, roas: 3.11, order: 2 },
    { month: 'Mar', invested: 1100, return: 3600,  engagement: 4.0, followers: 620,  reach: 19000, cpa: 14.8, roas: 3.27, order: 3 },
    { month: 'Abr', invested: 1200, return: 4100,  engagement: 4.3, followers: 730,  reach: 23000, cpa: 13.5, roas: 3.42, order: 4 },
    { month: 'May', invested: 1400, return: 5200,  engagement: 4.8, followers: 860,  reach: 28000, cpa: 12.1, roas: 3.71, order: 5 },
    { month: 'Jun', invested: 1600, return: 6100,  engagement: 5.2, followers: 980,  reach: 33000, cpa: 11.0, roas: 3.81, order: 6 },
  ],
  tenant_technova: [
    { month: 'Jun', invested: 0, return: 0, engagement: 0, followers: 0, reach: 0, cpa: 0, roas: 0, order: 1 },
  ],
  tenant_petlife: [
    { month: 'Ene', invested: 600,  return: 1500,  engagement: 2.8, followers: 300, reach: 8000,  cpa: 22.0, roas: 2.5, order: 1 },
    { month: 'Feb', invested: 700,  return: 1900,  engagement: 3.0, followers: 380, reach: 10000, cpa: 19.5, roas: 2.71, order: 2 },
    { month: 'Mar', invested: 750,  return: 2100,  engagement: 3.2, followers: 440, reach: 11000, cpa: 18.0, roas: 2.8, order: 3 },
  ],
};

// ── TENANT-SCOPED ACTIVITIES ────────────────────────────────
export const MOCK_TENANT_ACTIVITIES: Record<string, Activity[]> = {
  tenant_urbanfit: [
    { id: '1', title: 'Rediseño de Creativos Instagram Reels', date: '2024-06-15', description: 'Se completó la producción de 8 reels con nuevo branding visual. Engagement promedio por reel: 8.2%.', tags: ['Diseño', 'Instagram'], source: 'asana', status: 'completed' },
    { id: '2', title: 'Optimización de puja Meta Ads — Conversiones', date: '2024-06-12', description: 'Se ajustó la estrategia de puja de "Maximizar conversiones" a "CPA objetivo" en $8.50. Resultado: CPA de $11.2 a $7.9.', tags: ['Ads', 'Estrategia'], source: 'asana', status: 'completed' },
    { id: '3', title: 'Sincronización MCP — Junio 2024', date: '2024-06-10', description: 'Importación automática de KPIs consolidados. ROAS consolidado: 5.2x.', tags: ['Metricool', 'Automático'], source: 'metricool', status: 'completed' },
    { id: '4', title: 'Estrategia de Contenido Q3', date: '2024-06-08', description: 'Sesión de planificación estratégica para el tercer trimestre. 3 pilares: Educativo (40%), Promocional (35%), Comunidad (25%).', tags: ['Estrategia', 'Copywriting'], source: 'asana', status: 'completed' },
    { id: '5', title: 'Lanzamiento Campaña Google Search', date: '2024-06-05', description: '45 keywords de alta intención activadas. Budget diario: $35 USD. CPC estimado: $0.85.', tags: ['Ads', 'Google'], source: 'asana', status: 'completed' },
    { id: '6', title: 'Setup TikTok Ads — Pixel + Audiencias', date: '2024-06-01', description: 'Pixel instalado + audiencias lookalike creadas. Primera campaña activa con $15/día.', tags: ['Ads', 'TikTok'], source: 'asana', status: 'completed' },
    { id: '7', title: 'Auditoría SEO del sitio web', date: '2024-05-28', description: '12 oportunidades de mejora detectadas en meta tags y encabezados.', tags: ['Estrategia', 'SEO'], source: 'asana', status: 'in-progress' },
    { id: '8', title: 'Diseño de Landing Page — Promoción Verano', date: '2024-05-25', description: 'Wireframe y diseño final. Formulario de captación + Meta Pixel. Conversión objetivo: 4.5%.', tags: ['Diseño', 'Copywriting'], source: 'asana', status: 'completed' },
  ],
  tenant_cafemax: [
    { id: 'cm1', title: 'Fotografía Profesional de Producto', date: '2024-06-14', description: 'Sesión de fotos para las 3 líneas principales: Origen, Premium y Cold Brew. 45 fotos entregadas.', tags: ['Diseño'], source: 'asana', status: 'completed' },
    { id: 'cm2', title: 'Campaña "Mañanas CaféMax" en Instagram', date: '2024-06-10', description: 'Serie de 5 reels con influencer local. Alcance estimado: 15K cuentas.', tags: ['Ads', 'Instagram'], source: 'asana', status: 'in-progress' },
    { id: 'cm3', title: 'Setup Google My Business Optimizado', date: '2024-06-05', description: 'Perfil actualizado con fotos, horarios y respuestas a reseñas. Visibilidad local +22%.', tags: ['Estrategia', 'Google'], source: 'asana', status: 'completed' },
  ],
  tenant_technova: [],
  tenant_petlife: [
    { id: 'pl1', title: 'Pauta en redes para adopción', date: '2024-03-15', description: 'Campaña de awareness para evento de adopción. CPC: $0.42.', tags: ['Ads'], source: 'asana', status: 'completed' },
  ],
};
