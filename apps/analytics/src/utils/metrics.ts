import type { Container } from "@tos/data-layer";

export const getStatusData = (containers: Container[]) => {
  const counts = containers.reduce((acc: any, container) => {
    acc[container.status] = (acc[container.status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(status => ({
    name: status,
    value: counts[status]
  }));
};

export const getTotalWeight = (containers: Container[]) => 
  containers.reduce((sum, c) => sum + c.weight, 0).toFixed(1);