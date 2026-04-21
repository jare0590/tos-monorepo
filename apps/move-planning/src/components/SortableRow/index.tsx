import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// 1. Importamos la configuración y el tipo
import { statusConfig, type StatusType } from '../../types/status'; 
import LoadingSpinner from '../LoadingSpinner';

export default function SortableRow({
    task,
    onAssign,
    isLoading
}: {
    task: any,
    onAssign: (id: string) => void,
    isLoading: boolean
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : 1,
      opacity: isDragging ? 0.5 : 1,
    };
  
    return (
      <tr ref={setNodeRef} style={style} className="hover:bg-slate-50 transition-colors group">
        <td className="px-6 py-4 font-mono font-medium text-slate-900">{task.containerId}</td>
        <td className="px-6 py-4 text-slate-600">{task.from}</td>
        <td className="px-6 py-4 text-slate-600">{task.to}</td>
        <td className="px-6 py-4">
          {/* Ahora statusConfig y StatusType ya están definidos aquí */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig[task.status as StatusType]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${task.status === 'Disponible' ? 'bg-emerald-500' : task.status === 'Bloqueado' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
            {task.status}
          </span>
        </td>
  
        <td className="px-6 py-4 text-slate-600">
          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${task.priority === 'Alta' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            {task.priority}
          </span>
        </td>
        
        {/* --- COLUMNA DE BOTÓN --- */}
        <td className="px-6 py-4 text-right">
          <button 
            onClick={() => onAssign(task.id)}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          >
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Procesando' : 'Asignar'}
          </button>
        </td>
  
        {/* --- COLUMNA DE HANDLE (DRAG) --- */}
        <td {...attributes} {...listeners} className="px-6 py-4 text-right text-slate-400 cursor-grab active:cursor-grabbing">
          <span className="group-hover:text-slate-600 transition-colors">☰</span>
        </td>
      </tr>
    );
  }