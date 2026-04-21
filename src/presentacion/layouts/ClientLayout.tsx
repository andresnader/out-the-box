import type { ReactNode } from 'react';
import { useAuth } from '../../procesamiento/auth/AuthContext';
import { useTenant } from '../../procesamiento/tenant/TenantContext';
import { Navbar } from '../components/Navbar';
import { AIChatbot } from '../components/AIChatbot';

interface ClientLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export const ClientLayout = ({ activeTab, onTabChange, children }: ClientLayoutProps) => {
  const { user } = useAuth();
  const { activeTenant } = useTenant();

  if (!user || !activeTenant) return null;

  const clientConfig = {
    name: activeTenant.name,
    logo: activeTenant.branding.logo,
    accountManager: 'Tu Equipo Box Studio',
    accountManagerAvatar: 'BS',
    plan: activeTenant.plan,
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        client={clientConfig}
        isClientView
      />

      <main className="pt-28 pb-16 px-6 lg:px-10 max-w-[1440px] mx-auto">
        {children}
      </main>

      {/* AI Chatbot — always available for clients */}
      <AIChatbot />
    </div>
  );
};
