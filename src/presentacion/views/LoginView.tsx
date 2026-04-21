import { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { WebGLCube } from '../components/WebGLCube';

interface LoginViewProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export const LoginView = ({ onLogin }: LoginViewProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-950">
      {/* Left Panel — Glass Cube Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Stitch background: deep burgundy gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #200e11 0%, #1a090c 40%, #291619 100%)' }} />
        
        {/* Magenta ambient glow orbs */}
        <div className="absolute top-16 left-16 w-72 h-72 rounded-full blur-[100px] animate-float" style={{ background: 'rgba(254, 0, 101, 0.08)' }} />
        <div className="absolute bottom-16 right-16 w-96 h-96 rounded-full blur-[120px] animate-float" style={{ background: 'rgba(255, 78, 122, 0.05)', animationDelay: '3s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,178,189,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,178,189,.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px' 
          }} 
        />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          {/* Logo top */}
          <div className="flex items-center gap-3 relative z-20">
            <img src="/logo-web-white.png" alt="Box Studio" className="h-32 w-auto brightness-0 invert opacity-90" />
          </div>

          {/* WebGL Cube — Center Hero */}
          <div className="flex-1 flex items-center justify-center -mt-8 relative z-10">
            <div className="w-full h-full max-h-[600px] max-w-[600px] relative">
              <WebGLCube />
            </div>
          </div>

          {/* Bottom content */}
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter leading-[1.1] mb-4" style={{ color: '#fddadd' }}>
              Tu agencia,
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #ffb2bd, #fe0065)' }}>
                transparente.
              </span>
            </h2>
            <p className="text-base leading-relaxed font-medium mb-8" style={{ color: '#ad878c' }}>
              Visualiza el rendimiento de tus campañas en tiempo real, consulta con tu IA 24/7, 
              y nunca más esperes por un reporte manual.
            </p>

            <div className="flex items-center gap-8">
              {[
                { value: '5.2x', label: 'ROAS Promedio' },
                { value: '-17%', label: 'Reducción CPA' },
                { value: '24/7', label: 'Consultor IA' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-extrabold tracking-tight" style={{ color: '#fddadd' }}>{stat.value}</p>
                  <p className="text-[9px] font-extrabold uppercase tracking-widest mt-1" style={{ color: '#5d3f43' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden mb-12 flex items-center gap-3">
            <div className="w-10 h-10 bg-surface-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg transform -rotate-3 italic">
              B
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-none tracking-tighter text-surface-900 dark:text-white">
                BOX<span className="text-brand-600">STUDIO</span>
              </h1>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter mb-2">
              Bienvenido de vuelta
            </h2>
            <p className="text-surface-500 font-medium">
              Ingresa a tu portal de performance y gestión.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded-md border-surface-300 text-brand-600 focus:ring-brand-500/20" />
                <span className="text-xs font-bold text-surface-500">Recuérdame</span>
              </label>
              <button type="button" className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-surface-900 dark:bg-white text-white dark:text-surface-900 
                font-extrabold rounded-2xl hover:bg-surface-800 dark:hover:bg-surface-100
                transition-all shadow-lg hover:shadow-xl active:scale-[0.98]
                flex items-center justify-center gap-3 text-sm tracking-widest uppercase
                disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-surface-300 dark:border-t-surface-900 rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-surface-100 dark:border-surface-800 text-center">
            <p className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest">
              Powered by Box Studio • Medios Digitales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
