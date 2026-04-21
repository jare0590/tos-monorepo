import React, { useState, useEffect, useMemo } from 'react';
// Importamos el servicio y los tipos necesarios
import { ContainerService } from '@tos/data-layer';
import { KPICard } from '@tos/ui-config';

// Importaciones de DND Kit con el fix de tipos para Vite 8
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  type DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';

import SortableRow from './components/SortableRow';

const statuses = ['Disponible', 'En Tránsito', 'Bloqueado'];

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sensores para el Drag and Drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Carga inicial de datos desde el servicio asíncrono
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const containers = await ContainerService.getAll();
        
        const formatted = containers.slice(0, 6).map((container, index) => ({
          id: `task-${container.id}`,
          containerId: container.id,
          from: container.location,
          to: `Z-0${index + 1}-01`,
          priority: index % 3 === 0 ? 'Alta' : 'Media',
          status: statuses[index % statuses.length]
        }));
        
        setTasks(formatted);
      } catch (err) {
        setError('Error al sincronizar con el servidor de patio');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Lógica de asignación con el servicio
  const handleAssign = async (taskId: string) => {
    setLoadingId(taskId);
    try {
      // Simulamos la llamada al servicio de actualización
      await ContainerService.updateStatus(taskId.replace('task-', ''), 'En Tránsito');
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: 'En Tránsito' } : t
      ));

      window.dispatchEvent(new CustomEvent('tos:plan-updated', {
        detail: { message: `Movimiento asignado: ${taskId.replace('task-', '')}` }
      }));
    } finally {
      setLoadingId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    high: tasks.filter(t => t.priority === 'Alta').length,
    blocked: tasks.filter(t => t.status === 'Bloqueado').length
  }), [tasks]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium italic">Preparando cola de movimientos...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen p-6">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Planificación Táctica</h2>
        <p className="text-slate-500 font-medium">Gestión de flujos operativos • Estrategia 2026</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <KPICard label="Tareas Totales" value={stats.total} />
        <KPICard label="Prioridad Crítica" value={stats.high} variant="warning" />
        <KPICard label="Bloqueos Detectados" value={stats.blocked} variant="danger" />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contenedor</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Origen</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Destino</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estatus</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Prioridad</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Acción</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest">Orden</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  {tasks.map((task) => (
                    <SortableRow 
                      key={task.id} 
                      task={task} 
                      onAssign={handleAssign} 
                      isLoading={loadingId === task.id} 
                    />
                  ))}
                </SortableContext>
              </tbody>
            </table>
          </div>
        </div>
      </DndContext>
    </div>
  );
}