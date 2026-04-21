export const statusConfig = {
    Disponible: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "En Tránsito": "bg-amber-100 text-amber-700 border-amber-200",
    Bloqueado: "bg-rose-100 text-rose-700 border-rose-200",
};

export type StatusType = keyof typeof statusConfig;