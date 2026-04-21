import React, { useState, Suspense, useEffect } from 'react';

const AnalyticsApp = React.lazy(() => import('analytics/App'));
const YardOpsApp = React.lazy(() => import('yard_ops/App'));
const MovePlanningApp = React.lazy(() => import('move_planning/App'));

type ModuleType = 'analytics' | 'yard' | 'planning';

function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('analytics');
  const [notification, setNotification] = useState<{ message: string } | null>(null);

  // Mantenemos el sistema de eventos para las alertas globales
  useEffect(() => {
    const handleUpdate = (event: any) => {
      setNotification({ message: event.detail.message || 'Operación exitosa' });
      setTimeout(() => setNotification(null), 4000);
    };
    window.addEventListener('tos:plan-updated', handleUpdate);
    return () => window.removeEventListener('tos:plan-updated', handleUpdate);
  }, []);

  const navItems = [
    { id: 'analytics', label: 'Inteligencia Operativa', icon: '📊' },
    { id: 'yard', label: 'Gestión de Patio', icon: '🏗️' },
    { id: 'planning', label: 'Planificación Táctica', icon: '📅' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* 1. SIDEBAR NAVEGACIÓN */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tighter">🚢 Puerto TOS</h1>
          <p className="text-slate-500 text-xs mt-1 uppercase font-bold tracking-widest">CDMX • Control Hub</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleType)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                activeModule === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">Estrategia 2026 Activa</span>
          </div>
        </div>
      </aside>

      {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Notificación Flotante */}
        {notification && (
          <div className="absolute top-8 right-8 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <span className="text-xl">✅</span>
              <p className="font-bold">{notification.message}</p>
            </div>
          </div>
        )}

        {/* Header Dinámico */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
            {navItems.find(i => i.id === activeModule)?.label}
          </h2>
        </header>

        {/* Renderizado Condicional con Suspense */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-2 lg:p-4"> 
          <div className="w-full bg-white shadow-sm border border-slate-200 overflow-hidden min-h-[90vh]">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-full p-20 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-medium italic">Sincronizando Módulo...</p>
              </div>
            }>
              {activeModule === 'analytics' && <AnalyticsApp />}
              {activeModule === 'yard' && <YardOpsApp />}
              {activeModule === 'planning' && <MovePlanningApp />}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;