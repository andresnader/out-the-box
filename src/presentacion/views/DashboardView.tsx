import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, MessageSquare, RefreshCw, DollarSign, TrendingUp, Heart, Users, Globe } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { HealthScore } from '../components/HealthScore';
import { useTheme } from '../context/ThemeContext';
import type { MonthStat } from '../../ingesta/mockData';
import { ADS_COMPOSITION, SOCIAL_BREAKDOWN } from '../../ingesta/mockData';

interface DashboardViewProps {
  monthlyStats: MonthStat[];
  isAdmin: boolean;
  syncing: boolean;
  handleMetricoolSync: () => void;
  showNotification: (msg: string) => void;
}

export const DashboardView = ({ monthlyStats, isAdmin, syncing, handleMetricoolSync, showNotification }: DashboardViewProps) => {
  const { theme } = useTheme();
  const latest = monthlyStats[monthlyStats.length - 1];

  const gridColor = theme === 'dark' ? '#1e293b' : '#f1f5f9';
  const tickColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#e2e8f0';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-3">
        <button
          id="download-pdf"
          onClick={() => showNotification('Generando PDF de resumen mensual...')}
          className="btn-ghost flex items-center gap-2"
        >
          <Download size={16} /> Descargar PDF
        </button>
        <button
          id="send-whatsapp"
          onClick={() => showNotification('Enlace de WhatsApp generado y enviado.')}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-pill text-xs font-extrabold 
            hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-emerald-900/20
            hover:-translate-y-px active:scale-[0.98] uppercase tracking-widest"
        >
          <MessageSquare size={16} /> Reporte WhatsApp
        </button>
        {isAdmin && (
          <button
            id="sync-metricool"
            onClick={handleMetricoolSync}
            disabled={syncing}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Sincronizando...' : 'Sync Metricool'}
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Inversión Ads" value={`$${latest?.invested.toLocaleString()}`} change="+6.3%" icon={DollarSign} color="rose" delay={0} />
        <StatCard title="Retorno Venta" value={`$${latest?.return.toLocaleString()}`} change="+20.5%" icon={TrendingUp} color="emerald" delay={80} />
        <StatCard title="Engagement Social" value={`${latest?.engagement}%`} change="+0.7%" icon={Heart} color="amber" delay={160} />
        <StatCard title="Comunidad Total" value={latest?.followers.toLocaleString()} change="+350" icon={Users} color="blue" delay={240} />
      </div>

      {/* Main Grid: Chart + Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Area Chart */}
        <div className="lg:col-span-2 card p-8 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h3 className="font-extrabold text-lg tracking-tight text-surface-900 dark:text-white">
              Inversión vs Retorno
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-surface-400">
                <div className="w-3 h-3 rounded-full bg-brand-500" /> Inversión
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-surface-400">
                <div className="w-3 h-3 rounded-full bg-emerald-500" /> Retorno
              </div>
            </div>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyStats}>
                <defs>
                  <linearGradient id="gradInv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradRet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '20px',
                    border: `1px solid ${tooltipBorder}`,
                    backgroundColor: tooltipBg,
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                  }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="invested" name="Inversión" stroke="#f43f5e" fillOpacity={1} fill="url(#gradInv)" strokeWidth={3} />
                <Area type="monotone" dataKey="return" name="Retorno" stroke="#10b981" fillOpacity={1} fill="url(#gradRet)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Score */}
        <HealthScore stats={monthlyStats} />
      </div>

      {/* Composition + Social Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ads Composition */}
        <div className="card p-8 animate-slide-up" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <h3 className="font-extrabold text-lg tracking-tight mb-2 text-surface-900 dark:text-white">Composición Ads</h3>
          <p className="text-surface-400 text-xs font-medium mb-8">Distribución de presupuesto vía Metricool.</p>

          <div className="space-y-6">
            {ADS_COMPOSITION.map(platform => (
              <div key={platform.name}>
                <div className="flex justify-between text-xs font-extrabold mb-2">
                  <span className="text-surface-900 dark:text-white">{platform.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-surface-400">${platform.budget.toLocaleString()}</span>
                    <span className="text-surface-400">{platform.value}%</span>
                  </div>
                </div>
                <div className="w-full bg-surface-100 dark:bg-surface-700 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${platform.value}%`, backgroundColor: platform.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-surface-100 dark:border-surface-700">
            <div className="bg-surface-50 dark:bg-surface-900/50 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-white dark:bg-surface-800 rounded-xl shadow-sm text-brand-600 dark:text-brand-400">
                <Globe size={18} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-surface-400 uppercase leading-none mb-1">Dato Clave</p>
                <p className="text-xs font-bold text-surface-700 dark:text-surface-300">
                  El CPA bajó un 17% este mes gracias a la optimización de pujas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Breakdown */}
        <div className="card p-8 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <h3 className="font-extrabold text-lg tracking-tight mb-2 text-surface-900 dark:text-white">Desglose por Red Social</h3>
          <p className="text-surface-400 text-xs font-medium mb-8">Métricas individuales de cada plataforma.</p>

          <div className="space-y-4">
            {SOCIAL_BREAKDOWN.map((net) => (
              <div key={net.network} className="p-4 rounded-2xl bg-surface-50 dark:bg-surface-900/50 hover:bg-surface-100 dark:hover:bg-surface-700/50 transition-colors group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-sm text-surface-900 dark:text-white">{net.network}</span>
                  <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                    {net.engagement}% eng
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">Seguidores</p>
                    <p className="text-sm font-extrabold text-surface-900 dark:text-white">{net.followers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">Posts</p>
                    <p className="text-sm font-extrabold text-surface-900 dark:text-white">{net.posts}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold text-surface-400 uppercase tracking-widest">Engagement</p>
                    <p className="text-sm font-extrabold text-emerald-500">{net.engagement}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
