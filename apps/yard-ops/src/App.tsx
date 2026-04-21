import React, { useState, useEffect } from 'react';
import { ContainerCard } from '@tos/ui-config';
import { ContainerService } from '@tos/data-layer';

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Obtenemos los datos puros del servicio sin transformaciones
        const data = await ContainerService.getAll();
        
        setTasks(data); 
      } catch (err) {
        setError('Error al conectar con el servidor de patio');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 animate-pulse">Sincronizando inventario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-xl border border-red-100">
        <p className="font-bold">⚠️ Error de Conexión</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen px-2 py-6">
      <div className="p-6 bg-slate-100 min-h-screen rounded-3xl"> 
        <h2 className="text-3xl font-bold mb-8 text-slate-800 border-b-2 border-orange-500 pb-2">
          ⚓ Inventario de Patio
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(container => (
            <ContainerCard key={container.id} {...container} />
          ))}
        </div>
  
        {tasks.length === 0 && (
          <div className="text-center p-20 text-slate-400">
            No hay contenedores registrados en esta zona.
          </div>
        )}
      </div>
    </div>
  );
}