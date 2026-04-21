import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color?: 'rose' | 'emerald' | 'blue' | 'amber' | 'purple';
  delay?: number;
}

const colorMap = {
  rose:    { bg: 'bg-brand-50 dark:bg-brand-900/20',  text: 'text-brand-600 dark:text-brand-400' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-400' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/20',  text: 'text-amber-600 dark:text-amber-400' },
  purple:  { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
};

export const StatCard = ({ title, value, change, icon: Icon, color = 'rose', delay = 0 }: StatCardProps) => {
  const c = colorMap[color];
  const isPositive = change.startsWith('+');

  return (
    <div
      className="card card-hover p-6 group animate-slide-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold text-surface-400 dark:text-surface-500 uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-2xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            {value}
          </h3>
          {change && (
            <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-brand-500'}`}>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{change} vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-2xl ${c.bg} ${c.text} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
