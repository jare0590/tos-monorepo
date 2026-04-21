// packages/ui-config/src/components/ContainerCard.tsx
import React from 'react';

interface ContainerProps {
  id: string;
  type: string;
  status: 'Inbound' | 'Outbound' | 'Hold' | 'Customs';
  location: string;
}

const statusStyles = {
  Inbound: 'bg-green-100 text-green-800 border-green-200',
  Outbound: 'bg-blue-100 text-blue-800 border-blue-200',
  Hold: 'bg-red-100 text-red-800 border-red-200',
  Customs: 'bg-amber-100 text-amber-800 border-amber-200',
};

export const ContainerCard = ({ id, type, status, location }: ContainerProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-port-dark">{id}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-slate-500">Tipo: <span className="text-slate-900">{type}</span></p>
        <p className="text-sm text-slate-500">Ubicación: <span className="font-mono text-port-accent">{location}</span></p>
      </div>
    </div>
  );
};