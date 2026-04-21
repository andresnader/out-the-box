import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';

import { MOCK_STATS, MOCK_ACTIVITIES, CLIENT_CONFIG } from './ingesta/mockData';
import type { MonthStat, Activity } from './ingesta/mockData';

import { Navbar } from './presentacion/components/Navbar';
import { AIChatbot } from './presentacion/components/AIChatbot';
import { LoginView } from './presentacion/views/LoginView';
import { DashboardView } from './presentacion/views/DashboardView';
import { ActivitiesView } from './presentacion/views/ActivitiesView';
import { AdminView } from './presentacion/views/AdminView';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(true);
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [monthlyStats] = useState<MonthStat[]>(MOCK_STATS);
  const [syncing, setSyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const handleMetricoolSync = useCallback(async () => {
    setSyncing(true);
    setTimeout(() => {
      showNotification('Datos de Metricool sincronizados correctamente.');
      setSyncing(false);
    }, 1800);
  }, [showNotification]);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  // ── Login Gate ──
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  // ── Main App ──
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        client={CLIENT_CONFIG}
      />

      <main className="pt-28 pb-16 px-6 lg:px-10 max-w-[1440px] mx-auto">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
              {activeTab === 'dashboard' ? 'Performance Global' : activeTab === 'activities' ? 'Historial Operativo' : 'Panel Box Studio'}
            </h2>
            <p className="text-surface-500 dark:text-surface-400 font-medium mt-1">
              {activeTab === 'dashboard'
                ? 'Visualización de datos integrados vía Metricool MCP.'
                : activeTab === 'activities'
                ? 'Registro sincronizado desde Asana y fuentes automatizadas.'
                : 'Configuración de integraciones y automatización.'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex p-1 rounded-2xl shadow-ambient-1 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800">
            <button
              id="role-client"
              onClick={() => setIsAdmin(false)}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all uppercase tracking-widest ${
                !isAdmin
                  ? 'bg-brand-600 text-white shadow-lg'
                  : 'text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              Cliente
            </button>
            <button
              id="role-agency"
              onClick={() => setIsAdmin(true)}
              className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all uppercase tracking-widest ${
                isAdmin
                  ? 'bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-lg'
                  : 'text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
              }`}
            >
              Agencia
            </button>
          </div>
        </div>

        {/* Views */}
        {activeTab === 'dashboard' && (
          <DashboardView
            monthlyStats={monthlyStats}
            isAdmin={isAdmin}
            syncing={syncing}
            handleMetricoolSync={handleMetricoolSync}
            showNotification={showNotification}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesView activities={activities} />
        )}

        {activeTab === 'admin' && isAdmin && (
          <AdminView
            syncing={syncing}
            handleMetricoolSync={handleMetricoolSync}
            client={CLIENT_CONFIG}
            showNotification={showNotification}
          />
        )}

        {activeTab === 'admin' && !isAdmin && (
          <div className="card p-12 text-center animate-fade-in">
            <p className="text-surface-400 font-bold text-sm">
              Esta sección está disponible únicamente para el equipo de la agencia.
            </p>
          </div>
        )}
      </main>

      {/* AI Chatbot (README 3.3) */}
      <AIChatbot />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-slide-up">
          <div className="bg-surface-900 dark:bg-white text-white dark:text-surface-900 px-8 py-4 rounded-pill shadow-2xl flex items-center gap-3 border border-white/10 dark:border-surface-200">
            <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-xs uppercase tracking-widest">{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
}
