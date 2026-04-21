// ============================================================
// MOCK DATA — Simulación de ingesta Metricool + Asana
// ============================================================

export interface MonthStat {
  month: string;
  invested: number;
  return: number;
  engagement: number;
  followers: number;
  reach: number;
  cpa: number;
  roas: number;
  order: number;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  source: 'asana' | 'metricool' | 'manual';
  status: 'completed' | 'in-progress' | 'pending';
}

export interface ClientConfig {
  name: string;
  logo: string;
  accountManager: string;
  accountManagerAvatar: string;
  plan: string;
}

// ── KPIs mensuales (Metricool MCP) ──────────────────────────
export const MOCK_STATS: MonthStat[] = [
  { month: 'Ene', invested: 2500, return: 8000,  engagement: 4.2, followers: 1200, reach: 45000,  cpa: 12.5, roas: 3.2,  order: 1 },
  { month: 'Feb', invested: 3000, return: 12000, engagement: 5.1, followers: 1550, reach: 62000,  cpa: 10.8, roas: 4.0,  order: 2 },
  { month: 'Mar', invested: 2800, return: 11000, engagement: 4.8, followers: 1900, reach: 58000,  cpa: 11.2, roas: 3.93, order: 3 },
  { month: 'Abr', invested: 4200, return: 18500, engagement: 6.5, followers: 2450, reach: 89000,  cpa: 8.7,  roas: 4.4,  order: 4 },
  { month: 'May', invested: 4800, return: 22000, engagement: 7.1, followers: 2850, reach: 105000, cpa: 7.9,  roas: 4.58, order: 5 },
  { month: 'Jun', invested: 5100, return: 26500, engagement: 7.8, followers: 3200, reach: 128000, cpa: 7.2,  roas: 5.2,  order: 6 },
];

// ── Bitácora de gestión (Asana + Metricool) ─────────────────
export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Rediseño de Creativos Instagram Reels',
    date: '2024-06-15',
    description: 'Se completó la producción de 8 reels con nuevo branding visual. Engagement promedio por reel: 8.2%. Los formatos de antes/después mostraron mejor performance.',
    tags: ['Diseño', 'Instagram'],
    source: 'asana',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Optimización de puja Meta Ads — Conversiones',
    date: '2024-06-12',
    description: 'Se ajustó la estrategia de puja de "Maximizar conversiones" a "CPA objetivo" en $8.50. Resultado: reducción del CPA de $11.2 a $7.9 en 15 días.',
    tags: ['Ads', 'Estrategia'],
    source: 'asana',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Sincronización MCP — Junio 2024',
    date: '2024-06-10',
    description: 'Importación automática de KPIs de Instagram, Facebook Ads y TikTok Ads realizada con éxito. ROAS consolidado: 5.2x.',
    tags: ['Metricool', 'Automático'],
    source: 'metricool',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Estrategia de Contenido Q3 — Planificación',
    date: '2024-06-08',
    description: 'Sesión de planificación estratégica para el tercer trimestre. Se definieron 3 pilares de contenido: Educativo (40%), Promocional (35%), Comunidad (25%).',
    tags: ['Estrategia', 'Copywriting'],
    source: 'asana',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Lanzamiento Campaña Google Search',
    date: '2024-06-05',
    description: 'Activación de la campaña de Google Search Ads con 45 keywords de alta intención. Budget diario: $35 USD. CPC estimado: $0.85.',
    tags: ['Ads', 'Google'],
    source: 'asana',
    status: 'completed',
  },
  {
    id: '6',
    title: 'Setup TikTok Ads — Pixel + Audiencias',
    date: '2024-06-01',
    description: 'Instalación del pixel de TikTok y creación de audiencias lookalike basadas en compradores de los últimos 90 días. Primera campaña activa con $15/día.',
    tags: ['Ads', 'TikTok'],
    source: 'asana',
    status: 'completed',
  },
  {
    id: '7',
    title: 'Auditoría SEO del sitio web',
    date: '2024-05-28',
    description: 'Análisis completo de posicionamiento orgánico. Se detectaron 12 oportunidades de mejora en meta tags y estructura de encabezados. Plan de acción en ejecución.',
    tags: ['Estrategia', 'SEO'],
    source: 'asana',
    status: 'in-progress',
  },
  {
    id: '8',
    title: 'Diseño de Landing Page — Promoción Verano',
    date: '2024-05-25',
    description: 'Wireframe y diseño final de la landing de temporada alta. Incluye formulario de captación y seguimiento con Meta Pixel. Tasa de conversión objetivo: 4.5%.',
    tags: ['Diseño', 'Copywriting'],
    source: 'asana',
    status: 'completed',
  },
];

// ── Composición de Ads (Metricool) ──────────────────────────
export const ADS_COMPOSITION = [
  { name: 'Meta Ads',      value: 55, color: '#f43f5e', budget: 2805 },
  { name: 'Google Search',  value: 30, color: '#0f172a', budget: 1530 },
  { name: 'TikTok Ads',     value: 15, color: '#10b981', budget: 765  },
];

// ── Datos de engagement por red ─────────────────────────────
export const SOCIAL_BREAKDOWN = [
  { network: 'Instagram',  followers: 1850, engagement: 8.2, posts: 24 },
  { network: 'Facebook',   followers: 620,  engagement: 3.4, posts: 18 },
  { network: 'TikTok',     followers: 480,  engagement: 12.1, posts: 12 },
  { network: 'LinkedIn',   followers: 250,  engagement: 5.6, posts: 8  },
];

// ── Configuración del cliente ───────────────────────────────
export const CLIENT_CONFIG: ClientConfig = {
  name: 'UrbanFit Studio',
  logo: '🏋️',
  accountManager: 'Andrés Nader',
  accountManagerAvatar: 'AN',
  plan: 'Growth Pro',
};

// ── Categorías de filtro para la Bitácora ───────────────────
export const ACTIVITY_CATEGORIES = [
  { label: 'Todo', value: 'all', color: 'bg-surface-900 dark:bg-white text-white dark:text-surface-900' },
  { label: 'Estrategia', value: 'Estrategia', color: 'bg-blue-500 text-white' },
  { label: 'Diseño', value: 'Diseño', color: 'bg-purple-500 text-white' },
  { label: 'Ads', value: 'Ads', color: 'bg-brand-600 text-white' },
  { label: 'Copywriting', value: 'Copywriting', color: 'bg-amber-500 text-white' },
];

// ── Mensajes del chatbot IA ─────────────────────────────────
export const AI_SUGGESTIONS = [
  '¿Cómo va mi ROAS este mes?',
  '¿Por qué subió el CPA en marzo?',
  'Explícame el reporte de este mes',
  '¿Qué acciones de Asana impactaron mis ventas?',
  'Compara mi inversión vs retorno del trimestre',
];

export const AI_RESPONSES: Record<string, string> = {
  '¿Cómo va mi ROAS este mes?': 
    '📊 Tu ROAS actual de junio es de **5.2x**, lo que significa que por cada $1 invertido estás generando $5.20 en ventas. Esto representa un incremento del **18.2%** respecto al mes pasado (4.4x). La principal palanca de mejora fue la optimización de pujas en Meta Ads que redujo tu CPA un 17%.',
  
  '¿Por qué subió el CPA en marzo?':
    '🔍 En marzo tu CPA subió a **$11.2** (vs $10.8 en febrero). Esto se debió a dos factores:\n\n1. **Fatiga de audiencias**: Las audiencias core llevaban 6 semanas sin rotación\n2. **Competencia estacional**: El CPM promedio en tu vertical subió un 14% por temporada alta\n\nLa acción correctiva fue implementar audiencias lookalike frescas y ajustar la puja a CPA objetivo, lo cual corrigió la tendencia en abril.',
  
  'Explícame el reporte de este mes':
    '📋 **Resumen Ejecutivo — Junio 2024:**\n\n• **Inversión total:** $5,100 USD (+6.3% vs mayo)\n• **Retorno en ventas:** $26,500 USD (+20.5%)\n• **ROAS:** 5.2x (mejor mes del año)\n• **CPA:** $7.2 (récord histórico más bajo)\n• **Engagement:** 7.8% promedio (+9.9%)\n• **Comunidad:** 3,200 seguidores totales (+12.3%)\n\nLas acciones más impactantes fueron el rediseño de creativos Reels y la optimización de pujas Meta Ads.',
  
  '¿Qué acciones de Asana impactaron mis ventas?':
    '🎯 Las acciones con mayor impacto en ventas de este período fueron:\n\n1. **Optimización de puja Meta Ads** (Jun 12) — Redujo CPA de $11.2 a $7.9 → +$4,500 en retorno\n2. **Rediseño de Creativos Reels** (Jun 15) — Engagement subió a 8.2% → +350 seguidores orgánicos\n3. **Lanzamiento Google Search** (Jun 5) — Capturó 18% del retorno total con CPC de $0.85\n\nEn total, estas 3 acciones representan aproximadamente el **72% del crecimiento** de este mes.',
  
  'Compara mi inversión vs retorno del trimestre':
    '📈 **Comparativa Q2 2024 (Abr—Jun):**\n\n| Mes | Inversión | Retorno | ROAS |\n|-----|-----------|---------|------|\n| Abril | $4,200 | $18,500 | 4.4x |\n| Mayo | $4,800 | $22,000 | 4.6x |\n| Junio | $5,100 | $26,500 | 5.2x |\n\n**Total Q2:** $14,100 invertidos → $67,000 generados (**ROAS: 4.75x**)\n\nLa tendencia es claramente ascendente. Se recomienda mantener el ritmo de inversión y escalar gradualmente en Q3 apuntando a $6,000/mes.',
};
