import { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAuth } from './procesamiento/auth/AuthContext';
import { useTenant } from './procesamiento/tenant/TenantContext';
import { isAgencyRole } from './ingesta/types/user';

// Layouts
import { AdminLayout } from './presentacion/layouts/AdminLayout';
import { ClientLayout } from './presentacion/layouts/ClientLayout';

// Login
import { LoginView } from './presentacion/views/LoginView';

// Client views
import { DashboardView } from './presentacion/views/DashboardView';
import { ActivitiesView } from './presentacion/views/ActivitiesView';

// Admin views
import { AgencyOverview } from './presentacion/views/admin/AgencyOverview';
import { TenantListView } from './presentacion/views/admin/TenantListView';
import { TenantWizard } from './presentacion/views/admin/TenantWizard';
import { ApiConnectionsPanel } from './presentacion/views/admin/ApiConnectionsPanel';

// Shared
import { AIChatbot } from './presentacion/components/AIChatbot';

export default function App() {
  const { user, isAuthenticated, login } = useAuth();
  const { activeTenant, tenantStats, tenantActivities, syncing, syncTenant } = useTenant();

  const [adminSection, setAdminSection] = useState('overview');
  const [clientTab, setClientTab] = useState('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const handleMetricoolSync = useCallback(async () => {
    if (!activeTenant) return;
    await syncTenant(activeTenant.id);
    showNotification('Datos sincronizados correctamente.');
  }, [activeTenant, syncTenant, showNotification]);

  // ── Login Gate ──
  if (!isAuthenticated || !user) {
    return <LoginView onLogin={async (email, password) => { await login(email, password); }} />;
  }

  // ── Client Experience ──
  if (!isAgencyRole(user.role)) {
    return (
      <ClientLayout activeTab={clientTab} onTabChange={setClientTab}>
        {clientTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
                Performance Global
              </h2>
              <p className="text-surface-500 font-medium mt-1">
                Tus datos integrados vía Metricool MCP.
              </p>
            </div>
            <DashboardView
              monthlyStats={tenantStats}
              isAdmin={false}
              syncing={false}
              handleMetricoolSync={() => {}}
              showNotification={showNotification}
            />
          </div>
        )}
        {clientTab === 'activities' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
                Historial Operativo
              </h2>
              <p className="text-surface-500 font-medium mt-1">
                Registro de gestión sincronizado desde Asana.
              </p>
            </div>
            <ActivitiesView activities={tenantActivities} />
          </div>
        )}
        <NotificationToast message={notification} />
      </ClientLayout>
    );
  }

  // ── Agency Experience (Admin / Account Manager) ──
  return (
    <AdminLayout activeSection={adminSection} onSectionChange={setAdminSection}>
      {adminSection === 'overview' && <AgencyOverview />}

      {adminSection === 'clients' && (
        <TenantListView
          onSelectTenant={() => setAdminSection('dashboard')}
          onCreateNew={() => setAdminSection('wizard')}
        />
      )}

      {adminSection === 'wizard' && (
        <TenantWizard
          onBack={() => setAdminSection('clients')}
          onComplete={() => {
            showNotification('Cliente creado exitosamente.');
            setAdminSection('clients');
          }}
        />
      )}

      {adminSection === 'dashboard' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
                Dashboard — {activeTenant?.name ?? 'Sin selección'}
              </h2>
              <p className="text-surface-500 font-medium mt-1">Vista de performance del cliente seleccionado.</p>
            </div>
          </div>
          {activeTenant ? (
            <DashboardView
              monthlyStats={tenantStats}
              isAdmin={true}
              syncing={syncing}
              handleMetricoolSync={handleMetricoolSync}
              showNotification={showNotification}
            />
          ) : (
            <div className="card p-12 text-center">
              <p className="text-surface-400 font-bold">Selecciona un cliente desde el Tenant Switcher.</p>
            </div>
          )}
        </div>
      )}

      {adminSection === 'activities' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">
              Bitácora — {activeTenant?.name ?? 'Sin selección'}
            </h2>
            <p className="text-surface-500 font-medium mt-1">Registro de gestión del cliente.</p>
          </div>
          <ActivitiesView activities={tenantActivities} />
        </div>
      )}

      {adminSection === 'connections' && <ApiConnectionsPanel />}

      {adminSection === 'team' && (
        <div className="card p-12 text-center animate-fade-in">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-extrabold text-surface-900 dark:text-white mb-2">Equipo Box Studio</h3>
          <p className="text-surface-400 text-sm font-medium">Gestión de Account Managers — próximamente.</p>
        </div>
      )}

      {adminSection === 'settings' && (
        <div className="card p-12 text-center animate-fade-in">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-extrabold text-surface-900 dark:text-white mb-2">Configuración</h3>
          <p className="text-surface-400 text-sm font-medium">Ajustes globales de la plataforma — próximamente.</p>
        </div>
      )}

      <AIChatbot />
      <NotificationToast message={notification} />
    </AdminLayout>
  );
}

// ── Notification Toast (shared) ──
function NotificationToast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] animate-slide-up">
      <div className="bg-surface-900 dark:bg-white text-white dark:text-surface-900 px-8 py-4 rounded-pill shadow-2xl flex items-center gap-3 border border-white/10 dark:border-surface-200">
        <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle size={16} className="text-white" />
        </div>
        <span className="font-extrabold text-xs uppercase tracking-widest">{message}</span>
      </div>
    </div>
  );
}
