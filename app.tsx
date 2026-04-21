import React, { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import { Bell, CheckCircle } from 'lucide-react';

import { auth, db, appId } from './src/procesamiento/firebase';
import { MOCK_STATS, MOCK_ACTIVITIES } from './src/ingesta/mockData';
import { DashboardView } from './src/presentacion/views/DashboardView';
import { ActivitiesView } from './src/presentacion/views/ActivitiesView';
import { AdminView } from './src/presentacion/views/AdminView';

export default function App() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAdmin, setIsAdmin] = useState(true);
    const [activities, setActivities] = useState(MOCK_ACTIVITIES);
    const [monthlyStats, setMonthlyStats] = useState(MOCK_STATS);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (err) {
                console.error("Auth error:", err);
            }
        };
        initAuth();
        const unsubscribe = onAuthStateChanged(auth, (u: any) => setUser(u));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const unsubActs = onSnapshot(
            collection(db, 'artifacts', appId, 'public', 'data', 'activities'),
            (snap: any) => {
                if (!snap.empty) {
                    const data = snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
                    setActivities(data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                }
                setLoading(false);
            },
            () => setLoading(false)
        );

        const unsubStats = onSnapshot(
            collection(db, 'artifacts', appId, 'public', 'data', 'stats'),
            (snap: any) => {
                if (!snap.empty) {
                    const data = snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
                    setMonthlyStats(data.sort((a: any, b: any) => a.order - b.order));
                }
            }
        );

        return () => {
            unsubActs();
            unsubStats();
        };
    }, [user]);

    const showNotification = (msg: string) => {
        setNotification(msg as any);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleMetricoolSync = async () => {
        setSyncing(true);
        // Simulación de procesamiento de datos MCP
        setTimeout(async () => {
            try {
                const lastMonth = monthlyStats[monthlyStats.length - 1];
                const newMonth = {
                    ...lastMonth,
                    month: 'Mayo',
                    invested: lastMonth.invested + 500,
                    return: lastMonth.return + 2000,
                    engagement: parseFloat((lastMonth.engagement as number + 0.3).toFixed(1)),
                    followers: lastMonth.followers + 150,
                    order: lastMonth.order + 1
                };

                const newActivity = {
                    title: "Sincronización MCP - Mayo",
                    date: new Date().toISOString().split('T')[0],
                    description: "Datos importados automáticamente desde Metricool. KPIs de comunidad y anuncios actualizados.",
                    tags: ['Metricool', 'Automático']
                };

                if (user) {
                    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'activities'), newActivity);
                    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'stats'), newMonth);
                }

                showNotification("Datos de Metricool sincronizados correctamente.");
            } catch (e) {
                showNotification("Error al sincronizar. Revisa la conexión.");
            }
            setSyncing(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-rose-600 font-bold tracking-widest text-xs uppercase">Conectando Box Studio...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed w-full z-40 px-8 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform -rotate-3 italic">B</div>
                    <div>
                        <h1 className="font-black text-xl leading-none tracking-tighter">BOX<span className="text-rose-600">STUDIO</span></h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Portal • v2.0</p>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    {['dashboard', 'activities', 'admin'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-rose-600 border-b-2 border-rose-600 pb-1' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab === 'dashboard' ? 'Resultados' : tab === 'activities' ? 'Bitácora' : 'Configuración'}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 hidden md:flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Metricool: Online</span>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Bell size={20} /></button>
                </div>
            </nav>

            <main className="pt-28 pb-12 px-8 max-w-7xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                            {activeTab === 'dashboard' ? 'Performance Global' : activeTab === 'activities' ? 'Historial Operativo' : 'Panel Box Studio'}
                        </h2>
                        <p className="text-slate-500 font-medium">Visualización de datos integrados vía Metricool MCP.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                        <button onClick={() => setIsAdmin(false)} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${!isAdmin ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>CLIENTE</button>
                        <button onClick={() => setIsAdmin(true)} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${isAdmin ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>AGENCIA</button>
                    </div>
                </div>

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
                    <AdminView syncing={syncing} handleMetricoolSync={handleMetricoolSync} />
                )}
            </main>

            {notification && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="bg-slate-900 text-white px-10 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"><CheckCircle size={18} /></div>
                        <span className="font-black text-xs uppercase tracking-widest">{notification}</span>
                    </div>
                </div>
            )}

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
        </div>
    );
}