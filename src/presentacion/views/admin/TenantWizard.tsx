import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Building2, Link2, UserPlus, Palette } from 'lucide-react';

interface TenantWizardProps {
  onBack: () => void;
  onComplete: () => void;
}

const STEPS = [
  { icon: Building2, label: 'Datos del Cliente' },
  { icon: Palette,   label: 'Branding' },
  { icon: Link2,     label: 'Conexiones API' },
  { icon: UserPlus,  label: 'Crear Acceso' },
];

export const TenantWizard = ({ onBack, onComplete }: TenantWizardProps) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', slug: '', plan: 'Starter' as string,
    logo: '🏢', primaryColor: '#e11d48',
    metricoolKey: '', asanaToken: '', asanaWorkspace: '',
    clientEmail: '', clientName: '', tempPassword: '',
  });

  const update = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));
  const next = () => step < 3 ? setStep(s => s + 1) : onComplete();
  const prev = () => step > 0 ? setStep(s => s - 1) : onBack();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-surface-400">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white tracking-tighter">Nuevo Cliente</h1>
          <p className="text-surface-500 font-medium mt-1">Paso {step + 1} de 4 — {STEPS[step].label}</p>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const active = i === step;
          return (
            <div key={i} className="flex-1">
              <div className={`flex items-center gap-2 p-3 rounded-2xl transition-all ${active ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800' : done ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-surface-50 dark:bg-surface-800'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${done ? 'bg-emerald-500 text-white' : active ? 'bg-brand-600 text-white' : 'bg-surface-200 dark:bg-surface-600 text-surface-400'}`}>
                  {done ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className={`text-[9px] font-extrabold uppercase tracking-widest hidden md:block ${active ? 'text-brand-600 dark:text-brand-400' : done ? 'text-emerald-600 dark:text-emerald-400' : 'text-surface-400'}`}>{s.label}</span>
              </div>
              <div className={`h-1 rounded-full mt-2 ${done ? 'bg-emerald-500' : active ? 'bg-brand-600' : 'bg-surface-200 dark:bg-surface-700'}`} />
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="card p-8">
        {step === 0 && (
          <div className="space-y-5 max-w-lg">
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Nombre del Cliente</label>
              <input value={form.name} onChange={e => { update('name', e.target.value); update('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} className="input-field" placeholder="UrbanFit Studio" />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Slug (URL)</label>
              <input value={form.slug} onChange={e => update('slug', e.target.value)} className="input-field" placeholder="urbanfit-studio" />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Plan</label>
              <div className="flex gap-3">
                {['Starter', 'Growth Pro', 'Enterprise'].map(p => (
                  <button key={p} onClick={() => update('plan', p)} className={`flex-1 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all ${form.plan === p ? 'bg-surface-900 dark:bg-white text-white dark:text-surface-900 shadow-lg' : 'bg-surface-50 dark:bg-surface-800 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5 max-w-lg">
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Logo (Emoji o Iniciales)</label>
              <input value={form.logo} onChange={e => update('logo', e.target.value)} className="input-field text-3xl text-center" />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Color Primario</label>
              <div className="flex items-center gap-4">
                <input type="color" value={form.primaryColor} onChange={e => update('primaryColor', e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer border-0" />
                <input value={form.primaryColor} onChange={e => update('primaryColor', e.target.value)} className="input-field flex-1" />
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-surface-50 dark:bg-surface-900/50 flex items-center gap-4">
              <span className="text-4xl">{form.logo}</span>
              <div>
                <p className="font-extrabold text-surface-900 dark:text-white text-lg">{form.name || 'Nombre del Cliente'}</p>
                <div className="w-20 h-1.5 rounded-full mt-1" style={{ backgroundColor: form.primaryColor }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 max-w-lg">
            <div className="p-5 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-800">
              <h4 className="font-extrabold text-brand-700 dark:text-brand-300 mb-1">📊 Metricool</h4>
              <p className="text-xs text-brand-600/70 dark:text-brand-400/70 mb-3">Ingresa la API Key de la cuenta Metricool del cliente.</p>
              <input value={form.metricoolKey} onChange={e => update('metricoolKey', e.target.value)} className="input-field" placeholder="mk_live_xxxxxxxxxxxx" />
            </div>
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
              <h4 className="font-extrabold text-blue-700 dark:text-blue-300 mb-1">📋 Asana</h4>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mb-3">Token personal de Asana y Workspace ID.</p>
              <input value={form.asanaToken} onChange={e => update('asanaToken', e.target.value)} className="input-field mb-3" placeholder="Bearer 1/xxxxxxxx" />
              <input value={form.asanaWorkspace} onChange={e => update('asanaWorkspace', e.target.value)} className="input-field" placeholder="Workspace ID" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 max-w-lg">
            <p className="text-sm text-surface-500 font-medium">Crea las credenciales de acceso para el cliente al portal.</p>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Nombre del Contacto</label>
              <input value={form.clientName} onChange={e => update('clientName', e.target.value)} className="input-field" placeholder="Carlos Herrera" />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Email del Cliente</label>
              <input value={form.clientEmail} onChange={e => update('clientEmail', e.target.value)} className="input-field" placeholder="marketing@empresa.com" />
            </div>
            <div>
              <label className="text-[10px] font-extrabold text-surface-400 uppercase tracking-widest mb-2 block">Contraseña Temporal</label>
              <input value={form.tempPassword} onChange={e => update('tempPassword', e.target.value)} className="input-field" placeholder="Se enviará por email al cliente" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button onClick={prev} className="btn-ghost flex items-center gap-2"><ArrowLeft size={16} /> {step === 0 ? 'Cancelar' : 'Anterior'}</button>
        <button onClick={next} className="btn-primary flex items-center gap-2">
          {step === 3 ? <><Check size={16} /> Crear Cliente</> : <>Siguiente <ArrowRight size={16} /></>}
        </button>
      </div>
    </div>
  );
};
