import React, { useState, useEffect } from 'react';
import { ContainerService } from '@tos/data-layer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
  
    ContainerService.getStats()
      .then(data => {
        if (isMounted) {
          setStats(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error("Error en Analytics:", err);
          setError("No se pudieron cargar las estadísticas");
          setIsLoading(false);
        }
      });
  
    return () => { isMounted = false; }; // Cleanup para evitar fugas de memoria
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium italic">Sincronizando métricas...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
          <p className="text-slate-400 text-sm uppercase font-bold">Total Contenedores</p>
          <h3 className="text-4xl font-black mt-2">{stats?.totalContainers || 0}</h3>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm uppercase font-bold">Peso Total</p>
          <h3 className="text-4xl font-black text-slate-900 mt-2">{stats.totalWeight}</h3>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <p className="text-slate-500 text-sm uppercase font-bold">Eficiencia</p>
          <h3 className="text-4xl font-black text-emerald-600 mt-2">{stats.yardEfficiency}%</h3>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <h4 className="text-lg font-bold text-slate-800 mb-6">Distribución de Inventario</h4>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}