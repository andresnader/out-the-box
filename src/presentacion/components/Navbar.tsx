import { Sun, Moon, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ClientConfig } from '../../ingesta/mockData';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  client: ClientConfig;
}

const TABS = [
  { key: 'dashboard', label: 'Resultados' },
  { key: 'activities', label: 'Bitácora' },
  { key: 'admin', label: 'Configuración' },
];

export const Navbar = ({ activeTab, onTabChange, client }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="glass border-b border-surface-200 dark:border-surface-800 fixed w-full z-40 shadow-ambient-1" id="main-nav">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-surface-900 font-extrabold text-xl shadow-lg transform -rotate-3 italic">
              B
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-none tracking-tighter text-surface-900 dark:text-white">
                BOX<span className="text-brand-600 dark:text-brand-400">STUDIO</span>
              </h1>
              <p className="text-[9px] font-extrabold text-surface-400 dark:text-surface-500 uppercase tracking-[0.2em]">
                Client Portal • v2.0
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                id={`nav-${tab.key}`}
                onClick={() => onTabChange(tab.key)}
                className={`nav-link ${activeTab === tab.key ? 'nav-link-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Status badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-extrabold text-surface-500 dark:text-surface-400 uppercase tracking-tighter">
                MCP: Online
              </span>
            </div>

            {/* Client avatar */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700">
              <span className="text-sm">{client.logo}</span>
              <span className="text-[10px] font-extrabold text-surface-600 dark:text-surface-300 uppercase tracking-tighter">
                {client.name}
              </span>
            </div>

            {/* Theme toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 
                hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications */}
            <button className="p-2.5 rounded-xl text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-surface-400 hover:text-surface-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-[73px] left-0 right-0 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 p-6 space-y-2 animate-slide-down shadow-ambient-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { onTabChange(tab.key); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-2xl font-extrabold text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                    : 'text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
