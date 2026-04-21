// Tipos de datos
export interface Container {
    id: string;
    type: '20ft' | '40ft' | '40ft HC';
    status: 'Inbound' | 'Outbound' | 'Hold' | 'Customs';
    location: string;
    weight: number; // en toneladas
    priority: boolean;
  }
  
  export interface OperationalMove {
    id: string;
    containerId: string;
    from: string;
    to: string;
    timestamp: string;
    status: 'Pending' | 'Completed';
  }
  
  // Mocks
  export const MOCK_CONTAINERS: Container[] = [
    { id: 'MAEU-120934', type: '40ft HC', status: 'Inbound', location: 'A-01-12', weight: 22.5, priority: true },
    { id: 'HPLU-992831', type: '20ft', status: 'Hold', location: 'B-04-02', weight: 18.2, priority: false },
    { id: 'MSCU-445566', type: '40ft', status: 'Customs', location: 'Z-10-01', weight: 30.1, priority: true },
    { id: 'CMAC-112233', type: '40ft HC', status: 'Outbound', location: 'C-02-05', weight: 15.0, priority: false },
    // Agrega unos 5-10 más para que el scroll se vea bien
  ];
  
  export const MOCK_MOVES: OperationalMove[] = [
    { id: 'MV-001', containerId: 'MAEU-120934', from: 'Gate 1', to: 'A-01-12', timestamp: '2026-04-17T10:00:00Z', status: 'Completed' },
    { id: 'MV-002', containerId: 'HPLU-992831', from: 'B-04-02', to: 'Quay Side', timestamp: '2026-04-17T14:30:00Z', status: 'Pending' },
  ];