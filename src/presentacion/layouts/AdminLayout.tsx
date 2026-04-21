import { useState } from 'react';
import {
  LayoutDashboard, Users, Settings, Link2, FileText, LogOut,
  Moon, Sun, ChevronLeft, ChevronRight, BarChart3, UserCog, Menu, X
} from 'lucide-react';
import { useAuth } from '../../procesamiento/auth/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { TenantSwitcher } from '../components/TenantSwitcher';
import type { ReactNode } from 'react';

interface AdminLayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: ReactNode;
}

const NAV_ITEMS = [
  { id: 'overview',     label: 'Panel General',       icon: BarChart3 },
  { id: 'clients',      label: 'Clientes',            icon: Users },
  { id: 'dashboard',    label: 'Dashboard Cliente',   icon: LayoutDashboard },
  { id: 'activities',   label: 'Bitácora',            icon: FileText },
  { id: 'connections',  label: 'Conexiones API',      icon: Link2 },
  { id: 'team',         label: 'Equipo',              icon: UserCog },
  { id: 'settings',     label: 'Configuración',       icon: Settings },
];

export const AdminLayout = ({ activeSection, onSectionChange, children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 h-[88px]">
        {collapsed ? (
          <img src="/box-imagotipo.jpeg" alt="B" className="w-16 h-16 rounded-lg object-cover" />
        ) : (
          <img src="/logo-web-white.png" alt="Box Studio" className="h-16 w-auto" />
        )}
      </div>

      {/* Tenant Switcher */}
      {!collapsed && (
        <div className="px-4 mb-4">
          <TenantSwitcher />
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all
                ${isActive
                  ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                  : 'text-surface-400 hover:bg-white/5 hover:text-surface-200'
                }
              `}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && (
                <span className="text-xs font-extrabold uppercase tracking-widest truncate">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto border-t border-white/10">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-surface-400 hover:bg-white/5 hover:text-surface-200 transition-all mb-2"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && (
            <span className="text-xs font-extrabold uppercase tracking-widest">
              {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          )}
        </button>

        {/* User profile */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 mb-2">
            <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-extrabold text-xs shrink-0">
              {user.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-white truncate">{user.displayName}</p>
              <p className="text-[9px] font-bold text-surface-500 uppercase tracking-widest">
                {user.role === 'super_admin' ? 'Super Admin' : 'Account Manager'}
              </p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && (
            <span className="text-xs font-extrabold uppercase tracking-widest">
              Cerrar Sesión
            </span>
          )}
        </button>
      </div>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute top-6 -right-3 w-6 h-6 bg-surface-700 border border-surface-600 rounded-full items-center justify-center text-surface-400 hover:text-white hover:bg-surface-600 transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </>
  );

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-surface-900 text-white rounded-xl shadow-xl"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 h-full bg-surface-900 flex flex-col overflow-y-auto animate-slide-up">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-surface-400 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col shrink-0 bg-surface-900 relative transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        <div className="sticky top-0 h-screen flex flex-col overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-6 lg:p-10 pt-16 lg:pt-10">
        <div className="max-w-[1440px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
