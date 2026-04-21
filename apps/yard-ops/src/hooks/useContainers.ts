import { useState, useEffect } from 'react';
import { MOCK_CONTAINERS, Container } from '@tos/data-layer';

export const useContainers = () => {
  const [data, setData] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_CONTAINERS);
      setLoading(false);
    }, 1200); // Simulando lag del puerto
  }, []);

  return { data, loading };
};