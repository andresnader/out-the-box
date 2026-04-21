import { Activity, Gauge, TrendingUp, Zap } from 'lucide-react';
import type { MonthStat } from '../../ingesta/mockData';

interface HealthScoreProps {
  stats: MonthStat[];
}

export const HealthScore = ({ stats }: HealthScoreProps) => {
  const latest = stats[stats.length - 1];
  const prev = stats[stats.length - 2];

  // Health Score = weighted average of ROAS growth + Engagement growth + CPA reduction
  const roasGrowth = prev ? ((latest.roas - prev.roas) / prev.roas) * 100 : 0;
  const engGrowth = prev ? ((latest.engagement - prev.engagement) / prev.engagement) * 100 : 0;
  const cpaReduction = prev ? ((prev.cpa - latest.cpa) / prev.cpa) * 100 : 0;

  const rawScore = Math.min(100, Math.max(0, 50 + (roasGrowth * 0.4 + engGrowth * 0.3 + cpaReduction * 0.3)));
  const score = Math.round(rawScore);

  const getScoreColor = (s: number) => {
    if (s >= 80) return { ring: 'stroke-emerald-500', text: 'text-emerald-500', label: 'Excelente', bg: 'bg-emerald-50 dark:bg-emerald-900/20' };
    if (s >= 60) return { ring: 'stroke-blue-500', text: 'text-blue-500', label: 'Bueno', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    if (s >= 40) return { ring: 'stroke-amber-500', text: 'text-amber-500', label: 'Regular', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    return { ring: 'stroke-brand-500', text: 'text-brand-500', label: 'Requiere Atención', bg: 'bg-brand-50 dark:bg-brand-900/20' };
  };

  const scoreStyle = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  const metrics = [
    { label: 'ROAS', value: `${latest.roas}x`, change: `${roasGrowth > 0 ? '+' : ''}${roasGrowth.toFixed(1)}%`, icon: TrendingUp },
    { label: 'Engagement', value: `${latest.engagement}%`, change: `${engGrowth > 0 ? '+' : ''}${engGrowth.toFixed(1)}%`, icon: Activity },
    { label: 'CPA', value: `$${latest.cpa}`, change: `${cpaReduction > 0 ? '-' : '+'}${Math.abs(cpaReduction).toFixed(1)}%`, icon: Zap },
  ];

  return (
    <div className="card p-8 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
      <div className="flex items-center gap-2 mb-6">
        <Gauge size={20} className="text-brand-600 dark:text-brand-400" />
        <h3 className="font-extrabold text-lg tracking-tight text-surface-900 dark:text-white">
          Health Score
        </h3>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              className="stroke-surface-100 dark:stroke-surface-700"
              strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              className={`${scoreStyle.ring} transition-all duration-1000 ease-out`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${scoreStyle.text}`}>{score}</span>
            <span className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest">/ 100</span>
          </div>
        </div>
        <div className={`mt-4 px-4 py-1.5 rounded-full ${scoreStyle.bg}`}>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${scoreStyle.text}`}>
            {scoreStyle.label}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between p-3 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
            <div className="flex items-center gap-3">
              <m.icon size={16} className="text-surface-400" />
              <span className="text-xs font-extrabold text-surface-500 dark:text-surface-400 uppercase tracking-wider">{m.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-surface-900 dark:text-white">{m.value}</span>
              <span className={`text-[10px] font-bold ${m.change.startsWith('+') || m.change.startsWith('-') && m.label === 'CPA' ? 'text-emerald-500' : 'text-brand-500'}`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
