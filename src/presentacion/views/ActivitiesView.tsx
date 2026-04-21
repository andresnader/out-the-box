import { useState } from 'react';
import { Calendar, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import type { Activity } from '../../ingesta/mockData';
import { ACTIVITY_CATEGORIES } from '../../ingesta/mockData';

interface ActivitiesViewProps {
  activities: Activity[];
}

const statusConfig = {
  'completed':   { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'Completado' },
  'in-progress': { icon: Clock,       color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-900/20',   label: 'En Progreso' },
  'pending':     { icon: Calendar,    color: 'text-surface-400', bg: 'bg-surface-50 dark:bg-surface-800',   label: 'Pendiente' },
};

const sourceLabel = {
  asana: { text: 'Asana', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800' },
  metricool: { text: 'Metricool', color: 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-100 dark:border-brand-800' },
  manual: { text: 'Manual', color: 'bg-surface-50 dark:bg-surface-800 text-surface-500 dark:text-surface-400 border-surface-200 dark:border-surface-700' },
};

export const ActivitiesView = ({ activities }: ActivitiesViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = activities.filter(act => {
    const matchCategory = selectedCategory === 'all' || act.tags.includes(selectedCategory);
    const matchSearch = searchQuery === '' || 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={16} className="text-surface-400 mr-1" />
            {ACTIVITY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all
                  ${selectedCategory === cat.value
                    ? cat.color + ' shadow-sm'
                    : 'bg-surface-50 dark:bg-surface-800 text-surface-400 dark:text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
              >
                #{cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              id="activity-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar actividad..."
              className="input-field pl-11 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="card overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-surface-100 dark:border-surface-700 bg-surface-50/50 dark:bg-surface-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-surface-900 dark:text-white tracking-tight">Bitácora de Gestión</h2>
            <p className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mt-1">
              {filtered.length} de {activities.length} acciones
            </p>
          </div>
          <div className="flex gap-2">
            <span className="chip bg-surface-900 dark:bg-white text-white dark:text-surface-900 border-transparent shadow-lg">
              Powered by Asana
            </span>
          </div>
        </div>

        <div className="divide-y divide-surface-100 dark:divide-surface-700">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-surface-400 font-bold text-sm">No se encontraron actividades para esta búsqueda.</p>
            </div>
          ) : (
            filtered.map((act, index) => {
              const status = statusConfig[act.status];
              const StatusIcon = status.icon;
              const source = sourceLabel[act.source];

              return (
                <div
                  key={act.id}
                  className="p-6 sm:p-8 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-all group animate-slide-up"
                  style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Timeline icon */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-11 h-11 ${status.bg} rounded-2xl flex items-center justify-center 
                        group-hover:scale-110 transition-transform duration-300`}>
                        <StatusIcon size={20} className={status.color} />
                      </div>
                      {index !== filtered.length - 1 && (
                        <div className="w-0.5 flex-1 bg-surface-100 dark:bg-surface-700 mt-2 min-h-[24px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h4 className="font-extrabold text-surface-900 dark:text-white text-base sm:text-lg leading-tight">
                          {act.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-400 rounded text-[9px] font-extrabold uppercase tracking-tighter">
                            {act.date}
                          </span>
                          <span className={`chip ${source.color} border text-[9px]`}>
                            {source.text}
                          </span>
                        </div>
                      </div>
                      <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed font-medium max-w-2xl">
                        {act.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {act.tags.map((tag) => (
                          <span
                            key={tag}
                            className="chip bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-600 
                              text-surface-400 dark:text-surface-500
                              group-hover:border-brand-100 dark:group-hover:border-brand-800 
                              group-hover:text-brand-500 dark:group-hover:text-brand-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
