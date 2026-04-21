import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ContainerService } from './ContainerService';
import { MOCK_CONTAINERS } from '../mocks';

describe('ContainerService', () => {
  // Reseteamos el mock antes de cada test para evitar efectos colaterales
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería obtener todos los contenedores con latencia simulada', async () => {
    const data = await ContainerService.getAll();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('id');
  });

  it('debería calcular correctamente los stats para el dashboard', async () => {
    const stats = await ContainerService.getStats();
    
    expect(stats).toHaveProperty('totalContainers');
    expect(stats).toHaveProperty('totalWeight');
    expect(stats.chartData).toBeInstanceOf(Array);
    // Verificamos que el peso total incluya la unidad
    expect(stats.totalWeight).toContain('TON');
  });

  it('debería actualizar el estado de un contenedor exitosamente', async () => {
    const targetId = MOCK_CONTAINERS[0].id;
    const newStatus = 'En Tránsito';

    const result = await ContainerService.updateStatus(targetId, newStatus);
    
    expect(result.success).toBe(true);
    // Verificamos que la "persistencia" en memoria funcionó
    const updated = MOCK_CONTAINERS.find(c => c.id === targetId);
    expect(updated?.status).toBe(newStatus);
  });

  it('debería lanzar un error si el contenedor no existe', async () => {
    await expect(ContainerService.updateStatus('ID-INEXISTENTE', 'Disponible'))
      .rejects.toThrow('no encontrado en el patio');
  });
});