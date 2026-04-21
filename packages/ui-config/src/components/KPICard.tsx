// packages/ui-config/src/components/KPICard.tsx
import React from 'react';

interface KPIProps {
  label: string;
  value: string | number;
  trend?: { value: number; isUp: boolean };
}

export const KPICard = ({ label, value, trend }: KPIProps) => {
  return (
    <div className="bg-port-dark p-5 rounded-xl border border-slate-700 shadow-lg">
      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-3 mt-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {trend && (
          <span className={`text-xs font-bold ${trend.isUp ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};