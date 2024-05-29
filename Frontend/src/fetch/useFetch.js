import { useEffect, useState, useCallback } from 'react';

export const useFetch = () => {
  const [data, setData] = useState({ books: [] });
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/books');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
      console.error('Erro ao buscar os livros:', error);
    }
  }, []); // Empty dependency array means this will not change

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData to the dependency array

  return { data, error };
};