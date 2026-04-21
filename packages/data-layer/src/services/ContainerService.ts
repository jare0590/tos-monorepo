import { MOCK_CONTAINERS } from '../mocks';

export const ContainerService = {
  // Obtener todos los contenedores para el inventario de Yard-Ops
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_CONTAINERS;
  },

  // Obtener KPIs procesados para el Dashboard de Analytics
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const total = MOCK_CONTAINERS.length;
    
    const weights = MOCK_CONTAINERS.map(c => {
      const val = typeof c.weight === 'string' ? c.weight.split(' ')[0] : c.weight;
      return parseFloat(val as string) || 0;
    });
    
    const totalWeight = weights.reduce((a, b) => a + b, 0).toFixed(1);
    
    return {
      totalContainers: total,
      totalWeight: `${totalWeight} TON`,
      yardEfficiency: 94,
      chartData: [
        { name: 'Disponibles', value: MOCK_CONTAINERS.filter(c => c.status === 'Inbound').length },
        { name: 'En Tránsito', value: 2 },
        { name: 'Bloqueados', value: MOCK_CONTAINERS.filter(c => c.status === 'Hold').length },
      ]
    };
  },

  updateStatus: async (id: string, newStatus: string) => {
    // Simulamos la latencia de una petición PUT/PATCH a la API
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Actualizamos el mock en memoria para que los cambios sean visibles 
    // entre microfrontends (gracias al Singleton del Monorepo)
    const container = MOCK_CONTAINERS.find(c => c.id === id);
    if (container) {
      // Nota: En un entorno real, aquí validaríamos contra un ENUM de estados
      container.status = newStatus as any;
      console.log(`[TOS Service] Container ${id} updated to: ${newStatus}`);
      return { success: true, timestamp: new Date().toISOString() };
    }

    throw new Error(`Contenedor ${id} no encontrado en el patio.`);
  }
};